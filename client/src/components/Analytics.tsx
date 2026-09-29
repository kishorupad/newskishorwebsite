import { useEffect } from 'react';

// Set VITE_GA_MEASUREMENT_ID in Vercel -> Project Settings -> Environment Variables
// (e.g. G-ABC123XYZ). When unset, no analytics scripts are loaded.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

/** Loads Google Analytics (gtag) only when a real Measurement ID is configured. */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID || GA_ID === 'G-XXXXXXX') return;
    const loader = document.createElement('script');
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(loader);
    const config = document.createElement('script');
    config.innerHTML =
      `window.dataLayer=window.dataLayer||[];` +
      `function gtag(){dataLayer.push(arguments);}` +
      `gtag('js',new Date());gtag('config','${GA_ID}');`;
    document.head.appendChild(config);
  }, []);
  return null;
}
