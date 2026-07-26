"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = localStorage.getItem("threadcraftUser");

      if (!user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader-circle">
          <div className="loader-inner"></div>
        </div>

        <div className="loading-logo">
          🚀 ThreadCraft AI
        </div>

        <h2 className="loading-title">
          Preparing your workspace
        </h2>

        <p className="loading-subtitle">
          Connecting Aura AI, loading dashboard and restoring your session...
        </p>

        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>

        <div className="loading-status">
          <span className="status-dot"></span>
          AI Engine Initializing...
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />

      <div className="hero">
        <h1>🚀 ThreadCraft AI</h1>

        <p>AI Twitter/X Viral Engine & Ghostwriter</p>

        <span>
          Transform articles, PDFs and trending news into viral Twitter/X threads.
        </span>
      </div>

      <Dashboard />
    </div>
  );
}