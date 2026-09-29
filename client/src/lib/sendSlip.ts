// Sends an uploaded payment slip to Kishor's WhatsApp via the site's
// /api/send-slip serverless function (WhatsApp Business Cloud API).
// Returns true only if the API accepted and forwarded it; any failure
// (not configured, network, rate limit) returns false so the UI can
// fall back to "attach the screenshot in WhatsApp manually".

export interface SlipMeta {
  kind: 'booking' | 'order';
  ref: string;
  name: string;
  phone: string;
  line: string;
  item: string;
  fee: string;
}

export async function sendSlipViaApi(file: File, meta: SlipMeta): Promise<boolean> {
  try {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return false;
    if (file.size > 4 * 1024 * 1024) return false;
    const b64 = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        const s = String(r.result || '');
        const i = s.indexOf(',');
        resolve(i >= 0 ? s.slice(i + 1) : s);
      };
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    if (!b64 || b64.length > 5_800_000) return false;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 25000);
    let res: Response;
    try {
      res = await fetch('/api/send-slip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: b64, mime: file.type, filename: file.name, ...meta }),
        signal: ctrl.signal,
      });
    } finally {
      clearTimeout(t);
    }
    return res.ok;
  } catch {
    return false;
  }
}
