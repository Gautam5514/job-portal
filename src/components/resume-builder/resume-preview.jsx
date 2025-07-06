'use client';

import * as React from 'react';
import { ModernTemplate } from './templates/modern-template';
import { ClassicTemplate } from './templates/classic-template';
import { CreativeTemplate } from './templates/creative-template';
import { Skeleton } from '../ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

// Default empty data structure to prevent errors when data is incomplete
const defaultData = {
  personalInfo: {},
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  // Add defaults for other potential sections if needed
};

export function ResumePreview({ templateId, data }) {

  // Merge incoming data with defaults to ensure all keys exist
  const validatedData = {
    personalInfo: data?.personalInfo || defaultData.personalInfo,
    summary: data?.summary || defaultData.summary,
    experience: Array.isArray(data?.experience) ? data.experience : defaultData.experience,
    education: Array.isArray(data?.education) ? data.education : defaultData.education,
    skills: Array.isArray(data?.skills) ? data.skills : defaultData.skills,
    projects: Array.isArray(data?.projects) ? data.projects : defaultData.projects,
    certifications: Array.isArray(data?.certifications) ? data.certifications : defaultData.certifications,
    // Merge other sections similarly
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={validatedData} />;
      case 'classic':
        return <ClassicTemplate data={validatedData} />;
      case 'creative':
        return <CreativeTemplate data={validatedData} />; // Render the placeholder
      default:
        // Fallback for unknown template or loading state
        return (
           <Alert variant="destructive" className="m-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Selected template preview is unavailable or invalid. Please choose another template.
              </AlertDescription>
            </Alert>
        );
    }
  };

  return (
    <div
        className="bg-white shadow-xl rounded-lg w-[210mm] min-h-[297mm] mx-auto my-0 origin-top transform scale-[0.6] sm:scale-[0.7] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.75]"
        // Apply scaling using transform for better performance and control.
        // Adjust scale values based on desired preview size for different breakpoints.
        // `my-0` removes vertical margin, relying on parent padding.
    >
      <div className="p-8"> {/* Add internal padding to the content */}
        {renderTemplate()}
      </div>
    </div>
  );
}
