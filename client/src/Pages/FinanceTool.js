import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FinanceTool.css'; // Import CSS

const FinanceTool = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [budgetSet, setBudgetSet] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSetBudget = (e) => {
    e.preventDefault();
    setBudgetSet(true);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { id: Date.now(), description, amount: parseFloat(amount), date }]);
    setDescription('');
    setAmount('');
    setDate('');
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const getWeeklyExpenses = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
    return expenses.filter(expense => new Date(expense.date) > oneWeekAgo);
  };

  const getMonthlyExpenses = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    return expenses.filter(expense => new Date(expense.date).getMonth() === currentMonth);
  };

  const weeklyExpenses = getWeeklyExpenses().reduce((total, expense) => total + expense.amount, 0);
  const monthlyExpenses = getMonthlyExpenses().reduce((total, expense) => total + expense.amount, 0);

  return (
    <Container>
      <Row className="mt-4">
        <Col className="form-container">
          {!budgetSet ? (
            <Form onSubmit={handleSetBudget}>
              <Form.Group controlId="monthlyBudget">
                <Form.Label>Set Monthly Budget</Form.Label>
                <Form.Control
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(parseFloat(e.target.value))}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Set Budget
              </Button>
            </Form>
          ) : (
            <>
              <h2>Budget Dashboard</h2>
              <h4>Monthly Budget: Rs.{monthlyBudget}</h4>
              <h4>Total Expenses: Rs.{totalExpenses}</h4>
              <h4>Remaining Budget: Rs.{monthlyBudget - totalExpenses}</h4>
            </>
          )}
        </Col>
      </Row>
      {budgetSet && (
        <Row className="mt-4">
          <Col md={6} className="form-container">
            <Form onSubmit={handleAddExpense}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="amount" className="mt-2">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="date" className="mt-2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Add Expense
              </Button>
            </Form>
          </Col>
          <Col md={6} className="form-container">
            <h4>Expenses</h4>
            <ListGroup>
              {expenses.map(expense => (
                <ListGroup.Item key={expense.id}>
                  {expense.date} - {expense.description}: Rs.{expense.amount}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
      <Button variant="info" className="mt-4" onClick={() => setShowReport(true)}>
        Generate Report
      </Button>
      <Modal show={showReport} onHide={() => setShowReport(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Expense Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Weekly Expenses: Rs.{weeklyExpenses}</h5>
          <h5>Total Monthly Expenses: Rs.{monthlyExpenses}</h5>
          <h5>Remaining Budget: Rs.{monthlyBudget - monthlyExpenses}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReport(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/')}>
        Back to Homepage
      </Button>
    </Container>
  );
};

export default FinanceTool;


