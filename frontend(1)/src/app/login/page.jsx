"use client";

import "./login.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Rocket,
  Bot,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {

const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);






  const handleLogin = () => {

    if (!email || !password) {

        alert("Please enter email and password");

        return;

    }

    setLoading(true);

    setFadeOut(true);

    localStorage.setItem(
        "threadcraftUser",
        JSON.stringify({
            email,
            remember,
        })
    );

    setTimeout(() => {

        router.push("/");

    }, 900);

};






  return (
    <main className={`login-page ${fadeOut ? "fade-out" : ""}`}>

      {/* Background Effects */}
      <div className="login-background">
        <div className="blur-circle blur1"></div>
        <div className="blur-circle blur2"></div>
        <div className="blur-circle blur3"></div>
      </div>

      <div className="login-container">

        {/* Floating Scene */}

        <section className="scene">

          <div className="glow-ring"></div>

          <div className="robot">

    <Image
        src="/robot.png"
        alt="AI Robot"
        width={220}
        height={220}
        priority
    />

</div>

          {/* Floating Card */}

          <div className="float-card twitter-card">

            <div className="icon">🐦</div>

            <div>

              <h4>Thread</h4>

              <p>Generating...</p>

            </div>

          </div>

          <div className="float-card analytics-card">

            <div className="icon">📈</div>

            <div>

              <h4>98%</h4>

              <p>Engagement</p>

            </div>

          </div>

          <div className="float-card hash-card">

            <div className="icon">#</div>

          </div>

        </section>

        {/* Login Card */}

        <section className="login-card">

          <div className="logo-row">

            <Rocket size={20} />

            <span>ThreadCraft AI</span>

          </div>

          <h2>Welcome Back</h2>

          <p>
            Let's create something amazing today ✨
          </p>

          <label>Email</label>

          <div className="input-box">

            <Mail size={18} />

            <input
    type="email"
    placeholder="you@example.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>

          </div>

          <label>Password</label>

          <div className="input-box">

            <Lock size={18} />

            <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

            <div
className="eye-icon"
onClick={() => setShowPassword(!showPassword)}
>

{
showPassword
?

<EyeOff size={18}/>

:

<Eye size={18}/>

}

</div>

          </div>

          <div className="login-row">

            <label>

              <input
type="checkbox"
checked={remember}
onChange={(e)=>setRemember(e.target.checked)}
/>

              Remember me

            </label>

            <a href="#">Forgot password?</a>

          </div>

          <button
className="signin-btn"
onClick={handleLogin}
disabled={loading}
>

{loading ? "Signing In..." : "Sign In"}

</button>

          <div className="divider">

            <span>or continue with</span>

          </div>

          <button className="google-btn">
    <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="google-icon"
    />

    Continue with Google
</button>

          <div className="bottom-text">

            New to ThreadCraft AI?

            <a href="#"> Create Account</a>

          </div>

        </section>

      </div>

    </main>
  );
}