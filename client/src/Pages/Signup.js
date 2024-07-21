import React, { useEffect, useState, useRef } from 'react';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [showHome, setShowHome] = useState(false);
  const [show, setShow] = useState(false);
  const localSignup = localStorage.getItem('Signup');
  const localEmail = localStorage.getItem('Email');
  const localName = localStorage.getItem('Name');
  const localPassword = localStorage.getItem('Password');

  useEffect(() => {
    if (localSignup) {
      setShowHome(true);
    }
    if (localEmail) {
      setShow(true);
    }
  }, [localSignup, localEmail]);

  const handleClick = () => {
    if (name.current.value && email.current.value && password.current.value) {
      localStorage.setItem("Name", name.current.value);
      localStorage.setItem("Email", email.current.value);
      localStorage.setItem("Password", password.current.value);
      localStorage.setItem("Signup", email.current.value);
      alert("Account created Successfully!!");
      window.location.reload();
    }
  };

  const handleSignin = () => {
    if (email.current.value === localEmail && password.current.value === localPassword) {
      localStorage.setItem("Signup", email.current.value);
      window.location.reload();
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5">
      {showHome ? (
        <Home />
      ) : (
        <div className="card p-4">
          {show ? (
            <div>
              <h1>Hey! {localName}</h1>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" className="form-control" placeholder="E-mail" ref={email} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" placeholder="Password" ref={password} />
              </div>
              <button className="btn btn-primary mt-3" onClick={handleSignin}>Sign In</button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" placeholder="Name" ref={name} />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" className="form-control" placeholder="E-mail" ref={email} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" placeholder="Password" ref={password} />
              </div>
              <button className="btn btn-primary mt-3" onClick={handleClick}>Sign Up</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Signup;

