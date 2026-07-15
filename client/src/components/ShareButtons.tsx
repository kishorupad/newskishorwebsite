import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=KishorUpadhyaya`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  };

  const handleShare = (platform: string) => {
    const shareUrl = shareLinks[platform as keyof typeof shareLinks];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-muted-foreground">Share this article:</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {/* Facebook */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 hover:bg-blue-600/10 hover:border-blue-600"
          title="Share on Facebook"
        >
          <Facebook size={18} className="text-blue-600" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>

        {/* Twitter */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 hover:bg-sky-500/10 hover:border-sky-500"
          title="Share on Twitter"
        >
          <Twitter size={18} className="text-sky-500" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>

        {/* LinkedIn */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin')}
          className="flex items-center gap-2 hover:bg-blue-700/10 hover:border-blue-700"
          title="Share on LinkedIn"
        >
          <Linkedin size={18} className="text-blue-700" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>

        {/* WhatsApp */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-2 hover:bg-green-600/10 hover:border-green-600"
          title="Share on WhatsApp"
        >
          <MessageCircle size={18} className="text-green-600" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>

        {/* Copy Link */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary"
          title="Copy link to clipboard"
        >
          <Copy size={18} className={copied ? 'text-green-600' : 'text-muted-foreground'} />
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
        </Button>
      </div>
    </div>
  );
}
