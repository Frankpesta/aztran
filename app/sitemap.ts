import type { MetadataRoute } from "next";
import { api } from "@/convex/_generated/api";
import { getAllServiceSlugs } from "@/lib/services";
import { serverFetchQuery } from "@/lib/server-convex-query";

const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const runtime = "nodejs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let insightSlugs: string[] = [];
  let blogSlugs: string[] = [];
  let reportSlugs: string[] = [];
  try {
    insightSlugs = await serverFetchQuery(api.insights.getAllInsightSlugs);
  } catch {
    insightSlugs = [];
  }
  try {
    blogSlugs = await serverFetchQuery(api.blogPosts.getAllBlogSlugs);
  } catch {
    blogSlugs = [];
  }
  try {
    reportSlugs = await serverFetchQuery(api.marketReports.getAllMarketReportSlugs);
  } catch {
    reportSlugs = [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/insights",
    "/blog",
    "/market-reports",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insightSlugs.map((slug) => ({
    url: `${base}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const reportRoutes: MetadataRoute.Sitemap = reportSlugs.map((slug) => ({
    url: `${base}/market-reports/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: `${base}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    }),
  );

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...insightRoutes,
    ...blogRoutes,
    ...reportRoutes,
  ];
}
