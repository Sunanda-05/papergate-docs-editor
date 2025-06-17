"use client";

import React, { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm transition-all duration-200 ${
        scrollY > 50 ? "border-border" : "border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-xl font-semibold">PaperGate</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#support"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Support
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Link href={"/auth/login"}>
            <button className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </button>
          </Link>
          <Link href={"/doc"}>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 transition-colors">
              Get started
            </button>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-6 py-4 space-y-4">
            <a href="#features" className="block text-sm text-muted-foreground">
              Features
            </a>
            <a href="#pricing" className="block text-sm text-muted-foreground">
              Pricing
            </a>
            <a href="#support" className="block text-sm text-muted-foreground">
              Support
            </a>
            <Link href={"/auth/login"}>
              <button className="block text-sm text-muted-foreground">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
