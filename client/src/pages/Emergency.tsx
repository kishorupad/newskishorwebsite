import { useState } from 'react';
import {
  Siren, ArrowLeft, CheckCircle2, XCircle, ArrowRight,
  Clock, AlertTriangle,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageBackdrop from '@/components/PageBackdrop';

const steps = [
  {
    t: 'Try to log in and change the password NOW',
    d: 'Do not wait "to see what happens". Open the app, log in, and change the password immediately. Every minute you wait, the hacker locks more doors behind them.',
  },
  {
    t: 'Kick them out: end all other sessions',
    d: 'Go to Settings > Security > "Where you\'re logged in" and log out every device except yours. This cuts the hacker\'s access even if they still know the password.',
  },
  {
    t: 'Check if they changed your email or phone',
    d: 'Look at the email and phone number on the account. If the hacker changed them, use "Forgot password" right now, before they finish locking you out completely.',
  },
  {
    t: 'Warn your people publicly',
    d: 'Post or story: "My account was hacked - do NOT send money or codes to this account." Most damage from hacks is the hacker scamming YOUR friends and followers.',
  },
  {
    t: 'Report it inside the app, then get expert help',
    d: 'Use Help > Report a problem in the app. Then, if you are locked out or the hacker changed your recovery details, book an urgent review - I handle exactly these cases every day.',
  },
];

const donts = [
  'Do NOT pay the hacker. They rarely return the account, and now they know you will pay.',
  'Do NOT delete the account in panic. It destroys your recovery options.',
  'Do NOT trust random "hackers for hire" in comments or DMs. They are scammers too.',
  'Do NOT keep "trying later". Speed is the single biggest factor in recovery.',
];

export default function Emergency() {
  const [done, setDone] = useState<number[]>([]);
  const toggle = (i: number) => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <button onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back
        </button>

        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 text-white p-8 text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/15 flex items-center justify-center animate-pulse">
            <Siren size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Hacked Right Now?</h1>
          <p className="text-red-100 text-sm max-w-md mx-auto flex items-center justify-center gap-1.5">
            <Clock size={14} /> Do these 5 steps in order. Tick each one as you finish. Speed matters more than anything.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {steps.map((s, i) => {
            const isDone = done.includes(i);
            return (
              <button key={s.t} onClick={() => toggle(i)}
                className={`w-full text-left rounded-2xl border p-5 transition-all ${isDone ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-border bg-card hover:border-red-500/40'}`}>
                <div className="flex gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 transition-colors ${isDone ? 'bg-emerald-500 text-white' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                    {isDone ? <CheckCircle2 size={20} /> : i + 1}
                  </div>
                  <div>
                    <p className={`font-bold mb-1 ${isDone ? 'line-through text-muted-foreground' : ''}`}>{s.t}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 mb-8">
          <p className="font-bold flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-300">
            <AlertTriangle size={18} /> What NOT to do
          </p>
          <ul className="space-y-2">
            {donts.map(d => (
              <li key={d} className="text-sm text-muted-foreground flex gap-2.5">
                <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" /> {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Locked out? I do this every day.</h2>
          <p className="text-violet-100 text-sm mb-6 max-w-md mx-auto">
            If the hacker changed your email or phone, or you cannot get back in,
            book an <strong>Urgent Case Review</strong>. I will diagnose your case personally and tell you honestly what is possible.
          </p>
          <a href="/booking?service=urgent-review"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-violet-700 font-bold hover:shadow-xl transition-shadow">
            Book Urgent Review - Rs. 2,000 <ArrowRight size={18} />
          </a>
          <p className="text-violet-200 text-xs mt-4">Advance payment. Final quote given after your review.</p>
        </div>
      </main>
    </div>
  );
}
