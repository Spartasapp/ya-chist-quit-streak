# BadHabits PWA

PWA for tracking abstinence streaks for:
- Alcohol
- Cigarettes

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

Set in your deploy platform:

```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_SLOT_ID=1234567890
```

## Deployment

- Netlify settings are configured in `netlify.toml`.
- Public compliance files are served from `public/`:
  - `/.well-known/assetlinks.json`
  - `/app-ads.txt`

## Privacy Policy

Privacy Policy is available in-app via the dedicated Privacy tab.
