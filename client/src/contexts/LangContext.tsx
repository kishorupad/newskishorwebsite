import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'en' | 'ne';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, ne: string) => string;
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: (en) => en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try { return (localStorage.getItem('lang') as Lang) || 'en'; } catch { return 'en'; }
  });
  const handleSet = useCallback((l: Lang) => { try { localStorage.setItem('lang', l); } catch {} setLang(l); }, []);
  const t = useCallback((en: string, ne: string) => lang === 'ne' ? ne : en, [lang]);
  return <Ctx.Provider value={{ lang, setLang: handleSet, t }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }
