# BadHabits PWA

Modern PWA for abstinence tracking for two habits:
- Alcohol
- Cigarettes

## Tech Stack

- React + TypeScript + Vite
- IndexedDB via Dexie
- TailwindCSS (dark + glassmorphism)
- Framer Motion
- vite-plugin-pwa

## Features

- Daily checkmark with streak reset when day is missed
- Current/max streak and progress cards
- Relapses and monthly heatmap calendars in stats
- History and relapses with month pagination
- PWA installability and offline support

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## TWA + Google Play Checklist

1. Host app on HTTPS domain.
2. Update `public/.well-known/assetlinks.json` with your real:
   - Android package name
   - Play signing SHA-256
3. Publish these files on your domain:
   - `/.well-known/assetlinks.json`
   - `/privacy-policy` (SPA route; ensure host rewrite to `index.html`)
   - `/app-ads.txt`
3. Use Bubblewrap:
   - `npm i -g @bubblewrap/cli`
   - `bubblewrap init --manifest https://your-domain/manifest.webmanifest`
   - `bubblewrap build`
4. Open generated Android project and prepare Play release.

## AdSense Banner

Set environment variables in production:

```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_SLOT_ID=1234567890
```

For Play Console:
- mark app as containing ads
- complete Data safety according to your real data usage
- add a valid public Privacy Policy URL
