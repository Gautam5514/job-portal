
import Link from 'next/link';
import { Rocket, Sparkles } from 'lucide-react'; // Added Sparkles as an alternative

export function CallToActionSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-[#f9fbfd] to-[#e9eff5] text-gray-900">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
            <Sparkles className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Ready to Elevate Your Professional Profile?
        </h2>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Don't wait any longer. Take control of your career narrative. Use our AI tools to refine your resume and LinkedIn presence today and step confidently towards your goals.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/tools">
            <button className="saas_btn theme_btn" type="button">
              <span className="btn_text">
                <span>Polish Your Profile Now</span>
                <span>Polish Your Profile Now</span>
              </span>
            </button>
          </Link>

          <Link href="/build">
            <button className="saas_btn theme_btn" type="button">
              <span className="btn_text">
                <span>Build a New Resume</span>
                <span>Build a New Resume</span>
              </span>
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
}
