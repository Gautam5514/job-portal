"use client";
import { useEffect, useState } from "react";
import { getDocs, doc, updateDoc, arrayUnion, collection } from "firebase/firestore";
import { db, auth } from "../../lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import { Building } from "lucide-react";
import { extractSkillsFromResume } from '../../ai/flows/extract-skills';
import { fileToDataUri } from "../../lib/utils.js";

const JobCardSkeleton = () => (
  <div className="border border-gray-200 rounded-md bg-white p-4 mb-3">
    <div className="flex items-start gap-4">
      <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full">
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
            <div className="pt-3">
              <Skeleton className="h-5 w-40 rounded-md" />
            </div>
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-5 w-36 rounded-md" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PublicJobList = () => {
  // const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [resumeSkills, setResumeSkills] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const [allJobs, setAllJobs] = useState([]); // <-- ADD THIS
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const jobsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAllJobs(jobsData);
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast.error("Could not load job listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

useEffect(() => {
  // If a resume filter is active, let it control the list
  if (resumeSkills.length > 0) return;

  const filtered = allJobs.filter((job) => {
    const matchesSearch =
      job.role?.toLowerCase().includes(search.toLowerCase()) ||
      job.skills?.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter ? job.location === locationFilter : true;
    const matchesSkill = skillFilter ? job.skills?.toLowerCase().includes(skillFilter.toLowerCase()) : true;
    return matchesSearch && matchesLocation && matchesSkill;
  });
  setFilteredJobs(filtered);
}, [search, locationFilter, skillFilter, allJobs, resumeSkills]);


  // --- THIS IS THE CORRECTED FUNCTION ---
// Replace the old handleResumeUpload function with this one
const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.loading("Scanning resume with AI...");

    try {
      const resumeDataUri = await fileToDataUri(file);
      const result = await extractSkillsFromResume({ resumeDataUri });
      const extractedSkills = result.skills;

      toast.dismiss();

      if (extractedSkills && extractedSkills.length > 0) {
        setResumeSkills(extractedSkills);
        const matched = allJobs.filter((job) =>
          extractedSkills.some((skill) =>
            job.skills?.toLowerCase().includes(skill.toLowerCase())
          )
        );
        setFilteredJobs(matched);
        toast.success("AI scan complete! Showing matched jobs.");
      } else {
        toast.error("AI could not identify skills in your resume.");
        setResumeSkills([]);
        setFilteredJobs(allJobs); // Reset to all jobs
      }
    } catch (error) {
      console.error("Error processing resume:", error);
      toast.dismiss();
      toast.error("An error occurred during AI analysis.");
    } finally {
      e.target.value = null; // Reset file input
    }
};

  const handleSubmit = async (job) => {
    if (!user) {
      toast.error("Please log in to apply.");
      router.push("/login");
      return;
    }
    if (job.applyLink) {
      window.open(job.applyLink, "_blank", "noopener,noreferrer");
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        [`appliedJobs.${job.id}`]: true,
      });
    } else {
      toast.error("No apply link provided.");
    }
  };

  const handleSaveJob = async (job) => {
    if (!auth.currentUser) {
      toast.error("Please log in to save jobs.", { id: 'save-job-login' });
      router.push('/login');
      return;
    }
    const userRef = doc(db, "users", auth.currentUser.uid);
    try {
      // It's better to save just the job ID to avoid data duplication
      await updateDoc(userRef, { savedJobs: arrayUnion(job.id) }); 
      toast.success("Job saved!");
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job. It might already be saved.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-5xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
        <div className="mb-4 flex flex-col md:flex-row gap-2 md:items-center">
          <input
            type="text"
            placeholder="Search by role, skill, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
          </select>
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Skills</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
          <label className="px-3 py-2 border rounded-md bg-white cursor-pointer hover:bg-gray-50 text-sm text-gray-700 whitespace-nowrap">
            AI Resume Scan(PDF)
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />
          </label>
        </div>

        {resumeSkills.length > 0 && (
          <p className="text-sm text-green-600 mb-4">
            Showing jobs matching skills from your resume: {resumeSkills.join(", ")}
          </p>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <JobCardSkeleton key={i} />)}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-lg border border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Jobs Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search or filters, or check back later.</p>
          </div>
        ) : (
          <div className="space-y-3">
           {filteredJobs.map((job) => (
  <div
    key={job.id}
    className="border border-gray-200 rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
  >
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Logo */}
      <div className="h-12 w-12 rounded-md border border-gray-100 flex-shrink-0 overflow-hidden bg-white flex items-center justify-center">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={`${job.companyName} logo`}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="h-full w-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">
              {(job.companyName || "C").charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <h5 className="font-medium mb-0 text-gray-900">
              {job.companyName || "Company Name"}
            </h5>
            <p className="text-gray-500 mt-1 text-sm">
              {job.description || "IT Company"}
            </p>
            <p className="text-gray-500 mt-2 text-sm">{job.skills}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center sm:items-center pt-3 mt-4 border-t border-gray-100 flex-wrap sm:flex-nowrap gap-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-base font-semibold text-gray-900">{job.role}</span>
            {job.location && <span className="text-gray-600">• {job.location}</span>}
            {job.package && <span className="text-gray-400">• {job.package}</span>}
            {job.equity !== undefined && (
              <Badge variant="outline" className="text-xs">
                {job.equity ? "Equity" : "No equity"}
              </Badge>
            )}
             
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:w-auto w-full sm:justify-end sm:flex-shrink-0">
            <Button
              onClick={() => handleSaveJob(job)}
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-20  md:w-50 sm:w-auto"
            >
              Save
            </Button>
            <Button
              onClick={() => handleSubmit(job)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white md:w-50 sm:w-auto"
            >
              Apply Now
            </Button>
          </div>

          {/* Buttons — constrained width on desktop */}
         
        </div>
      </div>
    </div>
  </div>
))}

          </div>
        )}
      </div>
    </>
  );
};

export default PublicJobList;