
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress"; 
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  CheckCircle,
  XCircle,
  Lightbulb,
  TrendingUp,
  Loader2,
  Upload,
  Star,
  Activity,
  FileText,
  Lock,
  Sparkles,
  ScanSearch,
  ChevronRight
} from "lucide-react";
import { resumeAudit } from '../ai/flows/resume-audit'; 
import { fileToDataUri } from "../lib/utils.js";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"; 
import { Label as RadixLabel } from "@radix-ui/react-label"; 
import { cn } from "../lib/utils";
import * as React from "react";
import { useAuth } from "../contexts/AuthContext"; 
import Link from "next/link"; 

const isValidAnalysisResult = (result) => {
  return (
    result &&
    typeof result.overallScore === "number" &&
    typeof result.atsScore === "number" &&
    typeof result.summary === "string" &&
    Array.isArray(result.strengths) &&
    Array.isArray(result.weaknesses) &&
    Array.isArray(result.sectionFeedback) &&
    result.sectionFeedback.every(
      (item) =>
        item &&
        typeof item.section === "string" &&
        typeof item.score === "number" &&
        typeof item.feedback === "string" &&
        Array.isArray(item.suggestions) &&
        Array.isArray(item.references)
    ) &&
    Array.isArray(result.atsSuggestions) &&
    Array.isArray(result.actionableRecommendations)
  );
};


