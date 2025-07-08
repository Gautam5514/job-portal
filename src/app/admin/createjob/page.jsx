"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { uploadToCloudinary } from "../../../lib/cloudinary/upload";
import {
  collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db, auth } from "../../../lib/firebase/firebase";

// --- UI & Icon Imports ---
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { Trash2, Pencil, Briefcase, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";


// --- Initial State for the form ---
const initialState = {
  companyName: "",
  description: "",
  applyLink: "",
  companyLogo: "",
  skills: "",
  package: "",
  location: "",
  role: "",
};

// --- Professional Loading Skeleton ---
const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto p-6">
    <Skeleton className="h-8 w-48 mb-10" />
    <Card className="mb-12">
      <CardHeader>
        <Skeleton className="h-7 w-40 mb-2" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
    <Skeleton className="h-7 w-32 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);


const CreateJobPage = () => {
  const [job, setJob] = useState(initialState);
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // --- Data Fetching and Auth ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists() || userDoc.data().role !== "admin") {
        toast.error("Access denied.");
        router.push("/jobs");
      } else {
        await fetchJobs();
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchJobs = async () => {
    const snapshot = await getDocs(collection(db, "jobs"));
    const jobsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setJobs(jobsData);
  };

  // --- Form Handlers ---
  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    toast.loading("Uploading logo...");
    const imageUrl = await uploadToCloudinary(file);
    toast.dismiss();
    if (imageUrl) {
      setJob((prev) => ({ ...prev, companyLogo: imageUrl }));
      console.log("Updated job state with logo:", imageUrl);
      toast.success("Logo uploaded!");
    } else {
      toast.error("Logo upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(job).some(value => value === "" && value !== job.companyLogo)) {
      toast.error("Please fill all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (editingJobId) {
        await updateDoc(doc(db, "jobs", editingJobId), job);
        toast.success("Job updated successfully!");
      } else {
        await addDoc(collection(db, "jobs"), job);
        toast.success("Job posted successfully!");
        console.log("Job being posted:", job);

      }
      setJob(initialState);
      setEditingJobId(null);
      await fetchJobs();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (jobToEdit) => {
    setJob(jobToEdit);
    setEditingJobId(jobToEdit.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top for editing
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      await fetchJobs();
      toast.success("Job deleted!");
    } catch (error) {
      toast.error("Failed to delete job.");
    }
  };

  const cancelEdit = () => {
    setJob(initialState);
    setEditingJobId(null);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* --- Job Form Section --- */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <PlusCircle size={24} />
              {editingJobId ? "Edit Job Posting" : "Create a New Job Posting"}
            </CardTitle>
            <CardDescription>Fill out the details below to post or update a job.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={job.companyName}
                  onChange={handleChange}
                  required
                  className="rounded-md"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role / Job Title
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={job.role}
                  onChange={handleChange}
                  required
                  className="rounded-md"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={job.description}
                  onChange={handleChange}
                  required
                  className="rounded-md"
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium text-gray-700">
                  Skills (comma-separated)
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={job.skills}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, SQL"
                  required
                  className="rounded-md"
                />
              </div>

              {/* Package */}
              <div className="space-y-2">
                <Label htmlFor="package" className="text-sm font-medium text-gray-700">
                  Package / Salary
                </Label>
                <Input
                  id="package"
                  name="package"
                  value={job.package}
                  onChange={handleChange}
                  placeholder="e.g., $100k - $120k"
                  required
                  className="rounded-md"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA or Remote"
                  required
                  className="rounded-md"
                />
              </div>

              {/* Apply Link */}
              <div className="space-y-2">
                <Label htmlFor="applyLink" className="text-sm font-medium text-gray-700">
                  Apply Link
                </Label>
                <Input
                  id="applyLink"
                  type="url"
                  name="applyLink"
                  value={job.applyLink}
                  onChange={handleChange}
                  required
                  className="rounded-md"
                />
              </div>

              {/* Company Logo Upload */}
              <div className="space-y-2">
                <Label htmlFor="companyLogo" className="text-sm font-medium text-gray-700">
                  Company Logo
                </Label>
                <Input
                  id="companyLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="file:text-blue-600 file:font-medium"
                />
                {job.companyLogo && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                    <img
                      src={job.companyLogo}
                      alt="Company Logo"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Submit & Cancel */}
              <div className="md:col-span-2 flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : editingJobId
                      ? "Update Job"
                      : "Post Job"}
                </Button>
                {editingJobId && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={cancelEdit}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>

          </CardContent>
        </Card>

        {/* --- Job List Section --- */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Briefcase size={28} />
            Manage Existing Jobs ({jobs.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((j) => (
              <Card key={j.id} className="flex flex-col">
                <CardHeader className="flex-row items-start gap-4">
                  {j.companyLogo && <img src={j.companyLogo} alt="Logo" className="w-14 h-14 rounded-full object-cover border" />}
                  <div>
                    <CardTitle>{j.role}</CardTitle>
                    <CardDescription>{j.companyName} • {j.location}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{j.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {j.skills.split(',').map(skill => skill.trim() && <Badge key={skill} variant="secondary">{skill.trim()}</Badge>)}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-gray-50/70">
                  <span className="font-semibold text-gray-700">{j.package}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(j)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(j.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJobPage;