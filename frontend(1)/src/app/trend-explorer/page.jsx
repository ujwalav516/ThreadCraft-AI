import Navbar from "../../components/Navbar";
import TrendExplorer from "../../components/TrendExplorer";

export default function TrendExplorerPage() {

  return (

    <div className="page">

      <Navbar />

      <div className="hero">

        <h1>🔥 Trend Explorer</h1>

        <p>
          Discover trending topics and turn them into viral threads.
        </p>

        <span>
          Find what's trending, read the news, and generate engaging Twitter/X
          threads in one click.
        </span>

      </div>

      <TrendExplorer />

    </div>

  );

}