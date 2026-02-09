// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard'; // NEW: Import Admin Dashboard
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
        {/* Navbar stays at the top for both Student and Admin for now */}
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          } />

          {/* NEW: Admin Route */}
          {/* We reuse PrivateRoute for now since we are just testing */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />

          {/* Exam Routes */}
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

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;