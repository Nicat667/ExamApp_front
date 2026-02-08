// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; // NEW: Import Register
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import ExamSetup from './pages/Exam/ExamSetup';
import ExamInterface from './pages/Exam/ExamInterface';
import ExamResult from './pages/Exam/ExamResult';

// Simple Guard to protect routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* NEW: Register Route */}
          
          {/* Protected Routes (Require Login) */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          } />

          <Route path="/exam/setup" element={
            <PrivateRoute>
              <ExamSetup />
            </PrivateRoute>
          } />
          
          <Route path="/exam/live" element={
            <PrivateRoute>
              <ExamInterface />
            </PrivateRoute>
          } />

          <Route path="/exam/result" element={
            <PrivateRoute>
              <ExamResult />
            </PrivateRoute>
          } />

          {/* Catch-all: Redirect unknown pages to login */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;