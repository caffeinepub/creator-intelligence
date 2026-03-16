import { Outlet } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import Navigation from "./Navigation";
import ProfileSwitcher from "./ProfileSwitcher";

export default function Layout() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "creator-intelligence",
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.97 0.012 75)" }}
    >
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{
          backgroundColor: "oklch(0.97 0.012 75)",
          borderBottom: "4px solid oklch(0.60 0.24 355)",
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: "oklch(0.60 0.24 355)" }}
              >
                <Sparkles
                  className="w-5 h-5"
                  style={{ color: "oklch(0.99 0 0)" }}
                />
              </div>
              <h1
                className="font-extrabold text-2xl tracking-tight"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "oklch(0.60 0.24 355)",
                }}
              >
                Creator Intelligence
              </h1>
            </div>
            <ProfileSwitcher />
          </div>
          <Navigation />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer
        className="mt-auto"
        style={{
          borderTop: "2px solid oklch(0.88 0.015 60)",
          backgroundColor: "oklch(0.99 0.004 80)",
        }}
      >
        <div
          className="container mx-auto px-4 py-6 text-center text-sm"
          style={{ color: "oklch(0.52 0.02 40)" }}
        >
          <p>
            © {currentYear} · Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors"
              style={{ color: "oklch(0.60 0.24 355)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
