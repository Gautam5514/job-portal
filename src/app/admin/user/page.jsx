"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../lib/firebase/firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "../../../components/ui/skeleton";
import { Card, CardHeader, CardContent } from "../../../components/ui/card";


export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();


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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists() || userSnap.data().role !== "admin") {
        toast.error("Access denied.");
        router.push("/login");
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch users.");
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingSkeleton />;


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Toaster />
      <h2 className="text-2xl font-semibold mb-6">All User Details</h2>

      <input 
        type="text"
        placeholder="search by name, email or plan.."
        className="w-full wd:w-1/3 px-4 py-2 mb-6 border border-gray-300 rounded shadow-sw"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
      />

      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Billing Cycle</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Start Date</th>
            </tr>
          </thead>
          <tbody>
            {users
            .filter((u) => {
              const term = searchTerm.trim().toLowerCase();
              const subscription = u.subscription || {};
              return (
                !term ||
                (u.displayName && u.displayName.toLowerCase().includes(term)) ||
                (u.email && u.email.toLowerCase().includes(term)) ||
                (subscription.plan && subscription.plan.toLowerCase().includes(term))
              );
            })
            .map((u) => {
              const subscription = u.subscription || {};
              const formatDate = (timestamp) =>
                timestamp
                  ? new Date(timestamp.seconds * 1000).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "N/A";

              return (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">{u.displayName || "N/A"}</td>
                  <td className="px-4 py-2">{subscription.plan || "N/A"}</td>
                  <td className="px-4 py-2">
                    {subscription.billingCycle || "N/A"}
                  </td>
                  <td className="px-4 py-2">{subscription.status || "N/A"}</td>
                  <td className="px-4 py-2">
                    {formatDate(subscription.startDate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
