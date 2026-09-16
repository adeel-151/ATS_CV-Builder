import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md p-10 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl transition-all hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Create Account</h1>
          <p className="text-sm text-slate-500">Join Europass CV Builder today</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@example.com"
              required 
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 font-semibold cursor-pointer hover:underline">Login here</span>
        </div>
      </div>
    </div>
  );
}
