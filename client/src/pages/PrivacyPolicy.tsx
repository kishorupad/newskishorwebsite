import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageBackdrop from '@/components/PageBackdrop';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl relative">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back
        </a>
        <h1 className="font-[Sora] text-4xl md:text-5xl font-bold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: September 2026</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. What I collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Booking details:</strong> your name, contact info, and a description of your problem.</li>
              <li><strong className="text-foreground">Case screenshots:</strong> account screenshots you upload to help diagnose your case.</li>
              <li><strong className="text-foreground">Payment screenshots:</strong> eSewa/Khalti payment proof to verify your booking.</li>
              <li><strong className="text-foreground">Messages:</strong> WhatsApp conversations about your case.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. How it is used</h2>
            <p>
              Your information is used only to deliver the service you booked: diagnosing your case,
              communicating with you, and verifying payment. Nothing else.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. What I never do</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Never sell or share your personal information with third parties.</li>
              <li>Never post your case details publicly without your explicit permission.</li>
              <li>Never use your account credentials for anything beyond your case.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Password tools</h2>
            <p>
              The free password checker runs entirely in your browser. When checking breaches, only the first
              5 characters of your password&apos;s SHA-1 hash are sent to Have I Been Pwned (k-anonymity) -
              your password itself never leaves your device and is never stored.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Your rights</h2>
            <p>
              You can ask me anytime to delete your case details and messages. Contact me on WhatsApp at
              +977 9843818304 and I will remove them.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
