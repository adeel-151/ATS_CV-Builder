import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, Target, CheckCircle2 } from 'lucide-react';
import { Footer } from '@/components/Footer';

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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Build your perfect</span>{' '}
                <span className="block text-blue-600 xl:inline">resume in minutes</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create a professional, ATS-friendly resume that gets you hired. Choose from our expert-designed templates and export instantly to PDF or XML.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleCreateCV} 
                  disabled={loading}
                  className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95"
                >
                  {loading ? 'Creating...' : 'Create Resume Now'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto text-lg px-8 py-6 rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
                >
                  View Templates
                </Button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden bg-slate-100">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000"
                  alt="Person working on a resume"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold tracking-wider text-blue-600 uppercase">Why choose us</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Everything you need for a winning resume
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">10+ Professional Templates</h3>
              <p className="text-slate-600 leading-relaxed">
                Choose from a curated collection of beautiful, monochromatic templates designed by hiring experts to ensure readability and impact.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ATS-Friendly Design</h3>
              <p className="text-slate-600 leading-relaxed">
                Our templates are optimized to pass through Applicant Tracking Systems, ensuring your resume gets seen by real human recruiters.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Export to PDF & XML</h3>
              <p className="text-slate-600 leading-relaxed">
                Download a pixel-perfect PDF to send directly to employers, or export the raw XML data for Europass compliance and easy portability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Templates */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-luminosity"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
                Three simple steps to success
              </h2>
              <div className="space-y-8 mt-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">1</div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold">Pick a Template</h4>
                    <p className="mt-2 text-slate-400">Select a layout that matches your industry and personal style from our visual grid.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">2</div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold">Fill in your Details</h4>
                    <p className="mt-2 text-slate-400">Use our seamless live-editor to input your experience, education, and skills.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">3</div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold">Download & Apply</h4>
                    <p className="mt-2 text-slate-400">Export your brand new resume instantly as a PDF and start applying with confidence.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0" id="templates">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600" alt="Resume example 1" className="rounded-xl shadow-lg border border-slate-700 opacity-90 hover:opacity-100 transition-opacity" />
                <img src="https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&q=80&w=600" alt="Resume example 2" className="rounded-xl shadow-lg border border-slate-700 mt-8 opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-16">Trusted by professionals worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Software Engineer", review: "The minimalist template helped me land interviews at top tech companies. The ATS optimization really works!" },
              { name: "Michael Chen", role: "Marketing Director", review: "I loved the live preview feature. Being able to see my changes instantly made the formatting process a breeze." },
              { name: "Emily Rodriguez", role: "Recent Graduate", review: "As someone with no design skills, this tool was a lifesaver. My resume looks incredibly professional and clean." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-left">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{t.review}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Ready to upgrade your career?
          </h2>
          <Button 
            onClick={handleCreateCV}
            size="lg"
            className="bg-white text-blue-600 hover:bg-slate-50 px-10 py-6 text-xl rounded-full shadow-xl transition-transform hover:scale-105"
          >
            Create Your Resume
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
