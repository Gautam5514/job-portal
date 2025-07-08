"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  CheckCircle,
  XCircle,
  Lightbulb,
  Loader2,
  Upload,
  Star,
  Activity,
  BarChart3 as BarChartIconLucide,
  User,
  ThumbsUp,
  Eye,
  Image as ImageIcon,
  Briefcase,
  Wrench,
  Linkedin,
  Lock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { linkedinAnalysis } from "../ai/flows/linkedin-analysis";
import { fileToDataUri } from "../lib/utils.js";
import toast, { Toaster } from "react-hot-toast";
import { Label as RadixLabel } from "@radix-ui/react-label";
import { cn } from "../lib/utils";
import * as React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
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
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const isValidAnalysisResult = (result) => {
  return (
    result &&
    typeof result.overallScore === "number" &&
    result.headlineAnalysis &&
    typeof result.headlineAnalysis.score === "number" &&
    typeof result.headlineAnalysis.feedback === "string" &&
    Array.isArray(result.headlineAnalysis.suggestions) &&
    result.summaryAnalysis &&
    typeof result.summaryAnalysis.score === "number" &&
    typeof result.summaryAnalysis.feedback === "string" &&
    Array.isArray(result.summaryAnalysis.suggestions) &&
    result.experienceAnalysis &&
    typeof result.experienceAnalysis.score === "number" &&
    typeof result.experienceAnalysis.feedback === "string" &&
    Array.isArray(result.experienceAnalysis.entryFeedback) &&
    result.skillsAnalysis &&
    typeof result.skillsAnalysis.score === "number" &&
    typeof result.skillsAnalysis.feedback === "string" &&
    Array.isArray(result.skillsAnalysis.suggestions) &&
    result.recommendationsAnalysis &&
    typeof result.recommendationsAnalysis.score === "number" &&
    typeof result.recommendationsAnalysis.feedback === "string" &&
    Array.isArray(result.recommendationsAnalysis.suggestions) &&
    result.engagementAnalysis &&
    typeof result.engagementAnalysis.score === "number" &&
    typeof result.engagementAnalysis.feedback === "string" &&
    Array.isArray(result.engagementAnalysis.suggestions) &&
    result.visualsAnalysis &&
    typeof result.visualsAnalysis.score === "number" &&
    typeof result.visualsAnalysis.feedback === "string" &&
    Array.isArray(result.visualsAnalysis.suggestions) &&
    Array.isArray(result.overallStrengths) &&
    Array.isArray(result.overallWeaknesses) &&
    Array.isArray(result.actionableRecommendations) &&
    result.experienceAnalysis.entryFeedback.every(
      (entry) =>
        entry &&
        typeof entry.feedback === "string" &&
        Array.isArray(entry.suggestions)
    )
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

const FreemiumLock = ({
  message = "Upgrade to Pro to unlock full details.",
  contentType = "generic",
}) => {
  let placeholderText =
    "Detailed insights and examples are available for Pro users. Upgrade now to enhance your LinkedIn profile effectively.";
  if (contentType === "suggestions") {
    placeholderText =
      "Detailed improvement suggestions and rewrite examples appear here for Pro users. Optimize your LinkedIn profile with actionable AI advice...";
  }

  return (
    <div className="relative p-4 border border-dashed rounded-lg bg-muted/30 text-center my-4 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/40 backdrop-blur-sm flex flex-col justify-center items-center z-10 rounded-lg p-3">
        <Lock className="h-7 w-7 text-primary mb-2" />
        <p className="text-sm font-semibold text-primary mb-2 text-center">
          {message}
        </p>
        <Button
          asChild
          size="sm"
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <Link href="/pricing">
            Upgrade to Pro <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
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

export function LinkedInAnalysis() {
  const { user, userData, loading: authLoading } = useAuth();
  const [profileUrl, setProfileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [inputType, setInputType] = useState("pdf");

  const isProUser =
    userData?.subscription?.plan.toLowerCase() === "pro" ||
    userData?.subscription?.plan.toLowerCase() === "premium";

  console.log("isProUser:", isProUser);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName("");
    // Reset file input value to allow re-uploading the same file
    if (document.getElementById("linkedin-pdf")) {
      document.getElementById("linkedin-pdf").value = "";
    }
  };

  const handleUrlChange = (event) => {
    setProfileUrl(event.target.value);
    setError(null);
    setAnalysisResult(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setAnalysisResult(null);

    if (!user) {
      toast(
        (t) => (
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            <p className="text-sm mb-0 font-semibold text-primary">
              Please sign in to Continue.
            </p>
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
        ),
        {
          duration: 25000,
        }
      );
      return;
    }

    let inputData = {};

    if (inputType === "url") {
      if (!profileUrl.trim()) {
        setError("Please enter a LinkedIn profile URL.");
        toast.error("Please enter a LinkedIn profile URL.");
        return;
      }

      try {
        new URL(profileUrl.trim()); // Basic URL validation
      } catch (_) {
        setError(
          "Please enter a valid URL (e.g., starting with http:// or https://)."
        );
        toast.error(
          "Please enter a valid URL (e.g., starting with http:// or https://)."
        );
        return;
      }
      inputData = { profileUrl: profileUrl.trim() };
    } else {
      if (!selectedFile) {
        setError("Please select a LinkedIn profile PDF to upload.");
        toast.error("Please select a LinkedIn profile PDF to upload.");
        return;
      }
      try {
        const pdfDataUri = await fileToDataUri(selectedFile);
        inputData = { profilePdfDataUri: pdfDataUri };
      } catch (err) {
        console.error("Error converting file to data URI:", err);
        setError("Failed to read the PDF file. Please try again.");
        toast.error("Failed to read the PDF file. Please try again.");
        return;
      }
    }

    setIsLoading(true);

    try {
      const result = await linkedinAnalysis(inputData);

      if (isValidAnalysisResult(result)) {
        setAnalysisResult(result);
        toast.success(
          `Analysis Complete: ${
            isProUser
              ? "LinkedIn profile analysis is ready."
              : "Basic LinkedIn analysis is ready. Upgrade for full details!"
          }`,
          {
            duration: 5000,
            position: "top-right",
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
      console.error("Error during LinkedIn analysis:", err);
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

  const chartData = analysisResult
    ? [
        {
          section: "Headline",
          score: analysisResult.headlineAnalysis?.score ?? 0,
        },
        {
          section: "Summary",
          score: analysisResult.summaryAnalysis?.score ?? 0,
        },
        {
          section: "Experience",
          score: analysisResult.experienceAnalysis?.score ?? 0,
        },
        { section: "Skills", score: analysisResult.skillsAnalysis?.score ?? 0 },
        {
          section: "Recommendations",
          score: analysisResult.recommendationsAnalysis?.score ?? 0,
        },
        {
          section: "Engagement",
          score: analysisResult.engagementAnalysis?.score ?? 0,
        },
        {
          section: "Visuals",
          score: analysisResult.visualsAnalysis?.score ?? 0,
        },
      ].filter((item) => typeof item.score === "number")
    : [];

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-2))",
    },
  };

  if (authLoading && !isClient) {
    return (
      <div className="w-full p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }
  if (authLoading && isClient) {
    return (
      <div className="w-full p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />{" "}
        <p className="text-muted-foreground">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
      <Toaster />
      <CardContent className="pt-0">
        {!isClient ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* START OF REDESIGNED CARD */}
            <div className="w-fit max-w-lg mx-auto p-0 border-2 border-dashed border-blue-400 dark:border-blue-600 rounded-2xl flex flex-col items-center justify-center text-center my-8 bg-card">
              <div className="pt-6 pb-2 px-6 text-center">
                {/* <Linkedin className="h-10 w-10 text-primary mx-auto mb-2 opacity-90" /> */}
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  LinkedIn Profile Analysis
                </h2>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Drop Your linkedIn profile pdf to analyze
                </p>
              </div>

              <div className="w-full">
                <form
                  onSubmit={handleSubmit}
                  className="pt-4 pb-6 px-6 text-center"
                >
                  <div className="mb-6">
                    {inputType === "url" ? (
                      <div className="py-12">
                        <p className="text-muted-foreground">Coming soon...</p>
                      </div>
                    ) : (
                      <div>
                        {/* STATE: LOADING */}
                        {isLoading && selectedFile && (
                          <div className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 transition-all duration-300">
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

                        {/* STATE: FILE SELECTED */}
                        {!isLoading && selectedFile && (
                          <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 rounded-lg p-4 transition-all duration-300">
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

                        {/* STATE: DEFAULT (The dropzone) */}
                        {!isLoading && !selectedFile && (
                          <div className="relative">
                            <Input
                              id="linkedin-pdf"
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              disabled={isLoading || authLoading}
                              required={inputType === "pdf"}
                              aria-label="LinkedIn Profile PDF Upload Input"
                            />
                            <div className="flex flex-col items-center justify-center space-y-3 p-6 rounded-2xl text-center">
                              <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                              </div>
                              <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                                Drag & drop file or
                              </p>
                              <label
                                htmlFor="linkedin-pdf"
                                className="cursor-pointer text-primary font-medium z-20 relative underline-offset-4 hover:underline"
                              >
                                Browse
                              </label>
                              <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
                                Supported file: PDF
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      authLoading ||
                      (inputType === "url" && !profileUrl) ||
                      (inputType === "pdf" && !selectedFile)
                    }
                    className="w-full h-12 text-base font-semibold rounded-lg"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" /> Analyze Profile
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
            {/* END OF REDESIGNED CARD */}

            {isLoading && (
              <div className="mt-6 text-center p-8 border border-dashed rounded-lg bg-card">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  Analyzing LinkedIn profile...
                </p>
                <p className="text-sm text-muted-foreground">
                  The AI is reviewing the profile details. This may take a
                  moment.
                </p>
              </div>
            )}

            {error && !isLoading && (
              <Alert variant="destructive" className="mt-6 max-w-2xl mx-auto">
                <XCircle className="h-5 w-5" />
                <AlertTitle className="font-semibold">
                  Analysis Error
                </AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {analysisResult && !isLoading && !error && (
              <div className="mt-10 space-y-8">
                <div className="shadow-lg rounded-xl overflow-hidden">
                  <CardHeader className="bg-muted/30 p-6">
                    <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-primary">
                      <Star className="h-6 w-6 text-yellow-500 fill-yellow-400" />{" "}
                      Overall Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
                      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-transparent shadow-none min-w-[150px]">
                        <div className="w-28 h-28 relative mb-2">
                          <CircularProgressbar
                            value={analysisResult.overallScore * 10}
                            text={`${analysisResult.overallScore}/10`}
                            strokeWidth={10}
                            styles={buildStyles({
                              textColor: "hsl(var(--primary))",
                              pathColor: "hsl(var(--primary))",
                              trailColor: "hsl(var(--muted))",
                              textSize: "18px",
                              pathTransitionDuration: 0.5,
                            })}
                          />
                        </div>

                        <p className="text-sm text-muted-foreground font-medium">
                          Overall Profile Score
                        </p>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-md font-semibold text-gray-700 mb-1">
                            Key Strengths:
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {(isProUser
                              ? analysisResult.overallStrengths
                              : analysisResult.overallStrengths.slice(0, 1)
                            ).map((s, i) => (
                              <li key={`str-${i}`}>{s}</li>
                            ))}
                            {analysisResult.overallStrengths.length === 0 && (
                              <li>None explicitly highlighted.</li>
                            )}
                            {!isProUser &&
                              analysisResult.overallStrengths.length > 1 && (
                                <li className="mt-1">
                                  <FreemiumLock
                                    message="Upgrade to see all strengths."
                                    contentType="generic"
                                  />
                                </li>
                              )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold text-gray-700 mb-1 mt-3">
                            Areas for Improvement:
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {(isProUser
                              ? analysisResult.overallWeaknesses
                              : analysisResult.overallWeaknesses.slice(0, 1)
                            ).map((w, i) => (
                              <li key={`wk-${i}`}>{w}</li>
                            ))}
                            {analysisResult.overallWeaknesses.length === 0 && (
                              <li>None explicitly highlighted.</li>
                            )}
                            {!isProUser &&
                              analysisResult.overallWeaknesses.length > 1 && (
                                <li className="mt-1">
                                  <FreemiumLock
                                    message="Upgrade to see all areas for improvement."
                                    contentType="generic"
                                  />
                                </li>
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {chartData.length > 0 && isProUser && (
                  <Card className="shadow-lg rounded-xl overflow-hidden">
                    <CardHeader className="bg-muted/30 p-6">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-primary">
                        <BarChartIconLucide className="h-6 w-6 text-indigo-600" />{" "}
                        Section Scores
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Scores for key LinkedIn profile sections (out of 10).
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="h-[400px] w-full p-4 border rounded-lg bg-background">
                        <ChartContainer
                          config={chartConfig}
                          className="w-full h-full"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart
                              data={chartData}
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
                                tick={{
                                  fontSize: 12,
                                  fill: "hsl(var(--muted-foreground))",
                                }}
                                stroke="hsl(var(--border))"
                              />
                              <YAxis
                                dataKey="section"
                                type="category"
                                width={110}
                                tick={{
                                  fontSize: 12,
                                  fill: "hsl(var(--foreground))",
                                }}
                                stroke="hsl(var(--border))"
                              />
                              <ChartTooltip
                                cursor={{ fill: "hsl(var(--accent) / 0.1)" }}
                                content={
                                  <ChartTooltipContent
                                    hideLabel
                                    className="shadow-lg rounded-md"
                                  />
                                }
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
                    </CardContent>
                  </Card>
                )}
                {!isProUser && chartData.length > 0 && (
                  <Alert className="mb-4 bg-indigo-50 border-indigo-200 text-indigo-700">
                    <Lightbulb className="h-4 w-4 !text-indigo-600" />
                    <AlertTitle className="font-semibold text-indigo-800">
                      Section Scores Overview
                    </AlertTitle>
                    <AlertDescription className="text-indigo-700">
                      Upgrade to Pro to view a detailed chart of your section
                      scores. Basic scores are shown in the accordion below.
                    </AlertDescription>
                  </Alert>
                )}

                <Accordion type="multiple" className="w-full space-y-3">
                  {[
                    {
                      key: "headline",
                      title: "Headline",
                      data: analysisResult.headlineAnalysis,
                      Icon: User,
                    },
                    {
                      key: "summary",
                      title: "Summary / About",
                      data: analysisResult.summaryAnalysis,
                      Icon: Activity,
                    },
                    {
                      key: "experience",
                      title: "Experience",
                      data: analysisResult.experienceAnalysis,
                      Icon: Briefcase,
                    },
                    {
                      key: "skills",
                      title: "Skills",
                      data: analysisResult.skillsAnalysis,
                      Icon: Wrench,
                    },
                    {
                      key: "recommendationsProfile",
                      title: "Recommendations",
                      data: analysisResult.recommendationsAnalysis,
                      Icon: ThumbsUp,
                    },
                    {
                      key: "engagement",
                      title: "Engagement & Activity",
                      data: analysisResult.engagementAnalysis,
                      Icon: Eye,
                    },
                    {
                      key: "visuals",
                      title: "Profile Picture & Banner",
                      data: analysisResult.visualsAnalysis,
                      Icon: ImageIcon,
                    },
                  ].map(
                    ({ key, title, data, Icon }) =>
                      data && (
                        <AccordionItem
                          value={key}
                          key={key}
                          className="bg-card border rounded-lg shadow-sm overflow-hidden"
                        >
                          <AccordionTrigger className="px-6 py-4 text-base font-semibold hover:no-underline hover:bg-secondary transition-colors">
                            <div className="flex justify-between items-center w-full">
                              <span className="flex items-center gap-2 text-primary">
                                <Icon className="h-5 w-5 text-muted-foreground" />{" "}
                                {title}
                              </span>
                              <span
                                className={`text-sm font-bold px-2.5 py-1 rounded-md text-white ${
                                  data.score >= 7
                                    ? "bg-green-600"
                                    : data.score >= 4
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {data.score}/10
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-5 pt-3 space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                                AI General Feedback:
                              </h4>
                              <p className="text-sm leading-relaxed">
                                {data.feedback}
                              </p>
                            </div>
                            {data.suggestions &&
                              data.suggestions.length > 0 && (
                                <div className="mt-3">
                                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                                    Suggestions for Improvement:
                                  </h4>
                                  {isProUser ? (
                                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                                      {data.suggestions.map((s, i) => (
                                        <li key={`${key}-sug-${i}`}>{s}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <FreemiumLock
                                      message={`Unlock detailed suggestions for your ${title.toLowerCase()}.`}
                                      contentType="suggestions"
                                    />
                                  )}
                                </div>
                              )}
                            {key === "experience" &&
                              data.entryFeedback &&
                              data.entryFeedback.length > 0 && (
                                <div className="mt-3">
                                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                                    Specific Entry Feedback & Suggestions:
                                  </h4>
                                  {isProUser ? (
                                    <div className="space-y-3 mt-1">
                                      {data.entryFeedback.map((entry, i) => (
                                        <div
                                          key={`exp-entry-${i}`}
                                          className="p-3 border-l-2 border-primary/30 bg-muted/40 rounded-r-md"
                                        >
                                          <p className="font-medium text-sm">
                                            {entry.title} at {entry.company}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {entry.feedback}
                                          </p>
                                          {entry.suggestions?.length > 0 && (
                                            <ul className="list-disc pl-5 text-xs mt-1 space-y-1">
                                              {entry.suggestions.map(
                                                (s, si) => (
                                                  <li
                                                    key={`exp-entry-${i}-sug-${si}`}
                                                  >
                                                    {s}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <FreemiumLock
                                      message="Unlock detailed feedback & suggestions for all experience entries."
                                      contentType="suggestions"
                                    />
                                  )}
                                </div>
                              )}
                          </AccordionContent>
                        </AccordionItem>
                      )
                  )}

                  {analysisResult.actionableRecommendations?.length > 0 && (
                    <AccordionItem
                      value="actionable-recommendations"
                      className="bg-card border rounded-lg shadow-sm overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-blue-600 hover:no-underline hover:bg-blue-500/5 transition-colors">
                        <div className="flex items-center gap-2">
                          {" "}
                          <Lightbulb className="h-5 w-5" /> Top Actionable
                          Recommendations{" "}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 pt-3">
                        {isProUser ? (
                          <ul className="list-decimal space-y-2 pl-5 text-sm font-medium">
                            {analysisResult.actionableRecommendations.map(
                              (item, index) =>
                                typeof item === "string" ? (
                                  <li key={`act-${index}`}>{item}</li>
                                ) : null
                            )}
                          </ul>
                        ) : (
                          <FreemiumLock
                            message="Upgrade to Pro to get actionable recommendations."
                            contentType="suggestions"
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="pt-8 pb-6 border-t">
        <p className="text-xs text-muted-foreground text-center w-full">
          AI analysis provides suggestions based on common best practices.
          Review and tailor the feedback to your specific goals and industry.
          Career Genius is not responsible for job application outcomes.
        </p>
      </CardFooter>
    </div>
  );
}
