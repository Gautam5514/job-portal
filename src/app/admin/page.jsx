"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase/firebase";
import toast, { Toaster } from "react-hot-toast";

// --- UI & Icon Imports ---
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { User, CreditCard, Briefcase, FilePlus2 } from "lucide-react";

// --- Tool Cards Data ---
const toolCards = [
  {
    title: "Transactions",
    Icon: CreditCard,
    description: "View, manage, and analyze all financial transactions.",
    link: "/admin/transactions",
  },
  {
    title: "Manage Users",
    Icon: User,
    description: "Manage user accounts, roles, and access permissions.",
    link: "/admin/user",
  },
  {
    title: "Create & Manage Jobs",
    Icon: FilePlus2,
    description: "Post new jobs and manage all existing job listings.",
    link: "/admin/createjob",
  },
  {
    title: "View Public Job Portal",
    Icon: Briefcase,
    description: "See how the public job board looks to applicants.",
    link: "/job-portal",
  },
];

// --- Professional Skeleton Loader (No change needed here) ---
const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
    <div className="text-center mb-12">
      <Skeleton className="h-10 w-3/4 mx-auto rounded-lg" />
      <Skeleton className="h-6 w-1/2 mx-auto mt-4 rounded-lg" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Authentication Logic (No change needed here) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error("You must be logged in to access this page.");
        router.push("/login");
        return;
      }
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAuthorized(true);
        } else {
          toast.error("Access Denied. You are not an administrator.");
          router.push("/jobs");
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        toast.error("An error occurred while verifying your permissions.");
        router.push("/");
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // --- This is the updated section with YOUR preferred design ---
  if (isAuthorized) {
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div>
            <h2 className="text-4xl font-center font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 bg-[200%_auto] bg-clip-text text-transparent animate-gradient">
              Admin Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCards.map((card) => (
                <Link href={card.link} key={card.title} className="group block">
                  {/* Applying your exact card styling */}
                  <div className="rounded-xl bg-indigo-50 border-none shadow-none h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                    <div className="p-6">
                      {/* Circular icon background */}
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 mb-4">
                        <card.Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {card.title}
                      </h3>
                      <p className="text-slate-500 !mt-1">{card.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default AdminDashboardPage;
