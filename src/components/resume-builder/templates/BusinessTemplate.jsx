import React from 'react';

export const BusinessTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="font-sans text-sm text-gray-900 bg-white">
      {/* Header */}
      <div className="border-b-4 border-gray-800 pb-6 mb-6 p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            {data.personalInfo.email && <div className="mb-1"><strong>Email:</strong> {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div className="mb-1"><strong>Phone:</strong> {data.personalInfo.phone}</div>}
          </div>
          <div>
            {data.personalInfo.location && <div className="mb-1"><strong>Location:</strong> {data.personalInfo.location}</div>}
            {data.personalInfo.linkedIn && <div className="mb-1"><strong>LinkedIn:</strong> {data.personalInfo.linkedIn}</div>}
          </div>
          <div>
            {data.personalInfo.website && <div className="mb-1"><strong>Website:</strong> {data.personalInfo.website}</div>}
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-1">
              Executive Summary
            </h2>
            <p className="text-justify leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-1">
              Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 border-l-2 border-gray-200 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <p className="text-gray-700 font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm bg-gray-100 px-3 py-1 rounded">
                    <strong>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</strong>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-800">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-2 flex items-start">
                        <span className="text-gray-400 mr-3 mt-1">▪</span>
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Core Competencies */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-1">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <h3 className="font-bold text-gray-700 mb-2 border-b border-gray-200 pb-1">
                    {skill.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-1">
                    {skill.items.map((item, index) => (
                      <div key={index} className="text-sm py-1">
                        • {item}
                      </div>
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
              <h2 className="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-1">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-gray-50 p-4 rounded">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.field}</p>
                  <p className="font-semibold text-sm">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    {edu.gpa && <span className="text-gray-600">GPA: {edu.gpa}</span>}
                    <span className="text-gray-600">
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
              <h2 className="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-1">
                Professional Certifications
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-4 bg-gray-50 p-4 rounded">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="text-gray-700">{cert.issuer}</p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-600">{formatDate(cert.date)}</span>
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
            <h2 className="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-1">
              Key Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-blue-600 truncate max-w-40">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Technologies:</strong> {project.technologies}
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
