import { useState, useMemo } from 'react';
import {
  ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, Upload,
  QrCode, ImagePlus, FileCheck, Lock, Zap,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageBackdrop from '@/components/PageBackdrop';

const WA_NUMBER = '9779843818304';
const PRICE = 'Rs. 499';
const AVAILABLE = false; // set true when the PDF is ready for sale

const inside = [
  { t: 'Lock your accounts', d: '2FA, strong passwords, backup codes, login alerts, trusted contacts' },
  { t: 'Secure your email', d: 'Your email is the master key - lock it first, kill hacker filters' },
  { t: 'Beat phishing', d: 'The #1 attack in Nepal: fake "page violation" & "monetization" messages' },
  { t: 'Protect pages & payouts', d: 'Page role audits, Business Manager safety, admin rules' },
  { t: 'Hacked? First 30 minutes', d: 'Exact order of what to do - and what NOT to do' },
  { t: 'Stay safe forever', d: 'The 5-minute monthly routine + scam red-flags list' },
];

export default function Checklist() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qrOk, setQrOk] = useState(true);
  const [shot, setShot] = useState('');
  const [shotName, setShotName] = useState('');
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState('');

  const orderId = useMemo(() => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `KU-${mm}${dd}-${rand}`;
  }, []);

  const onShot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setShot(URL.createObjectURL(f)); setShotName(f.name); }
  };

  const next1 = () => {
    if (!name.trim()) return setError('Please enter your name.');
    if (!/^(98|97)\d{8}$/.test(phone.replace(/[\s-]/g, ''))) return setError('Enter a valid Nepal mobile number (10 digits).');
    setError(''); setStep(2);
  };
  const next2 = () => {
    if (!shot) return setError('Please upload your payment screenshot.');
    if (!paid) return setError('Please confirm you have paid.');
    setError(''); setStep(3);
  };

  const confirmOrder = () => {
    const msg =
`New checklist order - kishorupadhyaya.com.np/checklist
Order ID: ${orderId}
Name: ${name.trim()}
WhatsApp: ${phone.trim()}
Product: Social Media Security Checklist (PDF)
Payment: ${PRICE} paid via eSewa/Khalti (screenshot attached)`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all';

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <button onClick={() => step > 1 ? setStep(step - 1) : window.history.back()}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back
        </button>

        {/* product hero */}
        <div className="rounded-3xl overflow-hidden border border-border mb-8">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold">
                <FileCheck size={13} /> DIGITAL DOWNLOAD · PDF
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-bold">
                COMING SOON
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Social Media Security Checklist</h1>
            <p className="text-violet-100 text-sm leading-relaxed mb-5">
              20 steps to lock your Facebook, Instagram, YouTube &amp; TikTok,
              everything I tell my paid 1-on-1 clients, in one checklist.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{PRICE}</span>
              <span className="text-violet-200 text-sm line-through">Rs. 999</span>
              <span className="px-2 py-0.5 rounded-md bg-white text-violet-700 text-xs font-bold">LAUNCH PRICE</span>
            </div>
          </div>
          <div className="p-6 bg-card">
            <p className="text-sm font-semibold mb-3">What&apos;s inside:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {inside.map(i => (
                <div key={i.t} className="flex gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">{i.t}</p>
                    <p className="text-xs text-muted-foreground">{i.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* purchase flow disabled until the PDF is ready */}
        {!AVAILABLE ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 md:p-8 text-center">
            <p className="font-bold text-lg mb-1">PDF coming soon</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I&apos;m finalizing the checklist right now. It will be available here
              very soon - please check back in a bit.
            </p>
          </div>
        ) : (
        <>
{/* steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {['Details', 'Payment', 'Get PDF'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step > i + 1 ? 'bg-emerald-500 text-white' : step === i + 1 ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium ${step === i + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
              {i < 2 && <div className="flex-1 h-px bg-border" />}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* STEP 1 - details */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-1">Your details</h2>
            <p className="text-muted-foreground text-sm mb-6">The PDF will be sent to your WhatsApp after payment.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Your name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ram Sharma" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">WhatsApp number (Nepal)</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="98XXXXXXXX" inputMode="numeric" className={inputCls} />
              </div>
            </div>
            <button onClick={next1} className="btn-gradient w-full inline-flex items-center justify-center gap-2 text-lg !py-4 mt-6">
              Continue to payment <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2 - payment */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-1">Pay {PRICE}</h2>
            <p className="text-muted-foreground text-sm mb-6">Scan with eSewa or Khalti, then upload your screenshot.</p>
            <div className="grid sm:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl border border-border p-5 text-center bg-muted/30">
                {qrOk ? (
                  <img src="/payment-qr.png" alt="eSewa / Khalti payment QR" onError={() => setQrOk(false)}
                    className="w-48 h-48 object-contain mx-auto rounded-xl bg-white p-2" />
                ) : (
                  <div className="w-48 h-48 mx-auto rounded-xl border-2 border-dashed border-violet-500/40 bg-violet-500/5 flex flex-col items-center justify-center gap-2 p-4">
                    <QrCode size={36} className="text-violet-500" />
                    <p className="text-xs text-muted-foreground font-medium">eSewa / Khalti QR<br />pay {PRICE} to<br /><span className="text-foreground font-bold">9843818304</span></p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-3">Scan with eSewa or Khalti · {PRICE}</p>
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
                  <span className="text-sm">I have paid <strong>{PRICE}</strong> via eSewa/Khalti and the screenshot above is mine.</span>
                </label>
              </div>
            </div>
            <button onClick={next2} className="btn-gradient w-full inline-flex items-center justify-center gap-2 text-lg !py-4 mt-6">
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 3 - review & get PDF */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-1">Get your PDF</h2>
            <p className="text-muted-foreground text-sm mb-6">Confirm on WhatsApp - I verify payment and send your PDF.</p>
            <div className="rounded-2xl border border-border bg-muted/30 p-5 space-y-3 text-sm mb-6">
              <div className="flex gap-3 pb-3 mb-1 border-b border-border">
                <span className="w-24 shrink-0 text-muted-foreground font-medium">Order ID</span>
                <span className="font-bold text-violet-600 dark:text-violet-400 tracking-wide">{orderId}</span>
              </div>
              {[['Name', name], ['WhatsApp', phone], ['Product', 'Security Checklist (PDF)'], ['Payment', `${PRICE} paid - screenshot ${shotName || 'uploaded'}`]].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="w-24 shrink-0 text-muted-foreground font-medium">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/25 text-sm mb-4">
              <Zap size={16} className="text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
              <span><strong>How delivery works:</strong> tap below, send the WhatsApp message, and I&apos;ll verify your payment and reply with the PDF - usually within a few hours.</span>
            </div>
            <button onClick={confirmOrder}
              className="w-full inline-flex items-center justify-center gap-2 text-lg !py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-colors">
              <FileCheck size={20} /> Send order on WhatsApp
            </button>
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5 justify-center">
              <Lock size={12} /> Your details are only used to deliver your PDF.
            </p>
          </div>
        )}
      
        </>
        )}
        </main>
    </div>
  );
}
