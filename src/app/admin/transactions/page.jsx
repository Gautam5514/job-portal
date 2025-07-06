'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../lib/firebase/firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "../../../components/ui/skeleton";
import { Card, CardHeader, CardContent } from "../../../components/ui/card";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
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

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists() || userDoc.data().role !== "admin") {
        toast.error("Access denied.");
        router.push("/login");
        return;
      }

      try {
        const userSnapshot = await getDocs(collection(db, "users"));
        const allTransactions = [];

        userSnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          const userTransactions = userData.transactions || [];

          userTransactions.forEach((txn) => {
            allTransactions.push({
              displayName: userData.displayName || "N/A",
              email: userData.email || "N/A",
              ...txn,
            });
          });
        });

        // Sort by latest transaction
        allTransactions.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);

        setTransactions(allTransactions);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load transactions.");
      }
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  if (loading) return <LoadingSkeleton />;

return (
    <div className="p-6 max-w-7xl mx-auto">
        <Toaster />
        <h2 className="text-2xl font-bold mb-6">All User Transactions</h2>

        <input
            type="text"
            placeholder="Search by User, Email, Plan..."
            className="w-full wd:w-1/3 px-4 py-2 mb-6 border border-gray-300 rounded shadow-sw"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm">
                        <th className="px-4 py-2">User</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Plan</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Transaction ID</th>
                        <th className="px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions
                        .filter((u) => {
                            const term = searchTerm.trim().toLowerCase();
                            if (!term) return true;
                            const plan = u.planName || u.plan || "";
                            return (
                                (u.displayName && u.displayName.toLowerCase().includes(term)) ||
                                (u.email && u.email.toLowerCase().includes(term)) ||
                                (plan && plan.toLowerCase().includes(term))
                            );
                        })
                        .map((txn, idx) => (
                            <tr key={idx} className="border-t text-sm">
                                <td className="px-4 py-2">{txn.displayName}</td>
                                <td className="px-4 py-2">{txn.email}</td>
                                <td className="px-4 py-2">{txn.planName}</td>
                                <td className="px-4 py-2">₹{txn.amount}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded text-white ${txn.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {txn.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{txn.transactionId}</td>
                                <td className="px-4 py-2">{formatDate(txn.timestamp)}</td>
                            </tr>
                        ))}
                    {transactions.filter((u) => {
                        const term = searchTerm.trim().toLowerCase();
                        if (!term) return true;
                        const plan = u.planName || u.plan || "";
                        return (
                            (u.displayName && u.displayName.toLowerCase().includes(term)) ||
                            (u.email && u.email.toLowerCase().includes(term)) ||
                            (plan && plan.toLowerCase().includes(term))
                        );
                    }).length === 0 && (
                        <tr>
                            <td colSpan="9" className="px-4 py-4 text-center text-gray-500">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);
}
