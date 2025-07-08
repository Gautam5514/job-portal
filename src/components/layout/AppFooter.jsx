
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="bg-secondary border-t border-border/60">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Image src="/assets/img/prepex.png" alt="Career Genius Logo" width={24} height={16} />
              <span className="text-lg font-semibold text-primary">Career Genius</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered tools to help you land your dream job. Optimize your resume, enhance your LinkedIn, and more.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Github size={18} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={18} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={18} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-card-foreground mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="text-muted-foreground hover:text-primary hover:underline">AI Tools</Link></li>
              <li><Link href="/build" className="text-muted-foreground hover:text-primary hover:underline">Resume Builder</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary hover:underline">Pricing</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary hover:underline">Blog (Coming Soon)</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-semibold text-card-foreground mb-3">Resources</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary hover:underline">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary hover:underline">FAQ</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary hover:underline">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter (Placeholder) */}
          <div className="space-y-3">
            <h5 className="font-semibold text-card-foreground mb-3">Stay Updated</h5>
            <p className="text-sm text-muted-foreground">Get the latest career tips and feature updates.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/60 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Career Genius. All rights reserved. Built with Next.js & Genkit.
        </div>
      </div>
    </footer>
  );
}
