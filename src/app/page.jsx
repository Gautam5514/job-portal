

// Note: The old landing page /app/landing/page.jsx might need to be removed or its content merged if desired.
// This page.jsx at the root is now the main landing page.

import HomeThreePage from "./landing/page";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HomeThreePage />
      </main>
    </div>
  );
}
