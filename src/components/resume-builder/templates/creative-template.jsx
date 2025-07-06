import React from 'react';
import { Palette, Github, Award, Rocket, User, FileText, Briefcase, GraduationCap, Star } from 'lucide-react'; // Example icon + new icons

// Helper function to format dates (basic example)
const formatDate = (dateStr) => {
  if (!dateStr) return '';
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
     <div className="mb-4">
        <h3 className="font-bold text-base mb-1 border-b border-indigo-200 pb-1 flex items-center gap-1">
            {Icon && <Icon size={14} className="opacity-80" />}
            {title}
        </h3>
        {children}
     </div>
  );
};


export function CreativeTemplate({ data }) {
  // Destructure data
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  // Basic rendering logic (can be styled creatively later)
  return (
    <div className="p-6 border-2 border-dashed border-indigo-300 rounded-lg min-h-[200px] flex flex-col bg-indigo-50/50 text-sm text-indigo-800 font-sans">
       <div className="text-center mb-6">
         {/* <Palette className="h-10 w-10 text-indigo-400 mb-2 inline-block" /> */}
         {personalInfo.name && <h1 className="text-xl font-bold text-indigo-700">{personalInfo.name}</h1>}
         {personalInfo.title && <p className="text-indigo-600 font-medium">{personalInfo.title}</p>}
         {/* <p className="text-xs text-indigo-500 italic mt-1">(Creative Template Preview)</p> */}
          <div className="flex justify-center items-center flex-wrap gap-x-3 gap-y-1 text-xs text-indigo-500 mt-2">
             {personalInfo.location && <span>{personalInfo.location}</span>}
             {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>}
             {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
             {personalInfo.linkedin && <a href={createLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
             {personalInfo.github && <a href={createLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1"><Github size={12}/>GitHub</a>}
             {personalInfo.portfolio && <a href={createLink(personalInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>}
          </div>
       </div>

      {/* Basic Data Display - Needs Creative Styling */}
      <div className="space-y-4 w-full text-left">

        {/* Summary */}
        <Section title="Summary" icon={FileText}>
             <p>{summary}</p>
        </Section>

        {/* Experience */}
        <Section title="Experience" icon={Briefcase}>
            {Array.isArray(experience) && experience.map(exp => (
                <div key={exp.id} className="mb-3">
                    <p className="font-medium">{exp.jobTitle} <span className="font-normal text-indigo-600">at {exp.company}</span></p>
                    <p className="text-xs text-indigo-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)} {exp.location && `| ${exp.location}`}</p>
                    {exp.description && (
                         <ul className="list-disc pl-4 text-xs mt-1 text-indigo-700 space-y-0.5">
                             {exp.description.split('\n')
                                 .map(item => item.replace(/^- */, '').trim())
                                 .filter(Boolean)
                                 .map((item, i) => <li key={i}>{item}</li>)}
                         </ul>
                    )}
                </div>
            ))}
        </Section>

         {/* Projects */}
        <Section title="Projects" icon={Rocket}>
            {Array.isArray(projects) && projects.map(proj => (
                <div key={proj.id} className="mb-3">
                    <p className="font-medium">{proj.name} {proj.link && <a href={createLink(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">(Link)</a>}</p>
                     {proj.technologies && <p className="text-xs italic text-indigo-600">Tech: {proj.technologies}</p>}
                     {proj.description && (
                         <ul className="list-disc pl-4 text-xs mt-1 text-indigo-700 space-y-0.5">
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
        <Section title="Education" icon={GraduationCap}>
             {Array.isArray(education) && education.map(edu => (
                <div key={edu.id} className="mb-2">
                    <p><span className="font-medium">{edu.degree}</span> - {edu.school}</p>
                    <p className="text-xs text-indigo-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)} {edu.location && `| ${edu.location}`}</p>
                    {edu.description && <p className="text-xs pl-2 text-indigo-700 mt-0.5">{edu.description}</p>}
                </div>
            ))}
        </Section>

        {/* Skills */}
         <Section title="Skills" icon={Star}>
            {Array.isArray(skills) && skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, i) => (
                        <span key={i} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            )}
         </Section>

         {/* Certifications */}
        <Section title="Certifications" icon={Award}>
            {Array.isArray(certifications) && certifications.map(cert => (
                 <div key={cert.id} className="mb-1.5">
                    <p><span className="font-medium">{cert.name}</span> <span className="text-indigo-600">by {cert.issuingOrganization}</span></p>
                    <p className="text-xs text-indigo-500">
                        {cert.dateIssued && <span>Issued: {formatDate(cert.dateIssued)}</span>}
                        {cert.credentialUrl && <a href={createLink(cert.credentialUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">(Verify)</a>}
                    </p>
                    {cert.credentialId && <p className="text-xs text-indigo-500 italic">ID: {cert.credentialId}</p>}
                </div>
            ))}
        </Section>

      </div>
    </div>
  );
}
