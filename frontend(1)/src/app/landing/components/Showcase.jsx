"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Showcase() {
  return (
    <section className="showcase" id="showcase">

      <div className="section-title">

        <span>🖥️ Showcase</span>

        <h2>
          Everything In
          <br />
          <span>One Intelligent Workspace</span>
        </h2>

        <p>
          From uploading your content to generating viral Twitter/X threads,
          ThreadCraft AI handles everything for you.
        </p>

      </div>

      <div className="showcase-container">


<div className="floating-card quality-card">
⭐ 98% Quality
</div>


<div className="floating-card aura-card">
🤖 Aura AI Ready
</div>


<div className="floating-card trend-card">
🔥 Trending Now
</div>



<motion.div
  className="dashboard-preview"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>

  <div className="dashboard-sidebar">

    <div className="sidebar-logo">
      🚀
    </div>

    <div className="sidebar-item active">
      <Icon icon="solar:home-2-bold-duotone" />
      <span>Dashboard</span>
    </div>

    <div className="sidebar-item">
      <Icon icon="solar:pen-bold-duotone" />
      <span>Generator</span>
    </div>

    <div className="sidebar-item">
      <Icon icon="solar:chart-bold-duotone" />
      <span>Analytics</span>
    </div>

    <div className="sidebar-item">
      <Icon icon="solar:calendar-bold-duotone" />
      <span>Scheduler</span>
    </div>

    <div className="sidebar-item">
      <Icon icon="solar:flame-bold-duotone" />
      <span>Trending</span>
    </div>

  </div>

 <div className="dashboard-main">


<div className="dashboard-top">

<input
placeholder="Search anything..."
className="search-bar"
/>

<div className="avatar">
👩🏻
</div>

</div>



<div className="stats-grid">


<div className="stat-card">

<Icon icon="solar:star-bold-duotone"/>

<h3>98%</h3>

<p>Thread Quality</p>

</div>



<div className="stat-card">

<Icon icon="solar:chat-round-dots-bold-duotone"/>

<h3>24</h3>

<p>Threads Generated</p>

</div>



<div className="stat-card">

<Icon icon="solar:chart-bold-duotone"/>

<h3>91%</h3>

<p>Engagement</p>

</div>



<div className="stat-card">

<Icon icon="solar:users-group-rounded-bold-duotone"/>

<h3>12.4K</h3>

<p>Total Reach</p>

</div>


</div>



<div className="content-grid">


<div className="thread-preview">


<h3>
Thread Preview
</h3>


<div className="tweet-box">

🚀 5 productivity hacks that save me 10 hours every week...

</div>


<div className="tweet-stats">

❤️ 2.4K   💬 392   🔁 841

</div>


</div>




<div className="analytics-box">


<h3>
Performance Overview
</h3>


<div className="fake-chart">

📈

</div>


</div>


</div>



</div>

</motion.div>
</div>

    </section>
  );
}