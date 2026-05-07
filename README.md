# Subscription Tracker

A premium dark-themed web app for tracking every subscription you pay for, seeing your total monthly and yearly spend, and getting smart insights about renewals, redundant services, and annual savings opportunities.
https://subtrack-flax-xi.vercel.app/

## Stack

- **React + TypeScript + Vite**
- **Tailwind CSS v4** (dark-only, custom design tokens)
- **Firebase** — Authentication (Google + Email/Password) and Firestore
- **Recharts** for the spending-by-category donut chart
- **Clearbit Logo API** for real brand logos by domain
- Deployed on **Vercel**

## Features

- Curated catalog of 70+ popular services across 13 categories with real current prices
- Click a service card → it expands inline to show all tiers; pick one to add it
- Custom service form for anything not in the catalog
- Live monthly + yearly spend totals
- Donut chart of spending by category
- Upcoming renewals strip with warnings for renewals in the next 7 days
- Smart insights: duplicate detection, redundancy in same category, annual savings tips, trial-expiring alerts
- Free trial tracker with conversion warning when the trial is about to end
- Pause / resume any subscription
- Currency selector (USD / CAD / EUR / GBP)
- Monthly snapshots auto-recorded for future trend analysis
- Per-user data with Firebase Auth + Firestore security rules
- Responsive: works on mobile and desktop

## Run locally

1. Install deps:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your Firebase config from
   Firebase Console → Project settings → "Your apps" → SDK setup and configuration.
3. In the Firebase console:
   - Enable **Email/Password** and **Google** sign-in providers under
     **Authentication → Sign-in method**.
   - Create a Firestore database.
   - Paste the contents of `firestore.rules` into **Firestore → Rules** and publish.
4. Start the dev server:
   ```
   npm run dev
   ```

## Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel → **New Project** → import the repo (Vite auto-detected).
3. Add the same `VITE_FIREBASE_*` env vars from `.env.local` to the Vercel project settings.
4. After the first deploy, copy the Vercel preview/production domain into Firebase
   Console → Authentication → Settings → **Authorized domains**.
