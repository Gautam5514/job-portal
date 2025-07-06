import React, { useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export const DownloadButton = ({ resumeData, templateId }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: resumeData.personalInfo.fullName 
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume`
      : 'Resume',
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  });

  useEffect(() => {
    const resumeElement = document.getElementById('resume-preview');
    if (resumeElement && componentRef.current !== resumeElement) {
      componentRef.current = resumeElement;
    }
  }, []);

  return (
    <Button onClick={handlePrint} className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Download PDF
    </Button>
  );
};
