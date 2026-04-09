"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { Check, Loader2, Send } from "lucide-react";
import { useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { executeRecaptcha } from "@/lib/recaptcha";
import { EASE_PREMIUM } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[+0-9()\-\s]{7,}$/.test(v),
      "Enter a valid phone number.",
    ),
  organization: z.string().optional(),
  subject: z.string().min(3, "Subject is required."),
  message: z.string().min(20, "Message should be at least 20 characters."),
});

type FormValues = z.infer<typeof schema>;

const fieldShell =
  "rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_50%,transparent)] bg-[var(--color-white)] transition-[border-color,box-shadow] focus-within:border-[var(--color-cyan)] focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)]";

const inputClass =
  "mt-0 border-0 bg-transparent px-4 py-3 text-[var(--color-navy)] shadow-none placeholder:text-[color-mix(in_srgb,var(--color-navy)_45%,transparent)] focus-visible:ring-0 dark:text-[var(--color-offwhite)] dark:placeholder:text-[color-mix(in_srgb,var(--color-silver)_55%,transparent)]";

const labelClass =
  "px-4 pt-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-navy)_55%,transparent)] dark:text-[var(--color-silver)]";

/**
 * Marketing contact form: Convex persistence, reCAPTCHA v3, and Resend notifications.
 */
export function ContactForm(): ReactElement {
  const submitForm = useMutation(api.contact.submitContactForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const token = await executeRecaptcha("contact_form");
      await submitForm({
        ...data,
        phone: data.phone || undefined,
        organization: data.organization || undefined,
        recaptchaToken: token,
      });
      setStatus("success");
      form.reset();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Submission could not be completed.";
      setErrorMessage(
        msg.includes("reCAPTCHA")
          ? "Verification failed. Please try again."
          : msg,
      );
      setStatus("error");
    }
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_42%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_96%,var(--color-offwhite))] shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--color-navy)_22%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-24 size-64 rounded-full bg-[var(--color-cyan)]/12 blur-3xl dark:bg-[var(--color-cyan)]/8"
        aria-hidden
      />

      <div className="relative px-6 py-8 md:px-10 md:py-10">
        <div className="mb-8 border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pb-8 dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)]">
          <p className="font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            Write to us
          </p>
          <h2 className="mt-2 font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Send a message
          </h2>
          <p className="mt-3 max-w-lg font-body text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_68%,transparent)] dark:text-[var(--color-silver)]">
            Your inquiry is stored securely and delivered to our team by email.
            We typically respond within two business days.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_PREMIUM }}
              className="flex flex-col items-center gap-5 py-12 text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] text-[var(--color-cyan)]">
                <Check className="size-8" strokeWidth={2.5} />
              </div>
              <p className="max-w-md font-body text-body leading-relaxed text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                Thank you. Your message has been received and a copy will
                arrive in your inbox shortly. Our team will follow up within two
                business days.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              className="space-y-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-2">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-navy)_48%,transparent)] dark:text-[var(--color-silver)]">
                  Your details
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className={fieldShell}>
                    <Label htmlFor="fullName" className={labelClass}>
                      Full name
                    </Label>
                    <Input
                      id="fullName"
                      className={inputClass}
                      aria-required
                      {...form.register("fullName")}
                    />
                    {form.formState.errors.fullName ? (
                      <p
                        className="px-4 pb-3 font-body text-caption text-red-600 dark:text-red-400"
                        role="alert"
                      >
                        {form.formState.errors.fullName.message}
                      </p>
                    ) : null}
                  </div>
                  <div className={fieldShell}>
                    <Label htmlFor="email" className={labelClass}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className={inputClass}
                      aria-required
                      {...form.register("email")}
                    />
                    {form.formState.errors.email ? (
                      <p
                        className="px-4 pb-3 font-body text-caption text-red-600 dark:text-red-400"
                        role="alert"
                      >
                        {form.formState.errors.email.message}
                      </p>
                    ) : null}
                  </div>
                  <div className={fieldShell}>
                    <Label htmlFor="phone" className={labelClass}>
                      Phone <span className="font-normal opacity-60">(optional)</span>
                    </Label>
                    <Input
                      id="phone"
                      className={inputClass}
                      {...form.register("phone")}
                    />
                    {form.formState.errors.phone ? (
                      <p
                        className="px-4 pb-3 font-body text-caption text-red-600 dark:text-red-400"
                        role="alert"
                      >
                        {form.formState.errors.phone.message}
                      </p>
                    ) : null}
                  </div>
                  <div className={fieldShell}>
                    <Label htmlFor="organization" className={labelClass}>
                      Organization{" "}
                      <span className="font-normal opacity-60">(optional)</span>
                    </Label>
                    <Input
                      id="organization"
                      className={inputClass}
                      {...form.register("organization")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-navy)_48%,transparent)] dark:text-[var(--color-silver)]">
                  Your message
                </p>
                <div className={fieldShell}>
                  <Label htmlFor="subject" className={labelClass}>
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    className={inputClass}
                    aria-required
                    {...form.register("subject")}
                  />
                  {form.formState.errors.subject ? (
                    <p
                      className="px-4 pb-3 font-body text-caption text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {form.formState.errors.subject.message}
                    </p>
                  ) : null}
                </div>
                <div className={fieldShell}>
                  <Label htmlFor="message" className={labelClass}>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    className={`${inputClass} min-h-[160px] resize-y py-3`}
                    aria-required
                    {...form.register("message")}
                  />
                  {form.formState.errors.message ? (
                    <p
                      className="px-4 pb-3 font-body text-caption text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {form.formState.errors.message.message}
                    </p>
                  ) : null}
                </div>
              </div>

              {errorMessage ? (
                <p
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 font-body text-caption text-red-700 dark:text-red-300"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={status === "loading"}
                size="lg"
                className="h-12 w-full rounded-xl bg-[var(--color-cyan)] font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-navy)] shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--color-cyan)_55%,transparent)] transition-[transform,box-shadow] hover:bg-[var(--color-cyan)] hover:shadow-[0_16px_40px_-12px_color-mix(in_srgb,var(--color-cyan)_65%,transparent)] active:scale-[0.99] sm:w-auto sm:min-w-[200px]"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="size-4" />
                    Submit message
                  </span>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
