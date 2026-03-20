import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader, ShieldCheck, RefreshCw } from 'lucide-react';
import api from '../../services/api';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // --- Resend State ---
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 seconds cooldown
  const [resendMessage, setResendMessage] = useState('');

  // Security check: Redirect if no email is found
  useEffect(() => {
    if (!email) {
      navigate('/register', { replace: true });
    }
  }, [email, navigate]);

  // --- Countdown Timer Logic ---
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setResendMessage('');

    if (otp.length !== 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/verify-otp', {
        email: email,
        code: otp
      });

      setSuccess(response.data.message || "Email verified successfully!");
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Resend Function ---
  const handleResend = async () => {
    setError('');
    setSuccess('');
    setResendMessage('');
    setIsResending(true);

    try {
      await api.post('/auth/resend-otp', { email: email });
      setResendMessage('A new code has been sent to your email.');
      setResendTimer(60); // Reset the 60-second cooldown
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">
        
        <div className="text-center mb-8">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">Verify Email</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            We sent a 6-digit code to <br/>
            <span className="font-bold text-gray-700 dark:text-gray-300">{email}</span>
          </p>
        </div>

        {/* Success / Resend Messages */}
        {(success || resendMessage) && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3 animate-pulse">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-800 dark:text-emerald-200 font-medium text-sm">{success || resendMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="text" 
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} 
              className={`w-full text-center text-3xl tracking-[0.5em] font-bold py-4 rounded-xl border outline-none transition-all bg-gray-50 dark:bg-gray-700 dark:text-white ${
                error ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 dark:border-gray-600 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 focus:border-emerald-500'
              }`}
              placeholder="000000"
              disabled={loading || success !== ''}
            />
            {error && <p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading || success !== '' || otp.length !== 6}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <>Verify Account <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        {/* --- Resend OTP Section --- */}
        <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-700 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0 || isResending || success !== ''}
            className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center justify-center gap-2 mx-auto disabled:text-gray-400 disabled:dark:text-gray-500 transition-colors hover:text-emerald-700"
          >
            {isResending ? <Loader className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {resendTimer > 0 ? `Resend available in ${resendTimer}s` : 'Resend Code'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifyOtp;