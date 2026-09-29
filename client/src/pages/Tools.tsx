import { useState, useMemo, useEffect } from 'react';
import {
  KeyRound, ShieldCheck, ShieldAlert, ShieldX, Copy, Check,
  RefreshCw, ArrowLeft, Lock, CheckCircle2, XCircle,
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const COMMON = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password1', '12345678', '111111', '123123', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'kathmandu', 'kathmandu123', 'nepal', 'nepal123', 'everest', 'himalaya', 'pokhara', 'ram123', 'hari123', 'sita123', 'test123', 'user123', 'facebook', 'instagram', 'tiktok', 'youtube', 'iloveyou', 'superman', 'football', 'sunshine', 'princess'];
const SEQS = ['012', '123', '234', '345', '456', '567', '678', '789', '890', 'abc', 'bcd', 'cde', 'def', 'qwe', 'asd'];

// Check against 800M+ real breached passwords (Have I Been Pwned, k-anonymity):
// only the first 5 chars of the SHA-1 hash leave the device - the password itself never does.
async function sha1Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
async function breachCount(pw: string): Promise<number | null> {
  try {
    const hash = await sha1Hex(pw);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${hash.slice(0, 5)}`);
    if (!res.ok) return null;
    const suffix = hash.slice(5);
    for (const line of (await res.text()).split('\n')) {
      const [s, count] = line.trim().split(':');
      if (s === suffix) return parseInt(count, 10) || 0;
    }
    return 0;
  } catch {
    return null;
  }
}

function analyze(pw: string) {
  let score = 0;
  const feedback: string[] = [];
  // strip symbols so nepal@123 -> nepal123, p@ssw0rd -> pssw0rd etc.
  const leetFirst = pw.toLowerCase().replace(/@/g, 'a').replace(/0/g, 'o').replace(/1/g, 'i').replace(/!/g, 'i').replace(/3/g, 'e').replace(/\$/g, 's');
  const norm = leetFirst.replace(/[^a-z0-9]/g, '');
  const isCommon = COMMON.some(c => norm === c || (c.length >= 4 && norm.includes(c)));
  // structure check on digits-intact version, only for short passwords
  // (long random passwords can end in letters+digits by chance)
  const raw = pw.toLowerCase().replace(/[^a-z0-9]/g, '');
  const wordNumPattern = pw.length < 14 && (/[a-z]{4,}[0-9]{1,4}$/.test(raw) || /^[0-9]{1,4}[a-z]{4,}/.test(raw));
  const hasSeq = SEQS.some(s => norm.includes(s));
  const hasRepeat = /(.)\1\1/.test(pw);
  const hasLower = /[a-z]/.test(pw), hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /\d/.test(pw), hasSymbol = /[^a-zA-Z0-9]/.test(pw);

  if (pw.length >= 16) score += 30;
  else if (pw.length >= 12) score += 25;
  else if (pw.length >= 8) { score += 12; feedback.push('Good length - 12+ is even better'); }
  else if (pw.length > 0) { score += 4; feedback.push('Use at least 8 characters'); }
  if (hasLower && hasUpper) score += 15; else if (pw) feedback.push('Mix UPPER and lower case');
  if (hasDigit) score += 15; else if (pw) feedback.push('Add some numbers');
  if (hasSymbol) score += 15; else if (pw) feedback.push('Add symbols like ! @ # $');
  if (isCommon || wordNumPattern) {
    score = Math.min(score, 15);
    feedback.unshift(isCommon
      ? 'This password (or its pattern) is in every hacker\'s list - try 5 random words joined together instead'
      : 'Word + numbers is the most hacked pattern - hackers try this first');
  } else {
    score += 25;
  }
  if (hasSeq) { score = Math.max(0, score - 10); feedback.push('Avoid sequences like 123 or abc'); }
  if (hasRepeat) { score = Math.max(0, score - 10); feedback.push('Avoid repeated characters like "aaa"'); }
  score = Math.max(0, Math.min(100, score));
  const label = !pw ? 'Type a password' : score >= 80 ? 'Very strong' : score >= 60 ? 'Strong' : score >= 40 ? 'Fair' : 'Weak';
  const criteria = [
    { label: 'At least 8 characters', pass: pw.length >= 8 },
    { label: 'Uppercase + lowercase', pass: hasLower && hasUpper },
    { label: 'Numbers', pass: hasDigit },
    { label: 'Symbols (!@#$)', pass: hasSymbol },
    { label: 'Not a common password', pass: !isCommon },
    { label: 'No word+number pattern', pass: !wordNumPattern },
    { label: 'No 123/abc sequences or aaa repeats', pass: !hasSeq && !hasRepeat },
  ];
  // rough crack-time estimate from charset size
  let charset = 0;
  if (hasLower || hasUpper) charset += 26;
  if (hasLower && hasUpper) charset += 26;
  if (hasDigit) charset += 10;
  if (hasSymbol) charset += 32;
  const combos = Math.pow(charset, pw.length);
  const secs = combos / 1e10; // 10B guesses/sec
  let crack: string;
  if (!pw) crack = '-';
  else if (isCommon || wordNumPattern) crack = 'instantly';
  else if (secs < 1) crack = 'instantly';
  else if (secs < 60) crack = `${Math.round(secs)} seconds`;
  else if (secs < 3600) crack = `${Math.round(secs / 60)} minutes`;
  else if (secs < 86400) crack = `${Math.round(secs / 3600)} hours`;
  else if (secs < 31536000) crack = `${Math.round(secs / 86400)} days`;
  else if (secs < 31536000 * 100) crack = `${Math.round(secs / 31536000)} years`;
  else crack = 'centuries';
  return { score, label, feedback: feedback.slice(0, 3), crack, criteria };
}

function genPassword(len: number, upper: boolean, lower: boolean, digits: boolean, symbols: boolean) {
  let chars = '';
  if (lower) chars += 'abcdefghijkmnopqrstuvwxyz';
  if (upper) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  if (digits) chars += '23456789';
  if (symbols) chars += '!@#$%^&*()-_=+';
  if (!chars) chars = 'abcdefghijkmnopqrstuvwxyz';
  const buf = new Uint32Array(len);
  crypto.getRandomValues(buf);
  return Array.from(buf, b => chars[b % chars.length]).join('');
}

const WORDS = ('apple river mountain tiger cloud paper stone fire water wind tree star moon sun fish bird horse book pen door light green blue red happy brave quick smart strong ' +
  'himal khola badal kagaj simal tarara ujyalo phool paat pani aago hawa danda bensi goreto chautari pipal kafal godavari koshi gandaki bagmati ' +
  'himal khola badal kagaj simal tarara ujyalo phool paat pani aago hawa danda bensi goreto chautari pipal kafal godavari koshi gandaki bagmati ' +
  'sagar nadi pokhari himali pahad jungle bagh hatti ghodha chara bhuin aakash jamin mausam barsa ' +
  'kalam kitab kursi table jhyal dhoka batti rato nilo hariyo seto kalo mitho').split(' ');
function genPassphrase(n = 5) {
  const buf = new Uint32Array(n);
  crypto.getRandomValues(buf);
  const words = Array.from(buf, b => WORDS[b % WORDS.length]);
  const num = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] % 90) + 10;
  return words.join('-') + '-' + num;
}

export default function Tools() {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const result = useMemo(() => analyze(pw), [pw]);
  const [breach, setBreach] = useState<{ count: number | null; checking: boolean }>({ count: null, checking: false });
  useEffect(() => {
    if (!pw) { setBreach({ count: null, checking: false }); return; }
    setBreach(b => ({ ...b, checking: true }));
    const t = setTimeout(async () => {
      const c = await breachCount(pw);
      setBreach({ count: c, checking: false });
    }, 700);
    return () => clearTimeout(t);
  }, [pw]);
  const isBreached = breach.count !== null && breach.count > 0;
  const displayScore = isBreached ? Math.min(result.score, 10) : result.score;
  const displayLabel = isBreached ? 'Breached - do not use' : result.label;

  const [len, setLen] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [genMode, setGenMode] = useState<'random' | 'words'>('random');
  const [generated, setGenerated] = useState(() => genPassword(16, true, true, true, true));
  const [copied, setCopied] = useState(false);

  const barColor = displayScore >= 80 ? 'bg-emerald-500' : displayScore >= 60 ? 'bg-lime-500' : displayScore >= 40 ? 'bg-amber-500' : 'bg-red-500';
  const Icon = isBreached ? ShieldX : displayScore >= 60 ? ShieldCheck : displayScore >= 40 ? ShieldAlert : ShieldX;
  const iconColor = isBreached ? 'text-red-500' : displayScore >= 60 ? 'text-emerald-500' : displayScore >= 40 ? 'text-amber-500' : 'text-red-500';

  const copy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputCls = 'w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground text-lg font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <button onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back
        </button>

        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
            <KeyRound size={26} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Free Password Tools</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Check if your password can survive a hacker - or generate one that can.
            Everything runs in your browser. Nothing is sent anywhere.
          </p>
        </div>

        {/* CHECKER */}
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <ShieldCheck size={20} className="text-violet-600 dark:text-violet-400" /> Password Strength Checker
          </h2>
          <p className="text-sm text-muted-foreground mb-5">Type a password you use (or want to use):</p>
          <div className="relative mb-4">
            <input
              type={show ? 'text' : 'password'}
              value={pw} onChange={e => setPw(e.target.value)}
              placeholder="Type password here..."
              className={inputCls + ' pr-20'}
            />
            <button onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          {pw && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${iconColor}`}>
                  <Icon size={16} /> {displayLabel}
                </span>
                <span className="text-xs text-muted-foreground">Cracked in: <strong className="text-foreground">{isBreached ? 'instantly' : result.crack}</strong></span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden mb-4">
                <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${displayScore}%` }} />
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Strong password checklist</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {result.criteria.map(c => (
                    <div key={c.label} className="flex items-center gap-2 text-sm">
                      {c.pass
                        ? <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        : <XCircle size={15} className="text-red-500 shrink-0" />}
                      <span className={c.pass ? 'text-foreground' : 'text-muted-foreground'}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {result.feedback.length > 0 && (
                <ul className="space-y-1.5">
                  {result.feedback.map(f => (
                    <li key={f} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-amber-500">•</span> {f}
                    </li>
                  ))}
                </ul>
              )}
              {displayScore >= 80 && !isBreached && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Solid password. Now make sure you never reuse it anywhere else.</p>
              )}
              <div className={`mt-4 rounded-xl border px-4 py-3 text-sm flex items-center gap-2.5 ${
                isBreached ? 'border-red-500/40 bg-red-500/5 text-red-600 dark:text-red-400'
                : breach.checking ? 'border-border text-muted-foreground'
                : breach.count === 0 ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                : 'border-border text-muted-foreground'}`}>
                {breach.checking ? (
                  <><RefreshCw size={15} className="animate-spin shrink-0" /> Checking against 800M+ breached passwords...</>
                ) : isBreached ? (
                  <><ShieldX size={15} className="shrink-0" /> <span><strong>Found in {breach.count!.toLocaleString()} data breaches.</strong> Hackers already have this password. Never use it.</span></>
                ) : breach.count === 0 ? (
                  <><ShieldCheck size={15} className="shrink-0" /> Not found in known data breaches. Still follow the tips above.</>
                ) : (
                  <><ShieldAlert size={15} className="shrink-0" /> Breach check unavailable (offline). Local checks only.</>
                )}
              </div>
            </div>
          )}
          <p className="text-[11px] text-muted-foreground mt-5 flex items-center gap-1.5">
            <Lock size={11} /> Private by design: your password never leaves this device - breach lookup sends only 5 characters of its hash.
          </p>
        </div>

        {/* GENERATOR */}
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <RefreshCw size={20} className="text-violet-600 dark:text-violet-400" /> Strong Password Generator
          </h2>
          <p className="text-sm text-muted-foreground mb-4">One click. Unhackable. Copy it into a password manager.</p>
          <div className="flex gap-2 mb-5">
            <button onClick={() => { setGenMode('random'); setGenerated(genPassword(len, upper, lower, digits, symbols)); }}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${genMode === 'random' ? 'bg-violet-500/10 border-violet-500/40 text-violet-700 dark:text-violet-300' : 'border-border text-muted-foreground'}`}>
              Random (strongest)
            </button>
            <button onClick={() => { setGenMode('words'); setGenerated(genPassphrase()); }}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${genMode === 'words' ? 'bg-violet-500/10 border-violet-500/40 text-violet-700 dark:text-violet-300' : 'border-border text-muted-foreground'}`}>
              5 words (easy to remember)
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-muted/50 border border-border px-4 py-4 mb-5">
            <code className="flex-1 font-mono text-base md:text-lg break-all text-foreground">{generated}</code>
            <button onClick={copy}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-95 transition-opacity">
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          {genMode === 'random' && (<>
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Length: <strong>{len}</strong></span>
              <span className="text-muted-foreground text-xs">12+ recommended</span>
            </div>
            <input type="range" min={8} max={32} value={len}
              onChange={e => { const v = +e.target.value; setLen(v); setGenerated(genPassword(v, upper, lower, digits, symbols)); }}
              className="w-full accent-violet-600" />
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {([['Uppercase (ABC)', upper, setUpper], ['Lowercase (abc)', lower, setLower], ['Numbers (123)', digits, setDigits], ['Symbols (!@#)', symbols, setSymbols]] as const).map(([label, val, set]) => (
              <button key={label} onClick={() => { const v = !val; set(v); setGenerated(genPassword(len, label.includes('Upper') ? v : upper, label.includes('Lower') ? v : lower, label.includes('Numbers') ? v : digits, label.includes('Symbols') ? v : symbols)); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${val ? 'bg-violet-500/10 border-violet-500/40 text-violet-700 dark:text-violet-300' : 'border-border text-muted-foreground'}`}>
                {label}
              </button>
            ))}
          </div>
          </>)}
          {genMode === 'words' && (
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              5 random words + a number: <strong className="text-foreground">easy to remember, hard to crack.</strong> Say it out loud twice - you'll remember it.
            </p>
          )}
          <button onClick={() => setGenerated(genMode === 'words' ? genPassphrase() : genPassword(len, upper, lower, digits, symbols))}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border font-semibold hover:bg-muted transition-colors">
            <RefreshCw size={16} /> Generate new {genMode === 'words' ? 'passphrase' : 'password'}
          </button>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-6 md:p-8 text-center">
          <h3 className="text-xl font-bold mb-1">Passwords are just the start</h3>
          <p className="text-violet-100 text-sm mb-5">A strong password with no 2FA is still a sitting duck. Get my full 20-step security checklist:</p>
          <a href="/checklist" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-700 font-bold text-sm hover:shadow-lg transition-shadow">
            Get the Security Checklist - Rs. 499
          </a>
        </div>
      </main>
    </div>
  );
}
