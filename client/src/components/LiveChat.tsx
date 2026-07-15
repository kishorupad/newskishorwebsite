import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: string[];
  action?: { label: string; href: string };
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm Kishor's assistant. I can help with any social media problem — account issues, monetization, AdSense, payouts, and more. What platform do you need help with?",
    isBot: true,
    options: ['Facebook', 'Instagram', 'YouTube', 'Google AdSense', 'Other'],
  },
];

const responses: Record<string, Message[]> = {
  'Facebook': [
    { id: 2, text: 'Got it — Facebook. What kind of problem are you facing?', isBot: true, options: ['Hacked/Locked', 'Monetization', 'Page Issues', 'Other'] },
  ],
  'Instagram': [
    { id: 2, text: 'Got it — Instagram. What kind of problem are you facing?', isBot: true, options: ['Hacked/Locked', 'Monetization', 'Verification', 'Other'] },
  ],
  'YouTube': [
    { id: 2, text: 'Got it — YouTube. What kind of problem are you facing?', isBot: true, options: ['Hacked/Locked', 'Monetization', 'AdSense', 'Copyright Strike', 'Other'] },
  ],
  'Google AdSense': [
    { id: 2, text: 'Got it — AdSense. What kind of problem are you facing?', isBot: true, options: ['Disapproved', 'Payment Issue', 'Policy Violation', 'Other'] },
  ],
  'Other': [
    { id: 2, text: 'No problem. What platform and what kind of issue?', isBot: true, options: ['Account Issue', 'Monetization', 'Payment/Payout', 'Other'] },
  ],
  'Hacked/Locked': [
    { id: 3, text: "I can help with that. How long has your account been hacked or locked?", isBot: true, options: ['Less than 24 hours', '1-3 days', 'More than 3 days'] },
  ],
  'Monetization': [
    { id: 3, text: "I help with monetization issues regularly. Is this about getting monetized or fixing an existing monetization problem?", isBot: true, options: ['Get monetized', 'Fix monetization', 'Other'] },
  ],
  'Page Issues': [
    { id: 3, text: "I can help with page problems. What specifically is wrong?", isBot: true, options: ['Page disabled', 'Page unpublished', 'Admin access', 'Other'] },
  ],
  'Verification': [
    { id: 3, text: "Verification badge issues. Do you already have a verification request rejected, or applying for the first time?", isBot: true, options: ['Rejected before', 'First time', 'Other'] },
  ],
  'AdSense': [
    { id: 3, text: "AdSense issues. What's the problem?", isBot: true, options: ['Disapproved', 'Payment issue', 'Policy violation', 'Other'] },
  ],
  'Copyright Strike': [
    { id: 3, text: "Copyright strikes can be serious. How many strikes does your channel have?", isBot: true, options: ['1 strike', '2 strikes', '3 strikes'] },
  ],
  'Disapproved': [
    { id: 3, text: "I can help fix AdSense disapproval. What was the reason given?", isBot: true, options: ['Not sure', 'Policy violation', 'Invalid traffic', 'Other'] },
  ],
  'Payment Issue': [
    { id: 3, text: "Payment issues are usually fixable. What's happening?", isBot: true, options: ['Payment pending', 'Wrong bank details', 'Verification needed', 'Other'] },
  ],
  'Policy Violation': [
    { id: 3, text: "Policy violations need specific fixes. What type of violation was it?", isBot: true, options: ['Content issue', 'Invalid traffic', 'Not sure', 'Other'] },
  ],
  'Get monetized': [
    { id: 4, text: "I can help you meet the requirements and get monetized. Let me connect you with Kishor on WhatsApp for a free assessment.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20need%20help%20with%20monetization.' } },
  ],
  'Fix monetization': [
    { id: 4, text: "I can diagnose and fix monetization problems. Connect with Kishor on WhatsApp for a detailed assessment.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20have%20a%20monetization%20problem.' } },
  ],
  'Rejected before': [
    { id: 4, text: "Previous rejection doesn't mean permanent denial. Kishor has helped many clients get verified after rejection. Connect on WhatsApp.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20my%20verification%20request%20was%20rejected%20before.' } },
  ],
  'First time': [
    { id: 4, text: "Great! I can help you apply correctly the first time. Connect with Kishor on WhatsApp for guidance.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20want%20to%20apply%20for%20verification.' } },
  ],
  'Admin access': [
    { id: 4, text: "Page admin access issues are recoverable. Connect with Kishor on WhatsApp for help.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20lost%20admin%20access%20to%20my%20page.' } },
  ],
  'Page disabled': [
    { id: 4, text: "Disabled pages can often be appealed. Connect with Kishor on WhatsApp for assistance.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20my%20Facebook%20page%20is%20disabled.' } },
  ],
  'Page unpublished': [
    { id: 4, text: "Unpublished pages have specific fixes. Connect with Kishor on WhatsApp for help.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20my%20Facebook%20page%20is%20unpublished.' } },
  ],
  '1 strike': [
    { id: 4, text: "One strike is manageable. Connect with Kishor on WhatsApp for help resolving it.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20my%20YouTube%20channel%20has%201%20copyright%20strike.' } },
  ],
  '2 strikes': [
    { id: 4, text: "Two strikes is serious. Connect with Kishor on WhatsApp immediately for help.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20my%20YouTube%20channel%20has%202%20copyright%20strikes.' } },
  ],
  '3 strikes': [
    { id: 4, text: "Three strikes means channel termination risk. This is urgent — connect with Kishor on WhatsApp NOW.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20URGENT%20-%20my%20YouTube%20channel%20has%203%20copyright%20strikes.' } },
  ],
  'Not sure': [
    { id: 4, text: "No problem — Kishor can investigate and find the root cause. Connect on WhatsApp for a free initial chat.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20need%20help%20but%20not%20sure%20about%20the%20issue.' } },
  ],
  'Invalid traffic': [
    { id: 4, text: "Invalid traffic issues can be resolved with the right approach. Connect with Kishor on WhatsApp.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20have%20an%20invalid%20traffic%20issue.' } },
  ],
  'Content issue': [
    { id: 4, text: "Content-related policy violations need specific fixes. Connect with Kishor on WhatsApp for help.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20have%20a%20content%20policy%20violation.' } },
  ],
  'Payment pending': [
    { id: 4, text: "Pending payments can often be released with the right steps. Connect with Kishor on WhatsApp.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20my%20payment%20is%20pending.' } },
  ],
  'Wrong bank details': [
    { id: 4, text: "Wrong bank details can be corrected. Connect with Kishor on WhatsApp for immediate help.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20have%20wrong%20bank%20details%20on%20my%20account.' } },
  ],
  'Verification needed': [
    { id: 4, text: "Payment verification is a common issue. Connect with Kishor on WhatsApp to get it resolved.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20need%20payment%20verification%20help.' } },
  ],
  'Account Issue': [
    { id: 4, text: "I can help with account issues on any platform. Connect with Kishor on WhatsApp for a free assessment.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20have%20an%20account%20issue.' } },
  ],
  'Payment/Payout': [
    { id: 4, text: "Payment and payout issues are fixable. Connect with Kishor on WhatsApp for help.", isBot: true, action: { label: 'Chat with Kishor on WhatsApp', href: 'https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20have%20a%20payment%2Fpayout%20issue.' } },
  ],
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!hasInteracted && !sessionStorage.getItem('chatPrompted')) {
      const timer = setTimeout(() => {
        setHasInteracted(true);
        sessionStorage.setItem('chatPrompted', 'true');
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const handleOption = (option: string) => {
    const userMsg: Message = { id: Date.now(), text: option, isBot: false };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const botResponses = responses[option];
      if (botResponses) {
        setMessages(prev => [...prev, ...botResponses]);
      }
    }, 600);
  };

  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thanks for your message! For the best help, please continue on WhatsApp where Kishor can respond directly.",
        isBot: true,
        action: { label: 'Open WhatsApp', href: `https://wa.me/9779843818304?text=${encodeURIComponent(text)}` },
      }]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setHasInteracted(false); }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-foreground text-background'
            : 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-cyan-500/30 hover:shadow-cyan-500/50'
        }`}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Prompt Badge */}
      {hasInteracted && !isOpen && (
        <div
          className="fixed bottom-[100px] right-6 z-50 bg-card border border-border rounded-xl px-4 py-2.5 shadow-xl animate-fade-in-up cursor-pointer"
          style={{ animationDuration: '0.3s' }}
          onClick={() => { setIsOpen(true); setHasInteracted(false); }}
        >
          <p className="text-sm font-medium text-foreground">Need help? Start a chat</p>
          <p className="text-xs text-muted-foreground">Free assessment</p>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[90px] right-6 z-50 w-[340px] max-w-[calc(100vw-48px)] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDuration: '0.25s' }}>
          {/* Header */}
          <div className="bg-cyan-600 dark:bg-cyan-500 text-white px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">K</div>
                <div>
                  <p className="font-semibold text-sm">Kishor's Recovery Chat</p>
                  <p className="text-xs text-white/80">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] ${msg.isBot ? '' : ''}`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isBot
                      ? 'bg-muted text-foreground rounded-bl-sm'
                      : 'bg-cyan-600 dark:bg-cyan-500 text-white rounded-br-sm'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOption(opt)}
                          className="px-3 py-1.5 text-xs font-medium border border-border rounded-full hover:bg-cyan-500/8 hover:border-cyan-500/30 text-foreground transition-all duration-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.action && (
                    <a
                      href={msg.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      {msg.action.label} <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2.5 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 text-sm bg-muted rounded-lg px-3 py-2 outline-none placeholder:text-muted-foreground/60"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-9 h-9 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center disabled:opacity-40 hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
