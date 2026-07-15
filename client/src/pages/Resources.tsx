import { useState } from 'react';
import { Search, Shield, Lock, AlertCircle, CheckCircle, BookOpen, Eye, Smartphone, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShareButtons from '@/components/ShareButtons';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'cybersecurity' | 'recovery' | 'prevention';
  readTime: number;
  icon: React.ReactNode;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'How to Recognize Phishing Attacks',
    excerpt: 'Learn to identify common phishing tactics and protect your accounts from fraudsters.',
    content: `Phishing attacks are one of the most common ways hackers gain access to accounts. Here's what you need to know:

**Warning Signs of Phishing:**
- Emails from "trusted" companies asking you to verify your password
- Urgent messages claiming your account will be closed
- Links that look similar to legitimate sites but have slight differences
- Requests for personal information via email or chat
- Poor grammar and spelling in official-looking emails

**How to Protect Yourself:**
1. Never click links in unsolicited emails - go directly to the website instead
2. Check the sender's email address carefully
3. Hover over links to see the actual URL before clicking
4. Use browser extensions that warn about phishing sites
5. Enable two-factor authentication on all important accounts

**If You've Been Phished:**
- Change your password immediately
- Enable two-factor authentication
- Monitor your account for suspicious activity
- Contact the company if you provided sensitive information
- Consider reaching out to me for account recovery assistance`,
    category: 'cybersecurity',
    readTime: 5,
    icon: <AlertCircle className="text-orange-500" size={24} />,
  },
  {
    id: '2',
    title: 'Creating Strong, Unique Passwords',
    excerpt: 'Master password security to protect all your online accounts.',
    content: `A strong password is your first line of defense against account compromise.

**What Makes a Password Strong:**
- At least 12-16 characters long
- Mix of uppercase and lowercase letters
- Numbers and special characters (!@#$%^&*)
- Unique for each account
- Not based on personal information

**Password Security Best Practices:**
1. Use a password manager (Bitwarden, 1Password, LastPass)
2. Never reuse passwords across different sites
3. Avoid common words and patterns (123456, password, qwerty)
4. Don't share passwords via email or chat
5. Change passwords if you suspect compromise

**Password Manager Benefits:**
- Stores passwords securely encrypted
- Generates strong random passwords
- Auto-fills login forms
- Alerts you to weak or reused passwords
- Syncs across devices

**Example of a Strong Password:**
Instead of: "password123"
Use: "BlueMountain$Sunset#2024!"

Remember: A password manager makes strong passwords effortless.`,
    category: 'prevention',
    readTime: 6,
    icon: <Key className="text-blue-500" size={24} />,
  },
  {
    id: '3',
    title: 'Two-Factor Authentication: Your Safety Net',
    excerpt: 'Understand why 2FA is essential and how to set it up correctly.',
    content: `Two-factor authentication (2FA) adds an extra security layer to your accounts.

**How Two-Factor Authentication Works:**
1. You enter your username and password
2. The service sends a code to your phone or email
3. You enter this code to complete login
4. Even if someone has your password, they can't access your account

**Types of 2FA:**
- SMS (text message) - least secure but widely available
- Email codes - more secure than SMS
- Authenticator apps (Google Authenticator, Authy) - most secure
- Hardware security keys - highest security level

**Setting Up 2FA:**
1. Go to your account security settings
2. Look for "Two-Factor Authentication" or "Two-Step Verification"
3. Choose your preferred method
4. Follow the setup instructions
5. Save backup codes in a safe place

**Important Tips:**
- Use authenticator apps instead of SMS when possible
- Keep backup codes in a secure location
- Don't share 2FA codes with anyone
- Update your recovery phone number regularly
- Test your backup codes to ensure they work

**Which Accounts Need 2FA:**
- Email (critical - it's the key to all other accounts)
- Social media (Facebook, Instagram, Twitter, YouTube)
- Banking and financial accounts
- Password managers
- Work/professional accounts
- Any account with sensitive information`,
    category: 'prevention',
    readTime: 7,
    icon: <Smartphone className="text-green-500" size={24} />,
  },
  {
    id: '4',
    title: 'Steps to Recover a Hacked Facebook Account',
    excerpt: 'A comprehensive guide to regaining access to your compromised Facebook account.',
    content: `If your Facebook account has been hacked, don't panic. Here's what to do:

**Immediate Actions:**
1. Try logging in with your password
2. If you can't access it, click "Forgot Password"
3. Use the email or phone number associated with your account
4. Follow Facebook's account recovery process

**Using Facebook's Built-in Recovery:**
1. Go to facebook.com/login/identify
2. Enter your email or phone number
3. Select "This is my account"
4. Follow the prompts to verify your identity
5. Create a new password

**If You Can't Verify Your Identity:**
- Facebook may ask for a photo ID
- You can upload a government-issued ID
- The process may take a few days
- Keep checking your email for updates

**After Regaining Access:**
1. Change your password immediately
2. Review login activity and remove suspicious sessions
3. Check privacy settings and permissions
4. Remove unauthorized apps
5. Enable two-factor authentication
6. Review recent changes to your profile

**Prevention for Future:**
- Use a strong, unique password
- Enable 2FA immediately
- Add a recovery email address
- Keep your phone number updated
- Regularly review login activity

**When to Seek Professional Help:**
- You can't verify your identity
- Your account is permanently disabled
- You've lost access to recovery email/phone
- The account contains important business information
- You need immediate recovery

I can help with complex Facebook recovery cases. Contact me if you're stuck in the recovery process.`,
    category: 'recovery',
    readTime: 8,
    icon: <Shield className="text-purple-500" size={24} />,
  },
  {
    id: '5',
    title: 'Instagram Account Hacked? Here\'s What to Do',
    excerpt: 'Quick recovery steps for compromised Instagram accounts.',
    content: `Instagram hacks are common, but recovery is possible with the right steps.

**Step 1: Try Logging In**
- Go to instagram.com
- Click "Forgot Password"
- Enter your email, username, or phone number
- Check your email for recovery link
- Create a new strong password

**Step 2: Use Instagram's Help Center**
- Visit help.instagram.com
- Select "Hacked Accounts"
- Follow their automated recovery process
- Provide required information

**Step 3: Verify Your Identity**
- Instagram may ask for a selfie
- Take a clear photo holding a piece of paper with a code
- Follow their specific instructions
- Wait for verification (usually 24-48 hours)

**Step 4: Secure Your Account**
- Change password to something strong and unique
- Review connected apps and remove suspicious ones
- Check login activity
- Enable two-factor authentication
- Add a recovery email address

**What to Check After Recovery:**
- Profile information (bio, website, contact info)
- Followers list (remove suspicious accounts)
- Posts (check if anything was posted while hacked)
- Messages (review recent conversations)
- Linked accounts (Facebook, etc.)

**Prevent Future Hacks:**
- Use a unique, strong password
- Enable 2FA with authenticator app
- Keep recovery email and phone updated
- Don't share login credentials
- Be cautious of phishing links
- Log out of suspicious sessions

**If You're Still Locked Out:**
- Ensure you're using the correct email/username
- Check spam folder for recovery emails
- Wait 24 hours before trying again
- Contact Instagram support directly
- Consider professional recovery assistance`,
    category: 'recovery',
    readTime: 6,
    icon: <Eye className="text-pink-500" size={24} />,
  },
  {
    id: '6',
    title: 'Protecting Your YouTube Channel from Hackers',
    excerpt: 'Essential security measures for YouTube creators and channel owners.',
    content: `Your YouTube channel is valuable - protect it with these security practices.

**YouTube-Specific Security:**
1. Use a unique, strong password
2. Enable 2FA on your Google Account
3. Review connected apps in Google Account settings
4. Check login activity regularly
5. Use a recovery phone number and email

**Securing Your Google Account (YouTube\'s Parent):**
- Go to myaccount.google.com
- Click "Security" in the left menu
- Review your connected devices
- Check for suspicious activity
- Update recovery information

**What to Do If Your Channel Is Hacked:**
1. Try logging into your Google Account
2. If locked out, use account recovery
3. Once in, change your password immediately
4. Review channel permissions and collaborators
5. Check for unauthorized videos or playlists
6. Review monetization settings
7. Contact YouTube Support if needed

**Recovering a Compromised Channel:**
- Document the hack (screenshots, timestamps)
- Report to YouTube immediately
- Provide proof of ownership
- YouTube will investigate and restore if verified
- Restore your channel settings and content

**Post-Recovery Steps:**
- Delete any unauthorized videos
- Remove suspicious collaborators
- Update channel description and links
- Review all connected accounts
- Enable all available security features
- Inform your subscribers of the incident

**Long-term Protection:**
- Enable 2FA with authenticator app
- Use a password manager
- Regularly audit connected apps
- Monitor channel analytics for anomalies
- Keep recovery information current
- Enable YouTube Studio security features`,
    category: 'recovery',
    readTime: 7,
    icon: <Lock className="text-red-500" size={24} />,
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cybersecurity' | 'recovery' | 'prevention'>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-primary" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold">Resources & Guides</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn how to protect your accounts, recognize threats, and recover from compromises with expert guidance.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!selectedArticle ? (
          <>
            {/* Search and Filter */}
            <div className="mb-12 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search guides and tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-base"
                />
              </div>

              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="cybersecurity">Security</TabsTrigger>
                  <TabsTrigger value="recovery">Recovery</TabsTrigger>
                  <TabsTrigger value="prevention">Prevention</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="p-6 hover:shadow-lg transition cursor-pointer group"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-muted rounded-lg group-hover:bg-primary/10 transition">
                        {article.icon}
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {article.category === 'cybersecurity' && 'Security'}
                        {article.category === 'recovery' && 'Recovery'}
                        {article.category === 'prevention' && 'Prevention'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">{article.readTime} min read</span>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition">
                        Read More →
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto text-muted-foreground mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Article View */}
            <div className="max-w-3xl mx-auto">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => setSelectedArticle(null)}
                className="mb-8"
              >
                ← Back to Resources
              </Button>

              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-muted rounded-lg">
                    {selectedArticle.icon}
                  </div>
                  <div>
                    <span className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {selectedArticle.category === 'cybersecurity' && 'Security'}
                      {selectedArticle.category === 'recovery' && 'Recovery'}
                      {selectedArticle.category === 'prevention' && 'Prevention'}
                    </span>
                    <h1 className="text-4xl font-bold mt-2">{selectedArticle.title}</h1>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{selectedArticle.readTime} minute read</span>
                </div>
              </div>

              {/* Article Content */}
              <Card className="p-8 prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-base leading-relaxed space-y-4">
                  {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                    <div key={idx}>
                      {paragraph.startsWith('**') ? (
                        <div>
                          {paragraph.split('\n').map((line, lineIdx) => (
                            <div key={lineIdx}>
                              {line.startsWith('**') ? (
                                <p className="font-bold text-lg mt-4 mb-2">
                                  {line.replace(/\*\*/g, '')}
                                </p>
                              ) : line.startsWith('-') ? (
                                <li className="ml-6 mb-1">{line.substring(1).trim()}</li>
                              ) : line.startsWith('1.') || line.match(/^\d+\./) ? (
                                <li className="ml-6 mb-1">{line.replace(/^\d+\.\s/, '')}</li>
                              ) : (
                                <p>{line}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Share Buttons */}
              <Card className="mt-12 p-8 border-border">
                <ShareButtons
                  title={selectedArticle.title}
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  description={selectedArticle.excerpt}
                />
              </Card>

              {/* CTA Section */}
              <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
                <p className="text-muted-foreground mb-6">
                  If you're dealing with a compromised account or need expert assistance, I'm here to help. With 8+ years of experience and a 98% success rate, I can recover your account quickly and securely.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90">Get Help Now</Button>
                  <Button variant="outline">Contact Me</Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
