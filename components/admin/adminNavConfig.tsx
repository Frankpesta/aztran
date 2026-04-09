import {
  BarChart3,
  Briefcase,
  FileText,
  Inbox,
  LayoutDashboard,
  Newspaper,
  LineChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const ADMIN_NAV: readonly AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/insights", label: "Insights", icon: FileText },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/market-reports", label: "Market reports", icon: LineChart },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/contacts", label: "Contacts", icon: Inbox },
] as const;
