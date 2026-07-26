export default function TweetCard({
  number,
  text,
  image,
}) {
  return (

    <div className="tweet-card">

      <div className="tweet-top">

        <h3 className="tweet-title">
          🐦 Tweet {number}
        </h3>

        <span className="char-count">
          {text.length}/280
        </span>

      </div>

      <div className="tweet-user">

        <div className="avatar">
          U
        </div>

        <div className="user-info">

          <strong>ThreadCraft AI</strong>

          <p>@threadcraft_ai</p>

        </div>

      </div>

      <div className="tweet-image">

  {image ? (

    <img
      src={image}
      alt="Uploaded Preview"
      className="tweet-preview-image"
    />

  ) : (

    <div className="image-placeholder">

      <div className="placeholder-icon">
        🖼️
      </div>

      <h4>No Image Uploaded</h4>

      <p>
        Upload an image to include it
        in every generated tweet.
      </p>

    </div>

  )}

</div>

      <div className="tweet-text">

        {text}

      </div>

    </div>

  );
}