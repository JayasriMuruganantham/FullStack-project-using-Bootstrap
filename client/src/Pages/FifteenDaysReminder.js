import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const daysOptions = [
  { day: 1, routine: 'Morning exercise routine', advice: 'Start your day with a positive mindset', deed: 'Go for a 30-minute walk' },
  { day: 2, routine: 'Practice meditation for 15 minutes', advice: 'Take short breaks to stay focused', deed: 'Cook a healthy meal' },
  { day: 3, routine: 'Attend a workout class', advice: 'Stay consistent with your routine', deed: 'Complete a small task you’ve been avoiding' },
  { day: 4, routine: 'Go for a morning run', advice: 'Set aside time for relaxation', deed: 'Visit a local park' },
  { day: 5, routine: 'Practice yoga', advice: 'Manage stress with relaxation techniques', deed: 'Prepare a meal for the family' },
  { day: 6, routine: 'Go for a bike ride', advice: 'Engage in activities that bring you joy', deed: 'Volunteer for a local cause' },
  { day: 7, routine: 'Do a weekly review', advice: 'Evaluate your week and set new goals', deed: 'Relax and enjoy a hobby' }
];

const FifteenDaysReminder = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedRoutine, setSelectedRoutine] = useState('');
  const [selectedAdvice, setSelectedAdvice] = useState('');
  const [selectedDeed, setSelectedDeed] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load data from localStorage
    const savedDay = localStorage.getItem('selectedDay');
    const savedRoutine = localStorage.getItem('selectedRoutine');
    const savedAdvice = localStorage.getItem('selectedAdvice');
    const savedDeed = localStorage.getItem('selectedDeed');

    if (savedDay) setSelectedDay(parseInt(savedDay));
    if (savedRoutine) setSelectedRoutine(savedRoutine);
    if (savedAdvice) setSelectedAdvice(savedAdvice);
    if (savedDeed) setSelectedDeed(savedDeed);
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem('selectedDay', selectedDay);
    localStorage.setItem('selectedRoutine', selectedRoutine);
    localStorage.setItem('selectedAdvice', selectedAdvice);
    localStorage.setItem('selectedDeed', selectedDeed);
  }, [selectedDay, selectedRoutine, selectedAdvice, selectedDeed]);

  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Day: ${selectedDay}\nRoutine: ${selectedRoutine}\nAdvice: ${selectedAdvice}\nDeed: ${selectedDeed}`);
  };

  const currentOptions = daysOptions.find(day => day.day === selectedDay);

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Row className="w-100 justify-content-center mb-3">
        <Col md={6} className="text-center">
        </Col>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <Form.Group className="mb-3">
              <Form.Label>Select Day</Form.Label>
              <Form.Control as="select" value={selectedDay} onChange={handleDayChange}>
                {daysOptions.map(option => (
                  <option key={option.day} value={option.day}>Day {option.day}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Routine</Form.Label>
              <Form.Check
                type="radio"
                label={currentOptions.routine}
                value={currentOptions.routine}
                checked={selectedRoutine === currentOptions.routine}
                onChange={(e) => setSelectedRoutine(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Advice</Form.Label>
              <Form.Check
                type="radio"
                label={currentOptions.advice}
                value={currentOptions.advice}
                checked={selectedAdvice === currentOptions.advice}
                onChange={(e) => setSelectedAdvice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deed</Form.Label>
              <Form.Check
                type="radio"
                label={currentOptions.deed}
                value={currentOptions.deed}
                checked={selectedDeed === currentOptions.deed}
                onChange={(e) => setSelectedDeed(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Submit</Button>
          </Form>
          <br/>
          <br/>
          <Button variant="secondary" className="w-100" onClick={() => navigate('/')}>
            Back to Homepage
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FifteenDaysReminder;



