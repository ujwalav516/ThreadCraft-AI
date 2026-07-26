"use client";

import { useRouter } from "next/navigation";

export default function TrendCard({ trend }) {

  const router = useRouter();

  function generateThread() {

    const article = `${trend.title}\n\n${trend.summary}`;

    router.push(
      "/?article=" + encodeURIComponent(article)
    );

  }

  return (

    <div className="trend-card">

      <h2>{trend.title}</h2>

      <p className="trend-summary">

        {trend.summary}

      </p>

      <div className="trend-buttons">

        <button
          className="generate-btn"
          onClick={generateThread}
        >
          ✨ Generate Thread
        </button>

        <a
          href={trend.link}
          target="_blank"
          rel="noopener noreferrer"
          className="read-link"
        >
          📖 Read Article →
        </a>

      </div>

    </div>

  );

}