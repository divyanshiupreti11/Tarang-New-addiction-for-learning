
CREATE DATABASE IF NOT EXISTS gamefied;
USE gamefied;

-- USERS table (students & teachers)
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(50) NULL,
    class_level INT NULL CHECK (class_level BETWEEN 6 AND 12),
    school_name VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','teacher','admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SUBJECTS
CREATE TABLE IF NOT EXISTS subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL
);

-- LEVELS (level-based learning)
CREATE TABLE IF NOT EXISTS levels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id INT,
    level_number INT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    points_reward INT DEFAULT 50,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE SET NULL
);

-- STUDENT_PROGRESS
CREATE TABLE IF NOT EXISTS student_progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    level_id INT,
    points_earned INT DEFAULT 0,
    status ENUM('locked','unlocked','completed') DEFAULT 'locked',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (level_id) REFERENCES levels(level_id) ON DELETE CASCADE
);

-- BADGES
CREATE TABLE IF NOT EXISTS badges (
    badge_id INT AUTO_INCREMENT PRIMARY KEY,
    badge_name VARCHAR(100) NOT NULL,
    criteria TEXT
);

-- STUDENT_BADGES
CREATE TABLE IF NOT EXISTS student_badges (
    student_id INT,
    badge_id INT,
    earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, badge_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (badge_id) REFERENCES badges(badge_id)
);

-- QUIZZES (simplified)
CREATE TABLE IF NOT EXISTS quizzes (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    level_id INT,
    title VARCHAR(255),
    total_marks INT DEFAULT 100,
    FOREIGN KEY (level_id) REFERENCES levels(level_id) ON DELETE SET NULL
);

-- QUESTIONS (MCQ)
CREATE TABLE IF NOT EXISTS questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer CHAR(1) CHECK (correct_answer IN ('A','B','C','D')),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);

-- QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS quiz_attempts (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    student_id INT,
    score INT,
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- LEADERBOARD: store cached totals (can be recalculated)
CREATE TABLE IF NOT EXISTS leaderboard (
    leaderboard_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT UNIQUE,
    total_points INT DEFAULT 0,
    rank_position INT,
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- SAMPLE DATA (small)
INSERT INTO subjects (subject_name) VALUES ('Mathematics'), ('Science'), ('English');

INSERT INTO users (name, roll_no, class_level, school_name, email, password, role)
VALUES
('Rahul Sharma','R006','6','St. Johns High','rahul@class6.com','$2b$10$examplehashedpass', 'student'),
('Anita Singh','R101','10','Greenwood','anita@class10.com','$2b$10$examplehashedpass', 'student'),
('Mr. Verma', NULL, NULL, 'Greenwood','verma@school.com','$2b$10$examplehashedpass', 'teacher');

-- Example levels
INSERT INTO levels (subject_id, level_number, title, description, points_reward) VALUES
(1,1,'Algebra Basics','Intro to variables and expressions',50),
(1,2,'Algebra Intermediate','Equations & inequalities',70),
(2,1,'Physics Basics','Forces and motion',50);

-- Unlock Level 1 for Rahul (student_id = 1)
INSERT INTO student_progress (student_id, level_id, points_earned, status)
VALUES (1, 1, 0, 'unlocked');

-- Initialize leaderboard entry
INSERT INTO leaderboard (student_id, total_points) VALUES (1,0), (2,0);
