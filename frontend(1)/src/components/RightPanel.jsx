import Stats from "./Stats";
import QualityCard from "./QualityCard";
import ActionButtons from "./ActionButtons";
import TweetCard from "./TweetCard";
import AiLoader from "./AiLoader";




export default function RightPanel({

    thread,
    loading,
    imagePreview,
    scores,
    tone,
    setThread,
    setScores,
    onSchedule

}) {
  


  

  return (

    <div className="right-panel">

      <h2 className="thread-header">
        Generated Thread

        <span className="status">
          🟢 Ready
        </span>
      </h2>

      <div id="result">

        {loading ? (

          <AiLoader />

        ) : thread ? (

          thread
            .split(/\n(?=\d+\/)/)
            .filter(tweet => tweet.trim() !== "")
            .map((tweet, index) => (

              <TweetCard
                key={index}
                number={index + 1}
                text={tweet}
                image={imagePreview}
              />

            ))

        ) : (

          <div className="placeholder">

            🚀

            <h3>Your generated thread will appear here</h3>

            <p>
              Fill the form and click
              <strong> Generate Viral Thread</strong>
            </p>

          </div>

        )}

      </div>

      <Stats thread={thread} />

      <QualityCard scores={scores} />

      <ActionButtons
    thread={thread}
    tone={tone}
    setThread={setThread}
    setScores={setScores}
    onClear={() => window.location.reload()}
    onSchedule={onSchedule}
/>







    </div>

  );

}