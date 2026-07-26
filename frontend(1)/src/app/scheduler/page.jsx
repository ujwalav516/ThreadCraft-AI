import Navbar from "../../components/Navbar";
import Scheduler from "../../components/Scheduler";

export default function SchedulerPage() {
  return (
    <div className="page">

      <Navbar />

      <div className="hero">

        <h1>Scheduler</h1>

        <p>
          Schedule your Twitter/X threads in advance.
        </p>

        <span>
          Plan, organize and manage your upcoming posts from one place.
        </span>

      </div>

      <Scheduler />

    </div>
  );
}