import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="w-full bg-white/70 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Europass<span className="font-light">Builder</span>
            </span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" onClick={toggleLanguage} className="rounded-full px-6 font-semibold">
              {i18n.language === 'en' ? 'اردو' : 'English'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
