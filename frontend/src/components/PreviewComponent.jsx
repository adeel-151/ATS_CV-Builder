import React, { useEffect } from 'react';

export function PreviewComponent({ data }) {
  if (!data) return null;

  const font = data.font_family || 'Inter';
  const template = data.design_template || 'modern';

  useEffect(() => {
    // Dynamically load Google Font
    const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap`;
    let link = document.getElementById('preview-google-font');
    if (!link) {
      link = document.createElement('link');
      link.id = 'preview-google-font';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = fontUrl;
  }, [font]);

  const p = data.profile || {};
  const we = data.work_experience || [];
  const ed = data.education || [];
  const sk = data.skills || [];

  const fullName = `${p.first_name || ''} ${p.last_name || ''}`.trim();
  const contactInfo = [p.email, p.phone, p.city ? `${p.city}, ${p.country}` : ''].filter(Boolean).join(' | ');

  // Helpers
  const renderExperience = (itemClass, titleClass, metaClass, descClass) => we.map((exp, i) => (
    <div key={i} className={itemClass}>
      <div className={titleClass}>{exp.job_title} {exp.employer && <span className="font-normal opacity-80">at {exp.employer}</span>}</div>
      <div className={metaClass}>{exp.start_date} - {exp.currently_working ? 'Present' : exp.end_date} {exp.city && `| ${exp.city}`}</div>
      {exp.activities && <p className={descClass}>{exp.activities}</p>}
    </div>
  ));

  const renderEducation = (itemClass, titleClass, metaClass) => ed.map((edu, i) => (
    <div key={i} className={itemClass}>
      <div className={titleClass}>{edu.degree}</div>
      <div className={metaClass}>{edu.institution} | {edu.start_date} - {edu.end_date}</div>
    </div>
  ));

  const renderSkills = (itemClass) => sk.map((skill, i) => (
    <div key={i} className={itemClass}>
      <strong>{skill.category}:</strong> {skill.description} ({skill.proficiency})
    </div>
  ));

  // --- 10 TEMPLATES ---

  const renderClassic = () => (
    <div className="p-12 text-slate-900">
      <div className="border-b-2 border-slate-800 pb-6 mb-6 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{fullName}</h1>
        <p className="text-sm">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Experience</h2>
          {renderExperience("mb-4", "font-bold text-lg", "italic text-sm text-slate-600 mb-2", "text-sm whitespace-pre-wrap leading-relaxed")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Education</h2>
          {renderEducation("mb-4", "font-bold text-lg", "italic text-sm text-slate-600")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Skills</h2>
          <div className="text-sm space-y-1">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderModern = () => (
    <div className="p-10 text-slate-800">
      <div className="border-l-4 border-blue-600 pl-6 mb-8">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-2">{fullName}</h1>
        <p className="text-blue-700 font-medium">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center"><span className="w-8 h-px bg-blue-300 mr-4"></span>Work Experience</h2>
          {renderExperience("mb-5 pl-12 relative before:absolute before:left-3 before:top-2 before:w-3 before:h-3 before:bg-blue-200 before:rounded-full before:border-2 before:border-blue-600", "font-bold text-lg", "text-sm text-blue-600 font-medium mb-1", "text-sm text-slate-600 whitespace-pre-wrap")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center"><span className="w-8 h-px bg-blue-300 mr-4"></span>Education</h2>
          {renderEducation("mb-4 pl-12 relative before:absolute before:left-3 before:top-2 before:w-3 before:h-3 before:bg-blue-200 before:rounded-full before:border-2 before:border-blue-600", "font-bold text-lg", "text-sm text-blue-600 font-medium")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center"><span className="w-8 h-px bg-blue-300 mr-4"></span>Skills</h2>
          <div className="pl-12 text-sm space-y-2">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderMinimalist = () => (
    <div className="p-14 text-gray-800">
      <div className="mb-12">
        <h1 className="text-3xl font-light tracking-tight mb-2">{fullName}</h1>
        <p className="text-sm text-gray-500">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-10 flex">
          <div className="w-1/4 text-sm font-semibold text-gray-400 uppercase tracking-wider pt-1">Experience</div>
          <div className="w-3/4">{renderExperience("mb-8", "font-medium text-lg", "text-xs text-gray-400 mb-2 uppercase tracking-wide", "text-sm text-gray-600 leading-relaxed whitespace-pre-wrap")}</div>
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-10 flex">
          <div className="w-1/4 text-sm font-semibold text-gray-400 uppercase tracking-wider pt-1">Education</div>
          <div className="w-3/4">{renderEducation("mb-6", "font-medium text-lg", "text-xs text-gray-400 uppercase tracking-wide")}</div>
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-10 flex">
          <div className="w-1/4 text-sm font-semibold text-gray-400 uppercase tracking-wider pt-1">Skills</div>
          <div className="w-3/4 text-sm text-gray-600 space-y-2">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderTwoColumn = () => (
    <div className="flex h-full min-h-[1123px] text-slate-800">
      <div className="w-1/3 bg-slate-800 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">{fullName}</h1>
        <div className="mb-8 text-sm text-slate-300 space-y-2">
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.city && <div>{p.city}, {p.country}</div>}
        </div>
        {sk.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-slate-600 pb-2 mb-4 uppercase tracking-wider">Skills</h2>
            <div className="text-sm space-y-3 text-slate-300">{renderSkills("")}</div>
          </div>
        )}
      </div>
      <div className="w-2/3 p-8 bg-white">
        {we.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6">Work Experience</h2>
            {renderExperience("mb-6", "font-bold text-xl", "text-sm font-medium text-blue-600 mb-2", "text-sm text-slate-600 whitespace-pre-wrap leading-relaxed")}
          </div>
        )}
        {ed.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6">Education</h2>
            {renderEducation("mb-6", "font-bold text-xl", "text-sm font-medium text-blue-600")}
          </div>
        )}
      </div>
    </div>
  );

  const renderCreative = () => (
    <div className="p-0 text-slate-800 h-full">
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-12 text-white">
        <h1 className="text-5xl font-black tracking-tighter mb-4 shadow-sm">{fullName}</h1>
        <p className="text-lg font-medium opacity-90">{contactInfo}</p>
      </div>
      <div className="p-12">
        {we.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-amber-600 mb-6 uppercase tracking-widest">Experience</h2>
            {renderExperience("mb-6 border-l-4 border-amber-200 pl-4", "font-bold text-xl", "text-sm font-bold text-slate-400 mb-2 uppercase", "text-sm text-slate-600 whitespace-pre-wrap")}
          </div>
        )}
        {ed.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-amber-600 mb-6 uppercase tracking-widest">Education</h2>
            {renderEducation("mb-6 border-l-4 border-amber-200 pl-4", "font-bold text-xl", "text-sm font-bold text-slate-400 uppercase")}
          </div>
        )}
        {sk.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-amber-600 mb-6 uppercase tracking-widest">Skills</h2>
            <div className="text-sm font-medium space-y-2">{renderSkills("")}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfessional = () => (
    <div className="p-12 text-gray-900 bg-gray-50 h-full min-h-[1123px]">
      <div className="bg-white p-8 border-t-8 border-gray-800 shadow-sm mb-8">
        <h1 className="text-4xl font-bold mb-2">{fullName}</h1>
        <p className="text-gray-600 text-sm">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="bg-white p-8 shadow-sm mb-6 border-l-4 border-gray-300">
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 mb-6 border-b border-gray-200 pb-2">Experience</h2>
          {renderExperience("mb-6 last:mb-0", "font-bold text-lg", "text-sm text-gray-500 mb-2 font-medium", "text-sm text-gray-600 whitespace-pre-wrap")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="bg-white p-8 shadow-sm mb-6 border-l-4 border-gray-300">
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 mb-6 border-b border-gray-200 pb-2">Education</h2>
          {renderEducation("mb-4 last:mb-0", "font-bold text-lg", "text-sm text-gray-500 font-medium")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="bg-white p-8 shadow-sm mb-6 border-l-4 border-gray-300">
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 mb-6 border-b border-gray-200 pb-2">Skills</h2>
          <div className="text-sm text-gray-700 space-y-2">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderElegant = () => (
    <div className="p-16 text-stone-800 text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-normal tracking-widest uppercase mb-4 border-b border-t border-stone-300 py-4">{fullName}</h1>
        <p className="text-sm italic text-stone-500">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-10 text-left">
          <h2 className="text-xl font-normal uppercase tracking-widest text-center mb-8 text-stone-400">Experience</h2>
          {renderExperience("mb-8", "font-semibold text-lg", "text-xs uppercase tracking-wider text-stone-400 mb-3", "text-sm text-stone-600 leading-relaxed whitespace-pre-wrap")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-10 text-left">
          <h2 className="text-xl font-normal uppercase tracking-widest text-center mb-8 text-stone-400">Education</h2>
          {renderEducation("mb-6", "font-semibold text-lg", "text-xs uppercase tracking-wider text-stone-400")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-normal uppercase tracking-widest text-center mb-6 text-stone-400">Skills</h2>
          <div className="text-sm text-stone-600 space-y-2 inline-block text-left">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderCompact = () => (
    <div className="p-8 text-slate-900 leading-tight">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-1">{fullName}</h1>
        <p className="text-xs">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase bg-slate-200 px-2 py-1 mb-2">Experience</h2>
          {we.map((exp, i) => (
            <div key={i} className="mb-2 text-xs">
              <span className="font-bold">{exp.job_title}</span>, {exp.employer} <span className="text-slate-500 italic ml-2">({exp.start_date} - {exp.currently_working ? 'Present' : exp.end_date})</span>
              {exp.activities && <p className="mt-1 whitespace-pre-wrap">{exp.activities}</p>}
            </div>
          ))}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase bg-slate-200 px-2 py-1 mb-2">Education</h2>
          {ed.map((edu, i) => (
            <div key={i} className="mb-1 text-xs">
              <span className="font-bold">{edu.degree}</span>, {edu.institution} <span className="text-slate-500 italic ml-2">({edu.start_date} - {edu.end_date})</span>
            </div>
          ))}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase bg-slate-200 px-2 py-1 mb-2">Skills</h2>
          <div className="text-xs grid grid-cols-2 gap-1">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderEuropass = () => (
    <div className="p-10 text-blue-900">
      <div className="flex border-b-2 border-blue-900 pb-4 mb-6">
        <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-blue-600">Personal Information</div>
        <div className="w-2/3 border-l-2 border-blue-900 pl-6">
          <h1 className="text-2xl font-bold mb-2">{fullName}</h1>
          <div className="text-sm space-y-1">
            {p.email && <div>Email: {p.email}</div>}
            {p.phone && <div>Phone: {p.phone}</div>}
            {p.city && <div>Address: {p.city}, {p.country}</div>}
          </div>
        </div>
      </div>
      {we.length > 0 && (
        <div className="flex mb-6">
          <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-blue-600">Work Experience</div>
          <div className="w-2/3 border-l-2 border-blue-900 pl-6 space-y-4">
            {we.map((exp, i) => (
              <div key={i}>
                <div className="font-bold">{exp.start_date} - {exp.currently_working ? 'Present' : exp.end_date}</div>
                <div className="font-bold mt-1">{exp.job_title}</div>
                <div className="italic">{exp.employer}</div>
                <p className="text-sm mt-1 whitespace-pre-wrap text-slate-700">{exp.activities}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {ed.length > 0 && (
        <div className="flex mb-6">
          <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-blue-600">Education</div>
          <div className="w-2/3 border-l-2 border-blue-900 pl-6 space-y-4">
            {ed.map((edu, i) => (
              <div key={i}>
                <div className="font-bold">{edu.start_date} - {edu.end_date}</div>
                <div className="font-bold mt-1">{edu.degree}</div>
                <div className="italic">{edu.institution}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {sk.length > 0 && (
        <div className="flex mb-6">
          <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-blue-600">Skills</div>
          <div className="w-2/3 border-l-2 border-blue-900 pl-6 space-y-2 text-sm text-slate-800">
            {renderSkills("")}
          </div>
        </div>
      )}
    </div>
  );

  const renderTech = () => (
    <div className="p-10 bg-slate-900 text-green-400 h-full min-h-[1123px]">
      <div className="border border-green-500/30 p-8 mb-8 bg-slate-800/50">
        <h1 className="text-4xl font-bold mb-3 text-green-300">{fullName}</h1>
        <p className="text-sm opacity-80">&gt; {contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-300 border-b border-green-500/30 pb-2">~/experience</h2>
          {renderExperience("mb-6", "font-bold text-lg text-green-200", "text-sm text-green-500/80 mb-2", "text-sm whitespace-pre-wrap text-slate-300")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-300 border-b border-green-500/30 pb-2">~/education</h2>
          {renderEducation("mb-4", "font-bold text-lg text-green-200", "text-sm text-green-500/80")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-300 border-b border-green-500/30 pb-2">~/skills</h2>
          <div className="text-sm space-y-1 text-slate-300">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const getTemplate = () => {
    switch (template) {
      case 'classic': return renderClassic();
      case 'modern': return renderModern();
      case 'minimalist': return renderMinimalist();
      case 'two-column': return renderTwoColumn();
      case 'creative': return renderCreative();
      case 'professional': return renderProfessional();
      case 'elegant': return renderElegant();
      case 'compact': return renderCompact();
      case 'europass': return renderEuropass();
      case 'tech': return renderTech();
      default: return renderModern();
    }
  };

  return (
    <div 
      className="bg-white w-[794px] h-min min-h-[1123px] shadow-lg flex flex-col scale-75 origin-top text-gray-800 transition-all duration-300"
      style={{ fontFamily: `'${font}', sans-serif` }}
    >
      {getTemplate()}
    </div>
  );
}
