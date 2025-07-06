import React from 'react';
import { Github, Award, Rocket } from 'lucide-react'; // Import icons

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
const Section = ({ title, children }) => {
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
    <section className="mb-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-2 text-center">{title}</h2>
      {children}
    </section>
  );
};


export function ClassicTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="font-serif text-[10pt] leading-normal text-black bg-white"> {/* Slightly smaller base font */}

      {/* Header */}
      <header className="text-center mb-5">
        {personalInfo.name && <h1 className="text-xl font-bold uppercase tracking-widest mb-0.5">{personalInfo.name}</h1>}
        {personalInfo.title && <p className="text-sm font-light mb-1.5">{personalInfo.title}</p>}
        <div className="text-xs mt-1 space-x-2 flex flex-wrap justify-center items-center gap-x-3 gap-y-1"> {/* Use flex-wrap and gap */}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>}
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
          {personalInfo.linkedin && <a href={createLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
          {personalInfo.github && <a href={createLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center"><Github size={11} className="mr-0.5 opacity-80"/>GitHub</a>}
          {personalInfo.portfolio && <a href={createLink(personalInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>}
        </div>
      </header>
      <hr className="border-t border-gray-400 mb-4" />

      {/* Summary */}
      {summary && (
        <Section title="Summary">
          <p className="text-sm text-justify">{summary}</p> {/* Justified text */}
        </Section>
      )}

      {/* Experience */}
      <Section title="Experience">
        {Array.isArray(experience) && experience.map((exp, expIndex) => (
          <div key={exp.id || expIndex} className="mb-3.5 last:mb-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="text-sm font-semibold">{exp.jobTitle}</h3>
              <p className="text-xs font-light whitespace-nowrap pl-2">{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</p>
            </div>
             <div className="flex justify-between items-baseline text-xs mb-1">
               <p className="italic font-medium">{exp.company}</p>
               <p className="font-light">{exp.location}</p>
            </div>
            {/* Render description points */}
             {exp.description && (
                <ul className="list-disc pl-5 text-sm space-y-0.5 mt-1">
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
        <Section title="Projects">
            {Array.isArray(projects) && projects.map((proj, projIndex) => (
                <div key={proj.id || projIndex} className="mb-3.5 last:mb-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-sm font-semibold">{proj.name}</h3>
                        {proj.link && <a href={createLink(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline font-light whitespace-nowrap pl-2">Link</a>}
                    </div>
                    {proj.technologies && <p className="text-xs italic font-medium mb-1">Technologies: {proj.technologies}</p>}
                    {/* Render description points */}
                    {proj.description && (
                        <ul className="list-disc pl-5 text-sm space-y-0.5 mt-1">
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
          <div key={edu.id || eduIndex} className="mb-2.5 last:mb-0">
            <div className="flex justify-between items-baseline mb-0.5">
               <h3 className="text-sm font-semibold">{edu.degree}</h3>
               <p className="text-xs font-light whitespace-nowrap pl-2">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</p>
            </div>
            <div className="flex justify-between items-baseline text-xs font-light">
               <p className="italic font-medium">{edu.school}</p>
               <p>{edu.location}</p>
            </div>
            {edu.description && <p className="text-xs italic mt-1">{edu.description}</p>}
          </div>
        ))}
      </Section>


      {/* Skills */}
      <Section title="Skills">
        {Array.isArray(skills) && skills.length > 0 && (
            <p className="text-sm text-center"> {/* Centered skills list */}
                {skills.join(' • ')}
            </p>
        )}
      </Section>

        {/* Certifications */}
        <Section title="Certifications">
            {Array.isArray(certifications) && certifications.map((cert, certIndex) => (
                <div key={cert.id || certIndex} className="mb-2.5 last:mb-0 text-center text-sm">
                    <span className="font-semibold">{cert.name}</span>
                    {cert.issuingOrganization && <span className="italic"> - {cert.issuingOrganization}</span>}
                    {cert.dateIssued && <span className="text-xs font-light"> ({formatDate(cert.dateIssued)})</span>}
                    {cert.credentialUrl && <a href={createLink(cert.credentialUrl)} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline ml-1">(Verify)</a>}
                </div>
            ))}
        </Section>


    </div>
  );
}
