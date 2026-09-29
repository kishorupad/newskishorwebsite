import { ArrowRight, Award, BadgeCheck, HeartHandshake, Search, ShieldCheck, User } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageBackdrop from '@/components/PageBackdrop';
import { getYearsExperienceText } from '@/lib/experience';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-4xl relative">
        {/* Header */}
        <div className="grid md:grid-cols-5 gap-10 items-center mb-14">
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
              <User size={14} /> About me
            </div>
            <h1 className="font-[Sora] text-4xl md:text-5xl font-bold tracking-tight mb-4">
              I&apos;m <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">Kishor Upadhyaya</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nepal&apos;s social media recovery expert. {getYearsExperienceText()} years of getting hacked,
              disabled and demonetized accounts back - <strong className="text-foreground">1,500+ cases</strong> solved
              across Facebook, Instagram, YouTube and TikTok.
            </p>
          </div>
        </div>

        {/* Story */}
        <section className="mb-14">
          <h2 className="font-[Sora] text-2xl md:text-3xl font-bold mb-5">My story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-[1.05rem]">
            <p>
              I started helping people with hacked Facebook accounts years ago - friends, then friends of friends,
              then strangers from all over Nepal. Every case taught me something new about how these platforms
              actually work behind the scenes: their recovery systems, their appeal processes, what gets an
              account back and what gets it permanently lost.
            </p>
            <p>
              Over time that became my full-time work. Today I handle everything from hacked accounts and
              disabled pages to demonetization appeals, AdSense problems and stuck payouts. Creators, businesses
              and everyday users trust me with accounts their livelihood depends on.
            </p>
            <p>
              My rule is simple: <strong className="text-foreground">I tell you the truth about your case.</strong> If it
              can be fixed, I&apos;ll tell you exactly how. If it can&apos;t, I&apos;ll tell you that too - instead of
              taking your money for false hope. That honesty is why most of my clients come from referrals.
            </p>
          </div>
        </section>

        {/* How I work */}
        <section className="mb-14">
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
        <section className="mb-14 rounded-3xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
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
