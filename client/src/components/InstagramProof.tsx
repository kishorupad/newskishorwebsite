import { useCallback, useEffect, useRef, useState } from 'react';
import { Instagram, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProofHighlight } from '@/data/proofImages';

const INSTAGRAM_URL = 'https://www.instagram.com/stories/highlights/17917716932810353/';

/**
 * Real proof: screenshots of the Instagram story highlights where client work
 * is documented. The images module is lazy-loaded via dynamic import() only
 * when this section scrolls near the viewport, so it never blocks the
 * initial page load. Clicking a card opens a lightbox to read the screenshot.
 */
export default function InstagramProof() {
  const [highlights, setHighlights] = useState<ProofHighlight[] | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Desktop mouse wheel: vertical wheel scrolls the carousel horizontally.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const next = el.scrollLeft + e.deltaY;
      if (next > 0 && next < max) {
        e.preventDefault();
        el.scrollLeft = next;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [highlights]);

  const scrollCards = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((i) => {
        if (i === null || highlights === null) return i;
        return (i + dir + highlights.length) % highlights.length;
      });
    },
    [highlights]
  );

  // Keyboard: Esc closes, arrows navigate. Lock body scroll while open.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close, step]);

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <div className="relative">
        <button
          onClick={() => scrollCards(-1)}
          className="hidden md:flex absolute -left-5 top-[38%] z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md items-center justify-center text-foreground hover:bg-muted transition-colors"
          aria-label="Scroll proofs left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollCards(1)}
          className="hidden md:flex absolute -right-5 top-[38%] z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md items-center justify-center text-foreground hover:bg-muted transition-colors"
          aria-label="Scroll proofs right"
        >
          <ChevronRight size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {highlights === null
            ? // Skeleton placeholders while the proof images load
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="snap-start shrink-0 w-[calc((100%-1rem)/2)] md:w-[calc((100%-3rem)/4)]">
                  <div className="rounded-2xl bg-muted/60 border border-border aspect-[9/16] animate-pulse" />
                  <div className="h-3 w-3/4 mx-auto mt-2 rounded bg-muted/60 animate-pulse" />
                </div>
              ))
            : highlights.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="snap-start shrink-0 w-[calc((100%-1rem)/2)] md:w-[calc((100%-3rem)/4)] group text-left cursor-pointer"
                  aria-label={`View proof: ${h.label}`}
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
                </button>
              ))}
        </div>
      </div>

      <div className="text-center mt-2">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 dark:text-pink-400 hover:gap-3 transition-all"
        >
          <Instagram size={16} />
          Watch the highlight on Instagram
          <ArrowRight size={14} />
        </a>
      </div>

      {/* Lightbox */}
      {lightbox !== null && highlights !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Proof ${lightbox + 1} of ${highlights.length}: ${highlights[lightbox].label}`}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 md:left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
          <figure className="max-w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={highlights[lightbox].src}
              alt={highlights[lightbox].label}
              className="max-h-[82vh] w-auto mx-auto rounded-xl"
            />
            <figcaption className="text-center text-white/80 text-sm mt-3">
              {highlights[lightbox].label}
              <span className="text-white/40"> - {lightbox + 1} / {highlights.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
