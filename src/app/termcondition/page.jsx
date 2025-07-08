"use client";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-4 text-sm text-gray-500">Effective Date: June 2025</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By using our platform, you agree to comply with and be legally bound
          by these Terms. If you do not agree, please do not use the Platform.
        </p>

        <h2 className="text-xl font-semibold">2. Services We Offer</h2>
        <p>
          Our services include Resume Builder, Resume Analyzer, LinkedIn Profile
          Analysis, and Job Suggestions based on candidate profiles.
        </p>


        <h2 className="text-xl font-semibold">3. User Data and Privacy</h2>
        <p>
          Uploaded resumes or LinkedIn profiles are analyzed only for resume
          improvement and job-matching. We do not sell personal data. Please read
          our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
        </p>

        <h2 className="text-xl font-semibold">4. Account and Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your login
          details and for all activities under your account.
        </p>

        <h2 className="text-xl font-semibold">5. Prohibited Activities</h2>
        <ul className="list-disc pl-6">
          <li>Illegal or unauthorized use</li>
          <li>Uploading false/misleading information</li>
          <li>Scraping or automated data extraction</li>
        </ul>

        <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
        <p>
          All content, designs, and code are the intellectual property of Career Genius (owned and operated by Pooja Agrawal) . Reproduction or misuse is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold">7. Third-Party Integrations</h2>
        <p>
          We may link to external services (e.g., job boards, LinkedIn). We are
          not responsible for the content or practices of third-party sites.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
