import { ArrowRight, Award, BadgeCheck, ExternalLink, HeartHandshake, Newspaper, Quote, Search, ShieldCheck, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageBackdrop from '@/components/PageBackdrop';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-4xl relative">
        {/* Header */}
        <div className="grid md:grid-cols-5 gap-10 items-center mb-12">
          <div className="md:col-span-2">
            <div className="relative p-1.5 rounded-[2rem] bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-500 shadow-2xl shadow-violet-500/25 max-w-xs mx-auto md:mx-0">
              <div className="rounded-[1.6rem] overflow-hidden bg-card">
                <img
                  src="/kishwor-5-1770795722.jpg"
                  alt="Kishor Upadhyaya"
                  className="w-full aspect-[4/5] object-cover"
                  loading="eager"
                  width="480"
                  height="600"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-700 dark:text-violet-300">
              <Users size={14} /> About me
            </div>
            <h1 className="font-[Sora] text-4xl md:text-5xl font-bold tracking-tight mb-4">
              I&apos;m <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">Kishor Upadhyaya</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From Jumla to Kathmandu - the guy Nepal calls when social media breaks.
              I&apos;ve solved <strong className="text-foreground">1,000+ cases</strong> of hacked, disabled and
              demonetized accounts across Facebook, Instagram, YouTube and TikTok.
            </p>
          </div>
        </div>

        {/* In the press */}
        <a
          href="https://shilapatra.com/detail/177781/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 mb-12 hover:border-violet-500/40 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
            <Newspaper size={22} className="text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">In the press</p>
            <p className="font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              &ldquo;ह्याक भएका सामाजिक सञ्जाल फिर्ता ल्याउने किशोर&rdquo;
            </p>
            <p className="text-sm text-muted-foreground">Interview by Sanjita Devkota · Shilapatra</p>
          </div>
          <ExternalLink size={18} className="text-muted-foreground group-hover:text-violet-500 shrink-0" />
        </a>

        {/* Story */}
        <section className="mb-12">
          <h2 className="font-[Sora] text-2xl md:text-3xl font-bold mb-5">My story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-[1.05rem]">
            <p>
              I was born in <strong className="text-foreground">Jumla</strong> and came to Kathmandu at age 4 for
              school. While other kids spent their Rs. 20 lunch money on snacks, I spent mine at the local
              cyber cafe - I&apos;d forget hunger, thirst and time the moment I sat in front of a computer.
              Every day inside that screen, I learned something new.
            </p>
            <p>
              In <strong className="text-foreground">class 5, I opened my own YouTube channel</strong>, posting
              caricature videos - over 106 of them. But running a channel meant running into problems:
              demonetization, AdSense PIN issues, stuck payments. Nobody around me knew the fixes, so I
              figured them out myself, one by one.
            </p>
            <p>
              That&apos;s when it clicked: if I could solve my own problems, I could solve other people&apos;s too.
              The first case I ever fixed for someone else was a stuck AdSense payment - the exact problem
              I&apos;d suffered through myself. <strong className="text-foreground">At age 20, this became my
              profession.</strong> In about five years since, I&apos;ve solved more than a thousand cases -
              I&apos;ve honestly lost count.
            </p>
            <p>
              Today my clients range from everyday users with hacked Facebook accounts to well-known creators -
              YouTuber <strong className="text-foreground">Ratan Karki</strong>, TikToker{' '}
              <strong className="text-foreground">Cool Boy</strong>, and musician{' '}
              <strong className="text-foreground">Kaliprasad Baskota</strong> have all trusted me with their
              accounts, as I shared in my press interview.
            </p>
          </div>
        </section>

        {/* Quote */}
        <figure className="rounded-3xl border border-violet-500/20 bg-violet-500/[0.04] p-6 md:p-8 mb-12">
          <Quote size={28} className="text-violet-500 mb-3" />
          <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-3">
            &ldquo;I&apos;m not doing anything extraordinary - but since not everyone understands the technical
            language, someone like me gets the work.&rdquo;
          </blockquote>
          <figcaption className="text-sm text-muted-foreground">- Kishor Upadhyaya, in his press interview</figcaption>
        </figure>

        {/* Honest note */}
        <section className="mb-12 rounded-2xl border border-border bg-card p-6 md:p-7">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <ShieldCheck size={19} className="text-emerald-500" /> Something you should know
          </h3>
          <p className="text-muted-foreground leading-relaxed text-[1.02rem]">
            I&apos;m a <strong className="text-foreground">computer engineering student</strong> - not a Meta or
            Google employee, and I have no formal affiliation with any platform. I solve cases using their
            official policies, appeal systems and guidelines, which I&apos;ve learned inside-out over the years.
            That independence is exactly why I can be honest with you: if a case can&apos;t be won, I&apos;ll say so.
          </p>
        </section>

        {/* How I work */}
        <section className="mb-12">
          <h2 className="font-[Sora] text-2xl md:text-3xl font-bold mb-6">How I work</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Search, title: 'Diagnose first', desc: 'Every case starts with a proper review. I find the real cause before suggesting anything.' },
              { icon: HeartHandshake, title: 'Honest answers', desc: 'No guaranteed recovery promises. You pay for my time and a straight diagnosis.' },
              { icon: ShieldCheck, title: 'Your data stays yours', desc: 'Case details are never shared or reused. What you tell me stays between us.' },
            ].map(c => (
              <div key={c.title} className="rounded-2xl bg-card border border-border p-6">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <c.icon size={20} className="text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="font-bold mb-1.5">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications teaser */}
        <section className="mb-12 rounded-3xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shrink-0">
            <Award size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-[Sora] text-xl font-bold mb-1 flex items-center gap-2">
              Verified certifications <BadgeCheck size={18} className="text-emerald-500" />
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Google Cybersecurity, Security Risk Management and Cisco Network Security -
              all verifiable online with credential IDs.
            </p>
          </div>
          <a href="/certifications" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border font-semibold text-sm hover:bg-muted transition-colors shrink-0">
            View all <ArrowRight size={15} />
          </a>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-8 md:p-10 text-center">
          <h2 className="font-[Sora] text-2xl md:text-3xl font-bold mb-3">Have a problem I can help with?</h2>
          <p className="text-white/85 mb-6 max-w-lg mx-auto">Book a review and get an honest diagnosis of your case - no false promises.</p>
          <a href="/booking" className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors text-lg">
            Book a Review <ArrowRight size={19} />
          </a>
        </section>
      </main>
    </div>
  );
}
