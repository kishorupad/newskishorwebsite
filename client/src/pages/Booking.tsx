import { useState, useMemo } from 'react';
import { useSearch } from 'wouter';
import {
  Facebook, Instagram, Youtube, Music2, DollarSign, MoreHorizontal,
  ShieldAlert, Lock, BadgeCheck, Wallet, ArrowLeft, ArrowRight,
  CheckCircle2, Upload, CalendarCheck, Clock, QrCode, ImagePlus,
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const WA_NUMBER = '9779843818304';

const services: Record<string, { title: string; fee: string; note?: string }> = {
  'problem-review': { title: '30-Minute Problem Review', fee: 'Rs. 2,000' },
  'health-check': { title: 'Account Health Check', fee: 'Rs. 3,000' },
  'monetization-review': { title: 'Monetization Review', fee: 'Rs. 3,500' },
  'urgent-review': { title: 'Urgent Case Review', fee: 'Rs. 2,000', note: 'Advance — final quote given after your review.' },
  'security-plan': { title: 'Social Media Security Plan', fee: 'Rs. 2,000', note: 'Advance — adjusted against your monthly plan.' },
};
const defaultService = { title: 'Case Review', fee: 'Rs. 2,000' };

const platforms = [
  { id: 'Facebook', icon: Facebook },
  { id: 'Instagram', icon: Instagram },
  { id: 'YouTube', icon: Youtube },
  { id: 'TikTok', icon: Music2 },
  { id: 'AdSense', icon: DollarSign },
  { id: 'Other', icon: MoreHorizontal },
];

const problems = [
  { id: 'Hacked account', icon: ShieldAlert, hint: 'Someone else controls it' },
  { id: 'Disabled / locked', icon: Lock, hint: 'Platform blocked access' },
  { id: 'Monetization issue', icon: DollarSign, hint: 'Rejected, revoked, setup' },
  { id: 'Payout issue', icon: Wallet, hint: 'Stuck or failed payments' },
  { id: 'Verification badge', icon: BadgeCheck, hint: 'Blue tick application' },
  { id: 'Something else', icon: MoreHorizontal, hint: 'Describe it next' },
];

const timeSlots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];
const steps = ['Platform', 'Problem', 'Details', 'Schedule', 'Payment', 'Confirm'];

const fmtDay = (d: Date) =>
  d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Asia/Kathmandu' });
const fmtFull = (d: Date) =>
  d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kathmandu' });

