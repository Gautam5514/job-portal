'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Check, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '../../lib/firebase/firebase';
import { doc, updateDoc, serverTimestamp, arrayUnion, Timestamp } from 'firebase/firestore';

const plans = [
  {
    id: 'free',
    basePlanId: 'free',
    name: 'Free',
    price: '₹0',
    numericPrice: 0,
    currency: 'INR',
    frequency: '/month',
    description: 'Get a taste of our AI power, perfect for getting started.',
    features: [
      'Basic Resume Score (1 per month)',
      'Limited LinkedIn Tips (1 per month)',
      'Job Tracker (up to 10 jobs)',
      'Access to Standard Templates',
    ],
    ctaText: 'Get Started for Free', // Base CTA, will be overridden
    variant: 'outline',
  },
  {
    id: 'monthly_199',
    basePlanId: 'Premium',
    BillingCycle: 'Monthly',
    name: 'Pro Monthly',
    price: '₹199',
    numericPrice: 19900,
    currency: 'INR',
    frequency: '/month',
    description: 'Unlock essential tools for your job search, billed monthly.',
    features: [
      'Unlimited Resume Reviews & Basic Analysis',
      'Standard LinkedIn Optimization Suite',
      'Unlimited Job Tracking',
      'Access to All Standard Templates',
      'Email Support',
    ],
    ctaText: 'Choose Monthly Plan', // Base CTA
    variant: 'default',
    popular: true,
  },
  {
    id: 'yearly_999',
    basePlanId: 'Premium',
    name: 'Pro Yearly',
    BillingCycle: 'Yearly',
    price: '₹999',
    numericPrice: 99900,
    currency: 'INR',
    frequency: '/year',
    description: 'Best value! Get a full year of Pro access and save.',
    features: [
      'All Pro Monthly Features Included',
      'Detailed Resume Analysis with Premium Feedback',
      'AI Cover Letter Generator (Coming Soon)',
      'Access to All Premium Templates',
      'Priority Email Support',
    ],
    ctaText: 'Choose Yearly Plan', // Base CTA
    variant: 'outline',
  },
];

