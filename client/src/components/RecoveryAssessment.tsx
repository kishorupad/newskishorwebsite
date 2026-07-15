import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Clock, Shield, MessageCircle } from 'lucide-react';

type Step = 0 | 1 | 2 | 3 | 4;

interface Answers {
  platform: string;
  issue: string;
  timeSinceIssue: string;
  hasAccountAccess: string;
  urgency: string;
}

const platformOptions = ['Facebook', 'Instagram', 'YouTube', 'TikTok', 'Google/AdSense', 'Other'];

const issuesByPlatform: Record<string, string[]> = {
  Facebook: ['Account Hacked/Locked', 'Monetization Problem', 'Payout/Bank Problem', 'Verification Badge', 'Page/Channel Issue', 'Ad Account Problem', 'Other'],
  Instagram: ['Account Hacked/Locked', 'Monetization Problem', 'Payout/Bank Problem', 'Verification Badge', 'Profile/Account Issue', 'Shadowban/Restriction', 'Other'],
  YouTube: ['Account Hacked/Locked', 'Monetization Problem', 'AdSense Issue', 'Payout/Bank Problem', 'Copyright Strike', 'Community Guidelines', 'Subscriber/Watch Time', 'Other'],
  TikTok: ['Account Hacked/Locked', 'Monetization Problem', 'Payout/Bank Problem', 'Creator Fund Issue', 'Follower/View Issue', 'Other'],
  'Google/AdSense': ['News AdSense Setup', 'Identity Verification', 'PIN/Address Verification', 'Payment Stuck', 'AdSense Disapproved', 'Policy Violation', 'Other'],
  Other: ['Account Hacked/Locked', 'Monetization Problem', 'Payout/Bank Problem', 'Verification Badge', 'Other'],
};
const timeOptions = ['Less than 24 hours', '1-3 days', '1-7 weeks', 'More than a month'];
const accessOptions = ['Yes, I have access', 'No, locked out', 'Not sure'];
const urgencyOptions = ['Critical — losing money', 'Important — need soon', 'Can wait a few days'];

function getAssessment(answers: Answers) {
  let score = 0;
  let urgency = 'normal';
  const tips: string[] = [];

  // Platform scoring
  if (answers.platform === 'Facebook' || answers.platform === 'Instagram') score += 30;
  else if (answers.platform === 'YouTube') score += 25;
  else score += 20;

  // Issue scoring
  if (answers.issue === 'Account Hacked/Locked') { score += 20; urgency = 'high'; tips.push('Change passwords on any accounts that share the same email immediately.'); }
  else if (answers.issue === 'Monetization Problem') { score += 25; tips.push('Monetization issues often require specific compliance fixes. I can identify what\'s blocking you.'); }
  else if (answers.issue === 'AdSense Issue') { score += 22; tips.push('AdSense problems usually stem from policy violations. I can help resolve disapprovals.'); }
  else if (answers.issue === 'Payout/Bank Problem') { score += 20; tips.push('Payout issues are often fixable quickly. Gather your payment screenshots before we start.'); }
  else if (answers.issue === 'Verification Badge') { score += 15; tips.push('Verification requires meeting platform criteria. I can help you qualify.'); }
  else if (answers.issue === 'Page/Channel Issue') { score += 18; tips.push('Page and channel issues vary widely. I\'ll assess the specific problem during consultation.'); }
  else { score += 15; }

  // Time scoring
  if (answers.timeSinceIssue === 'Less than 24 hours') { score += 25; if (urgency !== 'high') urgency = 'medium'; tips.push('Acting quickly gives the best results across all issue types.'); }
  else if (answers.timeSinceIssue === '1-3 days') score += 20;
  else if (answers.timeSinceIssue === '1-7 weeks') score += 12;
  else { score += 8; tips.push('Older issues are harder but not impossible. I\'ve resolved cases months old.'); }

  // Account access
  if (answers.hasAccountAccess === 'Yes, I have access') score += 15;
  else if (answers.hasAccountAccess === 'Not sure') tips.push('Try to confirm whether you can still access your account.');

  // Urgency
  if (answers.urgency === 'Critical — losing money') { score += 10; urgency = 'high'; tips.push('Since you\'re losing money, this is treated as emergency priority.'); }
  else if (answers.urgency === 'Important — need soon') score += 5;

  // Determine recovery chance
  let chance = '';
  let chanceColor = '';
  if (score >= 80) { chance = 'High'; chanceColor = 'text-emerald-600 dark:text-emerald-400'; }
  else if (score >= 60) { chance = 'Good'; chanceColor = 'text-cyan-600 dark:text-cyan-400'; }
  else if (score >= 40) { chance = 'Moderate'; chanceColor = 'text-amber-600 dark:text-amber-400'; }
  else { chance = 'Challenging'; chanceColor = 'text-orange-600 dark:text-orange-400'; }

  if (urgency === 'high') tips.unshift('This is time-sensitive. Contact me ASAP for the best results.');

  return { score, chance, chanceColor, urgency, tips };
}

