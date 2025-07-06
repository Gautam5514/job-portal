import React from 'react';

export const ColorfulTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="font-sans text-sm bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            {data.personalInfo.email && <div>✉️ {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>📞 {data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>📍 {data.personalInfo.location}</div>}
          </div>
          <div className="space-y-1">
            {data.personalInfo.linkedIn && <div>💼 {data.personalInfo.linkedIn}</div>}
            {data.personalInfo.website && <div>🌐 {data.personalInfo.website}</div>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-blue-600 border-b-2 border-blue-200 pb-1">
              🎯 Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-200 pb-1">
              💼 Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-blue-700">{exp.position}</h3>
                    <p className="text-purple-600 font-semibold">{exp.company}</p>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-1 flex items-start">
                        <span className="text-blue-500 mr-2">▸</span>
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-green-600 border-b-2 border-green-200 pb-1">
              🚀 Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-700 mb-2">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, index) => (
                      <span 
                        key={index} 
                        className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs"
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
              <h2 className="text-xl font-bold mb-4 text-orange-600 border-b-2 border-orange-200 pb-1">
                🎓 Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-bold text-orange-700">{edu.degree}</h3>
                  <p className="text-orange-600">{edu.field}</p>
                  <p className="font-semibold text-sm">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    {edu.gpa && <span className="text-orange-600">GPA: {edu.gpa}</span>}
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
              <h2 className="text-xl font-bold mb-4 text-red-600 border-b-2 border-red-200 pb-1">
                🏆 Certifications
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-4 bg-red-50 p-4 rounded-lg">
                  <h3 className="font-bold text-red-700">{cert.name}</h3>
                  <p className="text-red-600">{cert.issuer}</p>
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
            <h2 className="text-xl font-bold mb-4 text-indigo-600 border-b-2 border-indigo-200 pb-1">
              🛠️ Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-indigo-700">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-blue-600 truncate max-w-40">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-indigo-600 mb-2">
                      <span className="font-semibold">Tech:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && <p className="text-sm text-gray-700">{project.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
