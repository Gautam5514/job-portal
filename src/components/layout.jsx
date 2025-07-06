
import { Briefcase, FileText, Wrench } from 'lucide-react'; // Using Briefcase icon & FileText for Builder, Wrench for Tools
import Link from 'next/link'; // Import Link for navigation
import { Button } from '@/components/ui/button'; // Import Button for styling links

export function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between"> {/* Use justify-between */}
          <div className="flex items-center"> {/* Group Logo and Title */}
             <Link href="/" className="flex items-center mr-6"> {/* Link the logo/title to home */}
                <Briefcase className="h-6 w-6 mr-2 text-primary" />
                <span className="font-bold text-lg text-primary">Prepex</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
             <Button variant="ghost" asChild>
              <Link href="/tools">
                <Wrench className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">AI Tools</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/build">
                <FileText className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Resume Builder</span>
              </Link>
            </Button>
            {/* Add more navigation links here if needed */}
          </nav>

          {/* Optional User Menu Area */}
          <div>
            {/* Placeholder for User Avatar/Login Button */}
          </div>
        </div>
      </header>
      <main className="flex-1"> {/* Removed container and py-8 from here as pages will manage their own padding */}
        {children}
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t bg-secondary">
         <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js & Genkit. &copy; {new Date().getFullYear()} Prepex.
          </p>
        </div>
      </footer>
    </div>
  );
}