export default function RecoveryAssessment() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>({ platform: '', issue: '', timeSinceIssue: '', hasAccountAccess: '', urgency: '' });
  const [showResult, setShowResult] = useState(false);

  const setAnswer = (key: keyof Answers, value: string) => {
    if (key === 'platform') {
      setAnswers(prev => ({ ...prev, platform: value, issue: '' }));
    } else {
      setAnswers(prev => ({ ...prev, [key]: value }));
    }
  };

  const canNext = () => {
    if (step === 0) return answers.platform !== '';
    if (step === 1) return answers.issue !== '';
    if (step === 2) return answers.timeSinceIssue !== '';
    if (step === 3) return answers.hasAccountAccess !== '';
    if (step === 4) return answers.urgency !== '';
    return false;
  };

  const handleNext = () => {
    if (step < 4) setStep((step + 1) as Step);
    else setShowResult(true);
  };

  const handleBack = () => {
    if (step > 0) setStep((step - 1) as Step);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({ platform: '', issue: '', timeSinceIssue: '', hasAccountAccess: '', urgency: '' });
    setShowResult(false);
  };

  const result = showResult ? getAssessment(answers) : null;

  const steps = [
    { question: 'Which platform?', options: platformOptions, key: 'platform' as const },
    { question: 'What\'s the problem?', options: issuesByPlatform[answers.platform] || issuesByPlatform['Other'], key: 'issue' as const },
    { question: 'How long ago?', options: timeOptions, key: 'timeSinceIssue' as const },
    { question: 'Account access?', options: accessOptions, key: 'hasAccountAccess' as const },
    { question: 'How urgent?', options: urgencyOptions, key: 'urgency' as const },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${i <= step ? 'bg-cyan-600 dark:bg-cyan-400' : 'bg-muted'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-2 font-medium">{step + 1}/5</span>
        </div>

        {!showResult ? (
          <>
            {/* Question */}
            <h3 className="text-xl font-bold mb-5">{steps[step].question}</h3>
            <div className="space-y-2 mb-8">
              {steps[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswer(steps[step].key, opt)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    answers[steps[step].key] === opt
                      ? 'border-cyan-500 bg-cyan-500/8 text-cyan-600 dark:text-cyan-400'
                      : 'border-border hover:border-cyan-500/30 hover:bg-muted/50 text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {opt}
                    {answers[steps[step].key] === opt && <CheckCircle size={16} className="text-cyan-600 dark:text-cyan-400" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canNext()}
                className="btn-gradient flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 4 ? 'Get Assessment' : 'Next'} <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : result ? (
          /* Result */
          <div className="animate-fade-in-up">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 font-[Sora]">Your Assessment</h3>
              <p className="text-muted-foreground text-sm">Based on your answers, here's my analysis</p>
            </div>

            {/* Score Card */}
            <div className="p-5 rounded-xl bg-muted/30 border border-border mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Solution Chance</span>
                {result.urgency === 'high' && (
                  <span className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
                    <AlertTriangle size={12} /> Urgent
                  </span>
                )}
              </div>
              <div className={`text-4xl font-bold font-[Sora] mb-1 ${result.chanceColor}`}>{result.chance}</div>
              <p className="text-muted-foreground text-sm">Likelihood of resolving your {answers.platform} {answers.issue} issue</p>

              {/* Score bar */}
              <div className="mt-4 h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Tips */}
            {result.tips.length > 0 && (
              <div className="mb-5">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Shield size={16} className="text-cyan-600 dark:text-cyan-400" /> What You Should Do Now
                </h4>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timeline */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border mb-5">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <Clock size={16} className="text-cyan-600 dark:text-cyan-400" /> Estimated Timeline
              </h4>
              <p className="text-muted-foreground text-sm">
                {result.score >= 80 && 'Most likely solvable within 24-48 hours.'}
                {result.score >= 60 && result.score < 80 && 'Typically takes 2-5 days to resolve.'}
                {result.score >= 40 && result.score < 60 && 'May take 1-2 weeks depending on platform response.'}
                {result.score < 40 && 'Complex case. I will assess in detail after initial consultation (Rs. 2,000).'}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/9779843818304?text=${encodeURIComponent(`Hi Kishor, I just took the assessment for my ${answers.platform} ${answers.issue} issue. My chance is ${result.chance}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle size={18} /> Start on WhatsApp
              </a>
              <button
                onClick={handleRestart}
                className="flex-1 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
