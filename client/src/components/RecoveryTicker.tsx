import { CheckCircle } from 'lucide-react';

// ── Real client outcomes, sourced from the site's own published testimonials
// (client/src/pages/Home.tsx → allTestimonials). Recovery times are the ones
// stated in those testimonials - no invented "x hours ago" timestamps.
const recoveries = [
  { text: 'Aarav Sharma - hacked Facebook account recovered', time: 'in 2 days' },
  { text: 'Srijana Thapa - hacked Instagram account recovered', time: 'in 3 days' },
  { text: 'Bikash Gurung - hacked YouTube channel (50K subs) restored', time: 'in 4 days' },
  { text: 'Pratikshya Karki - disabled Facebook page (100K) recovered', time: 'in 3 days' },
  { text: 'Sunita Bhandari - AdSense PIN issue fixed', time: 'in 2 days' },
  { text: 'Anil Magar - terminated YouTube channel reinstated', time: 'in 5 days' },
  { text: 'Deepa Rai - hacked Instagram account recovered', time: 'in 2 days' },
  { text: 'Rajesh Shrestha - stuck Facebook payout resolved', time: 'in 4 days' },
  { text: 'Mina Tamang - disabled TikTok account recovered', time: 'in 3 days' },
  { text: 'Santosh Lama - YouTube channel re-monetized', time: 'in 6 days' },
  { text: 'Kabita Adhikari - Facebook verification badge approved', time: 'in 2 weeks' },
  { text: 'Bijay Gurung - hacked business page recovered', time: 'in 1 day' },
  { text: 'Sapna Bista - Instagram shadowban fixed', time: 'in 4 days' },
  { text: 'Nischal KC - YouTube copyright strike removed', time: 'in 3 days' },
  { text: 'Ashmita Thapa - AdSense payments restored', time: 'in 1 week' },
];

/** Scrolling "recent recoveries" marquee shown under the hero. Pauses on hover. */
export default function RecoveryTicker() {
  const items = [...recoveries, ...recoveries]; // duplicated for a seamless loop
  return (
    <div
      className="border-y border-border bg-muted/30 overflow-hidden py-3"
      aria-label="Recent client recoveries"
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
