import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle, ArrowRight, Loader, Eye, EyeOff, GraduationCap, Briefcase } from 'lucide-react'; // <-- Added GraduationCap and Briefcase
import api from '../../services/api'; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student' // <-- Default role set to STUDENT
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Custom handler for role selection
  const handleRoleChange = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    
    if (!formData.email) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); 
    
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role // <-- Role is now sent to backend
      });

      // Change the success message slightly
      setSuccessMessage("Registration successful! Redirecting to verification...");
      
      // REPLACE THE OLD setTimeout WITH THIS:
      setTimeout(() => {
        // We pass the email in the 'state' so VerifyOtp.jsx knows who is verifying!
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 1500);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Try again.';
      setErrors({ email: errorMessage }); 
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all font-medium bg-gray-50 dark:bg-gray-700 dark:text-white";
    
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 focus:ring-2 focus:ring-red-200`;
    }
    return `${baseClass} border-gray-200 dark:border-gray-600 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 focus:border-emerald-500`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">
        
        {/* Left Side: Branding */}
        <div className="md:w-5/12 bg-gradient-to-br from-emerald-900 to-teal-950 p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
              <span className="text-4xl">🎓</span> ExamPortal
            </h1>
            <p className="text-emerald-100 leading-relaxed text-sm md:text-base">
              Join thousands of students and educators achieving their goals with our advanced testing platform.
            </p>
          </div>
          <div className="space-y-4 mt-8 relative z-10">
            {["Real-time Results", "Performance Analytics", "Secure Testing Environment"].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium opacity-90 bg-black/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="p-1 bg-emerald-500/30 rounded-full shadow-inner"><CheckCircle className="w-4 h-4 text-emerald-300" /></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-10 bg-white dark:bg-gray-800">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Start your journey with us today.</p>
          </div>

          {/* Stylish Success Banner */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3 transition-all animate-pulse shadow-sm">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-emerald-800 dark:text-emerald-200 font-medium text-sm">
                {successMessage}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* NEW: Role Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleChange('Student')}
                  className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-bold ${
                    formData.role === 'Student'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/40 dark:border-emerald-500 dark:text-emerald-300 ring-2 ring-emerald-200 dark:ring-emerald-900'
                      : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('Teacher')}
                  className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-bold ${
                    formData.role === 'Teacher'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/40 dark:border-emerald-500 dark:text-emerald-300 ring-2 ring-emerald-200 dark:ring-emerald-900'
                      : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  Teacher
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Full Name</label>
              <div className="relative">
                <User className={`absolute left-4 top-3.5 w-5 h-5 ${errors.fullName ? 'text-red-500' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName} 
                  autoComplete="off"        
                  className={getInputClass('fullName')}
                  placeholder="John Doe" 
                  onChange={handleChange}
                  disabled={loading}
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
                  value={formData.email}    
                  autoComplete="off"        
                  className={getInputClass('email')}
                  placeholder="user@example.com" 
                  onChange={handleChange}
                  disabled={loading}
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
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}         
                    autoComplete="new-password"       
                    className={`${getInputClass('password')} pr-12`}
                    placeholder="••••••••" 
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-emerald-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 ml-1">Confirm</label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${errors.confirmPassword ? 'text-red-500' : 'text-gray-400'}`} />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}  
                    autoComplete="new-password"       
                    className={`${getInputClass('confirmPassword')} pr-12`}
                    placeholder="••••••••" 
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-emerald-600 focus:outline-none transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || successMessage !== ''}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <div className="text-center mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
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