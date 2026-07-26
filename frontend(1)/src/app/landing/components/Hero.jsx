"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {

  return (

    <section className="hero">

      <div className="hero-left">

        <span className="hero-badge">

          ✨ AI Powered Twitter/X Growth Platform

        </span>

        <h1>

          Transform Long Content

          <br />

          Into

          <span>

            Viral Threads

          </span>

        </h1>

        <p>

          Convert PDFs, articles and trending news into engaging
          Twitter/X threads using Aura AI.

          Generate, optimize and schedule—all from one workspace.

        </p>

        <div className="hero-buttons">

          <Link href="/login">

            <button className="primary-btn">

              Start Creating →

            </button>

          </Link>

          

        </div>

      </div>

      <div className="hero-right">

  <div className="floating-card card-top">
      📈
      <div>
          <strong>98%</strong>
          <p>Engagement</p>
      </div>
  </div>

  <div className="floating-card card-left">
      📄
      <div>
          <strong>PDF Ready</strong>
          <p>32 Pages</p>
      </div>
  </div>

  <Image
      src="/robot.png"
      alt="Robot"
      width={540}
      height={540}
      priority
  />

  <div className="floating-card card-right">
      🧵
      <div>
          <strong>12 Tweets</strong>
          <p>Generated</p>
      </div>
  </div>

  <div className="floating-card card-bottom">
      🔥
      <div>
          <strong>Trending</strong>
          <p>AI</p>
      </div>
  </div>

</div>

    </section>

  );

}