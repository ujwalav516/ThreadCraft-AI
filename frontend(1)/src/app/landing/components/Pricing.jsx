"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">

      <div className="section-title">

        <span>💎 Pricing</span>

        <h2>
          Choose The Plan
          <br />
          That Fits You
        </h2>

        <p>
          Start free. Upgrade whenever you're ready to create more viral content.
        </p>

      </div>

      <div className="pricing-grid">

        {/* FREE */}

        <motion.div
          className="price-card"
          whileHover={{ y: -12 }}
        >

          <h3>Free</h3>

          <h1>$0</h1>

          <p>Perfect for trying ThreadCraft.</p>

          <ul>

            <li>✓ 5 AI Threads / month</li>

            <li>✓ Basic Analytics</li>

            <li>✓ PDF Upload</li>

            <li>✓ Thread Preview</li>

          </ul>

          <button>Get Started</button>

        </motion.div>

        {/* CREATOR */}

        <motion.div
          className="price-card featured-plan"
          whileHover={{ y: -12 }}
        >

          <div className="popular-badge">

            ⭐ Most Popular

          </div>

          <h3>Creator</h3>

          <h1>$9<span>/mo</span></h1>

          <p>For creators who post consistently.</p>

          <ul>

            <li>✓ Unlimited AI Threads</li>

            <li>✓ Publish To X</li>

            <li>✓ Smart Scheduling</li>

            <li>✓ Advanced Analytics</li>

            <li>✓ Aura AI Assistant</li>

          </ul>

          <button>Choose Creator</button>

        </motion.div>

        {/* PRO */}

        <motion.div
          className="price-card"
          whileHover={{ y: -12 }}
        >

          <h3>Pro</h3>

          <h1>$19<span>/mo</span></h1>

          <p>Everything ThreadCraft offers.</p>

          <ul>

            <li>✓ Everything in Creator</li>

            <li>✓ Priority AI</li>

            <li>✓ Team Workspace</li>

            <li>✓ Premium Support</li>

          </ul>

          <button>Go Pro</button>

        </motion.div>

      </div>

    </section>
  );
}