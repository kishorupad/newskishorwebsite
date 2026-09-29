import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ShareButtons from '@/components/ShareButtons';
import { articles } from './Resources';
import PageBackdrop from '@/components/PageBackdrop';

const SITE_URL = 'https://kishorupadhyaya.com.np';

/** Article detail page at /resources/:slug with per-article SEO meta (see SEOHead). */
export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground relative">
      <PageBackdrop />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">This guide may have been moved or removed.</p>
          <Button onClick={() => setLocation('/resources')}>&larr; Back to Resources</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => setLocation('/resources')} className="mb-8">
            &larr; Back to Resources
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-muted rounded-lg">{article.icon}</div>
              <div>
                <span className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {article.category === 'cybersecurity' && 'Security'}
                  {article.category === 'recovery' && 'Recovery'}
                  {article.category === 'prevention' && 'Prevention'}
                </span>
                <h1 className="text-4xl font-bold mt-2">{article.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{article.readTime} minute read</span>
            </div>
          </div>

          {/* Article Content */}
          <Card className="p-8 prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-base leading-relaxed space-y-4">
              {article.content.split('\n\n').map((paragraph, idx) => (
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
                          ) : line.match(/^\d+\./) ? (
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
              title={article.title}
              url={`${SITE_URL}/resources/${article.slug}`}
              description={article.excerpt}
            />
          </Card>

          {/* CTA Section */}
          <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
            <p className="text-muted-foreground mb-6">
              If you&apos;re dealing with a compromised account or need expert assistance, I&apos;m
              here to help. Book a review and let&apos;s get your problem solved.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setLocation('/contact')}>
                Get Help Now
              </Button>
              <Button variant="outline" onClick={() => setLocation('/contact')}>
                Contact Me
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
