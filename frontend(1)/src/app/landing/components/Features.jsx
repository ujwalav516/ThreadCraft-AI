"use client";

import { motion } from "framer-motion";
import AnimatedIcon from "./AnimatedIcon";

export default function Features() {
  return (
    <section id="features" className="features">

      <div className="section-title">
        <span>✨ Features</span>

        <h2>
          Everything Needed To Build
          <br />
          Viral Twitter Threads
        </h2>

        <p>
          From trend discovery to AI generation and scheduling,
          ThreadCraft gives creators one complete workflow.
        </p>
      </div>

      <div className="feature-grid">

        <motion.div
          className="feature-card"
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
        >
          <AnimatedIcon icon="mdi:file-document-outline" />

          <h3>PDF Intelligence</h3>

          <p>
            Convert long PDFs into concise, engaging Twitter threads.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
        >
          <AnimatedIcon icon="mdi:fire" />

          <h3>Trend Explorer</h3>

          <p>
            Discover trending topics and generate content instantly.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
        >
          <AnimatedIcon icon="mdi:robot-outline" />

          <h3>AI Thread Writer</h3>

          <p>
            Create viral hooks, smooth transitions and engaging endings.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
        >
          <AnimatedIcon icon="mdi:calendar-clock" />

          <h3>Smart Scheduler</h3>

          <p>
            Schedule your threads for maximum audience reach.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
        >
          <AnimatedIcon icon="mdi:chart-line" />

          <h3>Analytics</h3>

          <p>
            Track engagement, readability and viral potential.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
        >
          <AnimatedIcon icon="mdi:auto-fix" />

          <h3>Aura AI</h3>

          <p>
            Your AI assistant for rewriting, improving and optimizing threads.
          </p>
        </motion.div>

      </div>

    </section>
  );
}