export default function Booking() {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState('');
  const [problem, setProblem] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState('');
  const [paid, setPaid] = useState(false);
  const [shot, setShot] = useState<string | null>(null);
  const [shotName, setShotName] = useState('');
  const [qrOk, setQrOk] = useState(true);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const search = useSearch();
  const svc = services[new URLSearchParams(search).get('service') || ''] || defaultService;

  const days = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + i + 1);
      return d;
    });
  }, []);

  const canNext = () => {
    setError('');
    if (step === 0 && !platform) { setError('Please choose a platform.'); return false; }
    if (step === 1 && !problem) { setError('Please choose what went wrong.'); return false; }
    if (step === 2) {
      if (name.trim().length < 2) { setError('Please enter your name.'); return false; }
      if (!/^9[678]\d{8}$/.test(phone.trim())) { setError('Enter a valid 10-digit Nepal mobile number.'); return false; }
      if (details.trim().length < 10) { setError('Please describe what happened (a few words is enough).'); return false; }
    }
    if (step === 3 && (dateIdx === null || !slot)) { setError('Please pick a day and time.'); return false; }
    if (step === 4) {
      if (!paid) { setError('Please confirm you have paid the consultation fee.'); return false; }
      if (!shot) { setError('Please upload your payment screenshot.'); return false; }
    }
    return true;
  };

  const next = () => { if (canNext()) { setStep(s => Math.min(s + 1, 5)); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const back = () => { setError(''); setStep(s => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const onShot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setShotName(f.name);
    setShot(URL.createObjectURL(f));
  };

  const confirmBooking = () => {
    const day = dateIdx !== null ? fmtFull(days[dateIdx]) : '';
    const msg =
`New booking — kishorupadhyaya.com.np/booking
Name: ${name.trim()}
WhatsApp: ${phone.trim()}
Platform: ${platform}
Problem: ${problem}
Slot: ${day} · ${slot} (NPT)
Details: ${details.trim()}
Service: ${svc.title}
Payment: ${svc.fee} paid via eSewa/Khalti (screenshot attached)`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Book a <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">Review</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            30-minute case review over a call. Pay the {svc.fee} consultation fee to lock your slot —
            no payment, no booking, no time-wasting.
          </p>
        </div>

        {/* progress */}
        <div className="flex items-center justify-center gap-1.5 mb-10 flex-wrap">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                i === step ? 'bg-violet-600 border-violet-600 text-white'
                : i < step ? 'bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300'
                : 'bg-muted/50 border-border text-muted-foreground'
              }`}>
                {i < step ? <CheckCircle2 size={13} /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < steps.length - 1 && <div className="w-3 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-sm">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          {/* STEP 0 — platform */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Which platform?</h2>
              <p className="text-muted-foreground text-sm mb-6">Where did the problem happen?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {platforms.map(p => (
                  <button key={p.id} onClick={() => setPlatform(p.id)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
                      platform === p.id ? 'border-violet-500 bg-violet-500/10 shadow-md shadow-violet-500/10' : 'border-border hover:border-violet-500/40'
                    }`}>
                    <p.icon size={22} className={platform === p.id ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground'} />
                    <p className="font-semibold mt-2 text-sm">{p.id}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — problem */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">What went wrong?</h2>
              <p className="text-muted-foreground text-sm mb-6">Pick the closest match on {platform || 'your account'}.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {problems.map(p => (
                  <button key={p.id} onClick={() => setProblem(p.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 flex items-start gap-3 ${
                      problem === p.id ? 'border-violet-500 bg-violet-500/10 shadow-md shadow-violet-500/10' : 'border-border hover:border-violet-500/40'
                    }`}>
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${problem === p.id ? 'bg-violet-500/20 text-violet-600 dark:text-violet-400' : 'bg-muted text-muted-foreground'}`}>
                      <p.icon size={19} />
                    </span>
                    <span>
                      <span className="block font-semibold text-sm">{p.id}</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{p.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — details */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Your details</h2>
              <p className="text-muted-foreground text-sm mb-6">So I can reach you at your slot time.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Full name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">WhatsApp number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="98XXXXXXXX" inputMode="numeric"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">What happened?</label>
                  <textarea value={details} onChange={e => setDetails(e.target.value)} rows={4}
                    placeholder="e.g. My Facebook page was hacked 3 days ago, hacker changed the email and I can't log in…"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — schedule */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Pick your slot</h2>
              <p className="text-muted-foreground text-sm mb-6">30-minute review call · Nepal time (NPT).</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {days.map((d, i) => (
                  <button key={i} onClick={() => { setDateIdx(i); setSlot(''); }}
                    className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                      dateIdx === i ? 'border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300' : 'border-border hover:border-violet-500/40'
                    }`}>
                    {fmtDay(d)}
                  </button>
                ))}
              </div>
              {dateIdx !== null && (
                <div>
                  <p className="text-sm font-medium mb-3 flex items-center gap-2"><Clock size={15} className="text-muted-foreground" /> Available times — {fmtDay(days[dateIdx])}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map(ts => (
                      <button key={ts} onClick={() => setSlot(ts)}
                        className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                          slot === ts ? 'border-violet-500 bg-violet-600 text-white shadow-md shadow-violet-500/25' : 'border-border hover:border-violet-500/40'
                        }`}>
                        {ts}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4 — payment */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Pay {svc.fee}</h2>
              <p className="text-muted-foreground text-sm mb-6">{svc.title} — locks your slot. {svc.note || 'The remaining service fee is only charged after your problem is solved.'}</p>
              <div className="grid sm:grid-cols-2 gap-6 items-start">
                <div className="rounded-2xl border border-border p-5 text-center bg-muted/30">
                  {qrOk ? (
                    <img src="/payment-qr.png" alt="eSewa / Khalti payment QR" onError={() => setQrOk(false)}
                      className="w-48 h-48 object-contain mx-auto rounded-xl bg-white p-2" />
                  ) : (
                    <div className="w-48 h-48 mx-auto rounded-xl border-2 border-dashed border-violet-500/40 bg-violet-500/5 flex flex-col items-center justify-center gap-2 p-4">
                      <QrCode size={36} className="text-violet-500" />
                      <p className="text-xs text-muted-foreground font-medium">eSewa / Khalti QR<br />pay {svc.fee} to<br /><span className="text-foreground font-bold">9843818304</span></p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-3">Scan with eSewa or Khalti · {svc.fee}</p>
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium block mb-1.5">Upload payment screenshot</span>
                    <span className={`flex items-center justify-center gap-2 px-4 py-8 rounded-2xl border-2 border-dashed cursor-pointer transition-colors ${shot ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border hover:border-violet-500/50 bg-muted/30'}`}>
                      {shot
                        ? <img src={shot} alt="Payment screenshot" className="max-h-40 rounded-lg object-contain" />
                        : <span className="text-center">
                            <ImagePlus size={28} className="mx-auto text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground">Tap to upload screenshot</span>
                          </span>}
                    </span>
                    <input type="file" accept="image/*" onChange={onShot} className="hidden" />
                  </label>
                  {shotName && <p className="text-xs text-muted-foreground truncate flex items-center gap-1.5"><Upload size={13} /> {shotName}</p>}
                  <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-border p-4 hover:border-violet-500/40 transition-colors">
                    <input type="checkbox" checked={paid} onChange={e => setPaid(e.target.checked)} className="mt-1 w-4 h-4 accent-violet-600" />
                    <span className="text-sm">I have paid <strong>{svc.fee}</strong> via eSewa/Khalti and the screenshot above is mine.</span>
                  </label>
                </div>
              </div>
              <div className="mt-6 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-sm text-amber-700 dark:text-amber-300">
                <strong>Honest note:</strong> some cases genuinely can&apos;t be recovered (e.g. permanently deleted accounts, severe policy violations).
                This fee covers my time to investigate and give you a straight answer — if it&apos;s hopeless, I&apos;ll tell you honestly
                and guide your next steps instead of taking more of your money.
              </div>
            </div>
          )}

          {/* STEP 5 — review */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Review & confirm</h2>
              <p className="text-muted-foreground text-sm mb-6">Check everything, then confirm on WhatsApp.</p>
              <div className="rounded-2xl border border-border bg-muted/30 p-5 space-y-3 text-sm mb-6">
                {[
                  ['Name', name], ['WhatsApp', phone], ['Platform', platform], ['Problem', problem],
                  ['Slot', `${dateIdx !== null ? fmtFull(days[dateIdx]) : ''} · ${slot} (NPT)`],
                  ['Service', svc.title],
                  ['Payment', `${svc.fee} paid — screenshot ${shotName || 'uploaded'}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="w-24 shrink-0 text-muted-foreground font-medium">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
                <div className="flex gap-3">
                  <span className="w-24 shrink-0 text-muted-foreground font-medium">Details</span>
                  <span className="text-muted-foreground">{details}</span>
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-border p-4 hover:border-violet-500/40 transition-colors mb-4">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 accent-violet-600" />
                <span className="text-sm">I understand the <strong>{svc.fee}</strong> is for the case review and honest diagnosis — <strong>not</strong> a guaranteed recovery.</span>
              </label>
              <button onClick={() => { if (!agreed) { setError('Please tick the agreement above to continue.'); return; } confirmBooking(); }}
                className="btn-gradient w-full inline-flex items-center justify-center gap-2 text-lg !py-4">
                <CalendarCheck size={20} /> Confirm booking on WhatsApp
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                WhatsApp will open with your booking details — please attach the payment screenshot in the chat.
                Your slot is confirmed once payment is verified.
              </p>
            </div>
          )}

          {/* nav buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button onClick={back} disabled={step === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border font-medium text-sm hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <ArrowLeft size={16} /> Back
            </button>
            {step < 5 && (
              <button onClick={next}
                className="btn-gradient-sm inline-flex items-center gap-2 !px-6 !py-2.5 text-sm">
                Continue <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Prefer to talk first? See the <a href="/faq" className="underline underline-offset-2">FAQ</a> or free <a href="/resources" className="underline underline-offset-2">guides</a>.
        </p>
      </main>
    </div>
  );
}
