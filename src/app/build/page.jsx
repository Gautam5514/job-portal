
'use client';

import * as React from 'react';
import { useState } from 'react';
import { TemplateSelector } from '../../components/resume-builder/template-selector';
import { DataInput } from '../../components/resume-builder/data-input';
import { ResumePreview } from '../../components/resume-builder/resume-preview';
import { Button } from '../../components/ui/button';
import { Download, FilePlus2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { useToast } from '../../hooks/use-toast'; 

const initialResumeData = {
  personalInfo: { name: '', title: '', phone: '', email: '', linkedin: '', github: '', portfolio: '', location: '' },
  summary: '',
  experience: [], 
  education: [], 
  skills: [], 
  projects: [], 
  certifications: [], 
};

export default function ResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern'); 
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeSection, setActiveSection] = useState('personalInfo'); 
  const { toast } = useToast(); 

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const updateResumeData = (section, dataOrValue) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: dataOrValue,
    }));
  };

  const addArrayEntry = (section) => {
     let newEntry;
     switch (section) {
        case 'experience':
            newEntry = { id: Date.now(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' };
            break;
        case 'education':
            newEntry = { id: Date.now(), degree: '', school: '', location: '', startDate: '', endDate: '', description: '' };
            break;
        case 'projects':
            newEntry = { id: Date.now(), name: '', description: '', technologies: '', link: '' };
            break;
        case 'certifications':
            newEntry = { id: Date.now(), name: '', issuingOrganization: '', dateIssued: '', credentialId: '', credentialUrl: '' };
            break;
        default:
            return; 
     }

     setResumeData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], newEntry],
    }));
  };

  const removeArrayEntry = (section, id) => {
     setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter(entry => entry.id !== id),
    }));
  };

  const updateArrayEntry = (section, id, field, value) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    }));
  };

  const updateSkills = (skillsString) => {
     const currentSkillsString = skillsString || '';
     const skillsArray = currentSkillsString.split(',').map(skill => skill.trim()).filter(Boolean);
     setResumeData(prevData => ({
        ...prevData,
        skills: skillsArray,
     }));
  }

  const handleDownload = () => {
    console.log('Attempting Download...');
    console.log('Selected Template:', selectedTemplate);
    console.log('Resume Data:', JSON.stringify(resumeData, null, 2));
    toast({
        title: "Download Not Implemented",
        description: "Generating a PDF resume is not yet supported in this demo.",
        variant: "destructive",
    });
  };

  React.useEffect(() => {
    // console.log("Resume data updated, skills:", resumeData.skills); // Keep for debugging if needed
  }, [resumeData.skills]);

  return (
     <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
            <FilePlus2 className="h-16 w-16 text-primary mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Resume Builder</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Craft a professional, ATS-friendly resume with our intuitive builder and premium templates.
            </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/30 p-5">
              <CardTitle className="text-xl font-semibold text-primary">1. Select Your Style</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Choose a template that fits your profession.</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateSelect}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl overflow-hidden">
             <CardHeader className="bg-muted/30 p-5">
               <CardTitle className="text-xl font-semibold text-primary">2. Enter Your Details</CardTitle>
               <CardDescription className="text-sm text-muted-foreground">Fill in your information section by section.</CardDescription>
             </CardHeader>
             <CardContent className="p-5">
                <DataInput
                  resumeData={resumeData}
                  updateResumeData={updateResumeData}
                  addArrayEntry={addArrayEntry}
                  removeArrayEntry={removeArrayEntry}
                  updateArrayEntry={updateArrayEntry}
                  updateSkills={updateSkills}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
             </CardContent>
          </Card>

           <Button onClick={handleDownload} className="w-full mt-6 h-12 text-base" size="lg">
             <Download className="mr-2 h-5 w-5" />
             Download Resume (PDF - Coming Soon)
           </Button>
           <p className="text-xs text-muted-foreground text-center mt-2">Note: PDF generation is not implemented yet.</p>
        </div>

        <div className="lg:col-span-2 lg:sticky lg:top-24 h-[calc(100vh-8rem)] overflow-hidden"> 
          <Card className="shadow-2xl rounded-xl h-full flex flex-col bg-secondary/30 border-2 border-dashed">
             <CardHeader className="p-5 border-b bg-muted/20">
               <CardTitle className="text-xl font-semibold text-primary flex items-center"><Eye className="mr-2 h-5 w-5"/>Live Preview</CardTitle>
               <CardDescription className="text-sm text-muted-foreground">Your resume updates in real-time as you type.</CardDescription>
             </CardHeader>
             <Separator />
             <CardContent className="flex-1 overflow-auto p-0"> 
               <div className="py-8 flex justify-center items-start min-h-full bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800 dark:to-gray-900">
                  <ResumePreview
                    templateId={selectedTemplate}
                    data={resumeData}
                  />
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </section>
  );
}
