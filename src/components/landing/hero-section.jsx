
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            Elevate Your Career with AI-Powered Profile Polishing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Get expert analysis on your resume and LinkedIn profile, and build a standout resume with our intelligent tools. Career Genius helps you make the best first impression.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="/tools">
                Analyze Your Profile <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="/build">
                Build Your Resume
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <Image
            src="https://picsum.photos/1200/600?random=hero"
            alt="Professionals collaborating"
            width={1200}
            height={600}
            className="rounded-lg shadow-2xl object-cover"
            data-ai-hint="team collaboration office"
            priority
          />
        </div>
      </div>
    </section>
  );
}
