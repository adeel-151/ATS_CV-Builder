import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [cvs, setCvs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/cv`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCvs(res.data);
      } catch (error) {
        console.error('Failed to fetch CVs', error);
      }
    };
    fetchCvs();
  }, [navigate]);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-10 text-center md:text-start">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Your CV Dashboard</h1>
        <p className="text-slate-500 text-lg">Manage, edit, and export your professional Europass CVs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cvs.map(cv => (
          <div key={cv._id} className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden" onClick={() => navigate(`/builder/${cv._id}`)}>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <h2 className="text-xl font-bold text-slate-800 mb-3 truncate">{cv.title || 'Untitled CV'}</h2>
            <div className="flex items-center text-sm text-slate-500">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-semibold mr-2">{cv.locale.toUpperCase()}</span>
              <span>Updated {new Date(cv.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}

        <div 
          className="group relative bg-slate-50/50 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all min-h-[160px]"
          onClick={async () => {
             const token = localStorage.getItem('token');
             const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
             const res = await axios.post(`${apiUrl}/cv`, { title: 'New Europass CV' }, { headers: { Authorization: `Bearer ${token}` } });
             navigate(`/builder/${res.data._id}`);
          }}
        >
          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 text-2xl mb-3 group-hover:scale-110 transition-transform">
            +
          </div>
          <span className="text-lg font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">Create New CV</span>
        </div>
      </div>
    </div>
  );
}
