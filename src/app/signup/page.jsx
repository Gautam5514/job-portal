'use client';
export const dynamic = 'force-dynamic';   

import { Suspense, useState } from 'react'; // Import Suspense
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from '../../hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// Component #1: A Skeleton UI for the fallback
// This provides a better user experience by showing a loading state that matches the final layout.
function SignupSkeleton() {
  return (
    <Card className="w-full max-w-md shadow-xl rounded-xl animate-pulse">
      <CardHeader className="text-center p-6 sm:p-8">
        <div className="h-14 w-14 bg-muted rounded-full mx-auto mb-6"></div>
        <div className="h-8 w-3/4 bg-muted rounded mx-auto"></div>
        <div className="h-5 w-1/2 bg-muted rounded mx-auto mt-2"></div>
      </CardHeader>
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="space-y-5">
          <div className="space-y-2"><div className="h-4 w-24 bg-muted rounded"></div><div className="h-11 w-full bg-muted rounded"></div></div>
          <div className="space-y-2"><div className="h-4 w-24 bg-muted rounded"></div><div className="h-11 w-full bg-muted rounded"></div></div>
          <div className="space-y-2"><div className="h-4 w-24 bg-muted rounded"></div><div className="h-11 w-full bg-muted rounded"></div></div>
          <div className="space-y-2"><div className="h-4 w-32 bg-muted rounded"></div><div className="h-11 w-full bg-muted rounded"></div></div>
          <div className="h-11 w-full bg-primary/20 rounded mt-1"></div>
        </div>
      </CardContent>
      <CardFooter className="p-6 sm:p-8 block border-t mt-2">
        <div className="h-5 w-3/4 bg-muted rounded mx-auto"></div>
      </CardFooter>
    </Card>
  );
}

// Component #2: The actual form logic
// This component contains all your original state and handlers.
// It's the part that actually needs client-side data from useSearchParams.
function SignupForm() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast({ variant: "destructive", title: "Signup Failed", description: "Passwords do not match." });
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      toast({ variant: "destructive", title: "Signup Failed", description: "Password should be at least 6 characters." });
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await signUpWithEmail(email, password, displayName);
      toast({ title: "Signup Successful", description: "Welcome! Your account has been created." });
      router.push('/dashboard'); 
    } catch (err) {
      setError(err.message);
      toast({ variant: "destructive", title: "Signup Failed", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle(); 
      toast({ title: "Signup Successful", description: "Welcome!" });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
      toast({ variant: "destructive", title: "Google Signup Failed", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  // This JSX is just the Card from your original component
  return (
    <Card className="w-full max-w-md shadow-xl rounded-xl">
      <CardHeader className="text-center p-6 sm:p-8">
         <Link href="/" className="inline-block mb-6">
           <Image src="/assets/img/prepex.png" alt="Career Genius Logo" width={56} height={56} className="mx-auto" />
         </Link>
        <CardTitle className="text-3xl font-bold text-primary">Create Your Account</CardTitle>
        <CardDescription className="mt-1 text-muted-foreground">Join Career Genius and elevate your career.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6 sm:p-8">
        {error && (
          <p className="text-sm text-center text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
        )}
        <form onSubmit={handleEmailSignup} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="displayName">Full Name</Label>
            <Input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g., Jane Doe" required disabled={isLoading} className="h-11 text-base"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required disabled={isLoading} className="h-11 text-base"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="•••••••• (min. 6 characters)" required disabled={isLoading} className="h-11 text-base"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required disabled={isLoading} className="h-11 text-base"/>
          </div>
          <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
            {isLoading && !email ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
            {isLoading && email ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or sign up with</span></div>
        </div>
        <Button variant="outline" className="w-full h-11 text-base" onClick={handleGoogleSignup} disabled={isLoading}>
           {isLoading && !email ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 
              <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 400.3 381.2 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
          }
          Sign up with Google
        </Button>
      </CardContent>
      <CardFooter className="p-6 sm:p-8 text-sm text-center block border-t mt-2">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" passHref>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline font-medium">Sign In</Button>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}


// Component #3: The Page itself (default export)
// This component sets up the page layout and uses Suspense to wrap the form.
export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<SignupSkeleton />}>
        <SignupForm />
      </Suspense>
    </div>
  );
}