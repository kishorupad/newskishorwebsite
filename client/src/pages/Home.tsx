import { useState, useEffect, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import RecoveryAssessment from '@/components/RecoveryAssessment';
import LiveChat from '@/components/LiveChat';
import InstagramFeature from '@/components/InstagramFeature';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getYearsExperience, getYearsExperienceText } from '@/lib/experience';
import AnimatedCounter from '@/components/AnimatedCounter';
import RecoveryTicker from '@/components/RecoveryTicker';
import { Phone, Mail, MessageCircle, ArrowRight, Shield, Facebook, Instagram, Youtube, Users, Search, CheckCircle, Clock, Lock, DollarSign, Award, ExternalLink, CalendarCheck, FileCheck, KeyRound, Siren, BookOpen, ShieldCheck } from 'lucide-react';

export default function Home() {
  useScrollAnimation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const allTestimonials = useMemo(() => [
    { name: 'Aarav Sharma', text: 'My Facebook account was hacked last month. Kishor recovered it within 2 days. Very professional work, kept me updated the whole time.', platform: 'Facebook', time: '2 days' },
    { name: 'Srijana Thapa', text: 'I thought my Instagram was gone forever. Kishor recovered it and also helped me set up two-factor authentication so it doesn\'t happen again.', platform: 'Instagram', time: '3 days' },
    { name: 'Bikash Gurung', text: 'My YouTube channel with 50K subscribers got hacked. Kishor restored everything - channel, videos, even my monetization. Really grateful.', platform: 'YouTube', time: '4 days' },
    { name: 'Pratikshya Karki', text: 'My Facebook page with 100K followers was disabled. Kishor got it back in 3 days. He knows exactly how to deal with Meta support.', platform: 'Facebook', time: '3 days' },
    { name: 'Sunita Bhandari', text: 'My AdSense PIN never arrived for 6 months. Kishor fixed it in 2 days. I\'m now receiving my payments properly.', platform: 'AdSense', time: '2 days' },
    { name: 'Anil Magar', text: 'YouTube channel terminated for no reason. Kishor filed the appeal and got it reinstated. Saved my 3 years of hard work.', platform: 'YouTube', time: '5 days' },
    { name: 'Deepa Rai', text: 'My Instagram account was hacked and the hacker changed everything. Kishor recovered it and helped me secure it properly.', platform: 'Instagram', time: '2 days' },
    { name: 'Rajesh Shrestha', text: 'Facebook payout was stuck for 4 months. Kishor resolved it within a week. My payments are now running smoothly.', platform: 'Facebook', time: '4 days' },
    { name: 'Mina Tamang', text: 'TikTok account disabled unexpectedly. Kishor knew exactly what to do and got it back. Very knowledgeable about all platforms.', platform: 'TikTok', time: '3 days' },
    { name: 'Santosh Lama', text: 'My YouTube monetization was revoked. Kishor identified the issue, fixed it, and got me re-monetized. Professional service.', platform: 'YouTube', time: '6 days' },
    { name: 'Kabita Adhikari', text: 'Facebook verification badge kept getting rejected. Kishor guided me through the process and I got verified in 2 weeks.', platform: 'Facebook', time: '2 weeks' },
    { name: 'Bijay Gurung', text: 'My business page was hacked during a festival season. Kishor worked overtime to recover it quickly. Saved my business.', platform: 'Facebook', time: '1 day' },
    { name: 'Sapna Bista', text: 'Instagram shadowban was killing my reach. Kishor identified the cause and helped me fix it. My engagement is back to normal.', platform: 'Instagram', time: '4 days' },
    { name: 'Nischal KC', text: 'YouTube copyright strike was unfair. Kishor helped me file a proper counter-notification and the strike was removed.', platform: 'YouTube', time: '3 days' },
    { name: 'Ashmita Thapa', text: 'My AdSense PIN verification was stuck for months. Kishor helped me complete identity verification and now I\'m receiving payments regularly.', platform: 'AdSense', time: '1 week' },
  ], []);

  const [testimonials] = useState(() => {
    const shuffled = [...allTestimonials].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });


  // Scroll detection for sticky bar + progress
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 400);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    { q: 'How long does account recovery take?', a: 'Most recoveries are completed within 24-72 hours. Complex cases may take up to a week. I keep you updated throughout the process.' },
    { q: 'Do I have to pay before we talk?', a: 'Yes. Every consultation is booked and paid in advance through the booking page - pick your service, pay via eSewa/Khalti, upload the screenshot. This way you get my full focused time, instead of a rushed, distracted call.' },
    { q: 'What exactly am I paying for?', a: "You're paying for my time and expertise: a proper diagnosis of your specific case and honest next steps - not a guaranteed recovery. Some cases genuinely can't be fixed, and I'll tell you that straight instead of taking more of your money." },
    { q: 'What if my account cannot be recovered?', a: "Then you don't pay anything beyond the consultation fee. That fee covers the investigation and honest diagnosis itself - and I'll guide your next steps (like securing a new account) so it still works for you." },
    { q: 'What information do you need from me?', a: 'Your account details, what happened, any recovery emails or phone numbers on file, and proof of identity. The booking form asks for the essentials upfront.' },
    { q: 'Is my personal information safe?', a: 'Absolutely. I use strict security protocols and never share your information with third parties. All data is deleted after recovery.' },
    { q: 'Do you only handle hacking cases?', a: 'I handle all social media issues including hacked accounts, locked accounts, suspended accounts, disabled accounts, and forgotten credentials.' },
    { q: 'How do I pay?', a: 'Through the booking page: scan the eSewa/Khalti QR, pay the fee for your chosen service (Rs. 2,000\u20133,500), and upload the payment screenshot. Your slot is locked once I verify payment - then we talk on WhatsApp.' },
  ];

  const heroProblems = ['Hacked?', 'Disabled?', 'Demonetized?', 'Payout stuck?', 'Shadowbanned?'];
  const [heroPi, setHeroPi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHeroPi(i => (i + 1) % heroProblems.length), 2200);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { numeric: 1500, suffix: '+', label: 'Problems Solved' },
    { numeric: 98, suffix: '%', label: 'Success Rate' },
    { numeric: 24, suffix: 'h', label: 'Response Time' },
    { numeric: getYearsExperience(), suffix: '+', label: 'Years Experience' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md">
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">

        {/* ─── HERO ─── */}
        <section id="hero" className="relative min-h-[92svh] flex items-center pt-24 pb-14 md:pt-28 md:pb-16 overflow-hidden">
          {/* Aurora background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="animate-blob absolute -top-24 -left-24 w-[38rem] h-[38rem] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[130px]" />
            <div className="animate-blob-slow absolute top-1/3 -right-28 w-[34rem] h-[34rem] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[130px]" />
            <div className="animate-blob absolute bottom-0 left-1/3 w-[30rem] h-[30rem] bg-fuchsia-600/[0.06] dark:bg-fuchsia-600/[0.12] rounded-full blur-[130px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.07)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,black,transparent)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2.5 mb-5 md:mb-7 px-4 py-2 rounded-full border border-violet-500/25 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-lg shadow-violet-500/10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-semibold">Available now · replies within 24 hours</span>
                </div>

                <h1 className="font-[Sora] text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl xl:text-[5.1rem] font-bold mb-5 md:mb-6 tracking-tight min-h-[6rem] sm:min-h-[7.75rem] lg:min-h-[9.25rem] xl:min-h-[10.5rem]">
                  <span key={heroPi} className="animate-fade-in-up inline-block">{heroProblems[heroPi]}</span><br />
                  <span className="animate-gradient bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 dark:from-violet-400 dark:via-indigo-400 dark:to-fuchsia-400 bg-clip-text text-transparent">I&apos;ll fix it.</span>
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
                  I&apos;m <strong className="text-foreground font-semibold">Kishor Upadhyaya</strong> - Nepal&apos;s social media recovery expert.
                  <strong className="text-foreground font-semibold"> 1,500+ cases</strong> solved across Facebook, Instagram, YouTube and TikTok.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                  <a href="/booking" className="btn-gradient group inline-flex items-center justify-center gap-2 text-lg">
                    Book a Review <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="/emergency" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-red-500/40 text-red-600 dark:text-red-400 font-semibold text-lg hover:bg-red-500/10 transition-all duration-300">
                    <Siren size={19} /> Hacked right now?
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-9">
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-500" /> Honest diagnosis</span>
                  <span className="inline-flex items-center gap-1.5"><Lock size={15} className="text-emerald-500" /> Secure eSewa / Khalti payment</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-emerald-500" /> 24h response</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-3xl border border-white/50 dark:border-white/10 bg-white/55 dark:bg-white/5 backdrop-blur-xl shadow-xl shadow-violet-500/10 px-6 py-5">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <div className="text-[1.7rem] font-bold text-violet-600 dark:text-violet-400 font-[Sora] leading-none mb-1.5"><AnimatedCounter value={stat.numeric} suffix={stat.suffix} /></div>
                      <p className="text-muted-foreground text-xs font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-slide-in-right mt-6 lg:mt-0" style={{ animationDelay: '0.15s' }}>
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-10 bg-gradient-to-br from-violet-600/30 via-indigo-600/20 to-fuchsia-600/25 rounded-[3rem] blur-3xl pointer-events-none" />
                  <div className="relative p-1.5 rounded-[2.2rem] bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-500 shadow-2xl shadow-violet-500/25">
                    <div className="rounded-[1.8rem] overflow-hidden bg-card">
                      <img
                        src="/kishwor-5-1770795722.jpg"
                        alt="Kishor Upadhyaya - Social Media Expert Nepal"
                        className="w-full aspect-[4/5] object-cover"
                        loading="eager"
                        fetchPriority="high"
                        width="600"
                        height="750"
                      />
                    </div>
                  </div>
                  <div className="animate-floaty absolute top-8 -right-3 sm:-right-8 rounded-2xl border border-white/50 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl px-4 py-3 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"><CheckCircle size={19} /></span>
                    <span>
                      <span className="block text-sm font-bold leading-tight">Account recovered</span>
                      <span className="block text-xs text-muted-foreground">Facebook · in 2 days</span>
                    </span>
                  </div>
                  <div className="animate-floaty-slow absolute bottom-10 -left-3 sm:-left-8 rounded-2xl border border-white/50 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl px-4 py-3 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0"><Youtube size={19} /></span>
                    <span>
                      <span className="block text-sm font-bold leading-tight">50K channel restored</span>
                      <span className="block text-xs text-muted-foreground">Hacked → fully back</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RecoveryTicker />

        {/* ─── FEATURED ON ROUTINE OF NEPAL BANDA ─── */}
        <InstagramFeature />

        {/* ─── PROBLEM REVIEW & CONSULTATION ─── */}
        <section id="consultation" className="py-16 md:py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Problem <span className="text-violet-600 dark:text-violet-400">Review</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Share your issue, explain what happened, and book a 30-minute review session before any recovery work begins.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {[
                {
                  title: '30-Minute Problem Review',
                  price: 'Rs. 2,000',
                  description: 'A focused review session to understand the issue, identify the cause, and explain the best next step.',
                  bullets: ['Issue diagnosis', 'Recovery roadmap', '30-minute consultation'],
                  service: 'problem-review',
                  cta: 'Book consultation',
                  waText: 'Hi Kishor, I want to book a 30-minute problem review and understand my issue before any recovery work begins.',
                },
                {
                  title: 'Account Health Check',
                  price: 'Rs. 3,000',
                  description: 'A professional check to confirm whether your account has a real issue, security risk, restriction, or recovery problem before any paid recovery work begins.',
                  bullets: ['Issue detection', 'Risk review', 'Action recommendation'],
                  service: 'health-check',
                  cta: 'Check my account',
                  waText: 'Hi Kishor, I want to check my account for issues and book an account health review.',
                },
                {
                  title: 'Monetization Review',
                  price: 'Rs. 3,500',
                  description: 'For monetization issues, policy restrictions, and account eligibility review before any setup work begins.',
                  bullets: ['Eligibility check', 'Policy review', 'Fix roadmap'],
                  service: 'monetization-review',
                  cta: 'Review monetization',
                  waText: 'Hi Kishor, I want to review my monetization issue and understand the next step.',
                },
                {
                  title: 'Urgent Case Review',
                  price: 'Custom quote',
                  description: 'Priority review for time-sensitive issues that need immediate attention and a faster action plan.',
                  bullets: ['Priority response', 'Fast diagnosis', 'Urgent action plan'],
                  service: 'urgent-review',
                  cta: 'Request urgent review',
                  waText: 'Hi Kishor, I need an urgent case review for my time-sensitive issue.',
                },
              ].map((plan, idx) => (
                <div key={idx} className="scroll-animate rounded-2xl border border-border bg-card p-5 shadow-sm hover:-translate-y-1 hover:border-violet-500/20 transition-all duration-300 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                    Consultation
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">{plan.price}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{plan.description}</p>

                  <ul className="space-y-2 text-sm mb-5 flex-1">
                    {plan.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-xs text-muted-foreground mb-4">
                    Final recovery or implementation cost is quoted separately after review.
                  </div>

                  <a
                    href={`/booking?service=${plan.service}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-4 py-3 hover:opacity-95 transition-opacity"
                  >
                    {plan.cta} <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MONTHLY SUPPORT PLAN ─── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 p-6 md:p-8 shadow-sm">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                    Monthly Support
                  </span>
                  <h3 className="mt-4 text-3xl md:text-4xl font-bold mb-3">
                    Social Media <span className="text-violet-600 dark:text-violet-400">Security Plan</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Ongoing protection, account monitoring, and quick support to keep your social media profiles secure and healthy.
                  </p>

                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400" /> Monthly account health check</li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400" /> Password and security review</li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400" /> Support for small issues and quick fixes</li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400" /> Recovery guidance when needed</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-sm text-muted-foreground mb-2">Starting from</div>
                  <div className="text-4xl font-extrabold text-violet-600 dark:text-violet-400 mb-2">Rs. 5,000</div>
                  <div className="text-sm text-muted-foreground mb-5">per month</div>

                  <a
                    href="/booking?service=security-plan"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-4 py-3 hover:opacity-95 transition-opacity"
                  >
                    Ask about support <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section id="services" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Services <span className="text-violet-600 dark:text-violet-400">I Offer</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Specialized recovery solutions for every major social media platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Shield, title: 'Account Recovery', desc: 'Recover hacked, locked, or disabled accounts on any social media platform.', time: '24-72 hours', color: 'from-blue-600 to-blue-500', msg: 'Hi Kishor, I need help recovering my account.' },
                { icon: DollarSign, title: 'Monetization Setup', desc: 'Get your Facebook or YouTube account monetized. Eligibility check and full setup.', time: '3-7 days', color: 'from-emerald-600 to-emerald-500', msg: 'Hi Kishor, I need help with monetization.' },
                { icon: Search, title: 'AdSense Integration', desc: 'News AdSense setup, identity verification, PIN/address verification, payment stuck issues. Get your AdSense working.', time: '2-5 days', color: 'from-amber-600 to-amber-500', msg: 'Hi Kishor, I have an AdSense problem.' },
                { icon: Users, title: 'Bank & Payout Issues', desc: 'Fix payout failures, bank integration problems, and payment verification on any platform.', time: '1-3 days', color: 'from-purple-600 to-purple-500', msg: 'Hi Kishor, I have a payout/bank issue.' },
                { icon: Facebook, title: 'Facebook Problems', desc: 'Page verification, business manager issues, ad account problems, and page recovery.', time: '24-48 hours', color: 'from-blue-600 to-blue-400', msg: 'Hi Kishor, I have a Facebook problem.' },
                { icon: Instagram, title: 'Instagram Problems', desc: 'Profile recovery, verification badge, shadowban issues, and creator account setup.', time: '24-48 hours', color: 'from-pink-600 to-purple-500', msg: 'Hi Kishor, I have an Instagram problem.' },
                { icon: Youtube, title: 'YouTube Problems', desc: 'Channel recovery, monetization, copyright strikes, community guidelines, and subscriber issues.', time: '48-96 hours', color: 'from-red-600 to-red-500', msg: 'Hi Kishor, I have a YouTube problem.' },
                { icon: Clock, title: 'Urgent Cases', desc: 'Time-sensitive issues that need immediate attention. Priority handling for emergency cases.', time: 'Same day', color: 'from-orange-600 to-orange-500', msg: 'Hi Kishor, I have an urgent social media problem.' },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="scroll-animate p-6 rounded-2xl bg-card border border-border hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 flex-1">{service.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 font-medium">
                      <Clock size={12} /> {service.time}
                    </div>
                    <a href="/booking" className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline transition-colors">
                      Book →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICE COMPARISON TABLE ─── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                What I <span className="text-violet-600 dark:text-violet-400">Solve</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Quick overview of platforms and problems I handle
              </p>
            </div>

            <div className="scroll-animate max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold text-muted-foreground">Platform</th>
                    <th className="text-center py-3 px-2 font-medium text-muted-foreground">Recovery</th>
                    <th className="text-center py-3 px-2 font-medium text-muted-foreground">Monetization</th>
                    <th className="text-center py-3 px-2 font-medium text-muted-foreground">AdSense</th>
                    <th className="text-center py-3 px-2 font-medium text-muted-foreground">Payout</th>
                    <th className="text-center py-3 px-2 font-medium text-muted-foreground">Verification</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { platform: 'Facebook', recovery: true, monetization: true, adsense: false, payout: false, verification: true },
                    { platform: 'Instagram', recovery: true, monetization: false, adsense: false, payout: true, verification: true },
                    { platform: 'YouTube', recovery: true, monetization: true, adsense: true, payout: true, verification: false },
                    { platform: 'TikTok', recovery: true, monetization: true, adsense: false, payout: true, verification: false },
                    { platform: 'Google AdSense', recovery: false, monetization: false, adsense: true, payout: true, verification: false },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.platform}</td>
                      <td className="text-center py-3 px-2">{row.recovery ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">-</span>}</td>
                      <td className="text-center py-3 px-2">{row.monetization ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">-</span>}</td>
                      <td className="text-center py-3 px-2">{row.adsense ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">-</span>}</td>
                      <td className="text-center py-3 px-2">{row.payout ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">-</span>}</td>
                      <td className="text-center py-3 px-2">{row.verification ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how-it-works" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                How It <span className="text-violet-600 dark:text-violet-400">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                A simple, transparent process to get your account back
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Contact Me', desc: 'Reach out via WhatsApp, email, or the form. Describe your problem and I\'ll respond within 2-4 hours.' },
                { step: '2', title: 'Assessment', desc: 'I analyze your case, assess the best approach, and explain exactly what I can do - with Rs. 2,000 consultation fee upfront.' },
                { step: '3', title: 'Problem Solved', desc: 'I work with platform support to resolve your issue. You only pay the full fee after the problem is fixed.' },
              ].map((item, idx) => (
                <div key={idx} className="scroll-animate text-center" style={{ transitionDelay: `${idx * 120}ms` }}>
                  <div className="w-14 h-14 bg-violet-600 dark:bg-violet-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg shadow-violet-500/20">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROBLEM ASSESSMENT ─── */}
        <section id="assessment" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Free Problem <span className="text-violet-600 dark:text-violet-400">Assessment</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Answer 5 quick questions and get a personalized solution plan
              </p>
            </div>
            <RecoveryAssessment />
          </div>
        </section>

        {/* ─── SOCIAL PROOF (Stats + Testimonials) ─── */}
        <section id="social-proof" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Trusted by <span className="text-violet-600 dark:text-violet-400">Hundreds</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Real results from real people
              </p>
            </div>

            {/* Stats + Testimonials combined */}
            <div className="max-w-4xl mx-auto">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="scroll-animate text-center p-4 rounded-xl bg-card border border-border" style={{ transitionDelay: `${idx * 80}ms` }}>
                    <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400 font-[Sora]"><AnimatedCounter value={stat.numeric} suffix={stat.suffix} /></div>
                    <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="grid md:grid-cols-3 gap-4">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="scroll-animate p-5 rounded-2xl bg-card border border-border flex flex-col" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 text-sm font-bold">{t.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <p className="text-sm font-medium leading-tight">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.platform} • Recovered in {t.time}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{t.text}"</p>
                    <div className="text-yellow-500 text-xs mt-3">★★★★★</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ─── CASE STUDIES ─── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Real <span className="text-violet-600 dark:text-violet-400">Case Studies</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Actual problems solved - here's how
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Facebook Page Hacked & Deleted',
                  client: 'Small business owner, Kathmandu',
                  problem: 'Hacker deleted 3-year-old business page with 50K followers. Facebook support was unresponsive.',
                  solution: 'Filed appeal through Meta Business Suite, provided identity verification documents, coordinated with Meta support via business partner channels.',
                  result: 'Page fully recovered within 48 hours. All content and followers restored.',
                  icon: Shield,
                  color: 'from-blue-600 to-blue-500',
                },
                {
                  title: 'YouTube Monetization Rejected',
                  client: 'Travel vlogger, Pokhara',
                  problem: 'Channel met all criteria but was repeatedly rejected for "reused content" policy violation.',
                  solution: 'Audited all videos, identified problematic segments, created unique content strategy, resubmitted with detailed documentation.',
                  result: 'Monetization approved within 5 days. Channel earning consistently.',
                  icon: Youtube,
                  color: 'from-red-600 to-red-500',
                },
                {
                  title: 'AdSense PIN & Identity Verification',
                  client: 'News website owner, Lalitpur',
                  problem: 'AdSense PIN never arrived after multiple requests. Identity verification kept failing despite correct documents.',
                  solution: 'Resubmitted PIN verification through alternative method, fixed address format issues, coordinated with AdSense support for manual identity review.',
                  result: 'PIN verified, identity confirmed. AdSense payments now processing monthly.',
                  icon: Search,
                  color: 'from-amber-600 to-amber-500',
                },
                {
                  title: 'Instagram Verification Badge',
                  client: 'Fitness influencer, Chitwan',
                  problem: 'Had 200K+ followers but couldn\'t get verified. Multiple rejections despite meeting criteria.',
                  solution: 'Optimized profile for verification, built media presence documentation, created press coverage, submitted strategic application.',
                  result: 'Blue badge obtained. Profile credibility and brand deals increased.',
                  icon: Instagram,
                  color: 'from-pink-600 to-purple-500',
                },
                {
                  title: 'Payout Failed - 3 Months Stuck',
                  client: 'Content creator, Butwal',
                  problem: 'Facebook creator payouts failing for 3 months. $2,400 stuck. Bank details were correct but payouts kept failing.',
                  solution: 'Identified mismatch between Facebook payout settings and bank\'s IBAN format. Coordinated with both Facebook and bank.',
                  result: 'All pending payouts released. Monthly payouts now working smoothly.',
                  icon: DollarSign,
                  color: 'from-emerald-600 to-emerald-500',
                },
                {
                  title: 'Instagram Account Disabled',
                  client: 'E-commerce store owner, Biratnagar',
                  problem: 'Instagram business account disabled for "community guidelines violation" - no reason given.',
                  solution: 'Reviewed account for policy issues, identified false-positive flag, submitted structured appeal with business documentation.',
                  result: 'Account restored within 72 hours. Implemented prevention measures.',
                  icon: Shield,
                  color: 'from-purple-600 to-purple-500',
                },
              ].map((study, idx) => (
                <div
                  key={idx}
                  className="scroll-animate rounded-2xl bg-card border border-border p-6 hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${study.color} flex items-center justify-center shrink-0`}>
                      <study.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base leading-tight">{study.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{study.client}</p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-red-500 mb-1">Problem</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-indigo-500 mb-1">Solution</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-500 mb-1">Result</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.result}</p>
                    </div>
                  </div>

                  <a
                    href="/booking"
                    className="mt-4 text-center text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    I have a similar problem →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CERTIFICATIONS ─── */}
        <section id="certifications" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Certifications <span className="text-violet-600 dark:text-violet-400">& Qualifications</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Verified expertise in cybersecurity and social media platforms
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { name: 'Foundations of Cybersecurity', org: 'Google', year: 'Jun 2024', id: '784R2PJL6ZFK', url: 'https://www.coursera.org/account/accomplishments/verify/784R2PJL6ZFK', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                { name: 'Play It Safe: Manage Security Risks', org: 'Google', year: 'Jun 2024', id: 'L5EL2KMZY2CM', url: 'https://www.coursera.org/account/accomplishments/verify/L5EL2KMZY2CM', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                { name: 'Network Security', org: 'Cisco Learning and Certifications', year: 'May 2026', id: 'O0MYBRD8X1KB', url: 'https://www.coursera.org/account/accomplishments/verify/O0MYBRD8X1KB', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="scroll-animate p-5 rounded-2xl bg-card border border-border hover:border-violet-500/20 transition-all duration-300"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <img src={cert.logo} alt={`${cert.org} logo`} className="w-10 h-10 object-contain flex-shrink-0 mt-0.5" loading="lazy" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm mb-0.5 leading-snug">{cert.name}</h3>
                      <p className="text-muted-foreground text-xs">{cert.org}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{cert.year}</span>
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-violet-600 dark:text-violet-400 bg-violet-500/8 px-2 py-0.5 rounded hover:bg-violet-500/15 transition-colors"
                        >
                          Verify ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TRUST BADGES ─── */}
        <section className="py-12 border-y border-border bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 scroll-animate">
              {[
                { icon: '🔒', label: '100% Confidential' },
                { icon: '⚡', label: '24h Response' },
                { icon: '✅', label: 'Verified Expert' },
                { icon: '🏆', label: `${getYearsExperienceText()} Years Experience` },
                { icon: '💰', label: 'Pay After Fix' },
                { icon: '🛡️', label: 'Secure Process' },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <span className="text-lg">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GUARANTEES ─── */}
        <section id="guarantees" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                My <span className="text-violet-600 dark:text-violet-400">Guarantee</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Your satisfaction and security are my top priorities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              {[
                { icon: DollarSign, title: 'Rs. 2,000 Consultation', desc: 'Initial investigation and assessment fee. Covers full case analysis and recovery plan.', color: 'from-violet-500 to-violet-400' },
                { icon: Clock, title: 'Fast Response', desc: 'I respond to all inquiries within 2-4 hours. Emergency cases get priority handling.', color: 'from-emerald-500 to-emerald-400' },
                { icon: Lock, title: 'Confidential', desc: 'Your information is kept strictly confidential and encrypted. Data deleted after resolution.', color: 'from-indigo-500 to-violet-400' },
                { icon: CheckCircle, title: 'Pay After Fix', desc: 'Rs. 2,000 upfront investigation. Remaining service fee only after your problem is resolved. No hidden charges.', color: 'from-amber-500 to-amber-400' },
              ].map((item, idx) => (
                <div key={idx} className="scroll-animate p-5 rounded-2xl bg-card border border-border text-center" style={{ transitionDelay: `${idx * 80}ms` }}>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Refund Details */}
            <div className="scroll-animate max-w-2xl mx-auto p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-bold text-lg mb-4">Pricing Breakdown</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-bold text-violet-600 dark:text-violet-400">Consultation</span>
                  <p className="text-muted-foreground mt-1">Rs. 2,000 - covers investigation and assessment</p>
                </div>
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Service Fee</span>
                  <p className="text-muted-foreground mt-1">Varies by case - explained before starting</p>
                </div>
                <div>
                  <span className="font-bold text-muted-foreground">Payment</span>
                  <p className="text-muted-foreground mt-1">Rs. 2,000 upfront, rest after fix</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── USER FEEDBACK ─── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Quick <span className="text-violet-600 dark:text-violet-400">Feedback</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Help me improve - your feedback matters
              </p>
            </div>

            <div className="scroll-animate max-w-xl mx-auto space-y-4">
              {[
                { q: 'How was your experience?', emoji: '😊', options: ['Excellent', 'Good', 'Okay', 'Needs improvement'] },
                { q: 'Was your problem solved?', emoji: '✅', options: ['Yes, fully', 'Partially', 'Not yet', 'Still working on it'] },
                { q: 'Would you recommend me?', emoji: '🤝', options: ['Definitely yes', 'Probably yes', 'Not sure', 'Probably not'] },
              ].map((fb, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-sm font-semibold mb-3">{fb.emoji} {fb.q}</p>
                  <div className="flex flex-wrap gap-2">
                    {fb.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          const waMsg = `Feedback - ${fb.q}: ${opt}`;
                          window.open(`https://wa.me/9779843818304?text=${encodeURIComponent(waMsg)}`, '_blank');
                        }}
                        className="px-3 py-1.5 text-xs rounded-lg border border-border hover:border-violet-500/30 hover:bg-violet-50 dark:hover:bg-violet-900/20 text-muted-foreground hover:text-foreground transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <p className="text-center text-xs text-muted-foreground mt-4">
                Feedback is sent directly to WhatsApp. No data is stored.
              </p>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Frequently Asked <span className="text-violet-600 dark:text-violet-400">Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Quick answers to common questions
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="scroll-animate rounded-xl bg-card border border-border overflow-hidden" style={{ transitionDelay: `${idx * 60}ms` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-sm pr-4">{faq.q}</span>
                    <span className="text-muted-foreground text-lg flex-shrink-0 transition-transform duration-200" style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 border-t border-border">
                      <p className="text-muted-foreground text-sm leading-relaxed pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BLOG PREVIEW ─── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Free <span className="text-violet-600 dark:text-violet-400">Resources</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Learn how to protect and manage your social media accounts
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { title: 'How to Recognize Phishing Attacks', desc: 'Learn to identify common phishing tactics and protect your accounts.', icon: '🎣', readTime: '3 min', href: '/resources' },
                { title: 'Facebook Account Recovery Guide', desc: 'Step-by-step guide to recover your hacked Facebook account.', icon: '📘', readTime: '5 min', href: '/resources' },
                { title: 'Instagram Security Best Practices', desc: 'Essential security tips to keep your Instagram account safe.', icon: '📸', readTime: '4 min', href: '/resources' },
              ].map((post, idx) => (
                <a
                  key={idx}
                  href={post.href}
                  className="scroll-animate p-5 rounded-2xl bg-card border border-border hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 group"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="text-3xl mb-3">{post.icon}</div>
                  <h3 className="font-bold text-sm mb-1.5 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">{post.desc}</p>
                  <span className="text-[10px] font-medium text-muted-foreground">{post.readTime} read →</span>
                </a>
              ))}
            </div>

            <div className="text-center mt-8 scroll-animate">
              <a href="/resources" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all duration-300">
                View All Resources <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ─── START FREE ─── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="scroll-animate text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Start <span className="text-emerald-600 dark:text-emerald-400">Free</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Help yourself first - these are free forever. If you need me personally on your case, that&apos;s what the reviews below are for.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { icon: KeyRound, title: 'Free Password Tools', desc: 'Check your password strength against 800M+ breached passwords, or generate a strong one.', href: '/tools' },
                { icon: Siren, title: 'Hacked Right Now?', desc: 'Just got hacked? Do these 5 emergency steps immediately - before it gets worse.', href: '/emergency' },
                { icon: BookOpen, title: 'Recovery Guides', desc: 'Step-by-step guides for Facebook, Instagram, YouTube and TikTok problems.', href: '/resources' },
              ].map(c => (
                <a key={c.title} href={c.href} className="scroll-animate group rounded-2xl bg-card border border-border p-6 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <c.icon size={20} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-1.5">{c.title} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="scroll-animate text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Services & <span className="text-violet-600 dark:text-violet-400">Pricing</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Pick what fits your situation. Clear pricing, paid in advance - no surprises.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {[
                { key: 'problem-review', name: '30-Minute Problem Review', price: 'Rs. 2,000', desc: 'One specific problem. Honest diagnosis and clear next steps.', tag: null },
                { key: 'health-check', name: 'Account Health Check', price: 'Rs. 3,000', desc: 'Full audit of your accounts, pages and security - before something breaks.', tag: null },
                { key: 'monetization-review', name: 'Monetization Review', price: 'Rs. 3,500', desc: 'Monetization rejections, payout issues and AdSense problems.', tag: null },
                { key: 'urgent-review', name: 'Urgent Case Review', price: 'Rs. 2,000', desc: 'Hacked right now and need help today. Priority handling.', tag: 'URGENT', adv: true },
                { key: 'security-plan', name: 'Monthly Security Plan', price: 'Rs. 2,000', desc: 'Ongoing protection for your accounts, month after month.', tag: null, adv: true },
                { key: 'tools', name: 'Free Password Tools', price: 'Free', desc: 'Check your password strength and generate unhackable passwords.', tag: 'FREE', free: true },
              ].map(s => (
                <div key={s.key} className="scroll-animate relative rounded-2xl bg-card border border-border p-6 flex flex-col hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
                  {s.tag && (
                    <span className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${s.tag === 'FREE' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>{s.tag}</span>
                  )}
                  <h3 className="font-bold text-lg mb-1">{s.name}</h3>
                  <p className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-1">{s.price}{s.adv && <span className="text-sm font-medium text-muted-foreground"> advance</span>}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <a href={s.free ? '/tools' : `/booking?service=${s.key}`}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${s.free ? 'border border-border hover:bg-muted' : 'btn-gradient'}`}>
                    {s.free ? 'Use free tools' : 'Book now'} <ArrowRight size={15} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DIGITAL PRODUCT PROMO ─── */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <a href="/checklist" className="scroll-animate block max-w-4xl mx-auto rounded-3xl overflow-hidden border border-violet-500/25 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300">
              <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <FileCheck size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-200 mb-1">New · Digital download</p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-1">Social Media Security Checklist</h3>
                  <p className="text-violet-100 text-sm">20 steps to lock your accounts before hackers lock you out - the same steps I give my paid clients.</p>
                </div>
                <div className="shrink-0 text-left md:text-right">
                  <p className="text-3xl font-bold">Rs. 499</p>
                  <p className="text-violet-200 text-xs line-through mb-2">Rs. 999</p>
                  <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-violet-700 text-sm font-bold">
                    Get the PDF <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="scroll-animate text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Book a <span className="text-violet-600 dark:text-violet-400">Problem Review</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                All reviews are booked and paid in advance - pick a time, pay via eSewa/Khalti, and we talk. No waiting, no back-and-forth.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-5 rounded-2xl bg-card border border-border">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Contact Info</h3>
                  <div className="space-y-3">
                    <a href="tel:+9779843818304" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                        <Phone size={18} className="text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Call / WhatsApp</p>
                        <p className="font-semibold text-sm">+977 9843818304</p>
                      </div>
                    </a>
                    <a href="mailto:kishorupadhyaya222@gmail.com" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                        <Mail size={18} className="text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-semibold text-sm truncate">kishorupadhyaya222@gmail.com</p>
                      </div>
                    </a>
                    <a href="/booking" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                        <CalendarCheck size={18} className="text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Booking</p>
                        <p className="font-semibold text-sm">Book a paid review</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10">
                  <p className="text-xs text-muted-foreground text-center">
                    <span className="font-semibold text-foreground">Available:</span> 7am - 10pm NPT, Sunday - Friday
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="p-8 rounded-2xl bg-card border border-border text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                    <CalendarCheck size={26} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Skip the form - book directly</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-md mx-auto">
                    The free tools and guides on this page are yours to use anytime. If you want me personally on your case, book a review: you get my full focused time, and a straight answer.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {['Rs. 2,000 review', 'Rs. 3,000 health check', 'Rs. 3,500 monetization'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-700 dark:text-violet-300">{tag}</span>
                    ))}
                  </div>
                  <a href="/booking" className="btn-gradient inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base">
                    Book a Review <ArrowRight size={16} />
                  </a>
                  <p className="text-xs text-muted-foreground mt-4">Pay via eSewa/Khalti · slot locked after payment verification</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="font-bold mb-2 font-[Sora] text-violet-600 dark:text-violet-400">Kishor</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">Expert in solving all social media problems - account recovery, monetization, AdSense, payouts, verification, and more.</p>
              <div className="flex items-center gap-2">
                <a href="https://www.facebook.com/kishorupp" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-muted hover:bg-violet-500/10 flex items-center justify-center text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <Facebook size={15} />
                </a>
                <a href="https://www.instagram.com/kishorupp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-muted hover:bg-violet-500/10 flex items-center justify-center text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <Instagram size={15} />
                </a>
                <a href="https://www.linkedin.com/in/kishorupadhyaya/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-muted hover:bg-violet-500/10 flex items-center justify-center text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
                <li><a href="/services" className="hover:text-foreground transition-colors">Services</a></li>
                <li><a href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="/emergency" className="text-red-500 hover:text-red-400 transition-colors font-medium">Hacked right now?</a></li>
                <li><a href="/tools" className="hover:text-foreground transition-colors">Free password tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm">Services</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="/services" className="hover:text-foreground transition-colors">Account Recovery</a></li>
                <li><a href="/services" className="hover:text-foreground transition-colors">Monetization Setup</a></li>
                <li><a href="/services" className="hover:text-foreground transition-colors">AdSense Integration</a></li>
                <li><a href="/services" className="hover:text-foreground transition-colors">Payout & Bank Issues</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="/assessment" className="hover:text-foreground transition-colors">Free Assessment</a></li>
                <li><a href="/resources" className="hover:text-foreground transition-colors">Resources</a></li>
                <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm">Contact</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>+977 9843818304</li>
                <li>kishorupadhyaya222@gmail.com</li>
                <li>Available: 7am-10pm NPT</li>
              </ul>
              <a
                href="https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20want%20to%20check%20my%20case%20status"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-lg text-xs font-semibold transition-colors"
              >
                <MessageCircle size={12} /> Track My Case
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-5 text-center text-xs text-muted-foreground">
            &copy; 2026 Kishor Upadhyaya. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ─── LIVE CHAT WIDGET ─── */}
      <LiveChat />

      {/* ─── FLOATING WHATSAPP BUTTON ─── */}
      <a
        href="/booking"
        aria-label="Book a review"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-110 hidden lg:flex"
      >
        <CalendarCheck size={26} />
      </a>

      {/* ─── STICKY MOBILE CONTACT BAR ─── */}
      {hasScrolled && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border px-4 py-3 flex items-center gap-3 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Need account recovery?</p>
            <p className="text-[10px] text-muted-foreground">Response within 24 hours</p>
          </div>
          <a
            href="tel:+9779843818304"
            className="flex-shrink-0 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-border text-foreground text-xs font-semibold hover:bg-muted transition-colors"
          >
            <Phone size={13} /> Call
          </a>
          <a
            href="/booking"
            className="flex-shrink-0 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold transition-colors"
          >
            <CalendarCheck size={13} /> Book
          </a>
        </div>
      )}

      {/* ─── BACK TO TOP ─── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-muted transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground">
            <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}


    </div>
  );
}
