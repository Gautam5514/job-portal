import React from 'react';

export const CreativeTemplate = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="font-sans text-sm bg-white">
      {/* Header */}
      <div className="relative bg-black text-white p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500 rounded-full transform -translate-x-12 translate-y-12"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-4 tracking-tight">{data.personalInfo.fullName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              {data.personalInfo.email && <div className="flex items-center"><span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div className="flex items-center"><span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>{data.personalInfo.location}</div>}
            </div>
            <div className="space-y-1">
              {data.personalInfo.linkedIn && <div className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>{data.personalInfo.linkedIn}</div>}
              {data.personalInfo.website && <div className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>{data.personalInfo.website}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8 relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-pink-500"></div>
            <h2 className="text-2xl font-black mb-3 text-gray-800">About Me</h2>
            <p className="text-gray-700 leading-relaxed italic text-lg">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8 relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500"></div>
            <h2 className="text-2xl font-black mb-4 text-gray-800">Experience Journey</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="flex items-start">
                    <div className={`w-4 h-4 rounded-full mr-6 mt-1 ${
                      index % 4 === 0 ? 'bg-yellow-400' : 
                      index % 4 === 1 ? 'bg-pink-500' :
                      index % 4 === 2 ? 'bg-blue-400' : 'bg-green-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-black text-lg text-gray-800">{exp.position}</h3>
                          <p className="text-gray-600 font-bold">{exp.company}</p>
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-gray-700">
                          {exp.description.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex} className="mb-1 flex items-start">
                              <span className="text-pink-500 mr-2 font-bold">•</span>
                              <span>{line}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {index < data.experience.length - 1 && (
                    <div className="w-px h-6 bg-gray-300 ml-2 mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8 relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-400 to-blue-400"></div>
            <h2 className="text-2xl font-black mb-4 text-gray-800">Skill Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={skill.id} className={`p-4 rounded-xl border-l-4 ${
                  index % 4 === 0 ? 'border-yellow-400 bg-yellow-50' : 
                  index % 4 === 1 ? 'border-pink-500 bg-pink-50' :
                  index % 4 === 2 ? 'border-blue-400 bg-blue-50' : 'border-green-400 bg-green-50'
                }`}>
                  <h3 className="font-black text-gray-800 mb-2">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, itemIndex) => (
                      <span 
                        key={itemIndex} 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          index % 4 === 0 ? 'bg-yellow-200 text-yellow-800' : 
                          index % 4 === 1 ? 'bg-pink-200 text-pink-800' :
                          index % 4 === 2 ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'
                        }`}
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
              <h2 className="text-2xl font-black mb-4 text-gray-800">Learning Path</h2>
              {data.education.map((edu, index) => (
                <div key={edu.id} className={`mb-4 p-4 rounded-xl border-l-4 ${
                  index % 2 === 0 ? 'border-purple-500 bg-purple-50' : 'border-indigo-500 bg-indigo-50'
                }`}>
                  <h3 className="font-black text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600 font-bold">{edu.field}</p>
                  <p className="font-medium text-sm">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    {edu.gpa && <span className="font-medium">GPA: {edu.gpa}</span>}
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
              <h2 className="text-2xl font-black mb-4 text-gray-800">Achievements</h2>
              {data.certifications.map((cert, index) => (
                <div key={cert.id} className={`mb-4 p-4 rounded-xl border-l-4 ${
                  index % 2 === 0 ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'
                }`}>
                  <h3 className="font-black text-gray-800">{cert.name}</h3>
                  <p className="text-gray-600 font-bold">{cert.issuer}</p>
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
          <div className="mb-8 relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-yellow-400"></div>
            <h2 className="text-2xl font-black mb-4 text-gray-800">Project Showcase</h2>
            <div className="grid grid-cols-1 gap-4">
              {data.projects.map((project, index) => (
                <div key={project.id} className={`p-4 rounded-xl border-l-4 ${
                  index % 3 === 0 ? 'border-cyan-500 bg-cyan-50' : 
                  index % 3 === 1 ? 'border-emerald-500 bg-emerald-50' : 'border-violet-500 bg-violet-50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-gray-800">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-blue-600 truncate max-w-40">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm font-medium mb-2">
                      <span className="font-bold">Tech Stack:</span> {project.technologies}
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
