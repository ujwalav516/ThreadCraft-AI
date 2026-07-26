"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {



  const router = useRouter();
  const pathname = usePathname();

const handleLogout = () => {
    localStorage.removeItem("threadcraftUser");
    router.replace("/");
};
  return (
    <nav className="navbar">

      <div className="logo">
        🚀 <span>ThreadCraft</span> <b>AI</b>
      </div>

      <ul className="nav-links">

  <Link
  href="/dashboard"
  className={pathname === "/dashboard" ? "nav-active" : ""}
>
  🏠 Dashboard
</Link>

<Link
  href="/trend-explorer"
  className={pathname === "/trend-explorer" ? "nav-active" : ""}
>
  🔥 Trend Explorer
</Link>

  <Link
  href="/thread-library"
  className={pathname === "/thread-library" ? "nav-active" : ""}
>
  📂 Thread Library
</Link>

  <Link
  href="/scheduler"
  className={pathname === "/scheduler" ? "nav-active" : ""}
>
  📅 Scheduler
</Link>
<Link
  href="/analytics"
  className={pathname === "/analytics" ? "nav-active" : ""}
>
  📊 Analytics
</Link>
  <li>
  <button
    onClick={handleLogout}
    className="logout-btn"
  >
    🚪 Logout
  </button>
</li>

</ul>

      <div className="nav-right">
        <div className="profile">U</div>
      </div>

    </nav>
  );
}