import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "./style.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "ThreadCraft AI",
  description: "AI Twitter/X Viral Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
            style: {
              background: "#1f1f2e",
              color: "#fff",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "15px",
            },
            success: {
              iconTheme: {
                primary: "#8b5cf6",
                secondary: "#fff",
              },
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}