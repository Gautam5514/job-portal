
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth,db, googleAuthProvider } from "../lib/firebase/firebase"; // Updated import
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from 'next/navigation'; // For redirects
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user object
  const [userData, setUserData] = useState(null); // Firestore user doc
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
       const firestoreData = { uid: firebaseUser.uid, ...docSnap.data() };
       
       // Process subscription before setting userData
       const subscriptionToProcess = firestoreData.subscription || { 
           plan: 'free', status: 'active', endDate: null, planTier: null, billingCycle: null 
       }; // Provide a default structure if no subscription field
       const clientProcessedSubscription = processSubscriptionForClient(subscriptionToProcess);
       
       setUserData({
         ...firestoreData,
         subscription: clientProcessedSubscription, // Set the modified subscription
       });
        } else {
          // This case might happen if a user was created in Firebase Auth but not Firestore
          // Or if it's a new sign-up, the createUserInFirestore function will handle it.
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ADD THIS HELPER FUNCTION
const processSubscriptionForClient = (firestoreSubscription) => {
  if (!firestoreSubscription || !firestoreSubscription.plan) {
    // Default to a structure consistent with a 'free' plan if no subscription
    return {
      plan: 'free', // General plan category
      status: 'active', // Client-interpreted status
      endDate: null,
      planTier: null,      // Specific SKU purchased
      billingCycle: null,  // e.g., 'Monthly', 'Yearly'
      isExpired: false,    // Flag: true if client calculates it as expired
      // Retain other fields if they exist, or set to null
      startDate: firestoreSubscription?.startDate || null,
      razorpayOrderId: firestoreSubscription?.razorpayOrderId || null,
      razorpayPaymentId: firestoreSubscription?.razorpayPaymentId || null,
    };
  }

  // Destructure, keeping original values as defaults
  let {
    plan, // This is the 'basePlanId' like 'free' or 'Premium' from DB
    status, // Status from DB like 'active', 'cancelled'
    endDate, // Firestore Timestamp or null
    planTier, // Specific SKU like 'monthly_199' from DB
    billingCycle, // 'Monthly' or 'Yearly' from DB
    ...otherSubFields // Keep any other fields
  } = firestoreSubscription;

  let isExpired = false;
  let clientAdjustedPlan = plan; // Start with DB plan
  let clientAdjustedStatus = status; // Start with DB status

  // Only evaluate expiration for plans that are not 'free' and currently 'active' in DB
  if (plan !== 'free' && status === 'active' && endDate) {
    // Ensure endDate is a JS Date for comparison
    const jsEndDate = endDate.toDate ? endDate.toDate() : (endDate instanceof Date ? endDate : null);
    if (jsEndDate && new Date() > jsEndDate) {
      clientAdjustedPlan = 'free';      // For UI, treat as 'free'
      clientAdjustedStatus = 'Premium Expired'; // Differentiate client-calculated status
      isExpired = true;
      planTier = null;                 // Clear specific paid tier info for UI if expired
      billingCycle = null;             // Clear billing cycle info for UI if expired
    }
  }

  return {
    ...otherSubFields,           // Keep other original fields from DB
    plan: clientAdjustedPlan,     // General plan (potentially 'free' if expired)
    status: clientAdjustedStatus, // Status (potentially 'expired_client')
    endDate: endDate,             // Original endDate from DB (useful for display "Expired on X")
    planTier: planTier,           // Specific SKU (nullified if expired for UI)
    billingCycle: billingCycle,     // Billing cycle (nullified if expired for UI)
    isExpired: isExpired,         // The crucial boolean flag
  };
};

  const createUserInFirestore = async (firebaseUser, additionalData = {}) => {
    if (!firebaseUser) return;
    const userRef = doc(db, "users", firebaseUser.uid);
    const data = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || additionalData.displayName || firebaseUser.email.split('@')[0],
      createdAt: serverTimestamp(),
      subscription: {
        plan: 'free', // Default plan
        status: 'active',
        startDate: serverTimestamp(),
        endDate: null, // Or a future date for trial
      },
      ...additionalData,
    };
    await setDoc(userRef, data, { merge: true }); // Merge true to avoid overwriting if doc somehow exists
    setUserData(data); // Update local userData state
    return data;
  };

  const signInWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Auth state change will handle setting user and userData
      return userCredential;
    } catch (error) {
      console.error("Error signing in with email:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email, password, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      await createUserInFirestore(firebaseUser, { displayName });
      // Auth state change will trigger user and userData updates
      return userCredential;
    } catch (error) {
      console.error("Error signing up with email:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const firebaseUser = result.user;
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await createUserInFirestore(firebaseUser);
      }
      // Auth state change will handle setting user and userData
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      router.push('/'); // Redirect to home after sign out
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };

  const refreshUserData = async () => {
    if (user) {
      setLoading(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const firestoreData = { uid: user.uid, ...docSnap.data() };
      
      const subscriptionToProcess = firestoreData.subscription || { 
          plan: 'free', status: 'active', endDate: null, planTier: null, billingCycle: null 
      };
      const clientProcessedSubscription = processSubscriptionForClient(subscriptionToProcess);

      setUserData({
        ...firestoreData,
        subscription: clientProcessedSubscription,
      });
      } else {
        setUserData(null);
      }
      setLoading(false);
    }
  };


  const value = {
    user,
    userData,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOutUser,
    sendPasswordReset,
    refreshUserData, // To manually refresh user data if needed
  };
  
  // Client-side only loading state to prevent hydration mismatch if Firebase fails on server
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading && isClient) { // Show loading only on client-side to avoid SSR issues
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
       <DotLottieReact
      src="/assets/loading.lottie"
      loop
      className="w-56 h-56"
      autoplay
    />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
