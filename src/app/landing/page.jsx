// app/home-three/page.jsx (or your desired route)
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Optional: for optimized images
import Script from "next/script";
import Head from "next/head";

// Assuming these components will also be updated with your brand's relevant content
// import { HowItWorksSection } from '@/components/landing/how-it-works-section'; // You might rename or repurpose this
import { WhyChooseUsSection } from "@/components/landing/why-choose-us-section";
// import { TestimonialsSection } from '@/components/landing/testimonials-section'; // Keeping original slider for now
import { CallToActionSection } from "@/components/landing/cta-section";
import TestimonialSection from "@/components/landing/testimonials-section";
import { useRouter } from "next/navigation";

export default function HomeThreePage() {
  useEffect(() => {
    if (typeof WOW !== "undefined" && "init" in WOW.prototype) {
      if (!document.documentElement.classList.contains("wow-initialized")) {
        new WOW().init();
        document.documentElement.classList.add("wow-initialized");
      }
    }
  }, []);

   const [bannerEmail, setBannerEmail] = useState('');
   const router = useRouter();

    const handleBannerSubmit = (e) => {
    e.preventDefault();
    if (!bannerEmail) return;
    router.push(`/signup?email=${encodeURIComponent(bannerEmail)}`);
  };

  return (
    <>
      <Head>
        <title>AI-Powered Job Search Tools to Land Your Dream Job</title>
        <meta
          name="description"
          content="Optimize your resume, enhance your LinkedIn, track jobs, and ace interviews with our AI-driven platform. Trusted by job seekers at top companies."
        />
      </Head>

      {/* Hero Banner Section */}
      <section
        className="saas_banner_area_three pt-15"
        style={{ backgroundColor: "#F7F8F9", paddingTop: "80px" }}
      >
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-xl-6 col-lg-7">
              <div className="sass_banner_content ">
                <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                  Land your dream job. Without the stress.
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.3s">
                  Empowering job seekers with AI tools to optimize resumes,
                  enhance LinkedIn profiles, and track applications seamlessly.
                </p>
                <form
                  className="banner_subscribe wow fadeInUp"
                  data-wow-delay="0.4s"
                  method="post"
                  onSubmit={handleBannerSubmit}
                >
                  {" "}
                  {/* Add onSubmit handler */}
                  <div className="input_group">
                    <img
                      src="/assets/img/home-three/email.png"
                      alt="email icon"
                    />
                    <input
                      name="bannerEmail"
                      value={bannerEmail}
                      onChange={(e) => setBannerEmail(e.target.value)}
                      className="form-control memail"
                      placeholder="Enter your e-mail to get started"
                      required
                    />
                  </div>
                  <button className="saas_btn theme_btn" type="submit">
                    <span className="btn_text">
                      <span>Get Started Free</span>
                      <span>Get Started Free</span>
                    </span>
                  </button>
                </form>
                <p className="credit_text wow fadeInUp display-hidden" data-wow-delay="0.5s">
                  <i className="fa fa-check" aria-hidden="true"></i> Join
                  thousands landing roles at top companies.
                </p>
                <div
                  className="ratting_icon d-flex wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  {/* <a href="#" target="_blank" rel="noopener noreferrer"><img src="/assets/img/home-three/Cap.png" alt="Capterra Rating" /></a> */}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/img/home-three/TP.png"
                      alt="Trustpilot Rating"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="banner_img_three">
                <img
                  className="wow fadeInRight"
                  src="/assets/img/graphic-designer/1.png"
                  alt="AI Job Platform Showcase"
                />
                <div className="one" data-parallax='{"x": 20, "y": -80}'>
                  <img
                    className="wow fadeInUp"
                    data-wow-delay="0.6s"
                    src="/assets/img/home-three/small_1.png"
                    alt="AI Icon"
                  />
                </div>
                <div className="two" data-parallax='{"y": 80}'>
                  <img
                    className="wow fadeInUp"
                    data-wow-delay="0.7s"
                    src="/assets/img/home-three/small_2.png"
                    alt="Job Search Icon"
                  />
                </div>
                <div data-parallax='{"y": 50}' className="three">
                  <img
                    src="/assets/img/graphic-designer/2.png"
                    alt="Success Chart Icon"
                  />
                </div>
                <img
                  className="four"
                  src="/assets/img/home-three/shap.png"
                  alt="Decorative Shape"
                />
                <img
                  className="five"
                  src="/assets/img/home-three/arrow.png"
                  alt="Decorative Arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies / Social Proof Section (Ticker Tape / Marquee) */}
      <section className="bg-[#F7F8F9] py-8">
        <h6 className="text-center px-4 md:px-0 text-lg font-semibold text-gray-700 mb-6">
          Trusted by thousands of companies around the world
        </h6>

        <div className="overflow-hidden w-full">
          <div className="flex animate-marquee whitespace-nowrap">
            {[
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "27",
              "22",
              "33",
              "24",
              "31",
              "26",
              "14",
              "15", // duplicated for infinite effect
            ].map((logo, index) => (
              <div key={index} className="mx-8 flex-shrink-0">
                <img
                  src={`/assets/img/logos/${logo}.png`}
                  alt={`Company Logo ${logo}`}
                  className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="promo_area_two">
        <div className="container">
          <div className="section_title text-center">
            <h5 className="wow fadeInUp" data-wow-delay="0.1s">
              The Difference Our Platform Makes
            </h5>
            <h3 className="wow fadeInUp text-2xl md:text-4xl md:mb-4" data-wow-delay="0.2s">
              Say goodbye to job search frustration.
            </h3>
            <p className="wow fadeInUp px-2 text-xs md:text-lg" data-wow-delay="0.3s">
              From confusion and constant rejections to clarity and your dream
              job offer, discover how our AI tools transform your job hunt.
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <div
                className="promo_item text-center flex items-center flex-col wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <img
                  src="/assets/img/home-three/icon1.png"
                  alt="Frustrated Icon"
                  width={60}
                />
                <h4>Before Our Platform</h4>
                <p>
                  Scattering applications, unsure if your resume hits the mark,
                  and struggling to manage follow-ups.
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div
                className="promo_item text-center flex flex-col items-center wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <img
                  src="/assets/img/home-three/icon2.png"
                  alt="Confident Icon"
                  width={60}
                />
                <h4>After Using Our Platform</h4>
                <p>
                  Applying with optimized resumes, a standout LinkedIn profile,
                  and every application perfectly tracked.
                </p>
              </div>
            </div>
          </div>
          <div
            className="promo_dash_img text-center wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <img
              className="img-fluid"
              src="/assets/img/graphic-designer/4.png"
              alt="Platform Dashboard Preview"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="saas_features_area saas_features_area_two">
        <div className="container">
          {/* Feature 1: Resume Analytics */}
          <div className="row flex-row-reverse saas_features_item one">
            <div className="col-lg-6">
              <div
                className="saas_features_img"
                style={{ backgroundColor: "#E6D8F5" }}
              >
                <img
                  src="/assets/img/graphic-designer/7.png"
                  alt="AI Resume Analysis"
                />
                <div className="img_small wow fadeInUp">
                  <img
                    data-parallax='{"y": 40}'
                    src="/assets/img/graphic-designer/5.png"
                    alt="Resume Score Detail"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="saas_features_content px-2 md:px-0 wow fadeInLeft"
                data-wow-delay="0.2s"
              >
                <h6>AI Resume Optimizer</h6>
                <h2>Get Your Resume Noticed, Instantly.</h2>
                <p>
                  Upload your resume for an AI-powered analysis. Receive an ATS
                  compatibility score, pinpoint keywords, and get actionable
                  advice to tailor your resume for any job.
                </p>
                <ul className="list-unstyled saas_list">
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    Instant AI-driven resume scoring
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    ATS keyword & formatting checks
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    Personalized improvement suggestions
                  </li>
                </ul>
                <Link href="/resume" className="saas_btn">
                  <div className="btn_text">
                    <span>Optimize Your Resume</span>
                    <span>Optimize Your Resume</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Feature 2: LinkedIn Analytics */}
          <div className="row saas_features_item two px-2 md:px-0">
            <div className="col-lg-6">
              <div
                className="saas_features_img"
                style={{ backgroundColor: "#ADDEF0" }}
              >
                <img
                  src="/assets/img/graphic-designer/9.png"
                  alt="LinkedIn Profile Boost"
                />
                <div className="img_small wow fadeInUp" data-wow-delay="0.2s">
                  <img
                    data-parallax='{"y": 40}'
                    src="/assets/img/graphic-designer/8.png"
                    alt="LinkedIn Score Detail"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="saas_features_content px-2 md:px-0 wow fadeInRight"
                data-wow-delay="0.1s"
              >
                <h6>LinkedIn Profile Enhancer</h6>
                <h2>Turn Your LinkedIn Into an Opportunity Magnet.</h2>
                <p>
                  Our AI analyzes your LinkedIn profile, providing a
                  comprehensive score and tailored tips to boost your
                  visibility, networking, and attract recruiters.
                </p>
                <ul className="list-unstyled saas_list">
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    Detailed LinkedIn profile scoring
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    Actionable tips for headline, summary & experience
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    Strategies to expand your professional network
                  </li>
                </ul>
                <Link href="/linkedin" className="saas_btn">
                  <div className="btn_text">
                    <span>Boost Your LinkedIn</span>
                    <span>Boost Your LinkedIn</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Feature 3: ATS Resume Builder / Job Tracker */}
          <div className="row flex-row-reverse saas_features_item one">
            <div className="col-lg-6">
              <div
                className="saas_features_img"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <img
                  src="/assets/img/graphic-designer/1.png"
                  alt="ATS Resume Builder / Job Tracker"
                />
                <div className="img_small wow fadeInUp" data-wow-delay="0.2s">
                  <img
                    data-parallax='{"y": 40}'
                    src="/assets/img/graphic-designer/10.png"
                    alt="Tool Feature Detail"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="saas_features_content wow fadeInLeft"
                data-wow-delay="0.1s"
              >
                <h6>Smart Job Application Toolkit</h6>
                <h2>Build, Track, and Succeed with Ease.</h2>
                <p>
                  Craft compelling, ATS-friendly resumes with our builder,
                  generate tailored cover letters, and keep all your
                  applications organized with our intuitive job tracker.
                </p>
                <ul className="list-unstyled saas_list">
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    ATS-Optimized Resume Builder & Templates
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    AI Cover Letter Generator
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/assets/img/home-one/check.png" alt="check" />
                    </div>
                    Comprehensive Job Application Tracker
                  </li>
                </ul>
                <Link href="/dashboard" className="saas_btn">
                  <div className="btn_text">
                    <span>Explore All Tools</span>
                    <span>Explore All Tools</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSection />

      {/* How It Works / Process Section */}
      <section
        className="saas_process_area sec_padding"
        style={{ backgroundColor: "#F5F8FF" }}
      >
        <div className="container">
          <div className="section_title section_title_three text-center">
            <h5 className="wow fadeInUp" data-wow-delay="0.2s">
              Get Started Quickly
            </h5>
            <h3 className="wow fadeInUp text-2xl md:text-5xl/[1.2]" data-wow-delay="0.3s">
              Your Journey to a Dream Job in 3 Easy Steps
            </h3>
          </div>
          <div className="row process_inner">
            <div className="col-md-4">
              <div
                className="process_item text-center wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="icon">
                  <img
                    src="/assets/img/home-three/process_1.png"
                    alt="Step 1 Icon - Upload/Connect"
                  />
                </div>
                <h5>Step 1: Choose Your Tool</h5>
                <p>
                  Upload your resume, provide your LinkedIn profile URL, or use
                  our intuitive resume builder to start from scratch.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="process_item text-center wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="icon">
                  <img
                    src="/assets/img/home-three/process_2.png"
                    alt="Step 2 Icon - AI Analysis"
                  />
                </div>
                <h5>Step 2: Get AI Insights</h5>
                <p>
                  Our intelligent algorithms analyze your document or profile,
                  providing instant scores, detailed feedback, and actionable
                  insights.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="process_item text-center wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <div className="icon">
                  <img
                    src="/assets/img/home-three/process_3.png"
                    alt="Step 3 Icon - Refine & Apply"
                  />
                </div>
                <h5>Step 3: Refine, Apply & Track</h5>
                <p>
                  Use AI suggestions to perfect your materials, apply with
                  confidence, and track your progress seamlessly with our tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - You would update this imported component */}
      <WhyChooseUsSection />
      {/* For now, I'll add a placeholder based on the original structure if you don't have WhyChooseUsSection ready */}

      {/* Pricing Section */}
      <section className="relative bg-gray-50 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[50%] top-0 h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Our Plans
            </h2>
            <p className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              The Right Price for You, Whoever You Are
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg/ leading-8 text-gray-600">
            Invest in your future. Our plans are designed to provide
            unparalleled value at every stage of your career.
          </p>
          <div className="isolate mx-auto mt-20 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-gray-200 transition-all duration-300 hover:ring-blue-500">
              <h3 className="text-lg font-semibold leading-8 text-gray-900 m-0">
                Starter
              </h3>
              <p className="flex items-baseline">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  Free
                </span>
              </p>
              <ul
                role="list"
                className="mt-8 flex-grow space-y-3 text-sm leading-6 text-gray-600"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Basic Resume Score
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Limited LinkedIn Tips
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Job Tracker (up to 10 jobs)
                </li>
                <li className="flex gap-x-3 text-gray-500 line-through">
                  <svg
                    className="h-6 w-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                  Advanced AI Insights
                </li>
                <li className="flex gap-x-3 text-gray-500 line-through">
                  <svg
                    className="h-6 w-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                  AI Cover Letter Generator
                </li>
                <li className="flex gap-x-3 text-gray-500 line-through">
                  <svg
                    className="h-6 w-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                  Premium Resume Templates
                </li>
              </ul>
              <Link
                href="/signup?plan=starter"
                className="mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold text-blue-600 ring-1 ring-inset ring-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>

            <div className="relative flex flex-col rounded-3xl bg-white p-8 ring-2 ring-blue-500 shadow-xl transition-all duration-300">
              <div className="absolute top-0 -translate-y-1/2 self-center rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900 m-0">
                Pro
              </h3>
              <p className="flex items-baseline">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  ₹199
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  / month
                </span>
              </p>
              <ul
                role="list"
                className="mt-8 flex-grow space-y-3 text-sm leading-6 text-gray-600"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlimited Resume Reviews
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  AI Cover Letter Generator
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Interview Prep Tools
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlimited Job Tracking
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Full LinkedIn Optimization Suite
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Premium Resume Templates
                </li>
              </ul>
              <Link
                href="/signup?plan=pro"
                className="mt-8 block rounded-md bg-blue-500 py-2.5 px-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors duration-200"
              >
                Choose Pro
              </Link>
            </div>

            <div className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-gray-200 transition-all duration-300 hover:ring-blue-500">
              <h3 className="text-lg font-semibold leading-8 text-gray-900 m-0">
                Premium
              </h3>
              <p className="flex items-baseline">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  ₹999
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  / month
                </span>
              </p>
              <ul
                role="list"
                className="mt-8 flex-grow space-y-3 text-sm leading-6 text-gray-600"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  All Pro Features
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced Networking Tools
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Priority Support
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Career Path Guidance
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Early Access to New Features
                </li>
              </ul>
              <Link
                href="/signup?plan=premium"
                className="mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold text-blue-600 ring-1 ring-inset ring-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Go Premium
              </Link>
            </div>
          </div>

          <p className="mt-20 text-center text-base text-gray-600">
            Need a custom solution or team access?{" "}
            <Link
              href="/contact"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Contact Us
            </Link>
          </p>
        </div>
      </section>

      <CallToActionSection />

      {/* FAQ Section */}
      <section
        className="saas_faq_area_two sec_padding"
        style={{ backgroundColor: "#F5F8FF" }}
      >
        <div className="container">
          <div
            className="section_title section_title_three text-center wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="accordion faq_inner faq_inner_two ps-4"
                id="accordionExampleTwo"
              >
                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <h2 className="accordion-header" id="headingSeven">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSeven"
                      aria-expanded="true"
                      aria-controls="collapseSeven"
                    >
                      How does the AI improve my resume?
                    </button>
                  </h2>
                  <div
                    id="collapseSeven"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSeven"
                    data-bs-parent="#accordionExampleTwo"
                  >
                    <div className="accordion-body">
                      <p>
                        Our AI analyzes your resume against industry best
                        practices and specific job descriptions. It checks for
                        ATS compatibility, keyword optimization, clarity,
                        impact, and provides actionable suggestions to make your
                        resume more effective in landing interviews.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.6s"
                >
                  <h2 className="accordion-header" id="headingEight">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEight"
                      aria-expanded="false"
                      aria-controls="collapseEight"
                    >
                      Is this platform suitable for all career levels and
                      industries?
                    </button>
                  </h2>
                  <div
                    id="collapseEight"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingEight"
                    data-bs-parent="#accordionExampleTwo"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes! Our tools are designed for students, recent
                        graduates, mid-career professionals, and executives
                        across a wide range of industries. Our AI and templates
                        can be adapted to suit various experience levels and job
                        functions.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <h2 className="accordion-header" id="headingNine">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseNine"
                      aria-expanded="false"
                      aria-controls="collapseNine"
                    >
                      Does this platform help me find job openings?
                    </button>
                  </h2>
                  <div
                    id="collapseNine"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingNine"
                    data-bs-parent="#accordionExampleTwo"
                  >
                    <div className="accordion-body">
                      <p>
                        While our platform provides powerful tools to optimize
                        your application materials and track your search, it is
                        not a job board. We help you effectively apply to jobs
                        you find on platforms like LinkedIn, Indeed, company
                        career pages, etc. Our job tracker helps you manage
                        those applications.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <h2 className="accordion-header" id="headingTen">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTen"
                      aria-expanded="false"
                      aria-controls="collapseTen"
                    >
                      What kind of support is available if I have questions?
                    </button>
                  </h2>
                  <div
                    id="collapseTen"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTen"
                    data-bs-parent="#accordionExampleTwo"
                  >
                    <div className="accordion-body">
                      <p>
                        We offer comprehensive support through our help center,
                        email support, and for premium users, priority support
                        channels. Our goal is to ensure you have a smooth and
                        successful experience with our platform.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.9s"
                >
                  <h2 className="accordion-header" id="headingEleven">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEleven"
                      aria-expanded="false"
                      aria-controls="collapseEleven"
                    >
                      Is my personal data and resume information secure?
                    </button>
                  </h2>
                  <div
                    id="collapseEleven"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingEleven"
                    data-bs-parent="#accordionExampleTwo"
                  >
                    <div className="accordion-body">
                      <p>
                        Absolutely. We take data privacy and security very
                        seriously. Your personal information and documents are
                        encrypted and protected using industry-standard security
                        measures. Please review our Privacy Policy for full
                        details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
