import { useEffect } from 'react';
import { getYearsExperienceText } from '@/lib/experience';

const PROFILE_IMAGE = '/kishwor-5-1770795722.jpg';
const SITE_URL = 'https://kishorupadhyaya.com.np';
const PHONE = '+977-9843818304';
const EMAIL = 'kishorupadhyaya222@gmail.com';

export default function SEOHead() {
  useEffect(() => {
    // Set dynamic title for the page
    document.title = 'Kishor Upadhyaya | Social Media Expert Nepal — All Problems Solved';

    // Add JSON-LD structured data for local business
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
        'https://www.facebook.com/kishorupadhyaya',
        'https://www.instagram.com/kishorupadhyaya',
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

    // Add Service schema
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

    // Add Organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Kishor Upadhyaya',
      url: SITE_URL,
      logo: PROFILE_IMAGE,
      description: `Professional account recovery expert with ${getYearsExperienceText()} years of experience`,
      sameAs: [
        'https://www.facebook.com/kishorupadhyaya',
        'https://www.instagram.com/kishorupadhyaya',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: 'en',
      },
    };

    // Create and append script tags
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
  }, []);

  return null;
}
