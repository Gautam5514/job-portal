
'use client';

import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useToast } from '../../hooks/use-toast';
import { Loader2, CreditCard, Star, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '../../components/ui/skeleton';

export default function SubscriptionPage() {
  const { user, userData, loading, refreshUserData } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    // Optionally refresh user data if it might be stale regarding subscription
    // refreshUserData(); 
  }, [user, loading, router]);

  const handleManageSubscription = () => {
    // This would typically redirect to a Stripe customer portal or similar
    toast({ title: "Coming Soon!", description: "Subscription management via a portal is not yet implemented." });
    // Example: window.location.href = userData?.subscription?.managementUrl;
  };

  if (loading || !user || !userData) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader>
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="p-6 border rounded-lg bg-primary/5">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-4 w-36 mb-3" />
                <Skeleton className="h-10 w-32" />
             </div>
              <div className="p-6 border rounded-lg">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-4 w-36 mb-3" />
                <Skeleton className="h-10 w-32" />
             </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const currentPlan = userData.subscription?.plan || 'free';
  const planStatus = userData.subscription?.status || 'N/A';
  const planEndDate = userData.subscription?.endDate 
    ? new Date(userData.subscription.endDate.seconds * 1000).toLocaleDateString() 
    : 'N/A';

  const plans = [
    {
      name: 'Free',
      price: '$0/month',
      features: [
        'Basic Resume Score (1 per month)',
        'Limited LinkedIn Tips (1 per month)',
        'Job Tracker (up to 10 jobs)',
      ],
      isCurrent: currentPlan === 'free',
      cta: {
        href: '/signup?plan=free', // Or null if already on free
        text: 'Current Plan',
      }
    },
    {
      name: 'Pro',
      price: '$29/month',
      features: [
        'Unlimited Resume Reviews & Detailed Analysis',
        'Full LinkedIn Optimization Suite',
        'Unlimited Job Tracking',
        'AI Cover Letter Generator (Coming Soon)',
        'Premium Resume Templates',
        'Interview Prep Tools (Coming Soon)',
      ],
      isCurrent: currentPlan === 'pro',
       cta: {
        href: '/pricing#pro', // Link to pricing section or checkout
        text: currentPlan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      }
    },
     {
      name: 'Premium',
      price: '$49/month',
      features: [
        'All Pro Features',
        'Advanced Networking Tools (Coming Soon)',
        'Priority Support',
        'Career Path Guidance (Coming Soon)',
        'Early Access to New Features',
      ],
      isCurrent: currentPlan === 'premium',
      cta: {
        href: '/pricing#premium',
        text: currentPlan === 'premium' ? 'Current Plan' : 'Upgrade to Premium',
      }
    }
  ];


  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            <CreditCard className="mr-3 h-6 w-6" />
            Manage Your Subscription
          </CardTitle>
          <CardDescription>
            View your current plan, explore upgrade options, or manage your billing details.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Your Current Plan: <span className="capitalize font-bold">{currentPlan}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: <span className={`font-medium ${planStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>{planStatus}</span></p>
              {currentPlan !== 'free' && planEndDate !== 'N/A' && (
                <p>Next billing date / Expires on: {planEndDate}</p>
              )}
              {currentPlan !== 'free' && userData.subscription?.managementUrl && (
                 <Button onClick={handleManageSubscription} className="mt-4">
                    Manage Billing <ExternalLink className="ml-2 h-4 w-4"/>
                 </Button>
              )}
               {currentPlan !== 'free' && !userData.subscription?.managementUrl && (
                 <Button onClick={handleManageSubscription} className="mt-4" variant="outline" disabled>
                    Manage Billing (Portal N/A)
                 </Button>
              )}
            </CardContent>
          </Card>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.filter(p => p.name.toLowerCase() !== currentPlan).map((plan) => (
                <Card key={plan.name} className={`${plan.isCurrent ? 'border-primary ring-2 ring-primary' : 'hover:shadow-md'} transition-all`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center ${plan.name === 'Pro' ? 'text-accent' : plan.name === 'Premium' ? 'text-yellow-500': 'text-primary'}`}>
                      {plan.name === 'Pro' && <Star className="mr-2 h-5 w-5 fill-accent text-accent" />}
                       {plan.name === 'Premium' && <Star className="mr-2 h-5 w-5 fill-yellow-500 text-yellow-500" />}
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant={plan.isCurrent ? "outline" : "default"} disabled={plan.isCurrent}>
                      <Link href={plan.cta.href || '#'}>{plan.cta.text}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
               {plans.filter(p => p.name.toLowerCase() === currentPlan).length === plans.length && (
                  <p className="text-muted-foreground md:col-span-2 text-center">You are currently on the highest available plan.</p>
              )}
            </div>
             <p className="text-xs text-muted-foreground mt-6 text-center">
                For custom enterprise solutions, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </div>

        </CardContent>
         <CardFooter>
             <p className="text-xs text-muted-foreground">
                Subscription changes will apply from the next billing cycle. For help, visit our support page or contact us.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
