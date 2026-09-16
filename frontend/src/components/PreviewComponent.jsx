export function PreviewComponent({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white w-[794px] h-min min-h-[1123px] shadow-lg p-10 flex flex-col scale-75 origin-top text-gray-800">
      <div className="border-b-2 border-blue-900 pb-5 mb-6">
        <h1 className="text-4xl font-bold text-blue-900 m-0">
          {data.profile?.first_name || ''} {data.profile?.last_name || ''}
        </h1>
        <p className="mt-2 text-sm">
          {data.profile?.email && <span>{data.profile.email} | </span>}
          {data.profile?.phone && <span>{data.profile.phone} | </span>}
          {data.profile?.city && <span>{data.profile.city}, {data.profile.country}</span>}
        </p>
      </div>

      {data.work_experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 border-b border-gray-300 pb-1 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {data.work_experience.map((exp, index) => (
              <div key={index}>
                <div className="font-bold text-lg">{exp.job_title} <span className="font-normal text-gray-600">at {exp.employer}</span></div>
                <div className="text-sm italic text-gray-500 mb-1">
                  {exp.start_date} - {exp.end_date || 'Present'} | {exp.city}
                </div>
                <p className="text-sm whitespace-pre-wrap">{exp.activities}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 border-b border-gray-300 pb-1 mb-3">Education and Training</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="font-bold text-lg">{edu.degree}</div>
                <div className="text-sm italic text-gray-500 mb-1">
                  {edu.institution} | {edu.start_date} - {edu.end_date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
