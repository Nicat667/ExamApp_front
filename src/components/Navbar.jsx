// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import Theme Hook
import { User, LogOut, ChevronDown, Settings, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Use Theme Hook
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-900 to-teal-800 dark:from-gray-900 dark:to-gray-800 text-white shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:opacity-90 transition">
          <span className="text-3xl">🎓</span> ExamPortal
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full transition-all border border-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-emerald-900 font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-sm hidden md:block">{user.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 text-gray-800 dark:text-gray-200 transform origin-top-right animate-fade-in-down">
                  
                  {/* User Info Header */}
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                      Student
                    </span>
                  </div>

                  {/* Theme Toggle (NEW) */}
                  <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                      Appearance
                    </span>
                    <button 
                      onClick={toggleTheme}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none flex items-center
                      ${theme === 'dark' ? 'bg-purple-600 justify-end' : 'bg-gray-300 justify-start'}`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform" />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full text-left px-5 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                      <User className="w-4 h-4" /> My Profile
                    </button>
                    <button className="w-full text-left px-5 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2 pb-1">
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
             <div className="flex gap-3">
              <Link to="/login" className="px-5 py-2 text-sm font-bold text-emerald-100 hover:text-white transition">
                Sign In
              </Link>
              <Link to="/register" className="px-5 py-2 text-sm font-bold bg-white text-emerald-900 rounded-full hover:bg-emerald-50 transition shadow-lg">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;