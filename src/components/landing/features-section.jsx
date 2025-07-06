
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { FileText, Linkedin, Briefcase, ArrowRight } from 'lucide-react';

const features = [
  {
    IconComponent: FileText,
    title: 'AI Resume Audit',
    description: 'Upload your resume for an in-depth AI analysis. Get an ATS compatibility score, identify strengths, weaknesses, and receive actionable suggestions for improvement.',
    link: '/tools#resume',
    cta: 'Audit Your Resume',
    imageSrc: 'https://picsum.photos/500/350?random=feat1',
    imageAlt: 'AI analyzing a resume document digitally',
    dataAiHint: 'resume analysis',
  },
  {
    IconComponent: Linkedin,
    title: 'LinkedIn Profile Analysis',
    description: 'Submit your LinkedIn profile URL or PDF for a comprehensive review. Receive feedback on your headline, summary, experience, skills, and more.',
    link: '/tools#linkedin',
    cta: 'Analyze LinkedIn Profile',
    imageSrc: 'https://picsum.photos/500/350?random=feat2',
    imageAlt: 'LinkedIn profile page on a laptop screen',
    dataAiHint: 'linkedin profile',
  },
  {
    IconComponent: Briefcase,
    title: 'Professional Resume Builder',
    description: 'Craft a compelling, ATS-friendly resume using our selection of high-quality templates. Input your details manually or (soon) import from LinkedIn.',
    link: '/build',
    cta: 'Build Your Resume',
    imageSrc: 'https://picsum.photos/500/350?random=feat3',
    imageAlt: 'Person building a resume on a computer',
    dataAiHint: 'resume builder',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Unlock Your Potential with Prepex
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our suite of tools is designed to help you present the best version of yourself to potential employers.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                index % 2 === 1 ? 'md:grid-flow-row-dense' : ''
              }`}
            >
              <div className={`md:order-${index % 2 === 1 ? '2' : '1'}`}>
                <div className="mb-4">
                  <feature.IconComponent className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link href={feature.link}>
                    {feature.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className={`md:order-${index % 2 === 1 ? '1' : '2'}`}>
                <Image
                  src={feature.imageSrc}
                  alt={feature.imageAlt}
                  width={500}
                  height={350}
                  className="rounded-lg shadow-xl object-cover aspect-[5/3.5]"
                  data-ai-hint={feature.dataAiHint}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
