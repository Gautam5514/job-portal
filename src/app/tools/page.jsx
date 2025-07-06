
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeAudit } from "@/components/resume-audit";
import { LinkedInAnalysis } from "@/components/linkedin-analysis";
import { FileText, Linkedin } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">Polish Your Profile</h1>
      <p className="text-center text-muted-foreground mb-8">
        Utilize our AI-powered tools to audit your resume or analyze your LinkedIn profile for actionable insights.
      </p>
      <Tabs defaultValue="resume" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="resume">
            <FileText className="mr-2 h-4 w-4" />
            Resume Audit
          </TabsTrigger>
          <TabsTrigger value="linkedin">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="resume">
          <ResumeAudit />
        </TabsContent>
        <TabsContent value="linkedin">
          <LinkedInAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}
