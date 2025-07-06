import React from 'react';
import { ClassicTemplate } from './resume-builder/templates/ClassicTemplate';
import { ModernTemplate } from './resume-builder/templates/ModernTemplate';
import { ElegantTemplate } from './resume-builder/templates/ElegantTemplate';
import { MinimalTemplate } from './resume-builder/templates/MinimalTemplate';
import { ColorfulTemplate } from './resume-builder/templates/ColorfulTemplate';
import { CreativeTemplate } from './resume-builder/templates/CreativeTemplate';
import { BusinessTemplate } from './resume-builder/templates/BusinessTemplate';

export const ResumePreview = ({ data, templateId }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'colorful':
        return <ColorfulTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'business':
        return <BusinessTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-lg bg-white print:border-0 print:shadow-none">
      <div 
        id="resume-preview" 
        className="w-full max-w-[8.5in] mx-auto bg-white print:max-w-none print:mx-0"
        style={{ minHeight: '11in' }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
