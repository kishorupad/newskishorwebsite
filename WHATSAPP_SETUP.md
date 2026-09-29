# WhatsApp Business API - payment slip auto-send setup

Yo guide le booking/checklist page bata payment screenshot **sidhai timro WhatsApp ma
auto-send** garne Cloud API setup explain garcha. Setup nabhaesamma site le
ahilekai manual fallback (WhatsApp khulcha, user le slip attach garcha) use garcha -
kehi pani break hudaina.

## Kasari kaam garcha

1. User le booking/checklist ma payment slip (screenshot) upload garcha.
2. Site ko `/api/send-slip` function le tyo image Meta ko server ma upload garera
   timro WhatsApp Business number bata timro personal WhatsApp (`9779843818304`)
   ma approved template message pathaucha - slip image header sahit.
3. API fail vayema (key chaina, template approve chaina, network error) frontend
   automatically manual mode ma jancha: WhatsApp chat khulcha ra user lai slip
   attach garna vancha.

## Step-by-step setup

### 1. Meta developer app banau

1. https://developers.facebook.com ma jau, login gara.
2. **My Apps > Create App** - type: **Business**.
3. App ma **WhatsApp > Set up** product add gara.

### 2. WhatsApp Business number setup

1. Meta dashboard > WhatsApp > API Setup ma **phone number** add gara.
   - Yo number ma WhatsApp app install **nahune** number hunu parcha (naya SIM, or
     existing WhatsApp number migrate gara - migration le tyo number ko chat history
     WhatsApp app bata hataucha, sochera gara).
   - Nepal ko number (+977) pani support huncha.
2. Test number bata suru garna milcha, tara real customer message ko lagi
   **business verification** ra display name approval chahinchha.

### 3. Permanent access token

Temporary (24-hr) token le production chaldaina. Permanent token ko lagi:

1. Business Settings > **System Users** ma naya system user banau (type: Admin).
2. WhatsApp app > **Add assets** - system user lai WhatsApp Business Account assign gara.
3. System user > **Generate new token** - scope: `whatsapp_business_messaging`,
   `whatsapp_business_management` select gara. Token copy garera safe thau ma rakha.

### 4. Template `booking_slip` approve gara

WhatsApp Manager > **Message templates** > Create template:

- Name: `booking_slip`
- Language: **English**
- Category: **Utility**
- Header: **Image**
- Body (example - variable order tala ko code sanga match hunu parcha):

```
New payment slip - {{1}}
Name: {{2}}
Phone: {{3}}
Detail: {{4}}
Fee: {{5}}
Payment screenshot attached above. Please verify and confirm on WhatsApp.
```

Submit gara - approval ma normally few minutes to 1 day lagcha.

### 5. Vercel ma environment variables

Vercel project > Settings > Environment Variables ma add gara:

| Variable | Ke ho |
|---|---|
| `WHATSAPP_TOKEN` | Step 3 ko permanent token (required) |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp > API Setup ma dekhincha (required) |
| `WHATSAPP_TO` | Slip kaha pathaune - default `9779843818304` (optional) |
| `WHATSAPP_TEMPLATE` | Template name - default `booking_slip` (optional) |

Add garepachi **Redeploy** gara (env var change le auto-redeploy hudaina).

### 6. Test

1. Preview/production site ma booking page khola.
2. Test payment slip upload garera "Confirm on WhatsApp" thich.
3. Timro WhatsApp ma template message + slip image aunu parcha.
4. API fail vayema button le "Slip auto-send vayena" vancha ra manual attach guide dekhaucha.

## Limit ra kharcha

- WhatsApp Cloud API **free tier**: mahina ko 1,000 service conversation samma free
  (utility template message pani conversation bhitra ganchha).
- Tyo bhanda badi vayema Meta le per-conversation charge lagaucha - Nepal ko rate
  Meta ko pricing page ma check gara (2026 ma utility ~$0.01-0.03 per conversation).
- Image size limit: 4 MB (code ma check cha).
- Rate limit: basic per-instance limit code ma cha; heavy use vayema Redis-based
  limit ma upgrade gara.

## Privacy note

Slip upload garesi tyo image **timro website ko server (Vercel function) hudai
Meta/WhatsApp ko server** ma jancha, ani timro WhatsApp ma deliver huncha.
Production ma jada Privacy page ma yo kura disclose garnu parcha - ke pathaincha,
kina (payment verification), ra kati samaya retain huncha.
