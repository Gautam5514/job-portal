
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from '../../hooks/use-toast';
import { Loader2, Mail } from 'lucide-react';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { sendPasswordReset } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      await sendPasswordReset(email);
      setMessage('Password reset email sent! Please check your inbox (and spam folder).');
      toast({ title: "Email Sent", description: "Password reset email has been sent." });
      setEmail(''); 
    } catch (err) {
      setError(err.message);
      toast({ variant: "destructive", title: "Error", description: err.message });
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
          <CardTitle className="text-3xl font-bold text-primary">Forgot Your Password?</CardTitle>
          <CardDescription className="mt-1 text-muted-foreground">
            No worries! Enter your email and we'll send a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 sm:p-8">
          {error && (
            <p className="text-sm text-center text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
          )}
          {message && (
            <p className="text-sm text-center text-green-600 bg-green-500/10 p-3 rounded-md">{message}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Mail className="mr-2 h-5 w-5" />}
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="p-6 sm:p-8 text-sm text-center block border-t mt-2">
          <p className="text-muted-foreground">
            Remembered your password?{' '}
            <Link href="/login" passHref>
              <Button variant="link" className="p-0 h-auto text-primary hover:underline font-medium">
                Sign In
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
