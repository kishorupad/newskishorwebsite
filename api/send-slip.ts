// Vercel serverless function: forwards a payment-slip image to Kishor's WhatsApp
// via the WhatsApp Business Cloud API.
//
// Flow: visitor uploads slip on /booking or /checklist -> frontend POSTs the
// image (base64 JSON) here -> we upload it to Meta, then send a template
// message with the image header to WHATSAPP_TO.
//
// Required Vercel env vars (Project Settings -> Environment Variables):
//   WHATSAPP_TOKEN            permanent system-user access token
//   WHATSAPP_PHONE_NUMBER_ID  the Cloud API phone number ID (sender)
// Optional:
//   WHATSAPP_TO        receiver, defaults to 9779843818304
//   WHATSAPP_TEMPLATE  approved utility template name, defaults to "booking_slip"
//
// Template "booking_slip" (Utility, header type IMAGE, language en) must have
// 5 body text variables in this order:
//   {{1}} = kind + ref  (e.g. "Booking KUP-2026-XXXX-XXXX")
//   {{2}} = customer name
//   {{3}} = customer phone
//   {{4}} = slot line + service/item
//   {{5}} = fee
// Example body:
//   New payment slip - {{1}}
//   Name: {{2}}
//   Phone: {{3}}
//   Detail: {{4}}
//   Fee: {{5}}
//   Payment screenshot attached above. Please verify and confirm on WhatsApp.

export const maxDuration = 30;

const GRAPH_VERSION = 'v21.0';
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

// Tiny in-memory rate limiter (per warm serverless instance).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 500) hits.clear();
  return arr.length > 5;
}

interface ReqBody {
  image?: string;    // base64, with or without data: prefix
  mime?: string;
  filename?: string;
  kind?: 'booking' | 'order';
  ref?: string;      // booking / order ID
  name?: string;
  phone?: string;
  line?: string;     // slot line (booking) or product (order)
  item?: string;     // service title / product name
  fee?: string;
}

function cleanBase64(s: string): string {
  const i = s.indexOf(',');
  return (i >= 0 ? s.slice(i + 1) : s).replace(/\s+/g, '');
}

function safeFilename(name: string): string {
  return (name || 'slip.png').replace(/["\\\r\n]/g, '').slice(0, 80) || 'slip.png';
}

function buildMultipart(file: Buffer, filename: string, mime: string): { body: Buffer; boundary: string } {
  const boundary = '----slipform-' + Math.random().toString(36).slice(2);
  const head = (extra: string) => Buffer.from(extra, 'utf8');
  const parts: Buffer[] = [
    head(`--${boundary}\r\nContent-Disposition: form-data; name="messaging_product"\r\n\r\nwhatsapp\r\n`),
    head(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: ${mime}\r\n\r\n`),
    file,
    head(`\r\n--${boundary}--\r\n`),
  ];
  return { body: Buffer.concat(parts), boundary };
}

async function metaFetch(path: string, token: string, init: RequestInit): Promise<{ ok: boolean; status: number; json: any }> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}${path}`, {
      ...init,
      signal: ctrl.signal,
      headers: { Authorization: `Bearer ${token}`, ...(init.headers || {}) },
    });
    let json: any = null;
    try { json = await res.json(); } catch { /* non-JSON */ }
    return { ok: res.ok, status: res.status, json };
  } finally {
    clearTimeout(t);
  }
}

// Minimal Vercel handler types (no extra dependency needed).
type VReq = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: any;
  socket?: { remoteAddress?: string };
};
type VRes = {
  status: (code: number) => VRes;
  json: (obj: unknown) => void;
  setHeader: (k: string, v: string) => void;
};

export default async function handler(req: VReq, res: VRes) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'too_many_requests' });

  // Best-effort same-origin check (mirrors the Express CSRF middleware).
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (typeof origin === 'string' && typeof host === 'string') {
    try {
      if (new URL(origin).host !== String(host).split(',')[0].trim()) {
        return res.status(403).json({ ok: false, error: 'origin_mismatch' });
      }
    } catch {
      return res.status(403).json({ ok: false, error: 'bad_origin' });
    }
  }

  const token = process.env.WHATSAPP_TOKEN || '';
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
  if (!token || !phoneNumberId) {
    return res.status(503).json({ ok: false, error: 'not_configured' });
  }
  const to = process.env.WHATSAPP_TO || '9779843818304';
  const template = process.env.WHATSAPP_TEMPLATE || 'booking_slip';

  const b = (req.body || {}) as ReqBody;
  const mime = (b.mime || '').toLowerCase();
  if (!b.image || !ALLOWED_MIME.has(mime)) {
    return res.status(400).json({ ok: false, error: 'bad_image' });
  }
  let file: Buffer;
  try {
    file = Buffer.from(cleanBase64(b.image), 'base64');
  } catch {
    return res.status(400).json({ ok: false, error: 'bad_image' });
  }
  if (file.length === 0 || file.length > MAX_BYTES) {
    return res.status(400).json({ ok: false, error: 'bad_image_size' });
  }

  const ref = String(b.ref || '').slice(0, 40);
  const name = String(b.name || '').slice(0, 60);
  const phone = String(b.phone || '').slice(0, 20);
  const line = String(b.line || '').slice(0, 80);
  const item = String(b.item || '').slice(0, 60);
  const fee = String(b.fee || '').slice(0, 20);
  const kindLabel = b.kind === 'order' ? 'Checklist order' : 'Booking';

  // 1) Upload the image to Meta, get a media ID.
  const { body, boundary } = buildMultipart(file, safeFilename(b.filename || ''), mime);
  const up = await metaFetch(`/${phoneNumberId}/media`, token, {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body: new Uint8Array(body),
  });
  const mediaId = up.json && up.json.id;
  if (!up.ok || !mediaId) {
    const detail = up.json && up.json.error && up.json.error.message
      ? String(up.json.error.message).slice(0, 160) : 'media_upload_failed';
    return res.status(502).json({ ok: false, error: 'media_upload_failed', detail });
  }

  // 2) Send the template message with the slip as the image header.
  const msg = await metaFetch(`/${phoneNumberId}/messages`, token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: template,
        language: { code: 'en' },
        components: [
          { type: 'header', parameters: [{ type: 'image', image: { id: mediaId } }] },
          {
            type: 'body',
            parameters: [
              { type: 'text', text: `${kindLabel} ${ref}`.trim() },
              { type: 'text', text: name || '-' },
              { type: 'text', text: phone || '-' },
              { type: 'text', text: `${line} · ${item}`.trim() },
              { type: 'text', text: fee || '-' },
            ],
          },
        ],
      },
    }),
  });
  if (!msg.ok) {
    const detail = msg.json && msg.json.error && msg.json.error.message
      ? String(msg.json.error.message).slice(0, 160) : 'send_failed';
    return res.status(502).json({ ok: false, error: 'send_failed', detail });
  }

  return res.status(200).json({ ok: true });
}