export default function PricingPage() {
  const { user, userData, loading: authLoading, refreshUserData } = useAuth();
  const router = useRouter();
  console.log(userData)
  const [paymentProcessing, setPaymentProcessing] = useState(null);

  const currentUserPlanId = (userData && userData.subscription && userData.subscription.status === 'active')
                           ? userData.subscription.planTier
                           : 'free';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

 const handleFreePlanActivation = async () => {
    if (currentUserPlanId === 'free' && user) { // Check if already on free AND logged in
      alert("You are already on the Free plan.");
      router.push('/dashboard'); // Optionally redirect
      return;
    }
    if (!user) {
      router.push('/signup?plan=free'); // If not logged in, go to signup
      return;
    }

    setPaymentProcessing('free');
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'subscription.plan': 'free',
        'subscription.status': 'active', // Could also be 'downgraded'
        'subscription.startDate': serverTimestamp(),
        'subscription.endDate': null,
        'subscription.razorpayOrderId': null,
        'subscription.razorpayPaymentId': null,
        transactions: arrayUnion({
          transactionId: `free_activation_${Date.now()}`,
          orderId: null, amount: 0, currency: 'INR',
          planId: 'free', planName: 'Free', status: 'success',
          timestamp: serverTimestamp(), userId: user.uid,
        }),
      });
      alert('Switched to Free plan successfully!');
      if (refreshUserData) await refreshUserData();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error activating free plan:', error);
      alert('Failed to switch to free plan. Please try again or contact support.');
    } finally {
      setPaymentProcessing(null);
    }
  };

  const handlePayment = async (plan) => {
    if (authLoading) return;

    // Check if trying to purchase the current active plan
    if (user && plan.id === currentUserPlanId) {
      alert(`You are already on the ${plan.name} plan.`);
      return; // Don't proceed
    }

    setPaymentProcessing(plan.id);

    if (!user) {
      localStorage.setItem('selectedPlanId', plan.id);
      router.push(`/login?redirect=/pricing&plan=${plan.id}`);
      setPaymentProcessing(null);
      return;
    }

    if (plan.id === 'free') {
      await handleFreePlanActivation(); // This now handles downgrades too
      return;
    }

    // For Paid Plans (New Purchase or Upgrade/Downgrade logic)
    try {
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          amount: plan.numericPrice, currency: plan.currency,
          planId: plan.id, userId: user.uid,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create Razorpay order. Please try again.');
      }
      const orderData = await orderResponse.json();

      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Career Genius',
        description: `Payment for ${plan.name} Plan`,
        image: '/logo.png', // Replace with your actual logo
        order_id: orderData.orderId,
        handler: async function (response) {
          setPaymentProcessing(plan.id + '_verifying');
          try {
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.uid,
                planId: plan.id,
                planName: plan.name,
                amountPaid: plan.numericPrice,
                currency: plan.currency,
              }),
            });
            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              alert('Payment successful! Your plan is now active.');
              if (refreshUserData) await refreshUserData();
              router.push('/dashboard');
            } else {
              alert(`Payment verification failed: ${verifyData.error || 'Unknown error. Please contact support.'}`);
            }
          } catch (verificationError) {
             console.error('Error during payment verification call:', verificationError);
             alert('An error occurred while verifying your payment. Please contact support.');
          } finally {
            setPaymentProcessing(null);
          }
        },
        prefill: {
          name: userData?.displayName || user.email.split('@')[0],
          email: user.email,
        },
        notes: { plan_id: plan.id, user_id: user.uid, },
        theme: { color: '#3B82F6', }, // Your brand color
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.error('Razorpay payment failed:', response.error);
          alert(`Payment Failed: ${response.error.description} (Reason: ${response.error.reason})`);
          setPaymentProcessing(null);
        });
        rzp.open();
      } else {
        console.error('Razorpay SDK not loaded');
        alert('Payment gateway is currently unavailable. Please try again later.');
        setPaymentProcessing(null);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(`Error: ${error.message}`);
      setPaymentProcessing(null);
    }
  };

  useEffect(() => {
    const selectedPlanId = localStorage.getItem('selectedPlanId');
    if (selectedPlanId && user) {
      localStorage.removeItem('selectedPlanId');
      const planToActivate = plans.find(p => p.id === selectedPlanId);
      if (planToActivate) {
        console.log('User logged in, previously selected plan:', planToActivate.name);
      }
    }
  }, [user]);

   const currentActivePlan = plans.find((p) => p.id === currentUserPlanId) || { id: 'free', numericPrice: 0 };

  return (
    <>
      <Head>
        <title>Pricing Plans - Career Genius</title>
        <meta name="description" content="Choose the perfect plan to boost your job search with Career Genius's AI tools." />
      </Head>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Find the Plan That’s Right For You
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're just starting or aiming for the top, our plans are designed to give you the professional edge.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
             {plans.map((plan) => {
              const isCurrentPlan  = user && plan.id === currentActivePlan.id;
const isHigherPrice  = user && plan.numericPrice > currentActivePlan.numericPrice;
const showButton     = !user || isCurrentPlan || isHigherPrice; // visitors see all

/* decide CTA */
let ctaText   = plan.ctaText;
let variant   = plan.variant;
let disabled  = false;

if (isCurrentPlan) {
  ctaText  = 'Current Plan';
  variant  = 'secondary';
  disabled = true;
} else if (isHigherPrice) {
  ctaText = `Upgrade to ${plan.name.replace('Pro ', '')}`;
}



              return (
                <Card
                  key={plan.id}
                  className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden relative
                    ${isCurrentPlan ? 'border-2 border-green-600 ring-2 ring-green-600/30' : 
                     (plan.popular && !isCurrentPlan ? 'border-2 border-primary ring-2 ring-primary/30' : 'border-border')
                    }`}
                >
                  {isCurrentPlan && user && ( // Only show active badge if user is logged in
                    <div className="absolute top-0 right-0 mt-3 mr-3 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center z-10 shadow">
                      <Check className="h-4 w-4 mr-1.5" /> Active
                    </div>
                  )}
                  {plan.popular && !isCurrentPlan && (
                    <div className="py-1.5 px-4 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide text-center">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pt-8 pb-4">
                    <CardTitle className="text-2xl font-semibold text-primary mb-1">{plan.name}</CardTitle>
                    <div className="mb-3">
                      <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">{plan.price}</span>
                      <span className="text-lg text-muted-foreground">{plan.frequency}</span>
                    </div>
                    <CardDescription className="text-sm h-10">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow py-6 space-y-3">
                    <ul className="space-y-2.5 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                   {showButton && (
      <CardFooter className="mt-auto p-6">
        <Button
          onClick={() => handlePayment(plan)}
          size="lg"
          className="w-full"
          variant={variant}
          disabled={
            disabled ||
            authLoading ||
            (paymentProcessing &&
             paymentProcessing !== plan.id + '_verifying')
          }
        >
          {authLoading && !isCurrentPlan
            ? 'Loading...'
            : paymentProcessing === plan.id
              ? 'Processing...'
              : paymentProcessing === plan.id + '_verifying'
                ? 'Verifying...'
                : ctaText}
        </Button>
      </CardFooter>
    )}
  </Card>
              );
            })}
          </div>
           <p className="text-center text-muted-foreground mt-12">
            Need a custom solution or team access?{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact Us
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.' },
              { q: 'What happens if I cancel my Pro plan?', a: 'You will retain Pro features until your current subscription period ends. Afterwards, your account will revert to the Free plan, or you can choose to resubscribe.' },
              { q: 'Do you offer refunds?', a: 'We generally do not offer refunds for subscription periods already started. Please review our Terms of Service or contact support for exceptional cases.' },
              { q: 'How is my data secured?', a: 'We take data security seriously. Your information is encrypted and protected using industry-standard measures. Our AI analysis is processed securely and not used to train public models.' },
              { q: 'What payment methods do you accept?', a: 'We accept major credit cards, debit cards, UPI, and net banking through Razorpay for users in India.' }, // Already specific to India
              { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can manage your subscription and change plans from your account settings. Changes usually take effect at the start of your next billing cycle.' },
            ].map((faq, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}