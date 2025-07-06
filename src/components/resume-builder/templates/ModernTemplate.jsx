import React from 'react';

export const ModernTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="font-sans text-sm leading-relaxed text-gray-800 bg-white">
      {/* Header */}
      <div className="bg-slate-700 text-white p-8">
        <h1 className="text-4xl font-light mb-3">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            {data.personalInfo.email && <p>📧 {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>📱 {data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
          </div>
          <div>
            {data.personalInfo.linkedIn && <p>💼 {data.personalInfo.linkedIn}</p>}
            {data.personalInfo.website && <p>🌐 {data.personalInfo.website}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-slate-700 border-l-4 border-slate-700 pl-3">
              About Me
            </h2>
            <p className="text-justify leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-700 border-l-4 border-slate-700 pl-3">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {index > 0 && <div className="absolute -top-3 left-4 w-px h-6 bg-slate-300"></div>}
                  <div className="flex">
                    <div className="flex-shrink-0 w-2 h-2 bg-slate-700 rounded-full mt-2 mr-4"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{exp.position}</h3>
                          <p className="text-slate-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm bg-slate-100 px-3 py-1 rounded">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-gray-700">
                          {exp.description.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex} className="mb-1 flex items-start">
                              <span className="text-slate-400 mr-2">▶</span>
                              <span>{line}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-700 border-l-4 border-slate-700 pl-3">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700 mb-2">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, index) => (
                      <span 
                        key={index} 
                        className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-slate-700 border-l-4 border-slate-700 pl-3">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-slate-600">{edu.field}</p>
                  <p className="font-medium text-sm">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-2">
                    {edu.gpa && <span className="text-sm text-slate-600">GPA: {edu.gpa}</span>}
                    <span className="text-sm text-slate-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-slate-700 border-l-4 border-slate-700 pl-3">
                Certifications
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-4 bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-slate-600">{cert.issuer}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">{formatDate(cert.date)}</span>
                    {cert.link && (
                      <span className="text-xs text-blue-600 truncate max-w-32">{cert.link}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-700 border-l-4 border-slate-700 pl-3">
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-blue-600 truncate max-w-40">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">Tech:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && <p className="text-sm">{project.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
