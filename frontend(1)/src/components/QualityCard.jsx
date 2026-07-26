export default function QualityCard({ scores }) {

  const overall = scores?.overall ?? 0;

const hook = scores?.hook ?? 0;

const readability = scores?.readability ?? 0;

const virality = scores?.virality ?? 0;

const engagement = scores?.engagement ?? 0;

  const stars =
    overall >= 90
      ? "⭐⭐⭐⭐⭐"
      : overall >= 75
      ? "⭐⭐⭐⭐"
      : overall >= 60
      ? "⭐⭐⭐"
      : overall >= 40
      ? "⭐⭐"
      : "⭐";

  return (

    <div className="quality-card">

      <h3>✨ Thread Quality</h3>

      <div className="quality-score">

        <span>{stars}</span>

        <span>{overall}%</span>

      </div>

      <div className="quality-row">

        <span>🔥 Hook Strength ({hook})</span>

        <progress value={hook} max="100"></progress>

      </div>

      <div className="quality-row">

        <span>📖 Readability ({readability})</span>

        <progress value={readability} max="100"></progress>

      </div>

      <div className="quality-row">

        <span>🚀 Virality ({virality})</span>

        <progress value={virality} max="100"></progress>

      </div>

      <div className="quality-row">

        <span>💬 Engagement ({engagement})</span>

        <progress value={engagement} max="100"></progress>

      </div>

    </div>

  );

}