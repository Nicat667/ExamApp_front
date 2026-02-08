// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // CHANGED: Blue -> Emerald Gradient
    <nav className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          <span>🎓</span> ExamPortal
        </Link>
        <div className="space-x-6 text-sm font-medium">
          {user ? (
            <div className="flex items-center gap-6">
              <span className="opacity-90 hover:opacity-100 transition">Hello, {user.name}</span>
              <button 
                onClick={handleLogout} 
                className="bg-white/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-emerald-800 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-full transition shadow-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;