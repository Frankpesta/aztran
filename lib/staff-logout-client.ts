/**
 * Clears the staff httpOnly session cookie. Call from client after admin actions.
 */
export async function performStaffLogout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
}
