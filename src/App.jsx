import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard'; 
import ExamSetup from './pages/Exam/ExamSetup';
import ExamInterface from './pages/Exam/ExamInterface';
import ExamResult from './pages/Exam/ExamResult';

// Guard to protect student/general routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  // If no user is logged in, kick them back to login
  return user ? children : <Navigate to="/login" replace />;
};

// Guard to protect Admin-only routes
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  // Not logged in? Go to login.
  if (!user) return <Navigate to="/login" replace />;
  
  // Logged in but NOT an Admin? Kick them to the student dashboard.
  if (user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />; 
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar stays at the top for both Student and Admin for now */}
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
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
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;