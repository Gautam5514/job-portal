'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Bell, Palette, ShieldAlert, UserCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Link from 'next/link';

export default function ProfileSettingsPage() {
  const { user, userData, loading, refreshUserData } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (userData) {
      setDisplayName(userData.displayName || '');
      setEmail(userData.email || '');
      if (userData.settings) {
        setEmailNotifications(userData.settings.emailNotifications ?? true);
        setDarkMode(userData.settings.darkMode ?? false);
      }
    }
  }, [user, userData, loading, router]);

  // Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Error", description: "You are not logged in." });
      return;
    }
    setIsSavingProfile(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { displayName });
      await refreshUserData();
      toast({ title: "Profile Updated", description: "Your profile has been saved." });
    } catch (error) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Settings Update
  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Error", description: "You are not logged in." });
      return;
    }
    setIsSavingSettings(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "settings.emailNotifications": emailNotifications,
        "settings.darkMode": darkMode,
      });
      toast({ title: "Settings Saved", description: "Preferences updated." });
    } catch (error) {
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
    } finally {
      setIsSavingSettings(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl space-y-6">
        {[1, 2].map((_, i) => (
          <Card className="shadow-lg" key={i}>
            <CardHeader>
              <Skeleton className="h-7 w-40 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl space-y-10">
      {/* Profile Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            <UserCircle2 className="mr-3 h-6 w-6" />
            Your Profile
          </CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <form onSubmit={handleProfileUpdate}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="displayName">Full Name</Label>
              <Input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={isSavingProfile} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} disabled className="bg-muted/50 cursor-not-allowed" />
              <p className="text-xs text-muted-foreground">Email can't be changed here.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSavingProfile}>
              {isSavingProfile ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Settings Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Account Settings</CardTitle>
          {/* <CardDescription>Notification & appearance preferences.</CardDescription> */}
        </CardHeader>
        <form onSubmit={handleSettingsUpdate}>
          <CardContent className="space-y-8">
            {/* Notification */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700"><Bell className="mr-2 h-5 w-5 text-primary" /> Notifications</h3>
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Get updates about features.</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} disabled={isSavingSettings} />
              </div>
            </div> */}

            {/* Appearance */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700"><Palette className="mr-2 h-5 w-5 text-primary" /> Appearance</h3>
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Theme preference (placeholder).</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} disabled />
              </div>
              <p className="text-xs text-muted-foreground pl-1">Dark mode is a visual demo.</p>
            </div> */}

            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700"><ShieldAlert className="mr-2 h-5 w-5 text-primary" /> Security</h3>
              <Button variant="outline" asChild>
                <Link href="/forgot-password">Change Password</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSavingSettings}>
              {isSavingSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSavingSettings ? 'Saving Settings...' : 'Save Settings'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
