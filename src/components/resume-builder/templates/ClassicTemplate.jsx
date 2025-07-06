import React from 'react';

export const ClassicTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-8 font-serif text-sm leading-relaxed text-gray-900 bg-white">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm mt-1">
          {data.personalInfo.linkedIn && <span>{data.personalInfo.linkedIn}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-400">PROFESSIONAL SUMMARY</h2>
          <p className="text-justify">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-400">PROFESSIONAL EXPERIENCE</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="italic">{exp.company}</p>
                </div>
                <div className="text-right text-sm">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.description && (
                <div className="ml-4">
                  {exp.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-1">• {line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-400">EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="italic">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-400">TECHNICAL SKILLS</h2>
          {data.skills.map((skill) => (
            <div key={skill.id} className="mb-2">
              <span className="font-bold">{skill.category}:</span> {skill.items.join(', ')}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-400">PROJECTS</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">{project.name}</h3>
                {project.link && <span className="text-sm">{project.link}</span>}
              </div>
              {project.technologies && (
                <p className="italic text-sm mb-1">Technologies: {project.technologies}</p>
              )}
              {project.description && <p>{project.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-400">CERTIFICATIONS</h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold">{cert.name}</span> - {cert.issuer}
                </div>
                <span className="text-sm">{formatDate(cert.date)}</span>
              </div>
              {cert.link && <p className="text-sm text-gray-600">{cert.link}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
