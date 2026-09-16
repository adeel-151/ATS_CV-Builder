import { useFormContext } from 'react-hook-form';
import { PreviewComponent } from '../PreviewComponent';

export const TEMPLATES = [
  { id: 'classic', name: 'Classic', desc: 'Standard professional format' },
  { id: 'modern', name: 'Modern', desc: 'Clean lines with blue accents' },
  { id: 'minimalist', name: 'Minimalist', desc: 'Elegant with lots of whitespace' },
  { id: 'two-column', name: 'Two-Column', desc: 'Sidebar for personal info' },
  { id: 'creative', name: 'Creative', desc: 'Bold headers and distinct blocks' },
  { id: 'professional', name: 'Professional', desc: 'Corporate look with subtle shading' },
  { id: 'elegant', name: 'Elegant', desc: 'Centered headers, classic feel' },
  { id: 'compact', name: 'Compact', desc: 'Dense layout for max information' },
  { id: 'europass', name: 'Europass', desc: 'Standard EU format block' },
  { id: 'tech', name: 'Tech', desc: 'Monospaced accents for engineering' },
];

export const FONTS = [
  { id: 'Inter', name: 'Inter' },
  { id: 'Roboto', name: 'Roboto' },
  { id: 'Merriweather', name: 'Merriweather' },
  { id: 'Playfair Display', name: 'Playfair Display' },
  { id: 'Fira Code', name: 'Fira Code' },
  { id: 'Montserrat', name: 'Montserrat' },
  { id: 'Open Sans', name: 'Open Sans' },
  { id: 'Lato', name: 'Lato' },
  { id: 'Poppins', name: 'Poppins' },
  { id: 'Raleway', name: 'Raleway' },
];

const DUMMY_DATA = {
  profile: {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 8900',
    city: 'New York',
    country: 'USA'
  },
  work_experience: [
    {
      job_title: 'Senior Developer',
      employer: 'Tech Corp',
      start_date: '2020',
      end_date: '2023',
      activities: 'Led the frontend team.'
    },
    {
      job_title: 'Developer',
      employer: 'Creative Agency',
      start_date: '2018',
      end_date: '2020',
    }
  ],
  education: [
    {
      degree: 'BSc Computer Science',
      institution: 'State University',
      start_date: '2014',
      end_date: '2018'
    }
  ],
  skills: [
    { category: 'Frontend', description: 'React, Tailwind', proficiency: 'Expert' },
    { category: 'Backend', description: 'Node.js', proficiency: 'Advanced' }
  ]
};

export function DesignForm() {
  const { watch, setValue } = useFormContext();
  
  const currentTemplate = watch('design_template') || 'modern';
  const currentFont = watch('font_family') || 'Inter';

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">CV Template</h3>
        <p className="text-sm text-gray-500 mb-4">All templates are professionally themed in grayscale.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TEMPLATES.map(t => (
            <div 
              key={t.id}
              onClick={() => setValue('design_template', t.id, { shouldDirty: true })}
              className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all group bg-white ${currentTemplate === t.id ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-blue-300'}`}
            >
              <div className="relative w-full aspect-[21/29.7] bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* Scale the 794x1123 preview down to fit the container. Container width approx 150px. 150/794 = 0.188 */}
                <div className="absolute top-0 left-0 origin-top-left" style={{ transform: 'scale(0.188)', width: '794px', height: '1123px' }}>
                  <PreviewComponent data={{ ...DUMMY_DATA, design_template: t.id, font_family: currentFont }} />
                </div>
                {currentTemplate === t.id && (
                  <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center pointer-events-none">
                    <span className="bg-blue-600 text-white rounded-full p-1 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3 text-center bg-gray-50 border-t border-gray-100">
                <div className="font-semibold text-sm text-slate-800">{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Typography</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {FONTS.map(f => (
            <div 
              key={f.id}
              onClick={() => setValue('font_family', f.id, { shouldDirty: true })}
              style={{ fontFamily: f.id }}
              className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all ${currentFont === f.id ? 'border-indigo-600 bg-indigo-50/50 shadow-sm text-indigo-900' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'}`}
            >
              <span className="text-sm">{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
