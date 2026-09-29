import { CheckCircle } from 'lucide-react';

// ── SAMPLE DATA — replace these with real recent recoveries ──
const recoveries = [
  { text: 'Facebook account recovered', time: '2 days ago' },
  { text: 'Instagram hack reversed', time: '3 days ago' },
  { text: 'YouTube monetization fixed', time: '5 days ago' },
  { text: 'AdSense PIN verified', time: '1 week ago' },
  { text: 'TikTok account restored', time: '1 week ago' },
  { text: 'Payout issue resolved', time: '2 weeks ago' },
];

/** Scrolling "recent recoveries" marquee shown under the hero. Pauses on hover. */
export default function RecoveryTicker() {
  const items = [...recoveries, ...recoveries]; // duplicated for a seamless loop
  return (
    <div
      className="border-y border-border bg-muted/30 overflow-hidden py-3"
      aria-label="Recent recoveries"
    >
      <div className="ticker-track flex items-center gap-10 w-max">
        {items.map((r, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap"
          >
            <CheckCircle size={14} className="text-emerald-500 shrink-0" />
            <span className="font-medium text-foreground">{r.text}</span>
            <span className="text-xs">&bull; {r.time}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
