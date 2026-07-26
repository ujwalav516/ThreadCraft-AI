export default function Stats({ thread }) {

  const tweets = thread
    ? thread.split(/\n(?=\d+\/)/).filter(t => t.trim() !== "")
    : [];

  const tweetCount = tweets.length;

  const words = thread
    ? thread.trim().split(/\s+/).length
    : 0;

  const characters = thread
    ? thread.length
    : 0;

  const readingTime = Math.max(
    1,
    Math.ceil(words / 200)
  );

  return (

    <div className="stats">

      <div className="stat">

        <h4>🐦 Tweets</h4>

        <p>{tweetCount}</p>

      </div>

      <div className="stat">

        <h4>📝 Words</h4>

        <p>{words}</p>

      </div>

      <div className="stat">

        <h4>⏱ Reading</h4>

        <div className="reading-time">

  <span className="reading-number">
    {readingTime}
  </span>

  <span className="reading-unit">
    min
  </span>

</div>

      </div>

      <div className="stat">

        <h4>🔤 Chars</h4>

        <p>{characters}</p>

      </div>

    </div>

  );

}