// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockUser = { name: "Student", email: email, role: "USER" };
    login(mockUser, "fake-jwt-token");
    navigate('/dashboard'); 
  };

  return (
    // Added dark:bg-gray-900
    <div className="flex justify-center items-center h-[85vh] bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-6">
      
      {/* Container: Added dark:bg-gray-800 and dark:border-gray-700 */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700 transition-all"
      >
        <div className="text-center mb-8">
          {/* Text: Added dark:text-white and dark:text-gray-400 */}
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">Please enter your details to sign in</p>
        </div>
        
        <div className="space-y-6">
          {/* Email Input Group */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                type="email" 
                placeholder="student@example.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* Password Input Group */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                type="password" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>
          
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center gap-2">
            Sign In <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;