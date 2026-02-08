// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    console.log("Registered:", formData);
    alert("Registration Successful! Please Login.");
    navigate('/login');
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">
        
        {/* Left Side: Visual / Branding (Remains dark/emerald for contrast) */}
        <div className="md:w-5/12 bg-gradient-to-br from-emerald-900 to-teal-950 p-10 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
              <span className="text-4xl">🎓</span> ExamPortal
            </h1>
            <p className="text-emerald-100 leading-relaxed">
              Join thousands of students achieving their goals with our advanced testing platform.
            </p>
          </div>

          <div className="space-y-4 mt-8 relative z-10">
            {[
              "Real-time Results",
              "Performance Analytics",
              "Secure Testing Environment"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium opacity-90">
                <div className="p-1 bg-emerald-500/20 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-10 bg-white dark:bg-gray-800">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Start your journey with us today.</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-bold mb-6 border border-red-100 dark:border-red-800 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  name="fullName"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 focus:border-emerald-500 outline-none transition-all font-medium" 
                  placeholder="John Doe" 
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  name="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 focus:border-emerald-500 outline-none transition-all font-medium" 
                  placeholder="student@example.com" 
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input 
                    type="password" 
                    name="password"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 focus:border-emerald-500 outline-none transition-all font-medium" 
                    placeholder="••••••••" 
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 focus:border-emerald-500 outline-none transition-all font-medium" 
                    placeholder="••••••••" 
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2 mt-4">
              Create Account <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;