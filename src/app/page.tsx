import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  FileText,
  Share2,
  Lock,
  Sparkles,
  Menu,
  X,
  Check,
  Star,
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import ScreenshotCarousel from "@/components/common/Carousel";
import Link from "next/link";

const Home = () => {
  const features = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Rich editing",
      description:
        "Write with a powerful editor that supports formatting, tables, and more.",
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      title: "Flexible sharing",
      description:
        "Share your notes with others via link, token, or set permissions for view or edit access.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Private & secure",
      description: "Your data is encrypted and only accessible by you.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Smart organization",
      description: "Tag, categorize, and find your notes instantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 p-1">
            Write, plan, organize.
            <span className="block text-muted-foreground">
              All in one place.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            A beautiful, minimal workspace where better ideas come to life.
            Perfect for individuals and teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/doc"}>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-colors">
                Get started for free
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
            <Link href={"/demo"}>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-11 px-8 transition-colors">
                See how it works
              </button>
            </Link>
          </div>
        </div>

        {/* Screenshot Display */}
        <ScreenshotCarousel />
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, powerful tools that grow with you. From quick notes to
            complex projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-muted/80 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-6 text-center">
        <div className="bg-card border rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start writing better today
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/doc"}>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-colors">
              Get started for free
            </button>
            </Link>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-11 px-8 transition-colors">
              Contact sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-24">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <FileText className="w-3 h-3" />
                </div>
                <span className="font-semibold">PaperGate</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A better way to write, plan, and organize your ideas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Changelog
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Careers
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Status
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 PaperGate. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
