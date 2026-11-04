import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { Section } from './Section';
import credly from '../data/credly.json';

function formatIssued(issuedAt: string | null) {
  if (!issuedAt) return 'Issued';
  return new Date(`${issuedAt}T00:00:00`).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });
}

export function Certifications() {
  const { badges, profileUrl, syncedAt } = credly;

  if (badges.length === 0) return null;

  return (
    <Section
      id="certifications"
      title="Certifications."
      subtitle="Verified credentials, issued through Credly."
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <BadgeCheck size={16} className="text-[#5BCEFA]" />
          {badges.length} verified {badges.length === 1 ? 'badge' : 'badges'}

        </p>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#1d1d1f] transition-colors hover:text-[#5BCEFA]"
        >
          All badges on Credly
          <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((badge) => (
          <a
            key={badge.id}
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${badge.name} from ${badge.issuer} on Credly`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5BCEFA]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(91,206,250,0.16),rgba(245,169,184,0.10)_45%,transparent_75%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="relative flex h-40 items-center justify-center">
              <img
                src={badge.image}
                alt={`${badge.name} badge`}
                width={650}
                height={650}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-32 w-32 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            </div>

            <div className="relative mt-3 flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#1d1d1f]">
                  {badge.name}
                </h3>
                <ArrowUpRight
                  size={16}
                  className="mt-1 flex-shrink-0 text-[#86868b] opacity-50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </div>

              <p className="mt-1 text-sm text-muted-foreground">{badge.issuer}</p>

              <div className="mt-auto flex items-center justify-between border-t border-black/[0.05] pt-4 text-[11px] font-medium text-[#86868b]">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck size={12} className="text-[#5BCEFA]" />
                  Verified
                </span>
                <time dateTime={badge.issuedAt ?? undefined}>{formatIssued(badge.issuedAt)}</time>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
