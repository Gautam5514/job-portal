'use client';

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../lib/firebase/firebase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Building } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // Adjust the import path as needed

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
    const { user, userData, loading, signOutUser } = useAuth();
  const router = useRouter();
  

useEffect(() => {
  if (loading) return; // don't do anything if auth is still loading

  const fetchSavedJobs = async () => {
    if (!user) {
      toast.error("Please log in to view saved jobs.");
      router.push("/login");
      return;
    }

    try {
      const userRef = doc(db, "users", user?.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setSavedJobs(data.savedJobs || []);
      }
    } catch (err) {
      console.error("Failed to fetch saved jobs:", err);
      toast.error("Failed to load saved jobs.");
    }
  };

  fetchSavedJobs();
}, [loading, user, router]);


  const handleApply = (job) => {
    if (job.applyLink) {
      window.open(job.applyLink, "_blank");
    } else {
      toast.error("No apply link available.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen">
      <Toaster />

      <h1 className="text-2xl font-semibold mb-4">Saved Jobs</h1>

      {loading ? (
        <p className="text-gray-500">Loading saved jobs...</p>
      ) : savedJobs.length === 0 ? (
        <div className="text-center py-20 px-6 bg-white rounded-lg border border-gray-200">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No Saved Jobs
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You haven’t saved any jobs yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedJobs.map((job, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md border border-gray-100 flex-shrink-0 overflow-hidden bg-white flex items-center justify-center">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt="logo"
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

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium mb-0 text-gray-900">
                        {job.companyName}
                      </h5>
                      <p className="text-gray-500 mt-1 text-sm">
                        {job.description}
                      </p>
                      <p className="text-gray-500 mt-8 text-md">
                        {job.skills}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-lg font-semibold text-gray-900">
                        {job.role}
                      </span>
                      {job.location && (
                        <span className="text-gray-600">• {job.location}</span>
                      )}
                      {job.package && (
                        <span className="text-gray-400">• {job.package}</span>
                      )}
                      {job.equity !== undefined && (
                        <Badge variant="outline" className="text-gray-600">
                          {job.equity ? "Equity" : "No equity"}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <Button
                        onClick={() => handleApply(job)}
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
