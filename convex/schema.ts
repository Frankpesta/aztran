import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  blogSection,
  insightMetric,
  insightSection,
  marketReportFgnBonds,
  marketReportGlobalMarkets,
  marketReportLocalEquities,
  marketReportMoneyMarket,
  marketReportSsaEurobonds,
  marketReportTreasuryBills,
  publishStatus,
} from "./contentValidators";

export default defineSchema({
  insights: defineTable({
    title: v.string(),
    slug: v.string(),
    referenceDate: v.string(),
    displayDate: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    sources: v.array(v.string()),
    status: publishStatus,
    isFeatured: v.boolean(),
    metrics: v.optional(v.array(insightMetric)),
    sections: v.array(insightSection),
    coverImageId: v.optional(v.id("_storage")),
    pdfStorageId: v.optional(v.id("_storage")),
    pdfFileName: v.optional(v.string()),
    summary: v.string(),
    readTimeMinutes: v.optional(v.number()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    createdBy: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_referenceDate", ["referenceDate"])
    .index("by_featured", ["isFeatured"])
    .index("by_status_and_category", ["status", "category"])
    .index("by_status_referenceDate", ["status", "referenceDate"]),

  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    seriesName: v.optional(v.string()),
    referenceDate: v.string(),
    displayDate: v.string(),
    author: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    status: publishStatus,
    isFeatured: v.boolean(),
    intro: v.string(),
    sections: v.array(blogSection),
    coverImageId: v.optional(v.id("_storage")),
    readTimeMinutes: v.optional(v.number()),
    summary: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    createdBy: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_referenceDate", ["referenceDate"])
    .index("by_series", ["seriesName"])
    .index("by_featured", ["isFeatured"])
    .index("by_status_and_category", ["status", "category"])
    .index("by_status_referenceDate", ["status", "referenceDate"]),

  marketReports: defineTable({
    slug: v.string(),
    title: v.string(),
    reportDate: v.string(),
    displayDate: v.string(),
    status: publishStatus,
    publishedAt: v.optional(v.number()),
    createdBy: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
    pdfStorageId: v.optional(v.id("_storage")),
    pdfFileName: v.optional(v.string()),
    moneyMarket: marketReportMoneyMarket,
    treasuryBills: marketReportTreasuryBills,
    fgnBonds: marketReportFgnBonds,
    ssaEurobonds: marketReportSsaEurobonds,
    localEquities: marketReportLocalEquities,
    globalMarkets: marketReportGlobalMarkets,
    sources: v.optional(v.string()),
    disclaimer: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_slug", ["slug"])
    .index("by_reportDate", ["reportDate"])
    .index("by_status_and_date", ["status", "reportDate"]),

  portfolio: defineTable({
    title: v.string(),
    slug: v.string(),
    sector: v.string(),
    region: v.string(),
    description: v.string(),
    highlights: v.array(v.string()),
    dealSize: v.optional(v.string()),
    returnRate: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("exited"),
      v.literal("pipeline"),
    ),
    imageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    year: v.number(),
    featured: v.boolean(),
    sortOrder: v.number(),
  })
    .index("by_sector", ["sector"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"]),

  stats: defineTable({
    key: v.string(),
    label: v.string(),
    value: v.string(),
    numericValue: v.optional(v.number()),
    prefix: v.optional(v.string()),
    suffix: v.optional(v.string()),
    sortOrder: v.number(),
    isVisible: v.boolean(),
  }).index("by_key", ["key"]),

  staffUsers: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("moderator")),
    createdAt: v.number(),
    invitedBy: v.optional(v.id("staffUsers")),
    lastLoginAt: v.optional(v.number()),
  }).index("by_email", ["email"]),

  staffInvites: defineTable({
    email: v.string(),
    tokenHash: v.string(),
    role: v.literal("moderator"),
    invitedBy: v.id("staffUsers"),
    createdAt: v.number(),
    expiresAt: v.number(),
    usedAt: v.optional(v.number()),
  })
    .index("by_token_hash", ["tokenHash"])
    .index("by_email", ["email"]),

  contactSubmissions: defineTable({
    fullName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    recaptchaScore: v.optional(v.number()),
    submittedAt: v.number(),
    isRead: v.boolean(),
    isArchived: v.boolean(),
    ipAddress: v.optional(v.string()),
  })
    .index("by_read", ["isRead"])
    .index("by_date", ["submittedAt"]),
});
