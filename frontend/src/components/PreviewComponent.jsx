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

  // --- 10 TEMPLATES (ALL STRICT BLACK/GRAYSCALE) ---

  const renderClassic = () => (
    <div className="p-12 text-black">
      <div className="border-b-2 border-black pb-6 mb-6 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{fullName}</h1>
        <p className="text-sm">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-4">Experience</h2>
          {renderExperience("mb-4", "font-bold text-lg", "italic text-sm text-gray-700 mb-2", "text-sm whitespace-pre-wrap leading-relaxed")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-4">Education</h2>
          {renderEducation("mb-4", "font-bold text-lg", "italic text-sm text-gray-700")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-4">Skills</h2>
          <div className="text-sm space-y-1">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderModern = () => (
    <div className="p-10 text-black">
      <div className="border-l-4 border-black pl-6 mb-8">
        <h1 className="text-5xl font-extrabold text-black mb-2">{fullName}</h1>
        <p className="text-gray-800 font-medium">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center"><span className="w-8 h-px bg-black mr-4"></span>Work Experience</h2>
          {renderExperience("mb-5 pl-12 relative before:absolute before:left-3 before:top-2 before:w-3 before:h-3 before:bg-white before:rounded-full before:border-2 before:border-black", "font-bold text-lg", "text-sm text-gray-700 font-medium mb-1", "text-sm text-gray-800 whitespace-pre-wrap")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center"><span className="w-8 h-px bg-black mr-4"></span>Education</h2>
          {renderEducation("mb-4 pl-12 relative before:absolute before:left-3 before:top-2 before:w-3 before:h-3 before:bg-white before:rounded-full before:border-2 before:border-black", "font-bold text-lg", "text-sm text-gray-700 font-medium")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center"><span className="w-8 h-px bg-black mr-4"></span>Skills</h2>
          <div className="pl-12 text-sm space-y-2">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderMinimalist = () => (
    <div className="p-14 text-black">
      <div className="mb-12">
        <h1 className="text-3xl font-light tracking-tight mb-2">{fullName}</h1>
        <p className="text-sm text-gray-600">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-10 flex">
          <div className="w-1/4 text-sm font-semibold text-gray-500 uppercase tracking-wider pt-1">Experience</div>
          <div className="w-3/4">{renderExperience("mb-8", "font-medium text-lg", "text-xs text-gray-500 mb-2 uppercase tracking-wide", "text-sm text-gray-800 leading-relaxed whitespace-pre-wrap")}</div>
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-10 flex">
          <div className="w-1/4 text-sm font-semibold text-gray-500 uppercase tracking-wider pt-1">Education</div>
          <div className="w-3/4">{renderEducation("mb-6", "font-medium text-lg", "text-xs text-gray-500 uppercase tracking-wide")}</div>
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-10 flex">
          <div className="w-1/4 text-sm font-semibold text-gray-500 uppercase tracking-wider pt-1">Skills</div>
          <div className="w-3/4 text-sm text-gray-800 space-y-2">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderTwoColumn = () => (
    <div className="flex h-full min-h-[1123px] text-black border-2 border-black">
      <div className="w-1/3 bg-black text-white p-8">
        <h1 className="text-3xl font-bold mb-6">{fullName}</h1>
        <div className="mb-8 text-sm text-gray-300 space-y-2">
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.city && <div>{p.city}, {p.country}</div>}
        </div>
        {sk.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-4 uppercase tracking-wider">Skills</h2>
            <div className="text-sm space-y-3 text-gray-300">{renderSkills("")}</div>
          </div>
        )}
      </div>
      <div className="w-2/3 p-8 bg-white">
        {we.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black border-b-2 border-black pb-2 mb-6">Work Experience</h2>
            {renderExperience("mb-6", "font-bold text-xl", "text-sm font-medium text-gray-700 mb-2", "text-sm text-black whitespace-pre-wrap leading-relaxed")}
          </div>
        )}
        {ed.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black border-b-2 border-black pb-2 mb-6">Education</h2>
            {renderEducation("mb-6", "font-bold text-xl", "text-sm font-medium text-gray-700")}
          </div>
        )}
      </div>
    </div>
  );

  const renderCreative = () => (
    <div className="p-0 text-black h-full">
      <div className="bg-black p-12 text-white text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-4 shadow-sm">{fullName}</h1>
        <p className="text-lg font-medium opacity-90">{contactInfo}</p>
      </div>
      <div className="p-12">
        {we.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-widest border-b-4 border-black pb-2 inline-block">Experience</h2>
            {renderExperience("mb-6 border-l-4 border-black pl-4 mt-4", "font-bold text-xl", "text-sm font-bold text-gray-500 mb-2 uppercase", "text-sm text-gray-800 whitespace-pre-wrap")}
          </div>
        )}
        {ed.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-widest border-b-4 border-black pb-2 inline-block">Education</h2>
            {renderEducation("mb-6 border-l-4 border-black pl-4 mt-4", "font-bold text-xl", "text-sm font-bold text-gray-500 uppercase")}
          </div>
        )}
        {sk.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-widest border-b-4 border-black pb-2 inline-block">Skills</h2>
            <div className="text-sm font-medium space-y-2 mt-4">{renderSkills("")}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfessional = () => (
    <div className="p-12 text-black bg-gray-100 h-full min-h-[1123px]">
      <div className="bg-white p-8 border-t-8 border-black shadow-md mb-8 outline outline-1 outline-gray-300">
        <h1 className="text-4xl font-bold mb-2">{fullName}</h1>
        <p className="text-gray-700 text-sm">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="bg-white p-8 shadow-md mb-6 border-l-4 border-black outline outline-1 outline-gray-300">
          <h2 className="text-lg font-bold uppercase tracking-wider text-black mb-6 border-b border-gray-300 pb-2">Experience</h2>
          {renderExperience("mb-6 last:mb-0", "font-bold text-lg", "text-sm text-gray-600 mb-2 font-medium", "text-sm text-gray-800 whitespace-pre-wrap")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="bg-white p-8 shadow-md mb-6 border-l-4 border-black outline outline-1 outline-gray-300">
          <h2 className="text-lg font-bold uppercase tracking-wider text-black mb-6 border-b border-gray-300 pb-2">Education</h2>
          {renderEducation("mb-4 last:mb-0", "font-bold text-lg", "text-sm text-gray-600 font-medium")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="bg-white p-8 shadow-md mb-6 border-l-4 border-black outline outline-1 outline-gray-300">
          <h2 className="text-lg font-bold uppercase tracking-wider text-black mb-6 border-b border-gray-300 pb-2">Skills</h2>
          <div className="text-sm text-gray-800 space-y-2">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderElegant = () => (
    <div className="p-16 text-black text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-normal tracking-widest uppercase mb-4 border-b border-t border-black py-4">{fullName}</h1>
        <p className="text-sm italic text-gray-600">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-10 text-left">
          <h2 className="text-xl font-normal uppercase tracking-widest text-center mb-8 text-gray-500">Experience</h2>
          {renderExperience("mb-8", "font-semibold text-lg", "text-xs uppercase tracking-wider text-gray-500 mb-3", "text-sm text-black leading-relaxed whitespace-pre-wrap")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-10 text-left">
          <h2 className="text-xl font-normal uppercase tracking-widest text-center mb-8 text-gray-500">Education</h2>
          {renderEducation("mb-6", "font-semibold text-lg", "text-xs uppercase tracking-wider text-gray-500")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-normal uppercase tracking-widest text-center mb-6 text-gray-500">Skills</h2>
          <div className="text-sm text-black space-y-2 inline-block text-left">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderCompact = () => (
    <div className="p-8 text-black leading-tight border-4 border-double border-black m-4">
      <div className="text-center mb-4 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold mb-1 uppercase tracking-tight">{fullName}</h1>
        <p className="text-xs font-bold">{contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase bg-black text-white px-2 py-1 mb-2 inline-block">Experience</h2>
          {we.map((exp, i) => (
            <div key={i} className="mb-2 text-xs">
              <span className="font-bold">{exp.job_title}</span>, {exp.employer} <span className="text-gray-600 italic ml-2">({exp.start_date} - {exp.currently_working ? 'Present' : exp.end_date})</span>
              {exp.activities && <p className="mt-1 whitespace-pre-wrap">{exp.activities}</p>}
            </div>
          ))}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase bg-black text-white px-2 py-1 mb-2 inline-block">Education</h2>
          {ed.map((edu, i) => (
            <div key={i} className="mb-1 text-xs">
              <span className="font-bold">{edu.degree}</span>, {edu.institution} <span className="text-gray-600 italic ml-2">({edu.start_date} - {edu.end_date})</span>
            </div>
          ))}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase bg-black text-white px-2 py-1 mb-2 inline-block">Skills</h2>
          <div className="text-xs grid grid-cols-2 gap-1">{renderSkills("")}</div>
        </div>
      )}
    </div>
  );

  const renderEuropass = () => (
    <div className="p-10 text-black">
      <div className="flex border-b-4 border-black pb-4 mb-6">
        <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-black tracking-wider">Personal Information</div>
        <div className="w-2/3 border-l-4 border-black pl-6">
          <h1 className="text-3xl font-bold mb-2 uppercase">{fullName}</h1>
          <div className="text-sm space-y-1 font-medium">
            {p.email && <div>Email: {p.email}</div>}
            {p.phone && <div>Phone: {p.phone}</div>}
            {p.city && <div>Address: {p.city}, {p.country}</div>}
          </div>
        </div>
      </div>
      {we.length > 0 && (
        <div className="flex mb-6">
          <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-black tracking-wider">Work Experience</div>
          <div className="w-2/3 border-l-4 border-black pl-6 space-y-4">
            {we.map((exp, i) => (
              <div key={i}>
                <div className="font-bold border-b border-gray-300 inline-block mb-1">{exp.start_date} - {exp.currently_working ? 'Present' : exp.end_date}</div>
                <div className="font-bold text-lg mt-1">{exp.job_title}</div>
                <div className="italic text-gray-600">{exp.employer}</div>
                <p className="text-sm mt-1 whitespace-pre-wrap text-black">{exp.activities}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {ed.length > 0 && (
        <div className="flex mb-6">
          <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-black tracking-wider">Education</div>
          <div className="w-2/3 border-l-4 border-black pl-6 space-y-4">
            {ed.map((edu, i) => (
              <div key={i}>
                <div className="font-bold border-b border-gray-300 inline-block mb-1">{edu.start_date} - {edu.end_date}</div>
                <div className="font-bold text-lg mt-1">{edu.degree}</div>
                <div className="italic text-gray-600">{edu.institution}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {sk.length > 0 && (
        <div className="flex mb-6">
          <div className="w-1/3 text-right pr-6 font-bold uppercase text-lg text-black tracking-wider">Skills</div>
          <div className="w-2/3 border-l-4 border-black pl-6 space-y-2 text-sm text-black">
            {renderSkills("")}
          </div>
        </div>
      )}
    </div>
  );

  const renderTech = () => (
    <div className="p-10 bg-black text-white h-full min-h-[1123px] font-mono">
      <div className="border border-white p-8 mb-8 bg-gray-900 shadow-[4px_4px_0_0_#FFF]">
        <h1 className="text-4xl font-bold mb-3">{fullName}</h1>
        <p className="text-sm opacity-80">&gt; {contactInfo}</p>
      </div>
      {we.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white pb-2 inline-block">~/experience</h2>
          {renderExperience("mb-6 border-l-2 border-dashed border-gray-500 pl-4", "font-bold text-lg text-white", "text-sm text-gray-400 mb-2", "text-sm whitespace-pre-wrap text-gray-300")}
        </div>
      )}
      {ed.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white pb-2 inline-block">~/education</h2>
          {renderEducation("mb-4 border-l-2 border-dashed border-gray-500 pl-4", "font-bold text-lg text-white", "text-sm text-gray-400")}
        </div>
      )}
      {sk.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white pb-2 inline-block">~/skills</h2>
          <div className="text-sm space-y-1 text-gray-300 border-l-2 border-dashed border-gray-500 pl-4">{renderSkills("")}</div>
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
      className="bg-white w-[794px] h-min min-h-[1123px] shadow-lg flex flex-col origin-top text-gray-900 transition-all duration-300 mx-auto"
      style={{ fontFamily: `'${font}', sans-serif` }}
    >
      {getTemplate()}
    </div>
  );
}
