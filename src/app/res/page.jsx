'use client';

import React, { useState } from 'react';
import { DataInput } from '../../components/DataInput';
import { TemplateSelector } from '../../components/TemplateSelector';
import { ResumePreview } from '../../components/ResumePreview';
import { DownloadButton } from '../../components/DownloadButton';


const initialData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};

const App = () => {
  const [resumeData, setResumeData] = useState(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create professional, ATS-friendly resumes in minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="space-y-6">
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
            <DataInput 
              data={resumeData}
              onChange={setResumeData}
            />
          </div>

          {/* Right Panel - Preview & Download */}
          <div className="space-y-6">
            <div className="flex justify-end">
              <DownloadButton 
                resumeData={resumeData}
                templateId={selectedTemplate}
              />
            </div>
            <ResumePreview 
              data={resumeData}
              templateId={selectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
