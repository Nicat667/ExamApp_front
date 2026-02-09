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
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    
    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email format";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log("Registered:", formData);
    alert("Registration Successful! Please Login.");
    navigate('/login');
  };

  // --- STYLE FIX ---
  // Background is strictly 'bg-gray-50' (light) / 'bg-gray-700' (dark).
  // It will NOT turn white on error or focus.
  const getInputClass = (fieldName) => {
    const baseClass = "w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all font-medium bg-gray-50 dark:bg-gray-700 dark:text-white";
    
    if (errors[fieldName]) {
      // Error: Red Border, Background stays Gray
      return `${baseClass} border-red-500 focus:ring-2 focus:ring-red-200`;
    }
    // Normal: Gray Border, Background stays Gray
    return `${baseClass} border-gray-200 dark:border-gray-600 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 focus:border-emerald-500`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">
        
        {/* Left Side: Branding */}
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
            {["Real-time Results", "Performance Analytics", "Secure Testing Environment"].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium opacity-90">
                <div className="p-1 bg-emerald-500/20 rounded-full"><CheckCircle className="w-4 h-4 text-emerald-300" /></div>
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

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Full Name</label>
              <div className="relative">
                <User className={`absolute left-4 top-3.5 w-5 h-5 ${errors.fullName ? 'text-red-500' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  name="fullName"
                  className={getInputClass('fullName')}
                  placeholder="John Doe" 
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Email Address</label>
              <div className="relative">
                <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${errors.email ? 'text-red-500' : 'text-gray-400'}`} />
                <input 
                  type="email" 
                  name="email"
                  className={getInputClass('email')}
                  placeholder="student@example.com" 
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Password</label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
                  <input 
                    type="password" 
                    name="password"
                    className={getInputClass('password')}
                    placeholder="••••••••" 
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Confirm</label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${errors.confirmPassword ? 'text-red-500' : 'text-gray-400'}`} />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    className={getInputClass('confirmPassword')}
                    placeholder="••••••••" 
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.confirmPassword}</p>}
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