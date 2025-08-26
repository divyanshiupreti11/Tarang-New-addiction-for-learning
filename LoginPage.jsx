import React, { useState } from "react";
import "../index.css";

export default function LoginPage({ currentPage, setCurrentPage, handleLogin, handleSignUp, loginError }) {
  const [isSignup, setIsSignup] = useState(currentPage.includes("signup"));

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setCurrentPage(isSignup ? currentPage.replace("signup", "login") : currentPage.replace("login", "signup"));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {loginError && <p className="error">{loginError}</p>}
        <form onSubmit={(e) => isSignup ? handleSignUp(e, currentPage.includes("teacher") ? "teacher" : "student") : handleLogin(e, currentPage.includes("teacher") ? "teacher" : "student")}>
          {isSignup && (
            <input type="text" name="name" placeholder="Full Name" required />
          )}
          {currentPage.includes("teacher") && isSignup && (
            <input type="text" name="teacherId" placeholder="Teacher ID (if any)" />
          )}
          {currentPage.includes("student") && isSignup && (
            <input type="text" name="studentClass" placeholder="Class/Grade" />
          )}
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          {isSignup && <input type="password" name="confirmPassword" placeholder="Confirm Password" required />}
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="toggle-link" onClick={toggleMode}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
