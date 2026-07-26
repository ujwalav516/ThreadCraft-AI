"use client";

import "./landing.css";

import LandingNavbar from "./components/LandingNavbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import Showcase from "./components/Showcase";
import Publish from "./components/Publish";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Features />
<Workflow />
<Publish />
<Showcase />
<Pricing />
<CTA />
<Footer />


    </>
  );
}