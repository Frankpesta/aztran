"use client";

import { useQuery } from "convex/react";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Inbox,
  Layers,
  LineChart,
  Newspaper,
} from "lucide-react";

type DayTrendRow = { day: string; count: number };

function formatShortDate(isoDay: string): string {
  const [y, m, d] = isoDay.split("-").map(Number);
  if (!y || !m || !d) return isoDay;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
}

function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  delay,
  href,
}: {
  label: string;
  value: number;
  hint?: string;
  icon: typeof Layers;
  delay: number;
  href?: string;
}): ReactElement {
  const inner = (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.45, ease: EASE_PREMIUM, delay }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)] transition-[box-shadow,border-color] hover:border-cyan-400/35 hover:shadow-[0_24px_60px_-20px_rgba(34,211,238,0.12)]"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-cyan-400/10 blur-2xl transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-cyan-300">
          <Icon className="size-5" />
        </div>
        {href ? (
          <ArrowUpRight className="size-4 shrink-0 text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100" />
        ) : null}
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-3xl font-semibold tabular-nums tracking-tight text-white">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-[12px] leading-snug text-zinc-500">{hint}</p>
      ) : null}
    </motion.article>
  );
  return href ? (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-xl">
      {inner}
    </Link>
  ) : (
    inner
  );
}

/**
 * KPI grid, trend charts, and recent activity for the admin home view.
 */
export function DashboardMetrics(): ReactElement {
  const staffReady = useConvexStaffSessionReady();
  const data = useQuery(
    api.dashboard.getAdminOverview,
    staffReady ? {} : "skip",
  );

  if (data === undefined) {
    return (
      <div className="space-y-8 px-4 py-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl bg-white/5" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl bg-white/5" />
      </div>
    );
  }

  const contactTrend: DayTrendRow[] = data.contactTrend ?? [];
  const publishedPostTrend: DayTrendRow[] = data.publishedPostTrend ?? [];
  const contactChartData = contactTrend.map((row) => ({
    ...row,
    label: formatShortDate(row.day),
  }));
  const postsChartData = publishedPostTrend.map((row) => ({
    ...row,
    label: formatShortDate(row.day),
  }));

  return (
    <div className="space-y-10 px-4 py-6 md:px-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard
          label="Insights (live)"
          value={data.publishedInsights}
          hint="Published research cards"
          icon={FileText}
          delay={0}
          href="/admin/insights"
        />
        <KpiCard
          label="Blog (live)"
          value={data.publishedBlog}
          hint="Editorial & commentary"
          icon={Newspaper}
          delay={0.04}
          href="/admin/blog"
        />
        <KpiCard
          label="Market reports"
          value={data.publishedReports}
          hint="Daily institutional reports"
          icon={BarChart3}
          delay={0.08}
          href="/admin/market-reports"
        />
        <KpiCard
          label="Portfolio items"
          value={data.portfolioCount}
          hint="Mandates & case studies"
          icon={Layers}
          delay={0.12}
          href="/admin/portfolio"
        />
        <KpiCard
          label="Unread contacts"
          value={data.unreadContacts}
          hint={data.unreadContacts > 0 ? "Inbox needs attention" : "Inbox clear"}
          icon={Inbox}
          delay={0.16}
          href="/admin/contacts"
        />
        <KpiCard
          label="Stat metrics"
          value={data.statsCount}
          hint="Homepage figures"
          icon={LineChart}
          delay={0.2}
          href="/admin/stats"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-md border border-white/10 bg-cyan-400/10 p-2 text-cyan-300">
              <Inbox className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Contact volume</h2>
              <p className="text-[12px] text-zinc-500">Submissions per day · last 14 days</p>
            </div>
          </div>
          <div className="h-[220px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={contactChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillContacts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0c1222",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#a1a1aa" }}
                />
                <Area type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2} fill="url(#fillContacts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: 0.08 }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-md border border-white/10 bg-violet-400/10 p-2 text-violet-300">
              <Newspaper className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Publishing pulse</h2>
              <p className="text-[12px] text-zinc-500">
                Content published per day · insights, blog, reports · last 14 days
              </p>
            </div>
          </div>
          <div className="h-[220px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={postsChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0c1222",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#a1a1aa" }}
                />
                <Area type="monotone" dataKey="count" stroke="#a78bfa" strokeWidth={2} fill="url(#fillPosts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
        >
          <h2 className="text-sm font-semibold text-white">Recent content</h2>
          <ul className="mt-4 divide-y divide-white/10">
            {data.recentContent.map((item) => (
                <li
                  key={`${item.kind}-${item.id}`}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-zinc-200">{item.title}</p>
                    <p className="text-[11px] text-zinc-500">
                      <span className="uppercase tracking-wide">{item.kind}</span>
                      {" · "}
                      {item.status}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="shrink-0 text-[12px] font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    Edit
                  </Link>
                </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: 0.06 }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
        >
          <h2 className="text-sm font-semibold text-white">Recent submissions</h2>
          <ul className="mt-4 divide-y divide-white/10">
            {data.recentContacts.map((c: Doc<"contactSubmissions">) => (
              <li
                key={c._id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-zinc-200">{c.fullName}</p>
                  <p className="truncate text-[11px] text-zinc-500">{c.subject}</p>
                </div>
                <span className="shrink-0 text-[11px] text-zinc-500">
                  {c.isRead ? "Read" : "Unread"}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
