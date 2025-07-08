// app/linkedin/page.jsx
'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LinkedInAnalysis } from '../../components/linkedin-analysis';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';

export default function LinkedInAuditPage() {
  const { loading: authLoading } = useAuth();

  // useEffect for any client-side initializations if needed in the future
  useEffect(() => {
    // Placeholder for client-side logic
  }, []);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>LinkedIn Profile Analysis - Career Genius</title>
        <meta name="description" content="Get an AI-powered analysis of your LinkedIn profile to optimize it for success." />
      </Head>

       {/* Page Breadcrumb Area - Simplified for modern layout */}
      {/* <section className="py-8 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary mb-2">LinkedIn Profile Analysis</h1>
          <p className="text-muted-foreground mb-3">
            Provide your public LinkedIn URL or upload a PDF export for an AI-driven review.
          </p>
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap justify-center md:justify-center   text-sm text-muted-foreground gap-1.5">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><span className="mx-1">/</span></li>
              <li><Link href="/tools" className="hover:text-primary">Tools</Link></li>
              <li><span className="mx-1">/</span></li>
              <li className="font-medium text-primary" aria-current="page">LinkedIn Analysis</li>
            </ol>
          </nav>
        </div>
      </section> */}

      {/* Main Content Area */}
      <section className=" flex justify-center py-0 bg-white">
        <div className="w-fit px-6 bg-white">
          <LinkedInAnalysis />
        </div>
      </section>
    </>
  );
}
