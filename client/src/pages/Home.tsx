import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import RecoveryAssessment from '@/components/RecoveryAssessment';
import LiveChat from '@/components/LiveChat';
import { trpc } from '@/lib/trpc';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLang } from '@/contexts/LangContext';
import { Phone, Mail, MessageCircle, ArrowRight, Shield, Facebook, Instagram, Youtube, Users, Search, CheckCircle, Clock, Lock, DollarSign, Award, ExternalLink } from 'lucide-react';

export default function Home() {
  useScrollAnimation();
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', platform: '' as 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'adsense' | 'other' | '', message: '', source: '' as 'google' | 'whatsapp' | 'referral' | 'social-media' | 'other' | '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const allTestimonials = useMemo(() => [
    { name: 'Aarav Sharma', text: 'My Facebook account was hacked last month. Kishor recovered it within 2 days. Very professional work, kept me updated the whole time.', platform: 'Facebook', time: '2 days' },
    { name: 'Srijana Thapa', text: 'I thought my Instagram was gone forever. Kishor recovered it and also helped me set up two-factor authentication so it doesn\'t happen again.', platform: 'Instagram', time: '3 days' },
    { name: 'Bikash Gurung', text: 'My YouTube channel with 50K subscribers got hacked. Kishor restored everything — channel, videos, even my monetization. Really grateful.', platform: 'YouTube', time: '4 days' },
    { name: 'Pratikshya Karki', text: 'My Facebook page with 100K followers was disabled. Kishor got it back in 3 days. He knows exactly how to deal with Meta support.', platform: 'Facebook', time: '3 days' },
    { name: 'Roshan Thapa', text: 'Instagram monetization was rejected 5 times. Kishor figured out the issue and got it approved within a week. Highly recommend!', platform: 'Instagram', time: '5 days' },
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
    { name: 'Ashmita Thapa', text: 'AdSense account was disabled for invalid traffic. Kishor analyzed everything, fixed the issues, and got it reinstated.', platform: 'AdSense', time: '1 week' },
  ], []);

  const [testimonials] = useState(() => {
    const shuffled = [...allTestimonials].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  // Exit intent detection (desktop mouse leave)
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !showExitPopup && !sessionStorage.getItem('exitPopupShown')) {
      setShowExitPopup(true);
      sessionStorage.setItem('exitPopupShown', 'true');
    }
  }, [showExitPopup]);

  // Mobile inactivity detection (no interaction for 45 seconds)
  useEffect(() => {
    if (showExitPopup || sessionStorage.getItem('exitPopupShown')) return;
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowExitPopup(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }, 45000);
    };
    resetTimer();
    window.addEventListener('scroll', resetTimer, { passive: true });
    window.addEventListener('touchstart', resetTimer, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [showExitPopup]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  // Scroll detection for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => { setSubmitStatus('success'); setFormData({ name: '', email: '', phone: '', platform: '', message: '', source: '' }); setTimeout(() => setSubmitStatus('idle'), 5000); },
    onError: () => { setSubmitStatus('error'); setTimeout(() => setSubmitStatus('idle'), 5000); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    contactMutation.mutate({ ...formData, platform: formData.platform || 'other' }, { onSettled: () => setIsSubmitting(false) });
  };

  const wa = (msg: string) => `https://wa.me/9779843818304?text=${encodeURIComponent(msg)}`;

  const faqs = [
    { q: 'How long does account recovery take?', a: 'Most recoveries are completed within 24-72 hours. Complex cases may take up to a week. I keep you updated throughout the process.' },
    { q: 'What information do you need from me?', a: 'I need your account details, the nature of the hack, any recovery emails or phone numbers on file, and proof of identity. I\'ll guide you through everything.' },
    { q: 'Is my personal information safe?', a: 'Absolutely. I use strict security protocols and never share your information with third parties. All data is deleted after recovery.' },
    { q: 'What if my account cannot be recovered?', a: 'The Rs. 2,000 consultation fee covers investigation and assessment. If I cannot solve your problem, you don\'t pay the remaining service fee.' },
    { q: 'Do you only handle hacking cases?', a: 'I handle all social media issues including hacked accounts, locked accounts, suspended accounts, disabled accounts, and forgotten credentials.' },
    { q: 'How do I pay?', a: 'Rs. 2,000 consultation fee upfront (covers investigation and assessment). The remaining service fee is charged only after your problem is resolved. I accept bank transfer, eSewa, and Khalti.' },
  ];

  const stats = [
    { value: '500+', label: 'Cases Solved' },
    { value: '98%', label: 'Success Rate' },
    { value: '7+', label: 'Years Experience' },
    { value: '24h', label: 'Avg. Response Time' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md">
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">

        {/* ─── HERO ─── */}
        <section id="hero" className="relative min-h-[85vh] flex items-center pt-20 pb-12 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-block mb-5 px-4 py-1.5 bg-cyan-500/8 border border-cyan-500/15 rounded-full">
                  <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium">{t('Social Media Expert', 'सोसल मिडिया विशेषज्ञ')}</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold mb-5 leading-[1.08] tracking-tight">
                  Kishor Upadhyaya
                </h1>

                <p className="text-xl lg:text-2xl text-muted-foreground mb-3 font-semibold font-[Sora]">
                  {t('All-in-One Social Media Solutions', 'सबै सोसल मिडिया समाधान')}
                </p>

                <p className="text-lg text-muted-foreground/80 mb-4 leading-relaxed max-w-xl">
                  {t(
                    'From account recovery to monetization, AdSense, payouts, and every social media problem — I handle it all. 7+ years of experience across every major platform.',
                    'खाता रिकभरीदेखि मोनेटाइजेसन, AdSense, पेमेन्ट, र हरेक सोसल मिडिया समस्या — म सबै सम्भाल्छु। प्रत्येक प्रमुख प्लेटफर्ममा ७+ वर्षको अनुभव।'
                  )}
                </p>

                <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1.5"><span className="text-cyan-600 dark:text-cyan-400 font-bold">500+</span> cases solved</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5"><span className="text-cyan-600 dark:text-cyan-400 font-bold">98%</span> success rate</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5"><span className="text-cyan-600 dark:text-cyan-400 font-bold">24h</span> response</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {stats.map((stat, i) => (
                    <div key={i} className="scroll-animate text-center sm:text-left" style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 font-[Sora]">{stat.value}</div>
                      <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={wa('Hi Kishor, I need help with a social media problem.')} className="btn-gradient inline-flex items-center justify-center gap-2 text-lg">
                    Get Help Now <ArrowRight size={20} />
                  </a>
                  <a href="#how-it-works" className="px-8 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all duration-300 text-center">
                    How It Works
                  </a>
                </div>
              </div>

              <div className="animate-slide-in-right hidden lg:block" style={{ animationDelay: '0.2s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-3xl blur-[60px]" />
                  <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl shadow-cyan-500/5">
                    <img
                      src="/manus-storage/kishor-profile_3d68c9be.png"
                      alt="Kishor Upadhyaya - Account Recovery Specialist"
                      className="w-full aspect-square object-cover"
                      loading="eager"
                      fetchPriority="high"
                      width="600"
                      height="600"
                    />
                  </div>
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
                Services <span className="text-cyan-600 dark:text-cyan-400">I Offer</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Specialized recovery solutions for every major social media platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Shield, title: 'Account Recovery', desc: 'Recover hacked, locked, or disabled accounts on any social media platform.', time: '24-72 hours', color: 'from-blue-600 to-blue-500', msg: 'Hi Kishor, I need help recovering my account.' },
                { icon: DollarSign, title: 'Monetization Setup', desc: 'Get your Facebook, Instagram, or YouTube account monetized. Eligibility check and full setup.', time: '3-7 days', color: 'from-emerald-600 to-emerald-500', msg: 'Hi Kishor, I need help with monetization.' },
                { icon: Search, title: 'AdSense Integration', desc: 'Link AdSense to your YouTube channel or website. Fix AdSense disapproval and policy issues.', time: '2-5 days', color: 'from-amber-600 to-amber-500', msg: 'Hi Kishor, I have an AdSense problem.' },
                { icon: Users, title: 'Bank & Payout Issues', desc: 'Fix payout failures, bank integration problems, and payment verification on any platform.', time: '1-3 days', color: 'from-purple-600 to-purple-500', msg: 'Hi Kishor, I have a payout/bank issue.' },
                { icon: Facebook, title: 'Facebook Problems', desc: 'Page verification, business manager issues, ad account problems, and page recovery.', time: '24-48 hours', color: 'from-blue-600 to-blue-400', msg: 'Hi Kishor, I have a Facebook problem.' },
                { icon: Instagram, title: 'Instagram Problems', desc: 'Profile recovery, verification badge, shadowban issues, and creator account setup.', time: '24-48 hours', color: 'from-pink-600 to-purple-500', msg: 'Hi Kishor, I have an Instagram problem.' },
                { icon: Youtube, title: 'YouTube Problems', desc: 'Channel recovery, monetization, copyright strikes, community guidelines, and subscriber issues.', time: '48-96 hours', color: 'from-red-600 to-red-500', msg: 'Hi Kishor, I have a YouTube problem.' },
                { icon: Clock, title: 'Urgent Cases', desc: 'Time-sensitive issues that need immediate attention. Priority handling for emergency cases.', time: 'Same day', color: 'from-orange-600 to-orange-500', msg: 'Hi Kishor, I have an urgent social media problem.' },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="scroll-animate p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 flex-1">{service.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                      <Clock size={12} /> {service.time}
                    </div>
                    <a href={wa(service.msg)} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#25D366] hover:text-[#20BD5A] transition-colors">
                      Chat →
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
                What I <span className="text-cyan-600 dark:text-cyan-400">Solve</span>
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
                    { platform: 'Instagram', recovery: true, monetization: true, adsense: false, payout: true, verification: true },
                    { platform: 'YouTube', recovery: true, monetization: true, adsense: true, payout: true, verification: false },
                    { platform: 'TikTok', recovery: true, monetization: true, adsense: false, payout: true, verification: false },
                    { platform: 'Google AdSense', recovery: false, monetization: false, adsense: true, payout: true, verification: false },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.platform}</td>
                      <td className="text-center py-3 px-2">{row.recovery ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">—</span>}</td>
                      <td className="text-center py-3 px-2">{row.monetization ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">—</span>}</td>
                      <td className="text-center py-3 px-2">{row.adsense ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">—</span>}</td>
                      <td className="text-center py-3 px-2">{row.payout ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">—</span>}</td>
                      <td className="text-center py-3 px-2">{row.verification ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground/40">—</span>}</td>
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
                How It <span className="text-cyan-600 dark:text-cyan-400">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                A simple, transparent process to get your account back
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Contact Me', desc: 'Reach out via WhatsApp, email, or the form. Describe your problem and I\'ll respond within 2-4 hours.' },
                { step: '2', title: 'Assessment', desc: 'I analyze your case, assess the best approach, and explain exactly what I can do — with Rs. 2,000 consultation fee upfront.' },
                { step: '3', title: 'Problem Solved', desc: 'I work with platform support to resolve your issue. You only pay the full fee after the problem is fixed.' },
              ].map((item, idx) => (
                <div key={idx} className="scroll-animate text-center" style={{ transitionDelay: `${idx * 120}ms` }}>
                  <div className="w-14 h-14 bg-cyan-600 dark:bg-cyan-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SOCIAL PROOF (Stats + Testimonials) ─── */}
        <section id="social-proof" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Trusted by <span className="text-cyan-600 dark:text-cyan-400">Hundreds</span>
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
                    <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 font-[Sora]">{stat.value}</div>
                    <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="grid md:grid-cols-3 gap-4">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="scroll-animate p-5 rounded-2xl bg-card border border-border flex flex-col" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-sm font-bold">{t.name.split(' ').map(n => n[0]).join('')}</div>
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
                Real <span className="text-cyan-600 dark:text-cyan-400">Case Studies</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Actual problems solved — here's how
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
                  title: 'Payout Failed — 3 Months Stuck',
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
                  problem: 'Instagram business account disabled for "community guidelines violation" — no reason given.',
                  solution: 'Reviewed account for policy issues, identified false-positive flag, submitted structured appeal with business documentation.',
                  result: 'Account restored within 72 hours. Implemented prevention measures.',
                  icon: Shield,
                  color: 'from-purple-600 to-purple-500',
                },
              ].map((study, idx) => (
                <div
                  key={idx}
                  className="scroll-animate rounded-2xl bg-card border border-border p-6 hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
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
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-blue-500 mb-1">Solution</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-500 mb-1">Result</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.result}</p>
                    </div>
                  </div>

                  <a
                    href={wa(`Hi Kishor, I have a similar problem: ${study.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-center text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
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
                Certifications <span className="text-cyan-600 dark:text-cyan-400">& Qualifications</span>
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
                  className="scroll-animate p-5 rounded-2xl bg-card border border-border hover:border-cyan-500/20 transition-all duration-300"
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
                          className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/8 px-2 py-0.5 rounded hover:bg-cyan-500/15 transition-colors"
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

        {/* ─── GUARANTEES ─── */}
        <section id="guarantees" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                My <span className="text-cyan-600 dark:text-cyan-400">Guarantee</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Your satisfaction and security are my top priorities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              {[
                { icon: DollarSign, title: 'Rs. 2,000 Consultation', desc: 'Initial investigation and assessment fee. Covers full case analysis and recovery plan.', color: 'from-cyan-500 to-cyan-400' },
                { icon: Clock, title: 'Fast Response', desc: 'I respond to all inquiries within 2-4 hours. Emergency cases get priority handling.', color: 'from-emerald-500 to-emerald-400' },
                { icon: Lock, title: 'Confidential', desc: 'Your information is kept strictly confidential and encrypted. Data deleted after resolution.', color: 'from-blue-500 to-blue-400' },
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
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">Consultation</span>
                  <p className="text-muted-foreground mt-1">Rs. 2,000 — covers investigation and assessment</p>
                </div>
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Service Fee</span>
                  <p className="text-muted-foreground mt-1">Varies by case — explained before starting</p>
                </div>
                <div>
                  <span className="font-bold text-muted-foreground">Payment</span>
                  <p className="text-muted-foreground mt-1">Rs. 2,000 upfront, rest after fix</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROBLEM ASSESSMENT ─── */}
        <section id="assessment" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Free Problem <span className="text-cyan-600 dark:text-cyan-400">Assessment</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Answer 5 quick questions and get a personalized solution plan
              </p>
            </div>
            <RecoveryAssessment />
          </div>
        </section>

        {/* ─── USER FEEDBACK ─── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Quick <span className="text-cyan-600 dark:text-cyan-400">Feedback</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Help me improve — your feedback matters
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
                          const waMsg = `Feedback — ${fb.q}: ${opt}`;
                          window.open(`https://wa.me/9779843818304?text=${encodeURIComponent(waMsg)}`, '_blank');
                        }}
                        className="px-3 py-1.5 text-xs rounded-lg border border-border hover:border-cyan-500/30 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 text-muted-foreground hover:text-foreground transition-all"
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
                Frequently Asked <span className="text-cyan-600 dark:text-cyan-400">Questions</span>
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

        {/* ─── CONTACT ─── */}
        <section id="contact" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="scroll-animate text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Get In <span className="text-cyan-600 dark:text-cyan-400">Touch</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Ready to recover your account? Reach out and I'll respond within 2-4 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-3">
                <a href="tel:+9779843818304" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-cyan-500/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors">
                    <Phone size={18} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Call Me</h3>
                    <p className="text-muted-foreground text-sm">+977 9843818304</p>
                  </div>
                </a>
                <a href="mailto:kishorupadhyaya222@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-cyan-500/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors">
                    <Mail size={18} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Email Me</h3>
                    <p className="text-muted-foreground text-sm">kishorupadhyaya222@gmail.com</p>
                  </div>
                </a>
                <a href="https://wa.me/9779843818304" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-cyan-500/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors">
                    <MessageCircle size={18} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">Chat directly (7am-10pm NPT)</p>
                  </div>
                </a>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-card border border-border space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">Name *</label>
                      <Input id="contact-name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">Email *</label>
                      <Input id="contact-email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5">Phone *</label>
                      <Input id="contact-phone" type="tel" placeholder="+977 9843818304" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                    </div>
                    <div>
                      <label htmlFor="contact-platform" className="block text-sm font-medium mb-1.5">Platform *</label>
                      <Select value={formData.platform} onValueChange={(value: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'adsense' | 'other') => setFormData({...formData, platform: value})}>
                        <SelectTrigger id="contact-platform" aria-label="Select platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="adsense">Google AdSense</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">Describe Your Issue *</label>
                    <Textarea id="contact-message" placeholder="Tell me about your account issue..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} required />
                  </div>
                  <div>
                    <label htmlFor="contact-source" className="block text-sm font-medium mb-1.5">How did you hear about me?</label>
                    <Select value={formData.source} onValueChange={(value: 'google' | 'whatsapp' | 'referral' | 'social-media' | 'other') => setFormData({...formData, source: value})}>
                      <SelectTrigger id="contact-source" aria-label="How did you hear about me">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp Group</SelectItem>
                        <SelectItem value="referral">Friend / Referral</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-600 dark:text-emerald-400 text-sm">
                      Thank you! Your request has been submitted. I will contact you within 2-4 hours.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
                      Something went wrong. Please try again or contact me via WhatsApp.
                    </div>
                  )}

                  <Button type="submit" className="w-full btn-gradient" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Send Message'}
                    {!isSubmitting && <ArrowRight className="ml-2" size={16} />}
                  </Button>
                </form>
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
              <h3 className="font-bold mb-2 font-[Sora] text-cyan-600 dark:text-cyan-400">Kishor</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">Expert in solving all social media problems — account recovery, monetization, AdSense, payouts, verification, and more.</p>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com/kishorupadhyaya" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-muted hover:bg-cyan-500/10 flex items-center justify-center text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <Facebook size={15} />
                </a>
                <a href="https://instagram.com/kishorupadhyaya" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-muted hover:bg-cyan-500/10 flex items-center justify-center text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <Instagram size={15} />
                </a>
                <a href="https://linkedin.com/in/kishorupadhyaya" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-muted hover:bg-cyan-500/10 flex items-center justify-center text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="#hero" className="hover:text-foreground transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-foreground transition-colors">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm">Services</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-foreground transition-colors">Account Recovery</a></li>
                <li><a href="#services" className="hover:text-foreground transition-colors">Monetization Setup</a></li>
                <li><a href="#services" className="hover:text-foreground transition-colors">AdSense Integration</a></li>
                <li><a href="#services" className="hover:text-foreground transition-colors">Payout & Bank Issues</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm">Contact</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>+977 9843818304</li>
                <li>kishorupadhyaya222@gmail.com</li>
                <li>Available: 7am-10pm NPT</li>
              </ul>
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
        href="https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20need%20help%20recovering%20my%20account"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 hidden lg:flex"
      >
        <MessageCircle size={26} />
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
            href="https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20need%20help%20recovering%20my%20account"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      )}

      {/* ─── EXIT INTENT POPUP ─── */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className="bg-background border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors text-xl leading-none"
              aria-label="Close popup"
            >
              ×
            </button>
            <div className="text-center">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={28} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-[Sora]">Need Help Recovering Your Account?</h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                Don't wait — the sooner you act, the better the chances of recovery. Message me on WhatsApp for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20need%20help%20recovering%20my%20account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
                <button
                  onClick={() => setShowExitPopup(false)}
                  className="flex-1 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
