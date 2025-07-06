'use client';   

import './globals.css';
import { Inter } from 'next/font/google';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter'; 
import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script'; 

const inter = Inter({ subsets: ['latin'] });

// export const metadata = { 
//   title: 'Prepex - AI-Powered Career Tools',
//   description: 'Optimize your resume, enhance your LinkedIn, track jobs, and ace interviews with our AI-driven platform.',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Prepex - AI-Powered Career Tools</title>
        <meta name="description" content="Optimize your resume, enhance your LinkedIn, track jobs, and ace interviews with our AI-driven platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        <link href="/assets/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendors/themify-icon/themify-icons.css" rel="stylesheet" />
        <link href="/assets/vendors/icomoon/style.css" rel="stylesheet" />
        <link href="/assets/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/assets/vendors/slick/slick.css" rel="stylesheet" />
        <link href="/assets/vendors/slick/slick-theme.css" rel="stylesheet" />
        <link href="/assets/vendors/animation/animate.css" rel="stylesheet" />
        <link href="/assets/css/style.css" rel="stylesheet" />
        <link href="/assets/css/responsive.css" rel="stylesheet" />
        <link rel="icon" href="/assets/img/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <AppHeader />
            <main className="flex-1">
              {children}
            </main>
            {/* <AppFooter /> */}

            <Script
              id="buymeacoffee-widget" 
              src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
              data-name="BMC-Widget"
              data-cfasync="false"
              data-id="YOUR_BMC_ID" // Replace with actual ID
              data-description="Support me on Buy me a coffee!"
              data-message="Liked it!"
              data-color="#5F7FFF" 
              data-position="Right"
              data-x_margin="18"
              data-y_margin="18"
              strategy="lazyOnload" 
            />
            
            <footer className="footer_area_two footer_area_three footer_shap" style={{ backgroundColor: '#12141D' }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <div className="f_widget f_about_widget wow fadeInUp" data-wow-delay="0.2s">
                      <a href="#" className="f_logo"><img className="h-12" src="/assets/img/logowhite.png" alt="" /></a>
                      <p>Prepex is all in one home for career tools. Ai powered boost to help you land your dream job</p>
                      <ul className="list-unstyled f_social_icon">
                        <li><a href="#"><i className="ti-facebook"></i></a></li>
                        <li><a href="#"><i className="ti-twitter-alt"></i></a></li>
                        <li><a href="#"><i className="ti-vimeo-alt"></i></a></li>
                        <li><a href="#"><i className="ti-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>
                  {/* ... Other footer widgets ... */}
                  <div className="col-lg-2 col-sm-6">
                    <div className="f_widget f_link_widget wow fadeInUp" data-wow-delay="0.3s">
                      <h3 className="f_title">COMPANY</h3>
                      <ul className="list-unstyled link_widget">
                        <li><a href="/about">About</a></li>
                        <li><a href="/resume">Resume Analyzer</a></li>
                        <li><a href="/linkedin">LinkedIn Analyzer</a></li>
                        <li><a href="/job-portal">Job Portal</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 align-end col-sm-6">
                    <div className="f_widget f_link_widget wow fadeInUp" data-wow-delay="0.4s">
                      <h3 className="f_title">HELP</h3>
                      <ul className="list-unstyled link_widget">
                        <li><a href="/customer-support">Customer Support</a></li>
                        <li><a href="/refund">Refund Policy</a></li>
                        <li><a href="/termcondition">Terms & Conditions</a></li>
                       
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6">
                    <div className="f_widget f_link_widget wow fadeInUp" data-wow-delay="0.4s">
                      <h3 className="f_title">HELP</h3>
                      <ul className="list-unstyled link_widget">
                       <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/pricing-policy">Pricing Policy</a></li>
                        <li><a href="/shipping-policy">Shipping Policy</a></li>
                      </ul>
                    </div>
                  </div>
                   {/* <div className="col-lg-3 col-sm-6">
                   <div className="f_widget f_newsletter_widget wow fadeInUp" data-wow-delay="0.5s">
                      <h3 className="f_title">SUBSCRIBE TO NEWSLETTER</h3>
                      <form action="#" className="newsletter_form newsletter_form_two">
                        <input className="form-control" type="text" placeholder="Enter your email" />
                        <button type="submit" className="theme_btn">Subscribe</button>
                      </form>
                    </div> 
                  </div>*/}
                </div>
                <div className="footer_bottom text-center">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className="mb-0 wow fadeInUp" data-wow-delay="0.4s">© Copyright 2024, All Rights Reserved by Prepex</p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </AuthProvider>

        {/* Scripts loaded using Next.js Script component */}
        <Script src="/assets/js/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="/assets/vendors/bootstrap/js/popper.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendors/bootstrap/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendors/slick/slick.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendors/parallax/jquery.parallax-scroll.js" strategy="afterInteractive" />
        <Script src="/assets/vendors/wow/wow.min.js" strategy="afterInteractive" />
        <Script strategy="afterInteractive" id="wow-init">{`new WOW().init();`}</Script>
        <Script src="/assets/js/custom.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
