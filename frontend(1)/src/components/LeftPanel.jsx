"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LeftPanel({

    setThread,
    setScores,
    loading,
    setLoading,
    setImagePreview,
    tone,
    setTone

}){

  const searchParams = useSearchParams();

  const [pdfName, setPdfName] = useState("");
  const [article, setArticle] = useState("");
  const [trend, setTrend] = useState("");
  
  const [length, setLength] = useState("Short");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageName, setImageName] = useState("");

  const articleFromTrend =
    searchParams.get("article") || "";

  const aiSteps = [

    "🧠 Reading article...",

    "🔍 Extracting key ideas...",

    "🔥 Finding viral hooks...",

    "✍️ Writing engaging tweets...",

    "📊 Optimizing readability...",

    "🚀 Finalizing thread..."

  ];

  async function animateAI() {

    for (const step of aiSteps) {

      console.log(step);

      await new Promise(resolve =>
        setTimeout(resolve, 900)
      );

    }

  }

  async function generateThread(
    customArticle = article
  ) {

    setLoading(true);

    setThread("");

    setScores(null);

    animateAI();

    const formData = new FormData();

    formData.append(
      "article",
      customArticle
    );

    formData.append(
      "trend",
      trend
    );

    formData.append(
      "tone",
      tone
    );

    formData.append(
      "length",
      length
    );

    if (pdfFile) {

      formData.append(
        "file",
        pdfFile
      );

    }

    try {

      const response = await fetch(

        "https://threadcraft-ai-1.onrender.com/generate",

        {

          method: "POST",

          body: formData

        }

      );

      const data =
        await response.json();

      if (!data.success) {

     if (data.message.includes("503")) {

    alert("Gemini servers are busy.");

}
else if (data.message.includes("429")) {

    alert("Quota exceeded.");

}
else {
    toast.error(data.message);
    console.log(data);
}

        setLoading(false);

        return;

      }

      setThread(data.thread);

      setScores(data.scores);

    }

    catch (err) {

      console.error(err);

      alert("Backend is not running.");

    }

    setLoading(false);

  }

  useEffect(() => {

    if (articleFromTrend) {

      setArticle(articleFromTrend);

    }

  }, [articleFromTrend]);

  useEffect(() => {

    if (
      article !== "" &&
      article === articleFromTrend
    ) {

      generateThread(article);

    }

  }, [article]);



    return (

    <div className="left-panel">

      <h2>📝 Create Your Thread</h2>

      <p className="section-title">
        Upload PDF (Optional)
      </p>

      <input
        type="file"
        accept=".pdf"
        id="pdfUpload"
        style={{ display: "none" }}
        onChange={(e) => {

          const file = e.target.files[0];

          if (file) {

            setPdfFile(file);

            setPdfName(file.name);

            setThread("");

            setScores(null);

          }

        }}
      />

      <label
        htmlFor="pdfUpload"
        className="upload-box"
      >

        <div className="upload-icon">

          📄

        </div>

        <h3>

          {pdfName || "Drop your PDF here"}

        </h3>

        <p>

          or click to browse

        </p>

        {pdfName && (

          <p className="selected-file">

            ✅ {pdfName}

          </p>

        )}

      </label>

      <p className="section-title">

        Upload Image (Optional)

      </p>

      <input
  id="imageFile"
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onChange={(e) => {

    const file = e.target.files[0];

    if (file) {

      setImageName(file.name);

      const url = URL.createObjectURL(file);

      setImagePreview(url);

    }

  }}
/>

<label
  htmlFor="imageFile"
  className="upload-image-btn"
>
  📷 Choose Image
</label>

{imageName && (
  <span className="file-name">
    ✅ {imageName}
  </span>
)}

      <p className="section-title">

        Trending Topic (Optional)

      </p>

      <input

        type="text"

        placeholder="e.g. AI in Healthcare"

        value={trend}

        onChange={(e) => {

          setTrend(e.target.value);

          setThread("");

          setScores(null);

        }}

      />

      <p className="section-title">

        🎨 Writing Tone

      </p>

      <select

        className="dropdown"

        value={tone}

        onChange={(e) => {

          setTone(e.target.value);

          setThread("");

          setScores(null);

        }}

      >

        <option>

          Professional

        </option>

        <option>

          Educational

        </option>

        <option>

          Storytelling

        </option>

        <option>

          Motivational

        </option>

        <option>

          Funny

        </option>

        <option>

          Viral

        </option>

      </select>

      <p className="section-title">

        🧵 Thread Length

      </p>

      <select

        className="dropdown"

        value={length}

        onChange={(e) => {

          setLength(e.target.value);

          setThread("");

          setScores(null);

        }}

      >

        <option value="Short">

          Short (5 Tweets)

        </option>

        <option value="Medium">

          Medium (10 Tweets)

        </option>

        <option value="Long">

          Long (20 Tweets)

        </option>

      </select>




            <p className="section-title">

        Paste Your Article / Content

      </p>

      <textarea

        value={article}

        onChange={(e) => {

          setArticle(e.target.value);

          setThread("");

          setScores(null);

        }}

        placeholder="Paste your article or content here..."

      />

      <p id="count">

        {article.length} characters

      </p>

      <button

        className="generate-btn"

        onClick={() => generateThread()}

        disabled={loading}

      >

        {

          loading

            ? "Generating..."

            : "⚡ Generate Viral Thread"

        }

      </button>

      <p className="privacy">

        🔒 Your data is private and secure.

        We don't store your content.

      </p>

    </div>

  );

}