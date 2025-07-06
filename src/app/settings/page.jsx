
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
import { Loader2, Save, Bell, Palette, ShieldAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

// Assume these settings would be stored in Firestore user document under a 'settings' object
// For now, we'll manage them with local state and simulate saving

export default function SettingsPage() {
  const { user, userData, loading, refreshUserData } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Placeholder, actual dark mode needs theme context
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (userData && userData.settings) {
      setEmailNotifications(userData.settings.emailNotifications !== undefined ? userData.settings.emailNotifications : true);
      setDarkMode(userData.settings.darkMode !== undefined ? userData.settings.darkMode : false);
    }
  }, [user, userData, loading, router]);

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Error", description: "You are not logged in." });
      return;
    }
    setIsSaving(true);
    try {
      // In a real app, you'd update these settings in Firestore:
      // const userRef = doc(db, "users", user.uid);
      // await updateDoc(userRef, {
      //   'settings.emailNotifications': emailNotifications,
      //   'settings.darkMode': darkMode,
      // });
      // await refreshUserData();
      
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({ title: "Settings Saved", description: "Your preferences have been updated." });
    } catch (error) {
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
      console.error("Error updating settings:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading || !user) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
             <Skeleton className="h-7 w-40 mb-2" />
             <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-6 w-12" />
                </div>
                 <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-6 w-12" />
                </div>
            </div>
             <div className="space-y-4">
                <Skeleton className="h-6 w-32 mb-3" />
                 <Skeleton className="h-10 w-full mb-2" />
                 <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Account Settings</CardTitle>
          <CardDescription>Manage your notification preferences and account settings.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSettingsUpdate}>
          <CardContent className="space-y-8">
            {/* Notification Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700"><Bell className="mr-2 h-5 w-5 text-primary" /> Notifications</h3>
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                <div>
                    <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive updates about new features and tips.</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Appearance Settings (Placeholder) */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700"><Palette className="mr-2 h-5 w-5 text-primary" /> Appearance</h3>
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                 <div>
                    <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Enable dark theme for the application.</p>
                 </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  disabled={isSaving || true} // True because it's a placeholder
                />
              </div>
               <p className="text-xs text-muted-foreground pl-1">Dark mode functionality is a visual placeholder and not fully implemented.</p>
            </div>

            {/* Security Settings (Placeholder) */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700"><ShieldAlert className="mr-2 h-5 w-5 text-primary" /> Security</h3>
               <Button variant="outline" asChild>
                <Link href="/forgot-password">Change Password</Link>
              </Button>
              {/* Placeholder for 2FA settings if needed */}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving || loading}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSaving ? 'Saving Settings...' : 'Save Settings'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
