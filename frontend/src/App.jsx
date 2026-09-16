import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import { Navbar } from './components/Navbar';

function App() {
  const { i18n } = useTranslation();

  // Handle RTL for Urdu
  useEffect(() => {
    document.dir = i18n.language === 'ur' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans antialiased text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder/:id" element={<Builder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
