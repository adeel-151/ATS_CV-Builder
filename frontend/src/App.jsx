import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Home from './pages/Home';
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
          <Route path="/" element={<Home />} />
          <Route path="/builder/:id" element={<Builder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
