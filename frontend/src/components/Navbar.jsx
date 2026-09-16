import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function Navbar() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all">
              Europass<span className="font-light text-slate-800">Builder</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#templates" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Templates</a>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How it Works</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={toggleLanguage} className="rounded-full px-6 font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50">
              {i18n.language === 'en' ? 'اردو' : 'English'}
            </Button>
            <Button onClick={() => navigate('/')} className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200/50">
              Build Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" className="text-slate-600">
              <Menu className="h-6 w-6" />
            </Button>
          </div>

        </div>
      </div>
    </nav>
  );
}
