# novaaacode website

The novaaacode showcase website, built with React and Vite. Published at [analyticalahmad.github.io](https://analyticalahmad.github.io/).

## Run locally

This project uses Vite 8, which needs Node.js 20.19+ or 22.12+. Node 24 is already installed on this computer. In a terminal opened in this folder, run:

```bash
source ~/.nvm/nvm.sh
nvm use
npm ci
npm run dev
```

Open the URL printed by Vite. To check the production build:

```bash
npm run build
npm run preview
```

## Deployment

Pushing to `main` runs the included GitHub Actions workflow, which builds and publishes `dist/` to GitHub Pages. The folder name on your computer does not affect the website address.

## Content and assets

- Projects appear in the approved order with names only: AI Smart CV Builder, CalTracker, WhatCanICook, Parkly, SplitBill.
- CalTracker and WhatCanICook card images are the screenshots Ahmad supplied. The Parkly and SplitBill images are still frames from the finished project videos (around 30 seconds and 21 seconds, respectively). `public/project-images/ai-smart-cv-builder.svg` is a custom visual concept made for this site; it is not presented as a product screenshot.
- The original supplied logo is in `public/novaaacode-logo.jpg`.
- Contact links use the supplied email, Instagram URL, and WhatsApp number.
- The footer states `© 2026 Ahmad. All rights reserved.`
- No open-source `LICENSE` file is included.

© 2026 Ahmad. All rights reserved.
