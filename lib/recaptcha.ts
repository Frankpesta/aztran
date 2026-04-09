declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Executes Google reCAPTCHA v3 and returns a token for server-side verification.
 */
export async function executeRecaptcha(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
  }
  return await new Promise<string>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("reCAPTCHA not loaded"));
      return;
    }
    const client = window.grecaptcha;
    if (!client) {
      reject(new Error("reCAPTCHA not loaded"));
      return;
    }
    client.ready(async () => {
      try {
        const token = await client.execute(siteKey, { action });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}
