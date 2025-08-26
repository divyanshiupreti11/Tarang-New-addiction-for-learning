import React from "react";
import "../index.css";

export default function LandingPage({ setCurrentPage }) {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to EduQuiz</h1>
        <p className="landing-subtitle">
          Learn, Quiz & Excel! Interactive quizzes for students and teachers.
        </p>
        <div className="landing-buttons">
          <button className="btn" onClick={() => setCurrentPage("role-selection")}>
            Get Started
          </button>
          <button className="btn btn-secondary" onClick={() => setCurrentPage("about")}>
            About
          </button>
        </div>
      </div>
    </div>
  );
}
