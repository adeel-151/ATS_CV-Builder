import { useFormContext } from 'react-hook-form';

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

export function DesignForm() {
  const { register, watch, setValue } = useFormContext();
  
  const currentTemplate = watch('design_template') || 'modern';
  const currentFont = watch('font_family') || 'Inter';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">CV Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TEMPLATES.map(t => (
            <div 
              key={t.id}
              onClick={() => setValue('design_template', t.id, { shouldDirty: true })}
              className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${currentTemplate === t.id ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
            >
              <div className="font-semibold text-slate-800">{t.name}</div>
              <div className="text-xs text-slate-500 mt-1">{t.desc}</div>
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
