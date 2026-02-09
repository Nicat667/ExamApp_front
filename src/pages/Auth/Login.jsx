import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (setter, field, value) => {
    setter(value);
    // Clear specific field error
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    // Clear the bottom "Invalid credentials" error
    if (errors.auth) setErrors(prev => ({ ...prev, auth: '' }));
  };

  const validate = () => {
    const newErrors = {};
    // 1. Email Format Check
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Incorrect email format'; 
    }
    // 2. Password Empty Check
    if (!password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // 1. Run Validation
    const formErrors = validate();

    // IF VALIDATION FAILS (Wrong Format/Empty), STOP HERE.
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }

    setLoading(true);

    // 2. Simulated Network Request
    setTimeout(async () => {
      try {
        if (email === 'admin@admin.com' && password === 'admin123') {
          const adminUser = { name: "Administrator", email: email, role: "ADMIN" };
          await login(adminUser); 
          navigate('/admin/dashboard'); 
        } 
        else if (email === 'student@example.com' && password === 'student123') {
          const studentUser = { name: "Student User", email: email, role: "USER" };
          await login(studentUser);
          navigate('/dashboard'); 
        }
        else {
          // Credentials wrong (but format was correct)
          setErrors({ auth: 'Invalid email or password' });
        }
      } catch (err) {
        setErrors({ auth: 'An unexpected error occurred.' });
      } finally {
        setLoading(false);
      }
    }, 800); 
  };

  // --- FIXED CSS CLASS LOGIC ---
  // 1. Background is ALWAYS 'bg-gray-50' (light mode) or 'bg-gray-700' (dark mode).
  // 2. Only the BORDER changes color on error.
  const getInputClass = (fieldError) => `
    w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all
    bg-gray-50 dark:bg-gray-700 dark:text-white
    ${fieldError || errors.auth
      ? 'border-red-500 focus:ring-2 focus:ring-red-200 text-red-900 dark:text-red-100 placeholder-red-300' 
      : 'border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
    }
  `;

  return (
    // Changed h-[85vh] to min-h-screen to fix "shorter" issue
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-6 py-12">
      
      <form 
        onSubmit={handleSubmit} 
        noValidate 
        className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700 transition-all"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">Please enter your details to sign in</p>
        </div>
        
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${errors.email || errors.auth ? 'text-red-500' : 'text-gray-400'}`} />
              <input 
                className={getInputClass(errors.email)}
                type="email" 
                placeholder="student@example.com" 
                value={email} 
                onChange={(e) => handleChange(setEmail, 'email', e.target.value)} 
              />
            </div>
            {/* Field Error: Only format/empty errors */}
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium animate-pulse">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${errors.password || errors.auth ? 'text-red-500' : 'text-gray-400'}`} />
              <input 
                className={getInputClass(errors.password)}
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => handleChange(setPassword, 'password', e.target.value)}
              />
            </div>
            {/* Field Error: Only empty errors */}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium animate-pulse">
                {errors.password}
              </p>
            )}
          </div>
          
          {/* --- BOTTOM ERROR (Invalid Credentials) --- */}
          {errors.auth && (
            <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-bold animate-pulse pt-2">
              <AlertCircle className="w-4 h-4" />
              {errors.auth}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
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