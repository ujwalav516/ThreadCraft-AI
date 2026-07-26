"use client";

import { useState } from "react";

import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import ScheduleModal from "./ScheduleModal";

export default function Dashboard() {

  const [thread, setThread] = useState("");
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [tone, setTone] = useState("Professional");

  return (
  <>

    <div className="dashboard">

      <LeftPanel
    setThread={setThread}
    setScores={setScores}
    loading={loading}
    setLoading={setLoading}
    setImagePreview={setImagePreview}
    tone={tone}
    setTone={setTone}
/>

      <RightPanel
    thread={thread}
    scores={scores}
    loading={loading}
    imagePreview={imagePreview}
    tone={tone}
    setThread={setThread}
    setScores={setScores}
    onSchedule={() => setShowSchedule(true)}
/>

    </div>

    <ScheduleModal
      open={showSchedule}
      onClose={() => setShowSchedule(false)}
      thread={thread}
    />

  </>
);
}