"use client";

export default function SchedulerCard({ post }) {

  return (

    <div className="scheduler-card">

      <h2>
        {post.title || "Untitled Thread"}
      </h2>

      <p className="scheduler-preview">
  {post.thread?.substring(0, 220)}
</p>

      <div className="scheduler-meta">

       <span>
  📅 {post.date
      ? new Date(post.date)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-")
      : "No Date"}
</span>

        <span>
          🕒 {post.time || "No Time"}
        </span>

      </div>

      <div className="scheduler-status">
  ✅ Scheduled
</div>

    </div>

  );

}