"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AnalyticsCharts from "@/components/AnalyticsCharts";

export default function AnalyticsPage() {

  const [data, setData] = useState(null);

  useEffect(() => {

    fetch("https://threadcraft-ai-1.onrender.com/analytics-data")
      .then((res) => res.json())
      .then((json) => setData(json));

  }, []);

  if (!data) {

    return <h2 style={{ padding: "40px" }}>Loading Analytics...</h2>;

  }

  return (

    <div className="page">

      <Navbar />

      <div className="hero">

        <h1>Analytics Dashboard</h1>

        <p>View insights about your AI generated threads.</p>

      </div>

      <div className="right-panel analytics-panel">

        

        <div className="stats">

  <div className="stat">
    <div className="stat-icon">🚀</div>
    <h4>Threads Generated</h4>
    <h2>{data.generated}</h2>
  </div>

  <div className="stat">
    <div className="stat-icon">💾</div>
    <h4>Saved Threads</h4>
    <h2>{data.saved}</h2>
  </div>

  <div className="stat">
    <div className="stat-icon">📅</div>
    <h4>Scheduled Threads</h4>
    <h2>{data.scheduled}</h2>
  </div>

  <div className="stat">
    <div className="stat-icon">📄</div>
    <h4>PDFs Uploaded</h4>
    <h2>{data.pdfs}</h2>
  </div>

</div>

        <AnalyticsCharts data={data} />



        <div className="activity-card">

  <h2>🔥 Recent Activity</h2>

  <ul>

    {data.recentActivity.map((item, index) => (

      <li key={index}>{item}</li>

    ))}

  </ul>

</div>

<div className="insight-card">

  <h2>🤖 AI Insights</h2>

  {data.insights.map((item, index) => (

    <p key={index}>✔ {item}</p>

  ))}

</div>

      </div>

    </div>

  );

}