import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; 
import { User, LogOut, ChevronDown, Settings, Moon, Sun, Bell, Check, X, AlertCircle, CheckCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); 
  const navigate = useNavigate();
  
  // Separate states for Profile and Notification dropdowns
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // MOCK NOTIFICATIONS DATA
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Exam Graded", text: "You scored 92% in Mathematics 101.", time: "2 min ago", read: false, type: 'success' },
    { id: 2, title: "System Update", text: "Maintenance scheduled for 12:00 AM.", time: "1 hour ago", read: false, type: 'alert' },
    { id: 3, title: "Welcome!", text: "Thanks for joining ExamPortal.", time: "1 day ago", read: true, type: 'info' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-900 to-teal-800 dark:from-gray-900 dark:to-gray-800 text-white shadow-md sticky top-0 z-50 transition-colors duration-300">
      
      <div className="w-full px-4 md:px-8 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:opacity-90 transition">
          <span className="text-3xl">🎓</span> 
          <span className="hidden md:inline">ExamPortal</span>
        </Link>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {user ? (
            <>
              {/* --- 1. NOTIFICATION BELL --- */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                  className="relative p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
                >
                  <Bell className="w-6 h-6 text-emerald-100" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 border-2 border-emerald-900 rounded-full flex items-center justify-center text-[9px] font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transform origin-top-right animate-fade-in-down z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-700/50">
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                          Mark all read
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} className={`px-4 py-3 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notif.read ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}>
                            <div className="flex gap-3">
                              <div className={`mt-1 p-1.5 rounded-full h-fit shrink-0 
                                ${notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                                  notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                {notif.type === 'success' ? <CheckCircle className="w-3.5 h-3.5"/> : 
                                 notif.type === 'alert' ? <AlertCircle className="w-3.5 h-3.5"/> : <Bell className="w-3.5 h-3.5"/>}
                              </div>
                              <div>
                                <p className={`text-sm font-semibold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                  {notif.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{notif.text}</p>
                                <p className="text-[10px] text-gray-400 mt-1 font-medium">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="p-2 text-center border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <button className="text-xs font-bold text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                        View All Activity
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* --- 2. USER PROFILE DROPDOWN --- */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-2 pl-2 pr-3 py-1.5 rounded-full transition-all border border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-emerald-900 font-bold text-sm shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-sm hidden md:block max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 text-gray-800 dark:text-gray-200 transform origin-top-right animate-fade-in-down z-50">
                    
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                        {user?.role || 'STUDENT'} 
                      </span>
                    </div>

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

                    <div className="py-2">
                      <button className="w-full text-left px-5 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                        <User className="w-4 h-4" /> My Profile
                      </button>
                      <button className="w-full text-left px-5 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                      </button>
                    </div>

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
            </>
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