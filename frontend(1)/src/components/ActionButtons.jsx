"use client";

import { useState } from "react";
import toast from "react-hot-toast";


export default function ActionButtons({

    thread,
    tone,
    setThread,
    setScores,
    onClear,
    onSchedule

})  {
    
    



    const [improving, setImproving] = useState(false);
    const copyThread = async () => {

  if (!thread) {

    toast.error("No thread to copy");

    return;

  }

  await navigator.clipboard.writeText(thread);

  toast.success("Thread copied!");

};

    
  const downloadThread = () => {
    if (!thread) {
      toast.error("No thread to download");
      return;
    }

    const blob = new Blob([thread], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "threadcraft-thread.txt";
    a.click();

    URL.revokeObjectURL(url);

    toast.success("Download started!");
  };

  const clearThread = () => {

  if (!thread) {

    toast.error("Nothing to clear");

    return;

  }

  onClear?.();

  toast.success("Thread cleared");

};


  const saveThread = async () => {
    
    
    console.log("Tone =", tone);

    if (!thread) {
        toast.error("Generate a thread first");
        return;
    }

    const formData = new FormData();

    formData.append("title", "Generated Thread");
    formData.append("thread", thread);
    formData.append("tone", tone);

    try {

        const response = await fetch(
            "https://threadcraft-ai-1.onrender.com/save-thread",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        toast.success(data.message);

    } catch {

        toast.error("Backend is not running.");

    }

};






















const postToX = async () => {

    if (!thread) {
        toast.error("Generate a thread first");
        return;
    }

    try {

        const response = await fetch(
            "https://threadcraft-ai-1.onrender.com/post-x",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    thread: thread,
                }),
            }
        );

        const data = await response.json();

        toast.success(data.message);

    } catch (err) {

        console.log(err);

        toast.error("Backend not running.");

    }
};


// 👇 ADD THIS FUNCTION
const improveThread = async () => {

    if (!thread) {
        toast.error("Generate a thread first");
        return;
    }

    try {
        setImproving(true);
        const response = await fetch(
            "https://threadcraft-ai-1.onrender.com/improve-thread",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    thread: thread,
                }),
            }
        );

        const data = await response.json();
        setImproving(false);

        if (!response.ok || data.success === false) {

            toast.error(data.message || "Failed to improve thread.");

            return;

        }

        setThread(data.thread);
        setScores(data.scores);

        toast.success("Thread improved!");

    } catch (err) {
        setImproving(false);

        console.log(err);

        toast.error("Backend not running.");

    }

};






return (
  <>

    <div className="action-buttons">

      <button onClick={copyThread}>
        <span>📋</span>
        Copy
      </button>

      <button onClick={downloadThread}>
        <span>⬇️</span>
        Download
      </button>

      <button onClick={saveThread}>
        <span>💾</span>
        Save
      </button>

      <button onClick={onSchedule}>
      
        <span>🗓️</span>
        Schedule
      </button>

      <button onClick={postToX}>
  <span>📣</span>
  Post to X
</button>

      <button
    onClick={improveThread}
    disabled={improving}
>
    <span>{improving ? "⏳" : "✨"}</span>{" "}
{improving ? "Improving..." : "Improve"}
</button>

      <button onClick={clearThread}>
        <span>🗑️</span>
        Clear
      </button>

    </div>

    

  </>
);
}