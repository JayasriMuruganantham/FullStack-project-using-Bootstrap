import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from './Questions.json';
import { useNavigate } from 'react-router-dom';

function TruthorDare() {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const generateRandom = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const handleGenerate = (type) => {
    if (type === 'truth') {
      setQuestion(generateRandom(Questions.truths));
    } else if (type === 'dare') {
      setQuestion(generateRandom(Questions.dares));
    }
    setType(type);
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-4">
      <h2 className="text-center mb-4">Truth or Dare</h2>
      <div className="text-center mb-4">
        <button className="btn btn-primary me-3" onClick={() => handleGenerate('truth')}>
          Generate Truth
        </button>
        <button className="btn btn-danger me-3" onClick={() => handleGenerate('dare')}>
          Generate Dare
        </button>
      </div>
      <div className="text-center mb-4">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Homepage
        </button>
      </div>
      {question && (
        <div className="mt-4 text-center">
          <h4>{type === 'truth' ? 'Truth' : 'Dare'}:</h4>
          <p>{question}</p>
        </div>
      )}
    </div>
  );
}

export default TruthorDare;
