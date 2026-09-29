import { useEffect, useRef, useState } from 'react';
import { Instagram, ExternalLink, ArrowRight } from 'lucide-react';
import type { ProofHighlight } from '@/data/proofImages';

const INSTAGRAM_URL = 'https://www.instagram.com/kishorupp';

/**
 * Real proof: screenshots of the Instagram story highlights where client work
 * is documented. The images module (~700KB of data URIs) is lazy-loaded via
 * dynamic import() only when this section scrolls near the viewport, so it
 * never blocks the initial page load.
 */
export default function InstagramProof() {
  const [highlights, setHighlights] = useState<ProofHighlight[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          import('@/data/proofImages').then((m) => setHighlights(m.PROOF_HIGHLIGHTS));
          obs.disconnect();
        }
      },
      { rootMargin: '500px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {highlights === null
          ? // Skeleton placeholders while the proof images load
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="snap-start shrink-0 w-40 md:w-48">
                <div className="rounded-2xl bg-muted/60 border border-border aspect-[9/16] animate-pulse" />
                <div className="h-3 w-3/4 mx-auto mt-2 rounded bg-muted/60 animate-pulse" />
              </div>
            ))
          : highlights.map((h, i) => (
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

      <div className="text-center mt-2">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 dark:text-pink-400 hover:gap-3 transition-all"
        >
          <Instagram size={16} />
          See all highlights on Instagram
          <ArrowRight size={14} />
        </a>
        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
          <ExternalLink size={11} /> {highlights === null ? '' : `${highlights.length} documented recoveries - and counting`}
        </p>
      </div>
    </div>
  );
}
