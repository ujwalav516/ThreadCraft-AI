"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AnalyticsCharts({ data }) {

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

    datasets: [
      {
        label: "Threads",
        data: data.weekly,
        backgroundColor: "#7B61FF",
        borderRadius: 10,
      },
    ],
  };

  const toneData = {
    labels: Object.keys(data.tones),

    datasets: [
      {
        data: Object.values(data.tones),

        backgroundColor: [
          "#7B61FF",
          "#9F8CFF",
          "#60A5FA",
          "#34D399",
          "#F59E0B",
          "#EC4899",
        ],
      },
    ],
  };

  return (

    <div className="analytics-grid">

      <div className="chart-card">

        <h2>📈 Threads Generated This Week</h2>

        <Bar
          data={weeklyData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />

      </div>

      <div className="chart-card">

        <h2>🥧 Writing Tone Distribution</h2>

       <Doughnut
  data={toneData}
  options={{
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    cutout: "65%",

    plugins: {
      legend: {
        position: "top"
      }
    }
  }}
/>



      </div>

    </div>

  );

}