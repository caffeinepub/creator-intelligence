import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, Briefcase, Library, PenTool, User } from "lucide-react";

const navItems = [
  { path: "/profile", label: "Profile", icon: User },
  { path: "/content", label: "Content", icon: Library },
  { path: "/writing", label: "Writing", icon: PenTool },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/brand", label: "Brand", icon: Briefcase },
];

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav className="mt-2">
      <ul className="flex gap-1 flex-wrap">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (item.path === "/profile" && currentPath === "/");
          const Icon = item.icon;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                data-ocid={`nav.${item.label.toLowerCase()}.link`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  backgroundColor: isActive
                    ? "oklch(0.60 0.24 355)"
                    : "transparent",
                  color: isActive ? "oklch(0.99 0 0)" : "oklch(0.40 0.02 30)",
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
