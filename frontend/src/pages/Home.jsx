import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://ats-cv-builder.onrender.com/api';

  const handleCreateCV = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/cv`, {
        title: 'My New CV',
      });
      navigate(`/builder/${res.data._id}`);
    } catch (error) {
      console.error('Failed to create CV:', error);
      alert('Something went wrong creating your CV.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight leading-tight">
          Build Your Perfect CV <br /> in Minutes
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Create professional, ATS-friendly resumes with 10 beautiful templates and typography options. No sign-up required.
        </p>

        <div className="pt-8">
          <Button 
            onClick={handleCreateCV} 
            disabled={loading}
            className="text-lg px-10 py-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95"
          >
            {loading ? 'Creating...' : 'Go to CV Editor 🚀'}
          </Button>
        </div>

        <div className="pt-12 grid grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 max-w-md mx-auto">
          {/* Decorative icons or trusted brands could go here, for now just decorative dots */}
          <div className="h-2 w-full rounded bg-blue-200"></div>
          <div className="h-2 w-full rounded bg-indigo-200"></div>
          <div className="h-2 w-full rounded bg-blue-200"></div>
        </div>
      </div>
    </div>
  );
}
