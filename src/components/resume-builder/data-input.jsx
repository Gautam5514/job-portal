'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ManualForm } from './manual-form';
import { Linkedin, Edit, AlertCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useToast } from '../../hooks/use-toast';

export function DataInput({
    resumeData,
    updateResumeData,
    addArrayEntry,
    removeArrayEntry,
    updateArrayEntry,
    updateSkills,
    activeSection,
    setActiveSection
}) {
  const [linkedinUrl, setLinkedinUrl] = React.useState('');
  const [isImporting, setIsImporting] = React.useState(false);
  const { toast } = useToast();

  const handleLinkedInImport = async () => {
    setIsImporting(true);
    console.log('Attempting to import from LinkedIn URL:', linkedinUrl);

    // Simulate API call / Placeholder logic
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Inform user that the feature is not implemented
    toast({
        title: "LinkedIn Import Not Available",
        description: "This feature is for demonstration purposes only and is not functional.",
        variant: "destructive",
    });

    // Reset state
    setIsImporting(false);
    setLinkedinUrl(''); // Optionally clear the input
  };

  return (
    <Tabs defaultValue="manual" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="manual"><Edit className="mr-2 h-4 w-4"/> Manual Entry</TabsTrigger>
        <TabsTrigger value="linkedin" disabled><Linkedin className="mr-2 h-4 w-4"/> Import (Coming Soon)</TabsTrigger> {/* Disable tab */}
      </TabsList>

      {/* Manual Entry Form */}
      <TabsContent value="manual">
        <ManualForm
          resumeData={resumeData}
          updateResumeData={updateResumeData}
          addArrayEntry={addArrayEntry}
          removeArrayEntry={removeArrayEntry}
          updateArrayEntry={updateArrayEntry}
          updateSkills={updateSkills}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </TabsContent>

      {/* LinkedIn Import Placeholder */}
      <TabsContent value="linkedin">
        <div className="space-y-4 p-4 border rounded-md bg-card">
           <Alert variant="destructive">
             <AlertCircle className="h-4 w-4" />
             <AlertTitle>Feature Not Implemented</AlertTitle>
             <AlertDescription>
               LinkedIn import is currently unavailable in this demo. Please use the Manual Entry tab.
             </AlertDescription>
           </Alert>

          <h3 className="font-medium text-center pt-4">Import Profile Data (Demo)</h3>
           <p className="text-sm text-muted-foreground text-center">
             Paste your public LinkedIn profile URL below. (This feature is not functional yet).
          </p>
          <div className="space-y-2">
            <Label htmlFor="linkedin-url-import">LinkedIn Profile URL</Label>
            <Input
              id="linkedin-url-import"
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile/"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              disabled={true} // Disable input as feature is not ready
            />
          </div>
          <Button onClick={handleLinkedInImport} disabled={true} className="w-full">
            {isImporting ? 'Importing...' : 'Import Data'}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
