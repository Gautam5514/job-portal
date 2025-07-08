"use client";
import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">About Career Genius</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Helping job seekers create standout resumes, analyze skills, and discover tailored job opportunities.
          </p>
        </div>

        {/* Company Info */}
        <section className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Resumely.ai is a cutting-edge platform that empowers job seekers by simplifying their job application process. 
            We provide AI-powered resume builders, skill analyzers, and LinkedIn profile insights to help you land your dream job faster.
            Whether you're a fresher or a working professional, we aim to give you the tools that make a difference in your career journey.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To provide smart, fast, and accessible career tools for every individual to get closer to their dream job.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To be the #1 global platform for resume building, career analysis, and job matching.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Resume Builder:</strong> Craft professional resumes in minutes using modern, ATS-friendly templates.</li>
            <li><strong>Resume Analyzer:</strong> Upload your resume and get instant feedback on formatting, keywords, and skills.</li>
            <li><strong>LinkedIn Insights:</strong> Analyze your LinkedIn profile and improve your online professional presence.</li>
            <li><strong>Job Suggestions:</strong> Get AI-powered job recommendations based on your resume and preferences.</li>
          </ul>
        </section>

        {/* Pricing Summary */}
        {/* <section className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Pricing Overview</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-blue-50">
              <h4 className="text-xl font-semibold text-blue-700">Free Plan</h4>
              <p className="text-gray-600 mt-2">✔ Basic resume templates<br />✔ Resume analyzer (limited)<br />✔ 2 job suggestions/month</p>
            </div>
            <div className="border p-6 rounded-lg shadow hover:shadow-lg transition bg-green-50">
              <h4 className="text-xl font-semibold text-green-700">Pro Plan – ₹299/month</h4>
              <p className="text-gray-600 mt-2">✔ All resume templates<br />✔ Unlimited analyzer scans<br />✔ Daily job suggestions<br />✔ LinkedIn optimization</p>
            </div>
          </div>
        </section> */}

        {/* Payment Info */}
        <section className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Payments & Security</h2>
          <p className="text-gray-700">
            We partner with secure payment gateways to ensure your data and transactions are always protected. 
            All payments are processed via Razorpay/Stripe, and we do not store your card details.
            You can cancel your subscription anytime from your dashboard.
          </p>
        </section>

        {/* Contact */}
        <section className="text-center pt-10">
          <p className="text-gray-600">Still have questions?</p>
          <a
            href="/contact"
            className="text-blue-600 hover:underline font-medium"
          >
            Contact our support team →
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
