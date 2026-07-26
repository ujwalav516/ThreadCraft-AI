"use client";

import { useEffect, useState } from "react";
import TrendCard from "./TrendCard";

export default function TrendExplorer() {

  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadTrends(query = "") {

    setLoading(true);

    try {

      let url = "http://127.0.0.1:8000/api/trends";

      if (query.trim() !== "") {
        url += `?q=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);

      const data = await response.json();

setTrends(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error(err);

      setTrends([]);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadTrends();

  }, []);

  return (

    <div className="trend-page">

      

      <div className="trend-search">

        <input
          type="text"
          placeholder="Search any topic... (Dog, Tesla, IPL, AI...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              loadTrends(search);

            }

          }}
        />

        <button
          className="search-btn"
          onClick={() => loadTrends(search)}
        >
          🔍 Search
        </button>

        <button
          className="refresh-btn"
          onClick={() => {

            setSearch("");

            loadTrends();

          }}
        >
          🔄 Refresh
        </button>

      </div>

      {loading ? (

        <h2 className="loading-text">
          Loading latest trends...
        </h2>

      ) : trends.length === 0 ? (

        <h2 className="loading-text">
          No news found.
        </h2>

      ) : (

        <div className="trend-list">

          {trends.map((trend, index) => (

            <TrendCard
              key={index}
              trend={trend}
            />

          ))}

        </div>

      )}

    </div>

  );

}