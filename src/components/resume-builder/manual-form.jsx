'use client';

import * as React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator'; // Import Separator

// Reusable Input Field Component
// Update FormField to accept onBlur:
const FormField = ({ id, label, value, onChange, onBlur, type = "text", placeholder = "", ...rest }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">{label}</Label>
    {type === 'textarea' ? (
      <Textarea
        id={id}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={4}
        className="text-sm resize-y"
        {...rest}
      />
    ) : (
      <Input
        id={id}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="text-sm h-9"
        {...rest}
      />
    )}
  </div>
);

// Section for managing array entries like Experience or Education
const ArraySection = ({
  sectionTitle,
  sectionKey,
  data,
  renderFields, // Function to render fields for one entry
  addEntry,
  removeEntry,
  updateEntry,
}) => (
  <div className="space-y-4">
    {/* Ensure data is an array before mapping */}
    {Array.isArray(data) && data.map((entry, index) => (
      <div key={entry.id} className="border p-4 rounded-md space-y-3 relative bg-muted/30 shadow-sm"> {/* Subtle background */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" // Adjusted position and style
          onClick={() => removeEntry(sectionKey, entry.id)}
          aria-label={`Remove ${sectionTitle} entry ${index + 1}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <h4 className="text-sm font-semibold text-muted-foreground mb-2">{sectionTitle} #{index + 1}</h4> {/* Add entry number */}
        {renderFields(entry, index, updateEntry)}
      </div>
    ))}
    <Button variant="outline" size="sm" onClick={() => addEntry(sectionKey)} className="mt-3 w-full justify-center border-dashed"> {/* Full width dashed */}
      <PlusCircle className="mr-2 h-4 w-4" /> Add New {sectionTitle} Entry
    </Button>
  </div>
);

export function ManualForm({
  resumeData,
  updateResumeData,
  addArrayEntry,
  removeArrayEntry,
  updateArrayEntry,
  updateSkills,
  activeSection,
  setActiveSection
}) {

  // At the top of ManualForm, add a local state to manage skills input:
  const [skillsText, setSkillsText] = React.useState(
    Array.isArray(resumeData.skills) ? resumeData.skills.join(', ') : ''
  );

  // Handler for input changes (only updates local state):
  const handleSkillsChange = (e) => {
    setSkillsText(e.target.value);
  };

  // Handler for blur to sync to resumeData once typing is done:
  const handleSkillsBlur = () => {
    const arr = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    updateResumeData('skills', arr);
  };


  const handlePersonalInfoChange = (field, value) => {
    updateResumeData('personalInfo', { ...resumeData.personalInfo, [field]: value });
  };

  const handleArrayInputChange = (section, id, field, value) => {
    updateArrayEntry(section, id, field, value);
  };


  return (
    <Accordion
      type="multiple" // Allow multiple sections to be open
      // collapsible removed - causes warning with type="multiple"
      className="w-full space-y-2" // Add space between accordion items
      value={activeSection ? [activeSection] : []} // Ensure value is an array
      onValueChange={(value) => setActiveSection(value && value.length > 0 ? value[0] : null)} // Handle accordion change, ensuring single value or null
    >
      {/* Personal Info Section */}
      <AccordionItem value="personalInfo" className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline bg-muted/20">Personal Information</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-2 space-y-4"> {/* Increased spacing */}
          <FormField id="name" label="Full Name" value={resumeData.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} placeholder="e.g., Jane Doe" />
          <FormField id="title" label="Professional Title" value={resumeData.personalInfo.title} onChange={(e) => handlePersonalInfoChange('title', e.target.value)} placeholder="e.g., Software Engineer" />
          <Separator className="my-3" /> {/* Separator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Increased gap */}
            <FormField id="phone" label="Phone" value={resumeData.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} type="tel" placeholder="e.g., (123) 456-7890" />
            <FormField id="email" label="Email" value={resumeData.personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} type="email" placeholder="e.g., jane.doe@email.com" />
            <FormField id="linkedin" label="LinkedIn Profile URL" value={resumeData.personalInfo.linkedin} onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)} placeholder="e.g., linkedin.com/in/janedoe" />
            <FormField id="github" label="GitHub Profile URL" value={resumeData.personalInfo.github} onChange={(e) => handlePersonalInfoChange('github', e.target.value)} placeholder="e.g., github.com/janedoe" />
            <FormField id="portfolio" label="Portfolio/Website URL" value={resumeData.personalInfo.portfolio} onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)} placeholder="e.g., janedoe.dev" />
          </div>
          <FormField id="location" label="Location" value={resumeData.personalInfo.location} onChange={(e) => handlePersonalInfoChange('location', e.target.value)} placeholder="e.g., San Francisco, CA" />
        </AccordionContent>
      </AccordionItem>

      {/* Summary Section */}
      <AccordionItem value="summary" className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline bg-muted/20">Professional Summary</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-2">
          <FormField
            id="summary-text"
            label="Summary/Objective"
            value={resumeData.summary}
            onChange={(e) => updateResumeData('summary', e.target.value)} // Directly update summary string
            type="textarea"
            placeholder="Craft a concise (2-4 sentences) overview of your key skills, experience, and career goals. Tailor this to the jobs you're applying for."
          />
        </AccordionContent>
      </AccordionItem>

      {/* Experience Section */}
      <AccordionItem value="experience" className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline bg-muted/20">Work Experience</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-2">
          <ArraySection
            sectionTitle="Experience"
            sectionKey="experience"
            data={resumeData.experience}
            addEntry={addArrayEntry}
            removeEntry={removeArrayEntry}
            updateEntry={handleArrayInputChange}
            renderFields={(entry, index, update) => (
              <>
                <FormField id={`exp-${entry.id}-title`} label="Job Title" value={entry.jobTitle} onChange={(e) => update('experience', entry.id, 'jobTitle', e.target.value)} placeholder="e.g., Senior Developer" />
                <FormField id={`exp-${entry.id}-company`} label="Company" value={entry.company} onChange={(e) => update('experience', entry.id, 'company', e.target.value)} placeholder="e.g., Tech Corp Inc." />
                <FormField id={`exp-${entry.id}-location`} label="Location" value={entry.location} onChange={(e) => update('experience', entry.id, 'location', e.target.value)} placeholder="e.g., Remote / New York, NY" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id={`exp-${entry.id}-start`} label="Start Date" value={entry.startDate} onChange={(e) => update('experience', entry.id, 'startDate', e.target.value)} placeholder="e.g., Jan 2020 / 01/2020" />
                  <FormField id={`exp-${entry.id}-end`} label="End Date" value={entry.endDate} onChange={(e) => update('experience', entry.id, 'endDate', e.target.value)} placeholder="e.g., Present / Dec 2022 / 12/2022" />
                </div>
                <FormField
                  id={`exp-${entry.id}-desc`}
                  label="Key Responsibilities & Achievements"
                  value={entry.description}
                  onChange={(e) => update('experience', entry.id, 'description', e.target.value)}
                  type="textarea"
                  placeholder="Use bullet points starting with action verbs. Focus on quantifiable results (e.g., 'Increased user engagement by 15% by implementing...'). Aim for 3-5 points per role."
                />
              </>
            )}
          />
        </AccordionContent>
      </AccordionItem>

      {/* Education Section */}
      <AccordionItem value="education" className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline bg-muted/20">Education</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-2">
          <ArraySection
            sectionTitle="Education"
            sectionKey="education"
            data={resumeData.education}
            addEntry={addArrayEntry}
            removeEntry={removeArrayEntry}
            updateEntry={handleArrayInputChange}
            renderFields={(entry, index, update) => (
              <>
                <FormField id={`edu-${entry.id}-degree`} label="Degree / Program Name" value={entry.degree} onChange={(e) => update('education', entry.id, 'degree', e.target.value)} placeholder="e.g., Bachelor of Science in Computer Science" />
                <FormField id={`edu-${entry.id}-school`} label="Institution Name" value={entry.school} onChange={(e) => update('education', entry.id, 'school', e.target.value)} placeholder="e.g., University of California, Berkeley" />
                <FormField id={`edu-${entry.id}-location`} label="Location" value={entry.location} onChange={(e) => update('education', entry.id, 'location', e.target.value)} placeholder="e.g., Berkeley, CA" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id={`edu-${entry.id}-start`} label="Start Date" value={entry.startDate} onChange={(e) => update('education', entry.id, 'startDate', e.target.value)} placeholder="e.g., Sep 2016" />
                  <FormField id={`edu-${entry.id}-end`} label="End Date / Graduation Date" value={entry.endDate} onChange={(e) => update('education', entry.id, 'endDate', e.target.value)} placeholder="e.g., May 2020" />
                </div>
                <FormField
                  id={`edu-${entry.id}-desc`}
                  label="Relevant Details (Optional)"
                  value={entry.description}
                  onChange={(e) => update('education', entry.id, 'description', e.target.value)}
                  type="textarea"
                  placeholder="Optional: GPA (if high), Dean's List, relevant coursework, honors, minor, thesis title, etc."
                />
              </>
            )}
          />
        </AccordionContent>
      </AccordionItem>


      {/* Skills Section */}
      <AccordionItem value="skills" className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline bg-muted/20">Skills</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-2">
          {/* // In the Skills accordion section, replace your FormField call with: */}
          <FormField
            id="skills-list"
            label="Skills"
            type="textarea"
            value={skillsText}
            onChange={handleSkillsChange}
            onBlur={handleSkillsBlur}
            placeholder="Enter technical and soft skills separated by commas (e.g., Python, JavaScript, Project Management, Team Leadership, SQL, AWS)"
          />

          <p className="text-xs text-muted-foreground mt-1.5">Separate skills with commas. Include a mix of hard and soft skills relevant to your target roles.</p>
        </AccordionContent>
      </AccordionItem>

      {/* Projects Section */}
      <AccordionItem value="projects" className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline bg-muted/20">Projects</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-2">
          <ArraySection
            sectionTitle="Project"
            sectionKey="projects"
            data={resumeData.projects}
            addEntry={addArrayEntry}
            removeEntry={removeArrayEntry}
            updateEntry={handleArrayInputChange}
            renderFields={(entry, index, update) => (
              <>
                <FormField id={`proj-${entry.id}-name`} label="Project Name" value={entry.name} onChange={(e) => update('projects', entry.id, 'name', e.target.value)} placeholder="e.g., Personal Portfolio Website" />
                <FormField
                  id={`proj-${entry.id}-desc`}
                  label="Description"
                  value={entry.description}
                  onChange={(e) => update('projects', entry.id, 'description', e.target.value)}
                  type="textarea"
                  placeholder="Briefly describe the project, its purpose, and your contributions. Use bullet points for key features or accomplishments."
                />
                <FormField id={`proj-${entry.id}-tech`} label="Technologies Used" value={entry.technologies} onChange={(e) => update('projects', entry.id, 'technologies', e.target.value)} placeholder="e.g., React, Next.js, Tailwind CSS, Vercel" />
                <FormField id={`proj-${entry.id}-link`} label="Project Link (Optional)" value={entry.link} onChange={(e) => update('projects', entry.id, 'link', e.target.value)} type="url" placeholder="e.g., https://yourproject.com" />
              </>
            )}
          />
        </AccordionContent>
      </AccordionItem>

      {/* Certifications Section */}
      <AccordionItem value="certifications" className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline bg-muted/20">Certifications</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-2">
          <ArraySection
            sectionTitle="Certification"
            sectionKey="certifications"
            data={resumeData.certifications}
            addEntry={addArrayEntry}
            removeEntry={removeArrayEntry}
            updateEntry={handleArrayInputChange}
            renderFields={(entry, index, update) => (
              <>
                <FormField id={`cert-${entry.id}-name`} label="Certification Name" value={entry.name} onChange={(e) => update('certifications', entry.id, 'name', e.target.value)} placeholder="e.g., AWS Certified Solutions Architect - Associate" />
                <FormField id={`cert-${entry.id}-org`} label="Issuing Organization" value={entry.issuingOrganization} onChange={(e) => update('certifications', entry.id, 'issuingOrganization', e.target.value)} placeholder="e.g., Amazon Web Services" />
                <FormField id={`cert-${entry.id}-date`} label="Date Issued" value={entry.dateIssued} onChange={(e) => update('certifications', entry.id, 'dateIssued', e.target.value)} placeholder="e.g., June 2023 / 06/2023" />
                <FormField id={`cert-${entry.id}-id`} label="Credential ID (Optional)" value={entry.credentialId} onChange={(e) => update('certifications', entry.id, 'credentialId', e.target.value)} placeholder="e.g., ABC123XYZ" />
                <FormField id={`cert-${entry.id}-url`} label="Credential URL (Optional)" value={entry.credentialUrl} onChange={(e) => update('certifications', entry.id, 'credentialUrl', e.target.value)} type="url" placeholder="e.g., https://verify.cert/abc123xyz" />
              </>
            )}
          />
        </AccordionContent>
      </AccordionItem>


    </Accordion>
  );
}
