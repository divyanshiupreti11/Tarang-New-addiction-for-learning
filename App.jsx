import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import RoleSelectionPage from './components/RoleSelectionPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import UnitSelectionPage from './components/UnitSelectionPage';
import UnitDetailsPage from './components/UnitDetailsPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { getAllQuestions, addQuestion, loginUser, registerUser } from './api/api';



export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [badge, setBadge] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [loginError, setLoginError] = useState('');
  const [role, setRole] = useState('');

  // Load questions from backend on initial render
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const fetchedQuestions = await getAllQuestions();
    setQuestions(fetchedQuestions.questions || fetchedQuestions);
  };

  // ========================
  // Auth Functions
  // ========================
  const handleLogin = async (e, userType) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await loginUser({ email, password, userType });
      setUser(response.user);
      setLoginError('');
      setCurrentPage(userType === 'student' ? 'student-dashboard' : 'teacher-dashboard');
    } catch (error) {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = async (e, userType) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setLoginError('Passwords do not match.');
      return;
    }

    try {
      await registerUser({ name, email, password, userType });
      alert('Account created successfully!');
      setLoginError('');
      setCurrentPage(userType === 'student' ? 'student-login' : 'teacher-login');
    } catch (error) {
      setLoginError('Failed to register user.');
    }
  };

  // ========================
  // Quiz Functions
  // ========================
  const startQuiz = () => {
    if (!questions.length) {
      alert('No questions available. Please add questions first.');
      return;
    }
    // Filter questions by selected subject/unit
    const unitQuestions = questions.filter(
      (q) => q.subject === selectedSubject && q.unit === selectedUnit
    );
    setQuizQuestions(unitQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
    setBadge('');
    setCurrentPage('quiz');
  };

  const handleAnswer = (option) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    let newScore = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) newScore++;
    });
    const percentage = (newScore / quizQuestions.length) * 100;
    setScore(percentage);

    if (percentage > 90) setBadge('Gold');
    else if (percentage > 75) setBadge('Silver');
    else if (percentage > 60) setBadge('Bronze');
    else setBadge('None');

    setCurrentPage('results');
  };

  // ========================
  // Add Question (Teacher)
  // ========================
  const handleAddQuestion = async (questionData) => {
    try {
      await addQuestion(questionData);
      fetchQuestions(); // refresh questions list
      alert('Question added successfully!');
    } catch (error) {
      alert('Failed to add question.');
    }
  };

  // ========================
  // Render Page
  // ========================
  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'role-selection': return <RoleSelectionPage setCurrentPage={setCurrentPage} setRole={setRole} />;
      case 'student-login':
      case 'teacher-login':
      case 'student-signup':
      case 'teacher-signup':
        return (
          <LoginPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            loginError={loginError}
          />
        );
      case 'teacher-dashboard':
      case 'student-dashboard':
        return (
          <DashboardPage
            user={user}
            setCurrentPage={setCurrentPage}
            questions={questions}
            handleAddQuestion={handleAddQuestion}
            setSelectedSubject={setSelectedSubject}
          />
        );
      case 'unit-selection':
        return (
          <UnitSelectionPage
            setCurrentPage={setCurrentPage}
            questions={questions}
            selectedSubject={selectedSubject}
            setSelectedUnit={setSelectedUnit}
          />
        );
      case 'unit-details':
        return (
          <UnitDetailsPage
            setCurrentPage={setCurrentPage}
            selectedUnit={selectedUnit}
            startQuiz={startQuiz}
          />
        );
      case 'quiz':
        return (
          <QuizPage
            quizQuestions={quizQuestions}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
            submitQuiz={submitQuiz}
          />
        );
      case 'results':
        return <ResultsPage score={score} badge={badge} setCurrentPage={setCurrentPage} />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return <div className="app-container">{renderPage()}</div>;
}
