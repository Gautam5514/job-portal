import React from 'react';

export const MinimalTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="font-mono text-sm text-gray-900 bg-white p-8 leading-tight">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-xs space-y-1">
          {data.personalInfo.email && <div>Email: {data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>Phone: {data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>Location: {data.personalInfo.location}</div>}
          {data.personalInfo.linkedIn && <div>LinkedIn: {data.personalInfo.linkedIn}</div>}
          {data.personalInfo.website && <div>Website: {data.personalInfo.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-2">SUMMARY</h2>
          <p className="text-xs leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-2">EXPERIENCE</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-xs">{exp.position} @ {exp.company}</div>
                </div>
                <div className="text-xs">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.description && (
                <div className="text-xs mt-1 pl-2">
                  {exp.description.split('\n').map((line, index) => (
                    <div key={index}>- {line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-2">SKILLS</h2>
          {data.skills.map((skill) => (
            <div key={skill.id} className="text-xs mb-1">
              <span className="font-bold">{skill.category}:</span> {skill.items.join(', ')}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-2">EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <div className="text-xs">
                  <div className="font-bold">{edu.degree} in {edu.field}</div>
                  <div>{edu.institution}</div>
                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                </div>
                <div className="text-xs">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-2">PROJECTS</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div className="font-bold text-xs">{project.name}</div>
                {project.link && <div className="text-xs truncate max-w-32">{project.link}</div>}
              </div>
              {project.technologies && (
                <div className="text-xs">Tech: {project.technologies}</div>
              )}
              {project.description && (
                <div className="text-xs mt-1">{project.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-2">CERTIFICATIONS</h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between">
                <div className="text-xs">
                  <div className="font-bold">{cert.name}</div>
                  <div>{cert.issuer}</div>
                </div>
                <div className="text-xs">{formatDate(cert.date)}</div>
              </div>
              {cert.link && <div className="text-xs">{cert.link}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
