// app/resume/page.jsx
'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ResumeAudit } from '../../components/resume-audit';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import { Loader2 } from 'lucide-react';

export default function ResumeAuditPage() {
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
        <title>Resume Audit - Prepex</title>
        <meta name="description" content="Get an AI-powered audit of your resume to identify strengths, weaknesses, and areas for improvement." />
      </Head>

      {/* Page Breadcrumb Area - Simplified for modern layout */}
      {/* <section className="py-8 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary mb-2">Resume Audit</h1>
          <p className="text-muted-foreground mb-3">
            Upload your resume (PDF) to receive an AI-powered analysis.
          </p>
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap justify-center md:justify-start text-sm text-muted-foreground gap-1.5">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><span className="mx-1">/</span></li>
              <li><Link href="/tools" className="hover:text-primary">Tools</Link></li>
              <li><span className="mx-1">/</span></li>
              <li className="font-medium text-primary" aria-current="page">Resume Audit</li>
            </ol>
          </nav>
        </div>
      </section> */}

      {/* Main Content Area */}
      <section className="py-0">
        <div className="container mx-auto px-6">
          <ResumeAudit />
        </div>
      </section>
    </>
  );
}
