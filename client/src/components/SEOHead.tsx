import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getYearsExperienceText } from '@/lib/experience';
import { articles } from '@/pages/Resources';

const PROFILE_IMAGE = '/kishwor-5-1770795722.jpg';
const SITE_URL = 'https://kishorupadhyaya.com.np';
const PHONE = '+977-9843818304';
const EMAIL = 'kishorupadhyaya222@gmail.com';

const pageMeta = {
  '/': {
    title: 'Kishor Upadhyaya | Social Media Expert Nepal - All Problems Solved',
    description:
      'Recover hacked Facebook, Instagram, and YouTube accounts in Nepal. Get AdSense, monetization, payout, verification, and social media support from Kishor Upadhyaya.',
    keywords:
      'social media expert Nepal, facebook recovery Nepal, instagram recovery Kathmandu, youtube monetization Nepal, adsense help Nepal, hacked account recovery Nepal, kishor upadhyaya, social media consultant Nepal',
  },
  '/resources': {
    title: 'Social Media Security Tips & Recovery Guides | Kishor Upadhyaya',
    description:
      'Read practical Facebook, Instagram, YouTube, and cybersecurity guides for hacked account recovery, password safety, phishing prevention, and account protection in Nepal.',
    keywords:
      'social media security Nepal, facebook account recovery guide, instagram hacked account help, password security tips, phishing awareness Nepal, account protection guide',
  },
  '/services': {
    title: 'Social Media Services in Nepal | Account Recovery & Monetization',
    description:
      'Account recovery, monetization setup, AdSense support, payout fixes, and platform protection for Facebook, Instagram, YouTube, and more in Nepal.',
    keywords:
      'facebook recovery service Nepal, youtube monetization support, adsense fix Nepal, social media services Nepal',
  },
  '/how-it-works': {
    title: 'How the Recovery Process Works | Kishor Upadhyaya',
    description:
      'Learn how Kishor Upadhyaya handles hacked account recovery, verification, monetization fixes, and social media problem-solving step by step.',
    keywords:
      'how social media recovery works, account recovery process Nepal, hacked account help process, social media support steps',
  },
  '/assessment': {
    title: 'Free Social Media Problem Assessment | Kishor Upadhyaya',
    description:
      'Get a free assessment for Facebook, Instagram, YouTube, AdSense, and social media platform issues in Nepal.',
    keywords:
      'free social media assessment Nepal, facebook problem check, instagram issue diagnosis, youtube monetization assessment',
  },
  '/booking': {
    title: 'Book a Case Review | Kishor Upadhyaya',
    description:
      'Book a 30-minute social media case review with Kishor Upadhyaya. Pay the Rs. 2,000 consultation fee online and lock your slot - Facebook, Instagram, YouTube, TikTok, AdSense.',
    keywords:
      'book social media consultation Nepal, account recovery booking, kishor upadhyaya booking, social media expert appointment Nepal',
  },
  '/contact': {
    title: 'Contact Kishor Upadhyaya | Social Media Expert Nepal',
    description:
      'Contact Kishor Upadhyaya for Facebook, Instagram, YouTube, and AdSense recovery support in Nepal.',
    keywords:
      'contact social media expert Nepal, reach kishor upadhyaya, facebook support Nepal, instagram help Nepal',
  },
};

const setMetaTag = (selector: string, attribute: string, value: string) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (!element) {
    element = document.createElement(selector.includes('meta') ? 'meta' : 'link');
    if (selector.includes('property=')) {
      const attr = selector.match(/property="([^"]+)"/)?.[1];
      if (attr) element.setAttribute('property', attr);
    }
    if (selector.includes('name=')) {
      const attr = selector.match(/name="([^"]+)"/)?.[1];
      if (attr) element.setAttribute('name', attr);
    }
    if (selector.startsWith('link')) {
      element.setAttribute('rel', 'canonical');
    }
    document.head.appendChild(element);
  }

  if (selector.startsWith('link')) {
    element.setAttribute('href', value);
    return;
  }

  element.setAttribute(attribute, value);
};

export default function SEOHead() {
  const [location] = useLocation();

  useEffect(() => {
    const currentPath = location || '/';
    const articleMatch = currentPath.match(/^\/resources\/([\w-]+)$/);
    const article = articleMatch
      ? articles.find((art) => art.slug === articleMatch[1])
      : undefined;
    const meta = article
      ? {
          title: `${article.title} | Kishor Upadhyaya`,
          description: article.excerpt,
          keywords: `social media guide nepal, ${article.title.toLowerCase()}, account security nepal, kishor upadhyaya`,
        }
      : pageMeta[currentPath as keyof typeof pageMeta] || pageMeta['/'];

    document.title = meta.title;

    setMetaTag('meta[name="description"]', 'content', meta.description);
    setMetaTag('meta[name="keywords"]', 'content', meta.keywords);
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag('meta[property="og:description"]', 'content', meta.description);
    setMetaTag('meta[property="og:url"]', 'content', `${SITE_URL}${currentPath === '/' ? '' : currentPath}`);
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'content', meta.description);
    setMetaTag('link[rel="canonical"]', 'href', `${SITE_URL}${currentPath === '/' ? '' : currentPath}`);

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Kishor Upadhyaya - Social Media Expert',
      description: 'Professional social media expert specializing in Facebook, Instagram, and YouTube account recovery',
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      areaServed: 'NP',
      priceRange: '$$',
      image: PROFILE_IMAGE,
      sameAs: [
        'https://www.facebook.com/kishorupp',
        'https://www.instagram.com/kishorupp',
        'https://www.linkedin.com/in/kishorupadhyaya/',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '500',
        bestRating: '5',
        worstRating: '1',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NP',
        addressLocality: 'Kathmandu',
      },
    };

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Account Recovery Service',
      description: 'Professional recovery of hacked social media accounts',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Kishor Upadhyaya',
      },
      areaServed: 'NP',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: SITE_URL,
        availableLanguage: 'en',
      },
    };

    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Kishor Upadhyaya',
      url: SITE_URL,
      logo: PROFILE_IMAGE,
      description: `Professional account recovery expert with ${getYearsExperienceText()} years of experience`,
      sameAs: [
        'https://www.facebook.com/kishorupp',
        'https://www.instagram.com/kishorupp',
        'https://www.linkedin.com/in/kishorupadhyaya/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: 'en',
      },
    };

    const schemas = [localBusinessSchema, serviceSchema, organizationSchema];

    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach((script) => {
        if (
          script.innerHTML.includes('Kishor Upadhyaya') ||
          script.innerHTML.includes('Account Recovery Service')
        ) {
          script.remove();
        }
      });
    };
  }, [location]);

  return null;
}
