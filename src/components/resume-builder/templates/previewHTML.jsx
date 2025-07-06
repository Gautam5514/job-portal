// src/components/resume-builder/templates/PreviewHTML.jsx

import React from 'react';
// Import all the same icons you use elsewhere
import { Mail, Phone, Linkedin, Globe, MapPin, Github, Award, Rocket, Briefcase, GraduationCap } from 'lucide-react';

const createLink = (url) => {
  if (!url) return '#';
  return url.startsWith('http') ? url : `https://${url}`;
};

// A more robust Section component for the HTML preview
const Section = ({ title, children, icon: Icon }) => {
  // Check if there's any actual content to render
  const hasContent = React.Children.toArray(children).some(child => {
    if (!child) return false; // filter out null/undefined children
    if (child.props && Array.isArray(child.props.children)) {
      return child.props.children.length > 0;
    }
    return true;
  });

  if (!hasContent) {
    return null; // Don't render empty sections
  }

  return (
    <section className="mb-6">
      <h2 className="flex items-center text-sm font-bold text-blue-800 uppercase tracking-wider border-b-2 border-gray-300 pb-2 mb-4">
        {Icon && <Icon size={16} className="mr-3 text-blue-700" />}
        {title}
      </h2>
      <div className="text-sm leading-relaxed">{children}</div>
    </section>
  );
};


export const PreviewHTML = ({ data }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data || {};

  return (
    // This container simulates an A4 page aspect ratio for a better preview
    <div className="bg-white p-8 shadow-xl rounded-lg font-sans w-full">
      
      {/* --- COMPLETE HEADER --- */}
      <header className="text-center mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name || 'Your Name'}</h1>
        <p className="text-xl text-blue-600 font-semibold mt-1">{personalInfo.title || 'Your Title'}</p>
        <div className="flex justify-center items-center flex-wrap gap-x-5 gap-y-2 text-xs text-gray-600 mt-5">
            {personalInfo.location && <span className="flex items-center"><MapPin size={13} className="mr-1.5 text-gray-500"/>{personalInfo.location}</span>}
            {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center hover:text-blue-600"><Phone size={13} className="mr-1.5 text-gray-500"/>{personalInfo.phone}</a>}
            {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-blue-600"><Mail size={13} className="mr-1.5 text-gray-500"/>{personalInfo.email}</a>}
            {personalInfo.linkedin && <a href={createLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600"><Linkedin size={13} className="mr-1.5 text-gray-500"/>LinkedIn</a>}
            {personalInfo.github && <a href={createLink(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600"><Github size={13} className="mr-1.5 text-gray-500"/>GitHub</a>}
            {personalInfo.portfolio && <a href={createLink(personalInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600"><Globe size={13} className="mr-1.5 text-gray-500"/>Portfolio</a>}
        </div>
      </header>
      
      {/* --- ALL SECTIONS RESTORED --- */}
      <div className="space-y-4">
        {summary && (
          <Section title="Summary">
            <p>{summary}</p>
          </Section>
        )}

        <Section title="Experience" icon={Briefcase}>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <h3 className="font-semibold text-base text-gray-800">{exp.jobTitle}</h3>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                  <p className="font-medium">{exp.company}</p>
                  <p>{exp.startDate} - {exp.endDate || 'Present'} | {exp.location}</p>
                </div>
                <ul className="list-disc list-outside pl-5 mt-1 text-sm text-gray-700 space-y-1">
                    {(exp.description || '').split('\n').filter(Boolean).map((item, i) => <li key={i}>{item.replace(/^- */, '')}</li>)}
                </ul>
              </div>
            ))}
        </Section>

        <Section title="Projects" icon={Rocket}>
            {projects.map(proj => (
              <div key={proj.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-semibold text-base text-gray-800">{proj.name}</h3>
                    {proj.link && <a href={createLink(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View Project</a>}
                  </div>
                  {proj.technologies && <p className="text-xs text-gray-500 mb-1"><strong>Technologies:</strong> {proj.technologies}</p>}
                  <ul className="list-disc list-outside pl-5 mt-1 text-sm text-gray-700 space-y-1">
                      {(proj.description || '').split('\n').filter(Boolean).map((item, i) => <li key={i}>{item.replace(/^- */, '')}</li>)}
                  </ul>
              </div>
            ))}
        </Section>

        <Section title="Education" icon={GraduationCap}>
            {education.map(edu => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <h3 className="font-semibold text-base text-gray-800">{edu.degree}</h3>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <p className="font-medium">{edu.school}</p>
                  <p>{edu.startDate} - {edu.endDate}</p>
                </div>
                {edu.description && <p className="text-xs italic text-gray-500 mt-1">{edu.description}</p>}
              </div>
            ))}
        </Section>

        <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
        </Section>

        <Section title="Certifications" icon={Award}>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-3 last:mb-0">
                <h3 className="font-semibold text-base text-gray-800">{cert.name}</h3>
                 <div className="flex justify-between items-center text-xs text-gray-500">
                    <p className="font-medium">{cert.issuingOrganization}</p>
                    {cert.dateIssued && <p>Issued: {cert.dateIssued}</p>}
                </div>
              </div>
            ))}
        </Section>
      </div>
    </div>
  );
};