/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as blogPosts from "../blogPosts.js";
import type * as contact from "../contact.js";
import type * as contactActions from "../contactActions.js";
import type * as contentValidators from "../contentValidators.js";
import type * as dashboard from "../dashboard.js";
import type * as emails_ContactAcknowledgement from "../emails/ContactAcknowledgement.js";
import type * as emails_ContactNotification from "../emails/ContactNotification.js";
import type * as emails_StaffInviteEmail from "../emails/StaffInviteEmail.js";
import type * as insights from "../insights.js";
import type * as marketReports from "../marketReports.js";
import type * as portfolio from "../portfolio.js";
import type * as recaptchaActions from "../recaptchaActions.js";
import type * as seed from "../seed.js";
import type * as slugHelpers from "../slugHelpers.js";
import type * as staff from "../staff.js";
import type * as staffActions from "../staffActions.js";
import type * as staffInternal from "../staffInternal.js";
import type * as staffInviteDelivery from "../staffInviteDelivery.js";
import type * as staffMutations from "../staffMutations.js";
import type * as staffToken from "../staffToken.js";
import type * as stats from "../stats.js";
import type * as storage from "../storage.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  blogPosts: typeof blogPosts;
  contact: typeof contact;
  contactActions: typeof contactActions;
  contentValidators: typeof contentValidators;
  dashboard: typeof dashboard;
  "emails/ContactAcknowledgement": typeof emails_ContactAcknowledgement;
  "emails/ContactNotification": typeof emails_ContactNotification;
  "emails/StaffInviteEmail": typeof emails_StaffInviteEmail;
  insights: typeof insights;
  marketReports: typeof marketReports;
  portfolio: typeof portfolio;
  recaptchaActions: typeof recaptchaActions;
  seed: typeof seed;
  slugHelpers: typeof slugHelpers;
  staff: typeof staff;
  staffActions: typeof staffActions;
  staffInternal: typeof staffInternal;
  staffInviteDelivery: typeof staffInviteDelivery;
  staffMutations: typeof staffMutations;
  staffToken: typeof staffToken;
  stats: typeof stats;
  storage: typeof storage;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
