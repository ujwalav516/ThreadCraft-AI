"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ScheduleModal({

  open,
  onClose,
  thread

}) {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!open) return null;

  const schedule = async () => {

    if (!date || !time) {

      toast.error("Select date and time");

      return;

    }

    const formData = new FormData();

    formData.append("title", "Generated Thread");
    formData.append("thread", thread);
    formData.append("date", date);
    formData.append("time", time);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/schedule-thread",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      toast.success(data.message);

setDate("");
setTime("");

onClose();



    }

    catch {

      toast.error("Backend is not running.");

    }

  };

  return (

    <div className="modal-overlay">

      <div className="schedule-modal">

        <h2>📅 Schedule Thread</h2>

        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        <label>Time</label>

        <input
          type="time"
          value={time}
          onChange={(e)=>setTime(e.target.value)}
        />

        <div className="modal-buttons">

          <button onClick={schedule}>
            Schedule
          </button>

          <button
  onClick={() => {

    setDate("");
    setTime("");

    onClose();

  }}
>
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}