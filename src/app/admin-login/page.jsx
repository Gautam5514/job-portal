
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from '../../hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signInWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/admin'); 
    } catch (err) {
      setError(err.message);
      toast({ variant: "destructive", title: "Login Failed", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <CardHeader className="text-center p-6 sm:p-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/assets/img/prepex.png" alt="Prepex Logo" width={56} height={56} className="mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
          <CardDescription className="mt-1 text-muted-foreground">Sign in to access your Prepex account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 sm:p-8">
          {error && (
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
