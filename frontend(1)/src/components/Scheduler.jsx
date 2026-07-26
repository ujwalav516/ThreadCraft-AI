"use client";

import { useEffect, useState } from "react";
import SchedulerCard from "./SchedulerCard";

export default function Scheduler() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {

    setLoading(true);

    try {

      const response = await fetch("https://threadcraft-ai-1.onrender.com/schedule");

      const data = await response.json();

      setPosts(data);

    } catch (err) {

      console.error(err);

      setPosts([]);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadPosts();

  }, []);

  return (

    <div className="scheduler-page">

      {loading ? (

        <h2 className="loading-text">
          Loading scheduled threads...
        </h2>

      ) : posts.length === 0 ? (

        <h2 className="loading-text">
          No scheduled posts yet.
        </h2>

      ) : (

        <div className="scheduler-grid">

          {posts.map((post, index) => (

            <SchedulerCard
              key={index}
              post={post}
            />

          ))}

        </div>

      )}

    </div>

  );

}