'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogIn, LogOut, User, Briefcase, FileText, CreditCard, Search, Settings, LayoutDashboard, Menu, ChevronDown, Sparkles, Bot, PenTool, MessageSquare, Clock, Star } from 'lucide-react'; 
import { useAuth } from '../../contexts/AuthContext'; 
import { Skeleton } from '../ui/skeleton'; 
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import { useState } from 'react';

export default function AppHeader() {
  const { user, userData, loading, signOutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiToolsHover, setAiToolsHover] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'P'; 
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // AI Tools products data
  const aiToolsProducts = [
    {
      name: "Resume Audit",
      description: "Get feedback on your resume",
      href: "/resume",
      icon: FileText,
      available: true,
      featured: true
    },
    {
      name: "LinkedIn Analysis",
      description: "Analyze your LinkedIn profile with AI",
      href: "/linkedin",
      icon: PenTool,
      available: true,
      featured: false
    },
    {
      name: "Interview Prep",
      description: "AI-powered interview preparation",
      href: "/tools/interview-prep",
      icon: MessageSquare,
      available: false,
      featured: false
    },
    {
      name: "AI cover letter",
      description: "Get an AI-generated cover letter",
      href: "/tools/linkedin-optimizer",
      icon: Bot,
      available: false,
      featured: false
    }
  ];

  const navLinks = [
    { href: "https://resume-maker-ashy-beta.vercel.app/", label: "Resume Builder", Icon: FileText },
    { href: "/pricing", label: "Pricing", Icon: CreditCard },
    {href: "/job-portal", label: "Jobs Portal", Icon: Briefcase },
    { href: "/contact", label: "Contact", Icon: User }
    
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b py-2 bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/90 transition-colors">
          <Image src="/assets/img/prepex.png" alt="Career Genius Logo" width={36} height={36} className="h-9 w-auto" />
          <span className="hidden sm:inline-block"></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {/* AI Tools with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setAiToolsHover(true)}
            onMouseLeave={() => setAiToolsHover(false)}
          >
            <Button 
              variant="ghost" 
              className="text-dark text-md hover:text-primary hover:bg-primary/5 flex items-center gap-1"
            >
              <Search className="mr-1.5 h-4 w-4" />
              AI Tools
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${aiToolsHover ? 'rotate-180' : ''}`} />
            </Button>
            
            {/* Dropdown Menu */}
            {aiToolsHover && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-background border border-border rounded-lg shadow-lg p-3 z-50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="font-semibold text-sm text-primary">Available Tools</span>
                  </div>
                  
                  {aiToolsProducts.filter(product => product.available).map((product) => (
                    <Link 
                      key={product.name}
                      href={product.href}
                      className="flex items-center p-1    gap-2 rounded-md hover:bg-primary/5 transition-colors group"
                    >
                      <div className="flex-shrink-0 mb-2">
                        <div className={`p-1.5 rounded-md ${product.featured ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground group-hover:text-primary'}`}>
                          <product.icon className="h-4 w-4 " />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm  mb-0 text-foreground group-hover:text-primary">
                            {product.name}
                          </h4>
                          {product.featured && (
                            <span className="bg-primary/20 text-primary mb-0 text-xs px-1.5 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* Upcoming Products Section */}
                  <div className="border-t border-border pt-2 mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="font-semibold text-sm text-muted-foreground">Coming Soon</span>
                    </div>
                    
                    {aiToolsProducts.filter(product => !product.available).map((product) => (
                      <div 
                        key={product.name}
                        className="flex items-center gap-2 p-2 rounded-md opacity-60 cursor-not-allowed"
                      >
                        <div className="flex-shrink-0">
                          <div className="p-1.5 rounded-md bg-muted text-muted-foreground">
                            <product.icon className="h-3 w-3" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-muted-foreground">
                            {product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Links */}
          {navLinks.map(({ href, label, Icon }) => (
            <Button variant="ghost" asChild key={href} className="text-dark text-md hover:text-primary hover:bg-primary/5">
              <Link href={href} className='hover:text-primary'>
                <Icon className="mr-1.5 h-4 w-4" /> {label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-9 w-24 rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9 border border-primary/30">
                    <AvatarImage src={user.photoURL || undefined} alt={userData?.displayName || user.email || 'User'} />
                    <AvatarFallback className="bg-primary/20 text-primary font-medium">
                      {getInitials(userData?.displayName || user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.displayName || user.email}</p>
                    {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild>
                  <Link href="/subscription">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Subscription</span>
                  </Link>
                </DropdownMenuItem> */}
                 {/* <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem> */}

                {/* ✅ Admin Link */}
                {userData?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOutUser} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                <Link href="/login">
                  <LogIn className="mr-1.5 h-4 w-4" /> Login
                </Link>
              </Button>
              {/* <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup">
                  Sign Up
                </Link>
              </Button> */}
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-4">
                <div className="flex flex-col space-y-3">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary mb-4" onClick={() => setMobileMenuOpen(false)}>
                     <Image src="/assets/img/prepex.png" alt="Career Genius Logo" width={32} height={32} />
                     <span>Career Genius</span>
                  </Link>
                  
                  {/* AI Tools in Mobile */}
                  <div className="border-b border-border pb-3 mb-3">
                    <h3 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      AI Tools
                    </h3>
                    {aiToolsProducts.filter(product => product.available).map((product) => (
                      <SheetClose asChild key={product.name}>
                        <Link 
                          href={product.href} 
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary ml-4"
                        >
                          <product.icon className="h-4 w-4" /> {product.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  {navLinks.map(({ href, label, Icon }) => (
                     <SheetClose asChild key={href}>
                        <Link href={href} className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary">
                           <Icon className="h-5 w-5" /> {label}
                        </Link>
                     </SheetClose>
                  ))}
                  {!user && !loading && (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full mt-4">
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>

                     {/* ✅ Admin in mobile menu */}
                  {userData?.role === "admin" && (
                    <SheetClose asChild>
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      >
                        <Briefcase className="h-5 w-5" /> Admin Panel
                      </Link>
                    </SheetClose>
                  )}

                      <SheetClose asChild>
                         <Button asChild className="w-full">
                           <Link href="/signup">Sign Up</Link>
                         </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}