import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://ats-cv-builder.onrender.com/api';
      await axios.post(`${apiUrl}/auth/register`, { fullName, email, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 p-4">
      <div className="w-full max-w-md p-8 sm:p-10 bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Create Account</h1>
          <p className="text-sm text-slate-500">Join Europass CV Builder today</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 rounded-xl text-sm text-center animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5 relative">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm placeholder:text-slate-400 text-slate-800 font-medium" 
                value={fullName} 
                onChange={e => setFullName(e.target.value)} 
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div className="space-y-1.5 relative">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm placeholder:text-slate-400 text-slate-800 font-medium" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-1.5 relative">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm placeholder:text-slate-400 text-slate-800 font-medium" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-1.5 relative pb-2">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm placeholder:text-slate-400 text-slate-800 font-medium" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="group w-full flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md hover:bg-slate-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Sign Up
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')} 
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}
