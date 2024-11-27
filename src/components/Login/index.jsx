import React, { useState } from "react";
import { generateToken } from '../Utils/utils';

import "./style.scss";

const Login = ({ handleAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const savedUser = localStorage.hasOwnProperty("user")
    ? JSON.parse(decodeURIComponent(localStorage.getItem("user")))
    : {};

  const validateSavedUser = (user) => {
    const { email, password } = user;
    return email === savedUser.email && password === savedUser.password ? true : false;
  }

  const handleClick = (e) => {
    e.preventDefault();
    validateForm();
    const user = {
      email,
      password,
    };
    if (e.target.innerText === "Signup") {
      if(email !== savedUser.email) {
        localStorage.setItem('user', encodeURIComponent(JSON.stringify({ ...user, name })));
        handleAuth(generateToken());
      } else {
        setError("Email account hasn been taken. Please Login");
      }
    } else {
      if(validateSavedUser(user)){
        handleAuth(generateToken())
      } else {
        setError("Email or Password is not correct");
      }
    }
  };

  const validateForm = () => {
    if (!email) {
      return setError("Email is required");
    }
    if (!password) {
      return setError("Password is required");
    }
    setError("");
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const signInAndUp = () => {
    const toggle = !isSignup;
    resetForm();
    setIsSignup(toggle);
    setError("");
  };
  
  return (
    <div className="tm-login-signup">
      <div className="tm-form-container">
        <h3 className="tm-form-title">
          {isSignup ? "Signup Form" : "Login Form"}
        </h3>
        <div className="tm-form-field">
          {error && <p className="error">{error}</p>}
          {isSignup && (
            <input
              type="text"
              required
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isSignup && <span className="tm-forgot-pwd">Forgot password?</span>}
          <button className="btn tm-button" onClick={(e) => handleClick(e)}>
            {isSignup ? "Signup" : "Login"}
          </button>
          <p className="text-center">
            {isSignup ? "Already a member?" : "Not a member?"}{" "}
            <span onClick={() => signInAndUp()} className="tm-signup">
              {!isSignup ? "Signup" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
