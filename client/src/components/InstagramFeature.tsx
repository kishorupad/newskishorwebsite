import { useEffect } from 'react';
import { Facebook, Instagram, Newspaper, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

const INSTAGRAM_POST_URL = 'https://www.instagram.com/p/DSkXnt4kvwA/';
const EMBED_SCRIPT_ID = 'instagram-embed-js';

const FACEBOOK_POSTS = [
  {
    label: 'Featured Post',
    url: 'https://www.facebook.com/officialroutineofnepalbanda/posts/account-%E0%A4%AB%E0%A4%BF%E0%A4%B0%E0%A5%8D%E0%A4%A4%E0%A4%BE-%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%89%E0%A4%A8%E0%A5%87-%E0%A4%95%E0%A4%BF%E0%A4%B6%E0%A5%8B%E0%A4%B0-he-is-kishor-upadhyaya-an-it-professional-who-works/1263686019126625/',
    screenshot: '/screenshots/rnb-facebook-post-1.jpg',
    alt: 'Screenshot of Routine of Nepal Banda Facebook post featuring Kishor Upadhyaya',
  },
  {
    label: 'Second Feature',
    url: 'https://www.facebook.com/officialroutineofnepalbanda/posts/he-is-kishor-upadhyaya-a-computer-engineering-student-who-is-helping-many-people/709193457909220/',
    screenshot: '/screenshots/rnb-facebook-post-2.jpg',
    alt: 'Screenshot of second Routine of Nepal Banda Facebook post featuring Kishor Upadhyaya',
  },
];

let embedScriptPromise: Promise<void> | null = null;

function loadInstagramEmbedScript(): Promise<void> {
  if (window.instgrm?.Embeds) return Promise.resolve();

  if (!embedScriptPromise) {
    embedScriptPromise = new Promise<void>((resolve) => {
      const existing = document.getElementById(EMBED_SCRIPT_ID);
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => resolve(), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = EMBED_SCRIPT_ID;
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.body.appendChild(script);
    });
  }

  return embedScriptPromise;
}

interface InstagramFeatureProps {
  permalink?: string;
}

export default function InstagramFeature({ permalink = INSTAGRAM_POST_URL }: InstagramFeatureProps) {
  useEffect(() => {
    let cancelled = false;

    loadInstagramEmbedScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds?.process();
    });

    return () => {
      cancelled = true;
    };
  }, [permalink]);

  const cardHeader = (Icon: typeof Facebook, source: string, color: string) => (
    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
        <Icon size={15} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight truncate">{source}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Featured</p>
      </div>
    </div>
  );

  return (
    <section id="featured" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Featured on <span className="text-[#c7002b]">Routine of Nepal Banda</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            See the original post from Routine of Nepal Banda featuring Kishor Upadhyaya&apos;s social media services.
          </p>
        </div>

        {/* Big 3-column grid - Facebook screenshots + official Instagram embed */}
        <div className="scroll-animate grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-5 gap-y-4 max-w-6xl mx-auto relative z-10 items-start">
          {FACEBOOK_POSTS.map((post, idx) => (
            <div
              key={idx}
              className={`rounded-2xl bg-card border border-border overflow-hidden hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col ${idx === 0 ? 'md:col-start-1 md:row-start-1' : 'md:col-start-2 md:row-start-1'}`}
            >
              {cardHeader(Facebook, 'Routine of Nepal Banda · Facebook', idx === 0 ? 'from-blue-700 to-blue-500' : 'from-sky-600 to-cyan-500')}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.label} by Routine of Nepal Banda on Facebook (opens in new tab)`}
                className="relative block overflow-hidden group/screenshot"
              >
                {/* Branded fallback cover (visible until the screenshot exists) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400 flex flex-col items-center justify-center gap-2">
                  <Facebook size={48} strokeWidth={1.75} className="text-white/95 drop-shadow" />
                  <span className="text-white/90 text-[11px] font-semibold tracking-widest uppercase">Facebook</span>
                </div>

                {/* Full screenshot - natural height, no cropping */}
                <img
                  src={post.screenshot}
                  alt={post.alt}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="relative block w-full h-auto transition-transform duration-500 group-hover/screenshot:scale-[1.02]"
                />

                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                  Tap to open post <ExternalLink size={10} />
                </span>
              </a>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 border-t border-border text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-muted/50 transition-colors"
              >
                View this Facebook post <ExternalLink size={12} />
              </a>
            </div>
          ))}

          {/* Instagram post - official blockquote embed */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col md:col-start-3 md:row-start-1 md:row-span-2">
            {cardHeader(Instagram, 'Routine of Nepal Banda · Instagram', 'from-pink-600 via-purple-500 to-orange-400')}
            <div className="min-h-[420px] flex items-start justify-center overflow-hidden px-2">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink={permalink}
                data-instgrm-version="14"
                style={{ margin: '0', maxWidth: '100%', minWidth: '0' }}
              >
                <a href={permalink} target="_blank" rel="noopener noreferrer">
                  View this post on Instagram
                </a>
              </blockquote>
            </div>
            <a
              href={permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 border-t border-border text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-muted/50 transition-colors"
            >
              View the original post on Instagram <ExternalLink size={12} />
            </a>
          </div>

          {/* News mention - Shilapatra (spans FB-1 + FB-2 width, horizontal layout) */}
          <a
            href="https://shilapatra.com/detail/177781"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read the Shilapatra news article about Kishor Upadhyaya (opens in new tab)"
            className="group md:col-start-1 md:col-span-2 md:row-start-2 rounded-2xl overflow-hidden bg-card border border-border hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col sm:flex-row lg:min-h-[220px]"
          >
            {/* Article image - left */}
            <div className="relative h-44 sm:h-auto sm:w-56 lg:w-64 shrink-0 overflow-hidden">
              <img
                src="/kishwor-shilapatra.jpg"
                alt="Kishor Upadhyaya featured in a Shilapatra news article"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                <Newspaper size={10} /> News Article
              </span>
            </div>

            {/* Article content - right */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center gap-1.5">
              <p className="font-bold text-sm sm:text-base leading-snug">Shilapatra.com</p>
              <p className="font-nepali-pop text-sm font-semibold text-foreground/90 leading-relaxed">
                बुवाआमाले खाजा खान दिएको २० रुपैयाँ पैसा बोकेर उनी किराना पसल होइन, साइबर छिर्थे । साथीभाइले चाउचाउ र बिस्कुटको स्वाद लिइरहँदा उनी साइबरको एउटा कुनाको कम्प्युटरमा बसेर स्क्रिनभित्रको दुनियाँ खोतलिरहेका हुन्थे । कम्प्युटर चलाउन पाए भोक, तिर्खा, समय र निद्रा सबै बिर्सन्थे । स्क्रिनभित्रको संसारमा उनी हरेक दिन नयाँ कुरा सिक्थे ।
              </p>
              <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:underline underline-offset-4">
                Read the full article <ExternalLink size={12} />
              </span>
            </div>
          </a>
        </div>

        <p className="scroll-animate text-center text-xs text-muted-foreground mt-6 relative z-10">
          Posts shared by Routine of Nepal Banda and Shilapatra.com. All embeds link back to their original sources.
        </p>
      </div>
    </section>
  );
}
