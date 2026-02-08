// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import ExamSetup from './pages/Exam/ExamSetup';
import ExamInterface from './pages/Exam/ExamInterface';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exam/setup" element={<ExamSetup />} />
          <Route path="/exam/live" element={<ExamInterface />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;