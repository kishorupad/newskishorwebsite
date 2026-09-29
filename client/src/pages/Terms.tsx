import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageBackdrop from '@/components/PageBackdrop';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl relative">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back
        </a>
        <h1 className="font-[Sora] text-4xl md:text-5xl font-bold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: September 2026</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Services</h2>
            <p>
              I provide paid consultations and reviews for social media problems: hacked or disabled accounts,
              demonetization, AdSense issues, payout problems, verification and account security. Free tools
              and guides on this site are provided as-is for self-help.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. No guaranteed outcomes</h2>
            <p>
              I do not guarantee account recovery or any specific result. Platform decisions (Meta, Google,
              TikTok) are ultimately theirs. What I guarantee is my honest, expert effort on your case -
              and a straight answer when something cannot be fixed.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Your responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide true and accurate information about your case.</li>
              <li>Only book for accounts you own or are authorized to manage.</li>
              <li>Do not ask me to do anything illegal or against platform policies.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Payment</h2>
            <p>
              All consultations are booked and paid in advance via eSewa/Khalti. Your slot is confirmed only
              after I verify your payment screenshot. Prices are listed in Nepalese Rupees (Rs.).
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Limitation of liability</h2>
            <p>
              My liability is limited to the fee you paid for the consultation. I am not responsible for
              platform decisions, data loss on your accounts, or actions you take based on free guides.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Contact</h2>
            <p>Questions about these terms? WhatsApp: +977 9843818304</p>
          </section>
        </div>
      </main>
    </div>
  );
}
