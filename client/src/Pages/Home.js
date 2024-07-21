import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import quotes from './Quotes';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const localName = localStorage.getItem('Name') || 'Guest';
    setName(localName);
    generateRandomQuote();
    scheduleNotifications();
  }, []);

  const generateRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const selectedQuote = quotes[randomIndex].quote;
      setQuote(selectedQuote);
    } else {
      console.error("No quotes found!");
    }
  };

  const scheduleNotifications = () => {
    const schedulePrompt = (message, hours, minutes) => {
      const now = new Date();
      const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
      if (now > scheduledTime) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }
      const timeUntilPrompt = scheduledTime - now;
      setTimeout(() => {
        const userResponse = window.confirm(message);
        if (!userResponse) {
          alert("Please Have it!!" + message);
        }
        schedulePrompt(message, hours, minutes); // Reschedule for the next day
      }, timeUntilPrompt);
    };
  
    schedulePrompt("Have you had your Breakfast?", 8, 0);
    schedulePrompt("Did you have your lunch?", 13, 0);
    schedulePrompt("Have your own space for 15 mins?", 17, 0);
    schedulePrompt("Have you had your Dinner?", 20, 0);
  };
  

  const logout = () => {
    localStorage.removeItem('Signup');
    window.location.reload();
  };

  const deleteAccount = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Hey! {name}</span>
          <span className="navbar-text mx-auto">{quote}</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto">
              
                <Link to className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link to="#" onClick={logout} className="dropdown-item">Logout</Link></li>
                  <li><Link to="#" onClick={deleteAccount} className="dropdown-item">Delete Account</Link></li>
                </ul>
             
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 text-center mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWOcdmZk2x7eH3IhUo5H2R2Bdjgx7tOfBw7J5qgFKgDww1LQzweXC2iRhyc0JVYI9Zbl4&usqp=CAU" alt="Finance Management Tool" className="img-fluid mb-2 uniform-image" />
            <Link to="/finance-tool" className="btn btn-primary d-block">Finance Tool</Link>
          </div>
          <div className="col-md-3 text-center mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNjLqBV5bgEvRIAYeETDuN0u8ZKqoGOpJUgw&s" alt="Truth or Dare" className="img-fluid mb-2 uniform-image"/>
            <Link to="/truth-or-dare" className="btn btn-primary d-block">Truth or Dare</Link>
          </div>
          <div className="col-md-3 text-center mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYWaCx7WXdJKhK0svdya9yIKcXkN0-JS8tAg&s" alt="Music Hall" className="img-fluid mb-2 uniform-image" />
            <Link to="/music-hall" className="btn btn-primary d-block">Music Hall</Link>
          </div>
          <div className="col-md-3 text-center mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrSmWo8o3k7nni4KJ80yDBhy8X-gw3L_wHbGRfVSQVG8BrjbjuLqUSJDbcn1uHg5pTkv8&usqp=CAU" alt="15 Days Reminder" className="img-fluid mb-2 uniform-image" />
            <Link to="/15-days-reminder" className="btn btn-primary d-block"> Self-Reminder</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
