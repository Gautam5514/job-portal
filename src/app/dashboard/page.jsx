'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { Linkedin, User, Settings, LogOut, Briefcase, Sparkles, ArrowRight, Star, Save } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';
import { Separator } from '../../components/ui/separator';

export default function DashboardPage() {
  const { user, userData, loading, signOutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Updated skeleton for the final, clean layout
  if (loading || !user || !userData) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Skeleton className="h-10 w-3/4 mb-3" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="space-y-12">
            <Skeleton className="h-44 w-full rounded-xl" />
            <div>
              <Skeleton className="h-8 w-48 mb-5" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
              </div>
            </div>
            <div>
              <Skeleton className="h-8 w-32 mb-5" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-36 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPlan = userData.subscription?.plan || 'Free';
  const subscription = userData.subscription; 
  
  const toolCards = [
    // { title: "Resume Audit", Icon: Sparkles, description: "Get AI-powered feedback on your resume.", link: "/resume" },
    // { title: "LinkedIn Analysis", Icon: Linkedin, description: "Optimize your LinkedIn profile with AI.", link: "/linkedin" },
    { title: "Resume Builder", Icon: Briefcase, description: "Craft a professional, ATS-friendly resume.", link: "/build" },
    { title: "My Saved Jobs", Icon: User, description: "Keep track of your job applications.", link: "/saved-jobs" },
    { title: "Job Portal", Icon: Save, description: "Find and apply for jobs tailored to your skills.", link: "/job-portal" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- The Clean Header - Just the Title --- */}
        <div className="mb-12">
          <h1 className="pt-4 text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
            Welcome back, 
          </h1>
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{userData.displayName || 'User'}</span>
          <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">Here's your command center for career success.</p>
        </div>

        {/* --- Main Content Area --- */}
        <div className="space-y-12">
            
            {/* --- Premium Subscription Card --- */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-900 text-white  rounded-xl border-none">
              <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <Star className="h-6 w-6 text-yellow-300" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-white">Your Plan: {currentPlan}</CardTitle>
                            <CardDescription className="text-blue-100">
                                {currentPlan.toLowerCase() === 'free' ? 'Upgrade to unlock all features.' : 'You have access to all Pro features.'}
                            </CardDescription>
                            {currentPlan.toLowerCase() !== 'free' && !subscription?.isExpired && (
                              <p className="text-sm text-white/80 mt-1">
                                Your plan expires in{" "}
                                <span className="font-semibold text-white">
                                  {Math.ceil((subscription.endDate.seconds * 1000 - Date.now()) / (1000 * 60 * 60 * 24))} days
                                </span>
                              </p>
                            )}
                        </div>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentPlan.toLowerCase() === 'free' ? (
                  <Button asChild size="lg" className="w-full md:w-auto bg-white text-blue-700 font-bold hover:bg-slate-100 transition-all duration-300 shadow-md hover:shadow-lg">
                    <Link href="/pricing">Upgrade to Pro Today <ArrowRight className="ml-2 h-4 w-4"/></Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full md:w-auto bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white">
                    <Link href="/pricing">Manage Subscription</Link>
                  </Button>
                )}
              </CardContent>
            </div>

            {/* --- AI-Powered Tools Section --- */}
            <div>
              <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-5">AI-Powered Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolCards.map((card) => (
                  <Link href={card.link} key={card.title} className="group block">
                    <div className="rounded-xl bg-indigo-50 border-none shadow-none h-full transition-all duration-300 hover:-translate-y-2">
                      <CardHeader className="p-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 mb-4">
                          <card.Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">{card.description}</CardDescription>
                      </CardHeader>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />
        </div>
      </div>
    </div>
  );
}