"use client";

import Link from "next/link";

export default function LandingNavbar() {
  return (
    <nav className="landing-navbar">

      <div className="landing-logo">
        🚀 ThreadCraft <span>AI</span>
      </div>

      <ul className="landing-links">

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#workflow">How It Works</a>
        </li>

        <li>
          <a href="#showcase">Showcase</a>
        </li>

        <li>
          <a href="#pricing">Pricing</a>
        </li>

      </ul>

      <div className="landing-actions">

        <Link href="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link href="/login">
          <button className="get-started-btn">
            Get Started →
          </button>
        </Link>

      </div>

    </nav>
  );
}