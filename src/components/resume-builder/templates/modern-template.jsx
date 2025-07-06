import React from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin, Github, Award, Rocket } from 'lucide-react'; // Added Github, Award, Rocket icons

// Helper function to format dates (basic example)
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  // Add more robust date parsing/formatting if needed
  return dateStr;
};

// Helper to create link, handling potential missing protocol
const createLink = (url) => {
  if (!url) return '#';
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

// Section Component for DRY principle
const Section = ({ title, children, icon: Icon }) => {
  // Check if children are valid React elements or non-empty arrays/strings
  const hasContent = React.Children.toArray(children).some(child => {
    if (child === null || typeof child === 'undefined') return false;
    if (typeof child === 'string' && child.trim() === '') return false;
    if (Array.isArray(child) && child.length === 0) return false;
    return true;
  });

  if (!hasContent) {
    return null; // Don't render empty sections
  }

  return (
    <section className="mb-5">
      <h2 className="flex items-center text-[11pt] font-semibold text-blue-800 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3">
        {Icon && <Icon size={14} className="mr-2 opacity-80" />}
        {title}
      </h2>
      {children}
    </section>
  );
};

export function ModernTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="font-sans text-[10pt] leading-normal text-gray-700 bg-white"> {/* Slightly smaller base font size */}

      {/* Header */}
      <header className="text-center mb-6 border-b border-gray-200 pb-4">
        {personalInfo.name && <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">{personalInfo.name}</h1>}
        {personalInfo.title && <p className="text-base text-blue-700 font-medium mt-1">{personalInfo.title}</p>}
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-3"> {/* Increased spacing */}
          {personalInfo.location && (
            <span className="flex items-center whitespace-nowrap"><MapPin size={11} className="mr-1 opacity-70"/>{personalInfo.location}</span>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center hover:text-blue-600 whitespace-nowrap"><Phone size={11} className="mr-1 opacity-70"/>{personalInfo.phone}</a>
          )}
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-blue-600 whitespace-nowrap"><Mail size={11} className="mr-1 opacity-70"/>{personalInfo.email}</a>
          )}
          {personalInfo.linkedin && (
            <a href={createLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 whitespace-nowrap"><Linkedin size={11} className="mr-1 opacity-70"/>LinkedIn</a>
          )}
           {personalInfo.github && (
            <a href={createLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 whitespace-nowrap"><Github size={11} className="mr-1 opacity-70"/>GitHub</a>
          )}
          {personalInfo.portfolio && (
            <a href={createLink(personalInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 whitespace-nowrap"><Globe size={11} className="mr-1 opacity-70"/>Portfolio</a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <Section title="Summary">
          <p className="text-sm">{summary}</p>
        </Section>
      )}

      {/* Experience */}
      <Section title="Experience">
        {Array.isArray(experience) && experience.map((exp, expIndex) => (
          <div key={exp.id || expIndex} className="mb-4 last:mb-0"> {/* Add last:mb-0 */}
            <h3 className="text-sm font-semibold text-gray-800">{exp.jobTitle}</h3>
            <div className="flex justify-between items-center text-[9pt] text-gray-500 mb-1"> {/* Smaller text for meta */}
              <p className="font-medium">{exp.company}</p>
              <p className="text-right whitespace-nowrap">
                {formatDate(exp.startDate)} – {formatDate(exp.endDate)} {exp.location && <span className="hidden sm:inline">| {exp.location}</span>} {/* Hide location on very small screens if needed */}
              </p>
            </div>
            {/* Render description points */}
            {exp.description && (
                <ul className="list-disc pl-4 text-sm space-y-1 mt-1 text-gray-600">
                    {exp.description.split('\n')
                        .map(item => item.replace(/^- */, '').trim()) // Remove leading dashes/spaces
                        .filter(Boolean) // Remove empty lines
                        .map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            )}
          </div>
        ))}
      </Section>

       {/* Projects */}
        <Section title="Projects" icon={Rocket}>
            {Array.isArray(projects) && projects.map((proj, projIndex) => (
                <div key={proj.id || projIndex} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-sm font-semibold text-gray-800">{proj.name}</h3>
                        {proj.link && <a href={createLink(proj.link)} target="_blank" rel="noopener noreferrer" className="text-[9pt] text-blue-600 hover:underline whitespace-nowrap pl-2">View Project</a>}
                    </div>
                    {proj.technologies && <p className="text-[9pt] text-gray-500 mb-1">Technologies: {proj.technologies}</p>}
                    {/* Render description points */}
                    {proj.description && (
                        <ul className="list-disc pl-4 text-sm space-y-1 mt-1 text-gray-600">
                            {proj.description.split('\n')
                                .map(item => item.replace(/^- */, '').trim())
                                .filter(Boolean)
                                .map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    )}
                </div>
            ))}
        </Section>

      {/* Education */}
      <Section title="Education">
        {Array.isArray(education) && education.map((edu, eduIndex) => (
          <div key={edu.id || eduIndex} className="mb-3 last:mb-0">
            <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
             <div className="flex justify-between items-center text-[9pt] text-gray-500 mb-0.5"> {/* Reduced margin */}
              <p className="font-medium">{edu.school}</p>
               <p className="text-right whitespace-nowrap">
                 {formatDate(edu.startDate)} – {formatDate(edu.endDate)} {edu.location && <span className="hidden sm:inline">| {edu.location}</span>}
               </p>
            </div>
            {edu.description && <p className="text-xs text-gray-500 italic mt-1">{edu.description}</p>}
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills">
         {/* Option 1: Pills (better for modern) */}
         {Array.isArray(skills) && skills.length > 0 && (
           <ul className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <li key={index} className="bg-blue-50 text-blue-700 text-[9pt] font-medium px-2 py-0.5 rounded-md">
                {skill}
              </li>
            ))}
           </ul>
         )}
         {/* Option 2: Comma-separated list */}
         {/* <p className="text-sm text-gray-600">
           {skills.join(' | ')}
         </p> */}
      </Section>

        {/* Certifications */}
        <Section title="Certifications" icon={Award}>
            {Array.isArray(certifications) && certifications.map((cert, certIndex) => (
                <div key={cert.id || certIndex} className="mb-3 last:mb-0">
                    <h3 className="text-sm font-semibold text-gray-800">{cert.name}</h3>
                    <div className="flex justify-between items-center text-[9pt] text-gray-500">
                        <p className="font-medium">{cert.issuingOrganization}</p>
                        <p className="text-right whitespace-nowrap">
                            {cert.dateIssued && <span>Issued: {formatDate(cert.dateIssued)}</span>}
                            {cert.credentialUrl && <a href={createLink(cert.credentialUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">Verify</a>}
                        </p>
                    </div>
                    {cert.credentialId && <p className="text-xs text-gray-500 italic mt-0.5">ID: {cert.credentialId}</p>}
                </div>
            ))}
        </Section>
    </div>
  );
}
