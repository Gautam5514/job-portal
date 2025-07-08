
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
// import { useToast } from '../../hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  // const { toast } = useToast();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch (err) {
      const friendlyMessage = getFirebaseErrorMessage(err);
      setError(friendlyMessage);
      toast.error(friendlyMessage); // ✅ Better than `toast({})`
    } finally {
      setIsLoading(false);
    }
  };

  const getFirebaseErrorMessage = (error) => {
  if (!error) return "Unknown error occurred";
  if (typeof error === "string") return error;
  if (error.code) {
    switch (error.code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Try again later.";
      case "auth/invalid-credential":
        return "Invalid credential. Try again.";
      default:
        return error.message || "Authentication failed.";
    }
  }
  return "Something went wrong.";
};

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      toast.success('Login Successful ! Welcome Back');
      router.push('/dashboard'); 
    } catch (err) {
       const friendlyMessage = getFirebaseErrorMessage(err);
        setError(friendlyMessage);
        toast.err(friendlyMessage   );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
         {/* <Button onClick={() => toast({ title: "Toast Test", description: "It works!" })}>Test Toast</Button> */}
        <CardHeader className="text-center px-4 py-4 sm:p-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/assets/img/prepex.png" alt="Career Genius Logo" width={56} height={56} className="h-9 w-auto mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
          <CardDescription className="mt-1 text-muted-foreground">Sign in to access your Career Genius account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 px-6 py-2 sm:p-8">
          {error &&  (
            <p className="text-sm text-center text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
          )}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                className="h-11 text-base"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" passHref>
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary hover:underline">
                    Forgot password?
                  </Button>
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="h-11 text-base"
              />
            </div>
           

            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading && !email ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
              {isLoading && email ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full h-11 text-base" onClick={handleGoogleLogin} disabled={isLoading}>
            {isLoading && !email ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 
                <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 400.3 381.2 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
            }
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="p-6 sm:p-8 text-sm text-center block border-t mt-2">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" passHref>
              <Button variant="link" className="p-0 h-auto text-primary hover:underline font-medium">
                Sign up
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
