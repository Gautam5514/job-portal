"use client";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <p>
          This Privacy Policy explains how <strong> PrepX </strong> (owned and operated by Pooja Agrawal) collects,
          uses, and shares information when you use our services: Resume Builder,
          Resume Analyzer, LinkedIn Profile Analysis, and Job Recommendation.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Personal Information: Name, Email, Contact Info</li>
          <li>Resume Content: Education, Skills, Experience</li>
          <li>LinkedIn Profile Data (if imported)</li>
          <li>Usage Data (pages visited, features used)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To generate resumes and career insights</li>
          <li>To suggest job opportunities matching your profile</li>
          <li>To improve and personalize your user experience</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Data Sharing & Storage</h2>
        <p>
          We do <strong>not</strong> sell your data. We may use secure third-party services to store
          and process information. Your data is encrypted and access is restricted.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Access or download your resume/profile</li>
          <li>Request deletion of your account and data</li>
          <li>Control which insights or suggestions you receive</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
        <p>
          We use cookies for authentication and analytics to improve performance.
          You can manage cookie preferences in your browser.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
        <p>
          For questions or requests, contact us at:{" "}
          <a href="mailto:admin@azurelib.com" className="text-blue-600 underline">
            admin@azurelib.com
          </a>
        </p>
      </section>

      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Use of Services</h2>
        <p>
          By using our website and services, you agree to use them for lawful and
          personal career purposes only.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Account Responsibility</h2>
        <p>
          You are responsible for keeping your account credentials confidential and
          agree not to share your login information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
        <p>
          All templates, code, and analysis tools are the property of YourCompany
          and may not be copied or reused without permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access if you violate our
          terms or misuse the platform.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-6">
        Last updated: June 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
