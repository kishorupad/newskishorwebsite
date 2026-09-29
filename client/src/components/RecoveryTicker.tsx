import { CheckCircle } from 'lucide-react';

// ── Services marquee. Lists platforms/services offered - no invented
// client names, no fake "x hours ago" recovery claims.
const services = [
  'Facebook account recovery',
  'Instagram account recovery',
  'YouTube channel recovery',
  'TikTok account recovery',
  'Disabled page recovery',
  'AdSense & payout help',
  'Monetization issues',
  'Hacked business pages',
];

/** Scrolling "recent recoveries" marquee shown under the hero. Pauses on hover. */
export default function RecoveryTicker() {
  const items = [...services, ...services]; // duplicated for a seamless loop
  return (
    <div
      className="border-y border-border bg-muted/30 overflow-hidden py-3"
      aria-label="Services offered"
    >
      <div className="ticker-track flex items-center gap-10 w-max">
        {items.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap"
          >
            <CheckCircle size={14} className="text-emerald-500 shrink-0" />
            <span className="font-medium text-foreground">{s}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
