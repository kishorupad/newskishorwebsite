import { Instagram, ExternalLink } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/kishorupp';

// ── Real proof: screenshots of the Instagram story highlights where client
// work is documented. To add one, drop the screenshot into
// client/public/proof/ (e.g. proof/highlight-1.jpg) and add an entry here:
//   { src: '/proof/highlight-1.jpg', label: 'Hacked FB recovered' },
// Keep labels short and factual - only what the screenshot actually shows.
const highlights: { src: string; label: string }[] = [];

export default function InstagramProof() {
  return (
    <div className="max-w-4xl mx-auto">
      {highlights.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {highlights.map((h, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-40 md:w-48 group"
            >
              <div className="rounded-2xl p-[3px] bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-600">
                <div className="rounded-[14px] overflow-hidden bg-card aspect-[9/16]">
                  <img
                    src={h.src}
                    alt={h.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center leading-tight">{h.label}</p>
            </a>
          ))}
        </div>
      ) : (
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-center gap-5 p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-pink-500/40 transition-colors"
        >
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-600 flex items-center justify-center">
            <Instagram size={30} className="text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-lg">Watch real client work on Instagram</p>
            <p className="text-sm text-muted-foreground mt-1">
              My story highlights document actual recoveries and fixes - screenshots and results, straight from the work.
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-pink-600 dark:text-pink-400">
            @kishorupp <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </a>
      )}
    </div>
  );
}
