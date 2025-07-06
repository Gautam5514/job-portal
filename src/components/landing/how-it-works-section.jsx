
import { UploadCloud, ScanSearch, FileCheck, UserCheck, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const steps = [
  {
    icon: <UploadCloud className="h-10 w-10 text-accent" />,
    title: 'Step 1: Choose Your Tool',
    description: 'Upload your resume, provide your LinkedIn profile (URL or PDF), or start fresh with our resume builder.',
  },
  {
    icon: <ScanSearch className="h-10 w-10 text-accent" />,
    title: 'Step 2: Get AI-Powered Analysis',
    description: 'Our intelligent algorithms analyze your document or profile, providing detailed scores, feedback, and insights.',
  },
  {
    icon: <Construction className="h-10 w-10 text-accent" />,
    title: 'Step 3: Build & Refine',
    description: 'Use the actionable recommendations to improve your resume or LinkedIn profile. Build a new resume with our ATS-friendly templates.',
  },
   {
    icon: <FileCheck className="h-10 w-10 text-accent" />, // or UserCheck
    title: 'Step 4: Succeed',
    description: 'Present your polished professional profile with confidence and increase your chances of landing your dream job.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Simple Steps to a Polished Profile
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Achieving a professional-grade resume and LinkedIn profile is easier than you think.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center">
                <div className="p-3 bg-accent/10 rounded-full mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-xl text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
