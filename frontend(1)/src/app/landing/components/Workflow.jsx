"use client";

import { motion } from "framer-motion";

export default function Workflow() {
  return (
    <section className="workflow" id="workflow">
      <div className="section-title">
        <span>⚙️ How It Works</span>

        <h2>
          Create Viral Threads
          <br />
          In Just Four Steps
        </h2>

        <p>
          ThreadCraft simplifies your entire content workflow from upload to
          publishing.
        </p>
      </div>

      <div className="workflow-grid">

        {/* Step 1 */}

        <motion.div
          className="workflow-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
        >
          <motion.div
            className="workflow-number"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            1
          </motion.div>

          <h3>Upload PDF</h3>

          <p>
            Upload articles, blogs or PDF documents.
          </p>
        </motion.div>

        <motion.div
          className="workflow-arrow"
          animate={{
            x: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          →
        </motion.div>

        {/* Step 2 */}

        <motion.div
          className="workflow-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
        >
          <motion.div
            className="workflow-number"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            2
          </motion.div>

          <h3>Aura AI</h3>

          <p>
            AI analyzes and understands your content.
          </p>
        </motion.div>

        <motion.div
          className="workflow-arrow"
          animate={{
            x: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          →
        </motion.div>

        {/* Step 3 */}

        <motion.div
          className="workflow-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5,
          }}
        >
          <motion.div
            className="workflow-number"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            3
          </motion.div>

          <h3>Generate Thread</h3>

          <p>
            Create viral Twitter/X threads instantly.
          </p>
        </motion.div>

        <motion.div
          className="workflow-arrow"
          animate={{
            x: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          →
        </motion.div>

        {/* Step 4 */}

        <motion.div
          className="workflow-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.7,
          }}
        >
          <motion.div
            className="workflow-number"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            4
          </motion.div>

          <h3>Schedule</h3>

          <p>
            Publish at the perfect time automatically.
          </p>
        </motion.div>

      </div>
    </section>
  );
}