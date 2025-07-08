
import { BrainCircuit, Target, ShieldCheck, Clock, LayoutTemplate, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Precision',
    description: 'Leverage cutting-edge AI for insightful, accurate, and actionable feedback tailored to your profile.',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'ATS-Optimized',
    description: 'Our tools help you craft resumes and profiles that pass through Applicant Tracking Systems effectively.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Feedback',
    description: 'Receive detailed analysis covering all critical aspects of your resume and LinkedIn profile.',
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
    title: 'Professional Templates',
    description: 'Choose from a variety of modern, ATS-friendly resume templates to build a standout document.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Time-Saving & Efficient',
    description: 'Get expert-level insights and build professional documents in a fraction of the time.',
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Data-Driven Improvements',
    description: 'Understand your profile\'s strengths and weaknesses with clear scores and metrics.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Gain The Professional Edge
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Discover why Career Genius is the smart choice for your career advancement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start space-x-4 p-6 rounded-lg bg-indigo-50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
