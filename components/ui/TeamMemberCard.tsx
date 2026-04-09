import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ReactElement } from "react";

export type TeamMember = {
  name: string;
  title: string;
  imageSrc: string;
  linkedInHref: string;
};

/**
 * Leadership portrait tile with monospace title and LinkedIn affordance.
 */
export function TeamMemberCard({
  member,
}: {
  member: TeamMember;
}): ReactElement {
  return (
    <article className="text-center">
      <div className="relative mx-auto size-40 overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-[var(--color-cyan)]">
        <Image
          src={member.imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>
      <h3 className="mt-4 font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
        {member.name}
      </h3>
      <p className="mt-1 font-body text-label uppercase tracking-wide text-[var(--color-silver)]">
        {member.title}
      </p>
      <Link
        href={member.linkedInHref}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex justify-center text-[var(--color-cyan)] hover:opacity-80"
        aria-label={`${member.name} on LinkedIn`}
      >
        <ExternalLink className="size-5" />
      </Link>
    </article>
  );
}