const Label = React.forwardRef(({ className, ...props }, ref) => (
  <RadixLabel
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";


const FreemiumLock = ({ message = "Upgrade to Pro to unlock full details.", contentType = "generic" }) => {
  let placeholderText = "Detailed insights and examples are available for Pro users. Upgrade now to enhance your resume effectively.";
  if (contentType === "suggestions") {
    placeholderText = "Detailed improvement suggestions and rewrite examples appear here for Pro users. Enhance your resume with expert AI guidance...";
  } else if (contentType === "references") {
    placeholderText = "Specific examples from your resume and detailed comments are available for Pro users. Unlock now to see exactly how your resume content is perceived...";
  }

  return (
    <div className="relative p-4 border border-dashed rounded-lg bg-muted/30 text-center my-4 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/40 backdrop-blur-sm flex flex-col justify-center items-center z-10 rounded-lg p-3">
        <Lock className="h-7 w-7 text-primary mb-2" />
        <p className="text-sm font-semibold text-primary mb-2 text-center">{message}</p>
        <Button asChild size="sm" className="shadow-md hover:shadow-lg transition-shadow">
          <Link href="/pricing">Upgrade to Pro <ChevronRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="opacity-20 blur-sm pointer-events-none select-none py-2">
        <p className="text-muted-foreground text-xs leading-relaxed">
          {placeholderText}
        </p>
        <div className="h-3 bg-muted rounded mt-2 w-3/4 mx-auto"></div>
        <div className="h-3 bg-muted rounded mt-1.5 w-1/2 mx-auto"></div>
        <div className="h-3 bg-muted rounded mt-1.5 w-5/6 mx-auto md:hidden"></div>
      </div>
    </div>
  );
};


export function ResumeAudit() {
  const { user, userData, loading: authLoading } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");


  const isProUser = userData?.subscription?.plan === 'pro' || userData?.subscription?.plan === 'premium';

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setFileName(file.name);
        setError(null);
        setAnalysisResult(null);
      } else {
        setError("Please upload a PDF file.");
        setSelectedFile(null);
        setFileName("");
      toast.error("Invalid file type. Please upload a PDF file.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast((t) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '12px 16px',
      background: '#ffffff',
      border: '1px solid #e5e7eb',      // gray-200
      borderLeft: '4px solid #f87171',  // red-400 accent
      borderRadius: '6px',
    }}
  >
    <strong style={{ color: '#991b1b', fontSize: '16px' /* red-800 */ }}>
      Authentication Required
    </strong>
    <span style={{ color: '#4b5563', fontSize: '14px' /* gray-700 */ }}>
      Please log in or sign up to analyze your resume.
    </span>
    <Link href="/login" passHref>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.dismiss(t.id)}
      >
        Login
      </Button>
    </Link>
  </div>
), {
  duration: 5000,
  position: 'top-center',
});
      return;
    }

    if (!selectedFile) {
      setError("Please select a resume file to upload.");
      toast.error("Please select a resume file to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const resumeDataUri = await fileToDataUri(selectedFile);
      const result = await resumeAudit({ resumeDataUri });

      if (isValidAnalysisResult(result)) {
        setAnalysisResult(result);
 toast(
      // first arg can be a string or JSX
      <div style={{ padding: '8px 12px' }}>
        <strong>Analysis Complete</strong>
        <div style={{ marginTop: 4, fontSize: 14, color: '#555' }}>
          {isProUser
            ? 'Your detailed resume audit results are ready.'
            : 'Your basic resume audit is ready. Upgrade for full details!'}
        </div>
      </div>,
      // optional toast options
      {
        duration: 5000,
        position: 'top-right',
        // you can customize styling/border/radius here
        style: {
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: 6,
        },
      }
    );
      } else {
        console.error("Received invalid analysis result structure:", result);
        setAnalysisResult(null);
        throw new Error(
          "Received analysis data is not in the expected format."
        );
      }
    } catch (err) {
      console.error("Error during resume audit:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unknown error occurred during analysis.";
      setError(`Analysis failed: ${errorMessage}`);
      setAnalysisResult(null);
      toast.error(`Analysis failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName("");
    setError(null);
    setAnalysisResult(null);
  };

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  };

  if (authLoading) {
    return <div className="w-full p-6 text-center"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /> <p className="text-muted-foreground">Loading user data...</p></div>;
  }

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <Toaster/>
      <div className="pt-0">
      
        <div className="w-fit max-w-lg mx-auto p-0 border-2 border-dashed border-blue-400 dark:border-blue-600 rounded-2xl flex flex-col items-center justify-center space-y-4 text-center m-5">
          <div className="pt-6 pb-0 px-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Upload Your Resume</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Get instant AI-powered feedback. PDF format only.
            </p>
          </div>

          <div className="p-0">
            <form onSubmit={handleSubmit} className="pt-6 pb-6 px-6 text-center">

              {/* --- This container holds all upload-related states --- */}
              <div>
                {/* STATE: DEFAULT (The dropzone from your image) */}
                {!selectedFile && !isLoading && (
                  <div className="relative">
                    {/* This invisible input is the actual file selector */}
                    <input
                      id="resume-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      aria-label="Upload resume"
                    />
                    <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-2xltext-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                        <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                        Drag and Drop file to upload
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">or</p>

                      {/* This label acts as the visible "Browse" button */}
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer bg-blue-600 text-white font-medium py-2.5 px-8 rounded-full hover:bg-blue-700 transition-colors duration-200 z-20 relative"
                      >
                        Browse
                      </label>

                      <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">
                        Supported file: PDF
                      </p>
                    </div>
                  </div>
                )}

                {/* STATE: FILE SELECTED (Clean summary) */}
                {selectedFile && !isLoading && (
                  <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 rounded-lg p-4 transition-all duration-300 mb-[20px]">
                    <div className="flex items-center justify-between flex-nowrap">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                          {fileName}
                        </p> 
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex-shrink-0 ml-4"
                        aria-label="Remove selected file"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}

                {/* STATE: LOADING (Analysis in progress) */}
                {isLoading && (
                  <div className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 transition-all duration-300 mb-[20px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 animate-spin" />
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                          Analyzing: {fileName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- SUBMIT BUTTON --- */}
              <Button
                type="submit"
                disabled={!selectedFile || isLoading || authLoading}
                className="w-full h-12 text-base font-semibold rounded-lg"
                size="lg"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</>
                ) : (
                  <><Sparkles className="mr-2 h-5 w-5" /> Analyze Resume</>
                )}
              </Button>

            </form>
          </div>
        </div>

        {isLoading && (
          <div className="mt-6 text-center p-8 border border-dashed rounded-lg bg-card">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              Analyzing your resume...
            </p>
            <p className="text-sm text-muted-foreground">
              This might take a moment, please wait. Our AI is hard at work!
            </p>
          </div>
        )}

        {error && !isLoading && (
          <Alert variant="destructive" className="mt-6 max-w-2xl mx-auto">
            <XCircle className="h-5 w-5" />
            <AlertTitle className="font-semibold">Analysis Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysisResult && !isLoading && !error && (
          <div className="mt-10 space-y-8">
            <Card className="shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-muted/30 p-6">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-primary">
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-400" /> Overall Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-background shadow-sm">
                    <div className="w-28 h-28 relative mb-2">
                      <Progress
                        value={analysisResult.overallScore * 10}
                        className="w-full h-full rounded-full absolute inset-0"
                        style={{
                          background: `conic-gradient(hsl(var(--primary)) ${analysisResult.overallScore * 36
                            }deg, hsl(var(--muted)) ${analysisResult.overallScore * 36}deg)`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">
                          {analysisResult.overallScore}
                          <span className="text-base text-muted-foreground">
                            /10
                          </span>
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Overall Quality</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-background shadow-sm">
                    <div className="w-28 h-28 relative mb-2 flex items-center justify-center">
                      <ScanSearch className="h-12 w-12 text-teal-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 z-0" />
                      <span className="text-4xl font-bold text-teal-600 relative z-10">{analysisResult.atsScore}<span className="text-xl text-muted-foreground">/100</span></span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">ATS Compatibility Score</p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Summary:</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {isProUser ? analysisResult.summary : analysisResult.summary.substring(0, 200) + (analysisResult.summary.length > 200 ? "... " : "")}
                    {!isProUser && analysisResult.summary.length > 200 && <Button variant="link" size="sm" asChild className="p-0 h-auto ml-1"><Link href="/pricing">Upgrade for full summary.</Link></Button>}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Accordion type="multiple" className="w-full space-y-3">
              <AccordionItem value="strengths" className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-green-700 hover:no-underline hover:bg-green-500/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" /> Strengths
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-2">
                  {analysisResult.strengths.length > 0 ? (
                    <ul className="space-y-3">
                      {(isProUser ? analysisResult.strengths : analysisResult.strengths.slice(0, 1)).map((item, index) =>
                        item &&
                          typeof item.text === "string" &&
                          typeof item.source === "string" ? (
                          <li key={index} className="text-sm p-3 border-l-4 border-green-500 bg-green-500/5 rounded-r-md">
                            <p className="font-medium text-green-800">{item.text}</p>
                            <p className="text-xs text-muted-foreground italic mt-1">
                              <span className="font-semibold">Source:</span> "{item.source}"
                            </p>
                          </li>
                        ) : null
                      )}
                      {!isProUser && analysisResult.strengths.length > 1 && <FreemiumLock message="Upgrade to Pro to see all identified strengths." contentType="generic" />}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No specific strengths identified.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="weaknesses" className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-red-700 hover:no-underline hover:bg-red-500/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5" /> Weaknesses
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-2">
                  {analysisResult.weaknesses.length > 0 ? (
                    <ul className="space-y-3">
                      {(isProUser ? analysisResult.weaknesses : analysisResult.weaknesses.slice(0, 1)).map((item, index) =>
                        item &&
                          typeof item.text === "string" &&
                          typeof item.source === "string" ? (
                          <li key={index} className="text-sm p-3 border-l-4 border-red-500 bg-red-500/5 rounded-r-md">
                            <p className="font-medium text-red-800">{item.text}</p>
                            <p className="text-xs text-muted-foreground italic mt-1">
                              <span className="font-semibold">Source:</span> "{item.source}"
                            </p>
                          </li>
                        ) : null
                      )}
                      {!isProUser && analysisResult.weaknesses.length > 1 && <FreemiumLock message="Upgrade to Pro to see all identified weaknesses." contentType="generic" />}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No specific weaknesses identified.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-muted/30 p-6">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-primary">
                  <Activity className="h-6 w-6 text-indigo-600" /> Section-wise Feedback
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Detailed scores and AI comments for each major resume section.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {Array.isArray(analysisResult.sectionFeedback) &&
                  analysisResult.sectionFeedback.length > 0 && isProUser && (
                    <div className="h-[350px] w-full mb-6 p-4 border rounded-lg bg-background">
                      <ChartContainer
                        config={chartConfig}
                        className="w-full h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={analysisResult.sectionFeedback
                              .filter(
                                (item) =>
                                  item &&
                                  typeof item.section === "string" &&
                                  typeof item.score === "number"
                              )
                              .map((item) => ({
                                section: item.section,
                                score: item.score,
                              }))}
                            layout="vertical"
                            margin={{ left: 20, right: 40 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              horizontal={false}
                            />
                            <XAxis
                              type="number"
                              domain={[0, 10]}
                              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                              stroke="hsl(var(--border))"
                            />
                            <YAxis
                              dataKey="section"
                              type="category"
                              width={100} 
                              tick={{
                                fontSize: 12,
                                fill: "hsl(var(--foreground))",
                              }}
                              stroke="hsl(var(--border))"
                            />
                            <RechartsTooltip
                              cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                              content={<ChartTooltipContent hideLabel className="shadow-lg rounded-md" />}
                            />
                            <Bar
                              dataKey="score"
                              fill="var(--color-score)"
                              radius={[0, 4, 4, 0]}
                              barSize={25}
                            >
                              <LabelList
                                dataKey="score"
                                position="right"
                                offset={8}
                                fontSize={12}
                                fill="hsl(var(--foreground))"
                                formatter={(value) => `${value}/10`}
                              />
                            </Bar>
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  )}

                {!isProUser && analysisResult.sectionFeedback?.length > 0 && (
                  <Alert className="mb-4 bg-indigo-50 border-indigo-200 text-indigo-700">
                    <Lightbulb className="h-4 w-4 !text-indigo-600" />
                    <AlertTitle className="font-semibold text-indigo-800">Section Scores Overview</AlertTitle>
                    <AlertDescription className="text-indigo-700">
                      Upgrade to Pro to view a detailed chart of your section scores. Basic scores are shown below.
                    </AlertDescription>
                  </Alert>
                )}

                <Accordion type="multiple" className="w-full space-y-3">
                  {analysisResult.sectionFeedback.map((item, index) =>
                    item &&
                      typeof item.section === "string" &&
                      typeof item.score === "number" &&
                      typeof item.feedback === "string" ? (
                      <AccordionItem value={`section-${index}`} key={index} className="bg-background border rounded-lg shadow-sm overflow-hidden">
                        <AccordionTrigger className="px-6 py-4 text-base font-semibold hover:no-underline hover:bg-secondary transition-colors">
                          <div className="flex justify-between items-center w-full">
                            <span className="text-primary">{item.section}</span>
                            <span
                              className={`text-sm font-bold px-2.5 py-1 rounded-md text-white ${item.score >= 8
                                ? "bg-green-600"
                                : item.score >= 5
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                                }`}
                            >
                              {item.score}/10
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5 pt-3 space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-muted-foreground mb-1">AI General Feedback:</h4>
                            <p className="text-sm leading-relaxed">{item.feedback}</p>
                          </div>

                          {item.suggestions && item.suggestions.length > 0 && (
                            <div className="mt-3 space-y-1">
                              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                                Suggestions for Improvement:
                              </h4>
                              {isProUser ? (
                                <ul className="list-disc pl-5 text-sm space-y-1.5">
                                  {item.suggestions.map((suggestion, sugIndex) => (
                                    <li key={`sug-${index}-${sugIndex}`}>{suggestion}</li>
                                  ))}
                                </ul>
                              ) : (
                                <FreemiumLock message="Unlock detailed suggestions for this section." contentType="suggestions" />
                              )}
                            </div>
                          )}

                          {Array.isArray(item.references) && item.references.length > 0 && (
                            <div className="mt-3 space-y-2 border-t pt-3">
                              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                                Referenced from your resume:
                              </h4>
                              {isProUser ? (
                                <ul className="space-y-2">
                                  {item.references.map((ref, refIndex) =>
                                    ref && typeof ref.comment === "string" && typeof ref.excerpt === "string" ? (
                                      <li key={`ref-${index}-${refIndex}`} className="text-xs p-2 bg-muted/50 border-l-2 border-primary/50 rounded-r-sm">
                                        <span className="font-medium text-primary">{ref.comment}:</span>{" "}
                                        <span className="italic">"{ref.excerpt}"</span>
                                      </li>
                                    ) : null
                                  )}
                                </ul>
                              ) : (
                                <FreemiumLock message="Upgrade to see specific examples from your resume." contentType="references" />
                              )}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ) : null
                  )}
                </Accordion>
              </CardContent>
            </Card>

            <Accordion type="multiple" className="w-full space-y-3">
              <AccordionItem value="ats" className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-teal-600 hover:no-underline hover:bg-teal-500/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" /> ATS Compatibility Suggestions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-2">
                  {isProUser ? (
                    analysisResult.atsSuggestions.length > 0 ? (
                      <ul className="list-disc space-y-2 pl-5 text-sm">
                        {analysisResult.atsSuggestions.map((item, index) =>
                          typeof item === "string" ? (
                            <li key={index}>{item}</li>
                          ) : null
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No specific ATS suggestions provided for your resume.
                      </p>
                    )
                  ) : <FreemiumLock message="Upgrade to Pro for ATS compatibility suggestions." contentType="suggestions" />}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="recommendations" className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-blue-600 hover:no-underline hover:bg-blue-500/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" /> Actionable Recommendations
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-2">
                  {isProUser ? (
                    analysisResult.actionableRecommendations.length > 0 ? (
                      <ul className="list-decimal space-y-2 pl-5 text-sm font-medium">
                        {analysisResult.actionableRecommendations.map(
                          (item, index) =>
                            typeof item === "string" ? (
                              <li key={index}>{item}</li>
                            ) : null
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No specific actionable recommendations provided at this time.
                      </p>
                    )
                  ) : <FreemiumLock message="Upgrade to Pro for actionable recommendations." contentType="suggestions" />}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
      <CardFooter className="pt-8 pb-6 border-t">
        <p className="text-xs text-muted-foreground text-center w-full">
          AI analysis provides suggestions based on common best practices.
          Review and tailor the feedback to your specific goals and industry. Career Genius is not responsible for job application outcomes.
        </p>
      </CardFooter>
    </div>
  );
}
