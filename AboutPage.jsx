import React from "react";
import "../index.css"; // Import the main CSS

export default function AboutPage({ setCurrentPage }) {
  return (
    <div className="about-page container">
      <h1 className="page-title">About Smart Quiz App</h1>
      <p className="page-description">
        Welcome to the Smart Quiz App! This platform allows students to practice
        quizzes across multiple subjects and units, track their progress, and
        earn badges based on performance.
      </p>

      <p className="page-description">
        Teachers can create quizzes, add questions, and view student results. Our
        app focuses on providing an interactive learning experience with easy,
        medium, and hard questions.
      </p>

      <div className="button-group">
        <button className="btn" onClick={() => setCurrentPage("landing")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
