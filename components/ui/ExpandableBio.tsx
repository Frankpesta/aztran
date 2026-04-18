"use client";

import { useId, useState, type ReactElement } from "react";

const PARA_BODY =
  "font-body text-body leading-[1.75] text-[color-mix(in_srgb,var(--color-navy)_90%,transparent)] dark:text-[var(--color-silver)]";

/** Collapsed teaser length (first paragraph may be very long even when more paragraphs follow). */
const FIRST_PARA_MAX_CHARS = 280;

function excerptParagraph(text: string, maxChars: number): string {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  const slice = t.slice(0, maxChars).trimEnd();
  const breakAt = slice.lastIndexOf(" ");
  const safe =
    breakAt > maxChars * 0.55 ? slice.slice(0, breakAt).trimEnd() : slice;
  return `${safe}…`;
}

type ExpandableBioProps = {
  /** Distinct key for accessibility (e.g. member id). */
  bioId: string;
  paragraphs: readonly string[];
};

/**
 * Shows a short excerpt with “Read more…”; expands in place for the full biography.
 */
export function ExpandableBio({
  bioId,
  paragraphs,
}: ExpandableBioProps): ReactElement | null {
  const reactId = useId();
  const panelId = `bio-panel-${bioId}-${reactId}`;
  const [expanded, setExpanded] = useState(false);

  if (paragraphs.length === 0) return null;

  const multiPara = paragraphs.length > 1;
  const longSingle =
    paragraphs.length === 1 && paragraphs[0].length > FIRST_PARA_MAX_CHARS;
  const collapsible = multiPara || longSingle;

  if (!collapsible) {
    return (
      <>
        {paragraphs.map((para, i) => (
          <p key={`${bioId}-p-${i}`} className={`${PARA_BODY} mt-4 first:mt-0`}>
            {para}
          </p>
        ))}
      </>
    );
  }

  const teaser = excerptParagraph(paragraphs[0], FIRST_PARA_MAX_CHARS);

  if (expanded) {
    return (
      <div id={panelId}>
        {paragraphs.map((para, i) => (
          <p key={`${bioId}-full-${i}`} className={`${PARA_BODY} mt-4 first:mt-0`}>
            {para}
          </p>
        ))}
        <button
          type="button"
          className="mt-4 font-body text-label uppercase tracking-wide text-[var(--color-cyan)] underline-offset-4 transition-colors hover:underline"
          onClick={() => setExpanded(false)}
          aria-expanded
          aria-controls={panelId}
        >
          Read less
        </button>
      </div>
    );
  }

  return (
    <div id={panelId}>
      <p className={`${PARA_BODY} mt-4 first:mt-0`}>{teaser}</p>
      <button
        type="button"
        className="mt-3 font-body text-label uppercase tracking-wide text-[var(--color-cyan)] underline-offset-4 transition-colors hover:underline"
        onClick={() => setExpanded(true)}
        aria-expanded={false}
        aria-controls={panelId}
      >
        Read more…
      </button>
    </div>
  );
}
