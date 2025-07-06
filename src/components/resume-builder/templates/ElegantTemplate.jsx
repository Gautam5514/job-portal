import React from 'react';

export const ElegantTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="font-serif text-gray-800 bg-white">
      {/* Header */}
      <div className="text-center py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <h1 className="text-5xl font-light mb-4 tracking-wide">{data.personalInfo.fullName}</h1>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>|</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>|</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-600 mt-2">
          {data.personalInfo.linkedIn && <span>{data.personalInfo.linkedIn}</span>}
          {data.personalInfo.website && <span>|</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-10 text-center">
            <div className="w-24 h-px bg-gray-400 mx-auto mb-6"></div>
            <p className="text-lg leading-relaxed italic text-gray-700 max-w-3xl mx-auto">
              "{data.personalInfo.summary}"
            </p>
            <div className="w-24 h-px bg-gray-400 mx-auto mt-6"></div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-light text-center mb-8 tracking-widest uppercase text-gray-700">
              Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-8 border-l-2 border-gray-200 pl-8 ml-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-xl font-medium">{exp.position}</h3>
                    <p className="text-gray-600 italic">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">• {line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-light text-center mb-6 tracking-widest uppercase text-gray-700">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-6 text-center">
                  <h3 className="font-medium text-lg">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.field}</p>
                  <p className="italic text-gray-500">{edu.institution}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && <span className="ml-4">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-light text-center mb-6 tracking-widest uppercase text-gray-700">
                Technical Skills
              </h2>
              {data.skills.map((skill) => (
                <div key={skill.id} className="mb-4 text-center">
                  <h3 className="font-medium text-gray-700 mb-2">{skill.category}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {skill.items.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects & Certifications */}
        {(data.projects.length > 0 || data.certifications.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Projects */}
            {data.projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-light text-center mb-6 tracking-widest uppercase text-gray-700">
                  Projects
                </h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-6">
                    <div className="text-center mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      {project.technologies && (
                        <p className="text-sm text-gray-600 italic">{project.technologies}</p>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-sm text-gray-700 text-center leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <p className="text-xs text-gray-500 text-center mt-2">{project.link}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-light text-center mb-6 tracking-widest uppercase text-gray-700">
                  Certifications
                </h2>
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="mb-4 text-center">
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(cert.date)}</p>
                    {cert.link && (
                      <p className="text-xs text-gray-500 mt-1">{cert.link}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
