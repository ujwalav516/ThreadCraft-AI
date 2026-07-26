"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta">

      <motion.div
        className="cta-box"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >

        <span className="cta-badge">
          🚀 Start Creating Today
        </span>

        <h2>
          Ready To Create
          <br />
          Viral Twitter Threads?
        </h2>

        <p>
          Generate, optimize and publish AI-powered Twitter/X threads
          in seconds using ThreadCraft AI.
        </p>

        <Link href="/login" className="cta-button">
  <Icon
    icon="solar:rocket-bold-duotone"
    width="22"
  />
  Get Started Free
</Link>

        <div className="cta-bottom">
          No Credit Card • Free Forever • Setup in 30 Seconds
        </div>

      </motion.div>

    </section>
  );
}