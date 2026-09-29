import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageBackdrop from '@/components/PageBackdrop';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl relative">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back
        </a>
        <h1 className="font-[Sora] text-4xl md:text-5xl font-bold tracking-tight mb-3">Refund Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: September 2026</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. What you are paying for</h2>
            <p>
              Consultation and review fees (Rs. 2,000 - Rs. 3,500) pay for my time and expertise: a focused
              review of your case, a proper diagnosis, and honest next steps. The fee covers the consultation
              itself - <strong className="text-foreground">not a guaranteed recovery.</strong> Some cases genuinely
              cannot be fixed, and I will tell you that straight instead of taking more of your money.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Consultation fees</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Once a review session has been delivered, the fee is <strong className="text-foreground">non-refundable</strong> - you received the diagnosis and my time.</li>
              <li>If you cancel at least <strong className="text-foreground">24 hours before</strong> your scheduled session, you can reschedule once at no extra cost.</li>
              <li>If I cannot take your case for any reason before the session, you get a <strong className="text-foreground">full refund</strong>.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Digital products (Rs. 499 checklist)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Because it is a digital download, the checklist is <strong className="text-foreground">non-refundable once delivered</strong>.</li>
              <li>If you paid but never received the file, contact me and I will either deliver it or refund you in full.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. How refunds are paid</h2>
            <p>
              Approved refunds are sent back through the same method you paid with (eSewa/Khalti) within
              <strong className="text-foreground"> 7 days</strong>. To request a refund, message me on WhatsApp at
              +977 9843818304 with your booking details and payment screenshot.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
