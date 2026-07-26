"use client";

import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">

          <h2>
            🚀 ThreadCraft AI
          </h2>

          <p>
            AI-powered Twitter/X thread generation,
            optimization and publishing platform.
          </p>

        </div>

        <div className="footer-links">

          <div>

            <h4>Product</h4>

            <a href="#features">Features</a>

            <a href="#workflow">How It Works</a>

            <a href="#showcase">Showcase</a>

            <a href="#pricing">Pricing</a>

          </div>

          <div>

            <h4>Resources</h4>

            <a href="#">Documentation</a>

            <a href="#">API</a>

            <a href="#">GitHub</a>

            <a href="#">Support</a>

          </div>

          <div>

            <h4>Company</h4>

            <a href="#">About</a>

            <a href="#">Privacy</a>

            <a href="#">Terms</a>

            <a href="#">Contact</a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © 2026 ThreadCraft AI. All rights reserved.
        </span>

        <div className="footer-socials">

          <Icon icon="ri:twitter-x-fill" width="22" />

          <Icon icon="mdi:github" width="22" />

          <Icon icon="mdi:linkedin" width="22" />

        </div>

      </div>

    </footer>
  );
}