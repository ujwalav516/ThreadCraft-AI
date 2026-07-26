"use client";

import { useEffect, useState } from "react";

const messages = [
  "🧠 Reading your article...",
  "🔍 Extracting key ideas...",
  "🔥 Finding engaging hooks...",
  "📈 Analyzing trends...",
  "✍️ Writing tweet...",
  "🚀 Optimizing readability...",
  "✨ Finalizing thread..."
];

export default function AiLoader() {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setIndex((prev) => (prev + 1) % messages.length);

    },1500);

    return () => clearInterval(timer);

  },[]);

  return (

    <div className="ai-loader">

      <div className="ai-ring">

        <div className="ai-center">

          Aura AI

        </div>

      </div>

      <h2>ThreadCraft AI is writing...</h2>

      <p>{messages[index]}</p>

    </div>

  );

}