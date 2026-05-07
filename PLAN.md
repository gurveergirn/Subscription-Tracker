# Subscription Tracker — Build Plan

A premium personal-finance-style web app that lets a user track every subscription
they pay for, see total monthly and yearly spend, get smart insights, and manage
renewals — all wrapped in a polished, Apple-Wallet-inspired dark UI suitable for a
portfolio piece.

---

## 1. App Overview and Purpose

**Problem.** Most people have 8–15 active subscriptions and have no idea what they
are actually spending per month, what overlaps, or what is about to renew.

**Goal of the app.** Give the user a single, beautiful place to:
- Add subscriptions in 2 clicks from a curated, real-data service catalog.
- See total monthly and yearly spend at a glance.
- Understand where the money goes (category breakdown).
- Get warned about upcoming renewals, free trials about to convert, duplicate
  services, and money they'd save by switching to annual billing.

**Why it makes a strong portfolio project.**
- Real-world relatable problem.
- Demonstrates: TypeScript, React patterns, Tailwind design skills, Firebase Auth
  + Firestore (CRUD + security rules), data viz with Recharts, third-party API use
  (Clearbit), responsive design, deployment.
- Polished UI signals product taste — an underrated portfolio differentiator.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React + TypeScript (Vite)** | Industry standard, type safety, fast dev server, great recruiter signal. |
| Styling | **Tailwind CSS** | Speed, design consistency, easy dark theme, no CSS file sprawl. |
| Charts | **Recharts** | React-native, declarative, looks great with custom colors, easy donut. |
| Database | **Firebase Firestore** | Real-time, per-user docs, no backend code to write, generous free tier. |
| Auth | **Firebase Auth** (Google + Email/Password) | Free, two providers in a few lines, integrates with Firestore security rules. |
| Logos | **Clearbit Logo API** | Free, no key, just pass a domain — `https://logo.clearbit.com/{domain}`. |
| Icons | **lucide-react** | Beautiful, consistent, tree-shakeable. |
| Routing | **react-router-dom** | Standard, familiar, simple. |
| Hosting | **Vercel** | One-click deploy from GitHub, perfect for Vite + React, free for hobby. |
| Font | **Inter** (Google Fonts via `<link>` or `@fontsource/inter`) | Modern SaaS standard. |

**Why no state-management library.** Firestore subscriptions + a couple of React
contexts (Auth, Currency) are enough; Redux/Zustand would be overkill for the
scope and adds noise to the portfolio piece.

---

## 3. Features

### 3.1 MVP — must ship before "done"

**Authentication**
- Sign up / sign in with Google (one-tap).
- Sign up / sign in with email + password.
- Per-user data isolation enforced by Firestore security rules.
- Sign out.

**Subscriptions CRUD**
- Add subscription via the curated service catalog (click a service → expand → pick tier).
- Add a fully custom subscription if a service isn't in the catalog.
- Edit any field after creation (tier, price, billing cycle, renewal date, notes).
- Delete with confirmation dialog.
- Pause / resume — paused subs stay in the list but are excluded from totals
  and charts.

**Billing & cost handling**
- Multiple billing cycles supported: monthly, yearly, weekly, quarterly.
- Yearly/weekly/quarterly subs are normalized into a monthly-equivalent number for
  totals and charts (e.g. $99/yr → ~$8.25/mo).
- Yearly subs display "$99/yr (~$8.25/mo)" on the card.

**Currency selector**
- USD / CAD / EUR / GBP.
- Display-only: prices are stored in their original USD value; the selector swaps
  the displayed symbol and applies a fixed conversion rate stored in a constant
  (no live FX API in MVP).

**Dashboard**
- Hero stat row: total monthly spend, total yearly spend, active subscription count.
- Upcoming renewals strip — horizontally scrollable cards for renewals in the next
  30 days, with stronger visual treatment for renewals in the next 3–7 days.
- Donut chart — spending by category, total in the center.
- Smart Insights panel (see below).
- Active subscriptions grid/list, sortable (price / name / renewal / category),
  searchable, and filterable by category chips.

**Smart Insights panel**
- Renewal alerts — "3 subscriptions renew in the next 7 days."
- Duplicate detection — when adding, warn if the user already has that service.
- Redundancy detector — flag overlapping services in the same category
  (e.g. Spotify + Apple Music, Netflix + Hulu).
- Annual savings tip — if the user has a monthly tier and the service offers an
  annual tier at a lower per-month rate, surface "Switch to annual to save $X/yr."

**Free trial tracker**
- When adding a subscription, the user can mark it as a free trial and set the
  trial end date.
- Trials show a distinctive badge on their card.
- Within 3 days of trial expiry, the dashboard surfaces a prominent warning.
- Trials are excluded from total spend until they convert.

**UX polish**
- Onboarding empty state on dashboard ("Add your first subscription →") with a
  friendly illustration.
- Toast notifications on every add / edit / delete / pause action.
- Skeleton loaders while Firestore data is being fetched.
- Friendly error states if anything fails.

**Settings page**
- Currency selector.
- Account info + sign-out button.
- Danger zone: delete account + all data.

### 3.2 Nice-to-have (build only if MVP feels solid)

- Monthly spend trend line chart — built from automatic monthly snapshots
  (snapshots are recorded in MVP; the chart can come later).
- Live FX conversion via an API.
- CSV export.
- Keyboard shortcuts (Cmd/Ctrl+K to open Add).
- Light theme toggle.
- Notification reminders via email/push.

---

## 4. Pages

### 4.1 `/signin` — Auth page
- Logo + tagline, two big buttons: "Continue with Google" and "Continue with email".
- Email path expands inline into email + password fields with a sign-up/sign-in toggle.
- Redirects to `/` once authenticated.

### 4.2 `/` — Dashboard (protected)
Layout, top → bottom:
1. **Top bar** — page title "Dashboard", "+ Add subscription" CTA on the right.
2. **Hero stats row** — three big cards: Monthly, Yearly, Active count.
3. **Upcoming renewals strip** — only visible if any renewals in the next 30 days.
4. **Two-column section** (collapses to one column on mobile):
   - Left (60%): Donut chart + legend.
   - Right (40%): Smart Insights panel.
5. **Active subscriptions** — header with search bar, sort dropdown, and category
   filter chips, then a responsive grid of subscription cards (1 col mobile, 2 col
   tablet, 3 col desktop).

Empty state: full-screen friendly illustration + CTA when the user has zero subs.

### 4.3 Add Subscription — full-screen modal
- Triggered from the "+ Add subscription" button anywhere in the app.
- Header: title, search input, close button.
- Category filter chips row.
- Grid of service cards (real brand color border + Clearbit logo + service name).
- Click a card → it **expands inline**, pushing the grid down, revealing tier
  sub-cards inside. Each tier shows tier name, price, billing cycle.
- Selecting a tier opens a small confirmation step where the user picks the
  renewal date and optionally marks it as a free trial.
- Bottom: "Can't find your service? Add custom →" opens a manual form
  (name, category, cost, cycle, renewal date, optional logo URL).

### 4.4 Subscription Detail — right-side drawer
- Click any active subscription card to slide this in from the right.
- Shows logo, name, tier, cost, monthly equivalent, billing cycle, renewal date,
  category, status (active / paused / trial), notes.
- Actions: Edit, Pause/Resume, Delete (with confirm).

### 4.5 `/settings` — Settings page
- Currency selector (USD/CAD/EUR/GBP) with live preview.
- Account section: email, sign-out button.
- Danger zone: "Delete my account and all data" with a typed confirmation.

---

## 5. Component Breakdown

```
Layout
├─ AppShell                — wraps protected pages, hosts Sidebar + BottomNav + Outlet
├─ Sidebar                 — desktop nav (icons + labels)
├─ BottomNav               — mobile nav (icon tabs)
└─ TopBar                  — page title + primary CTA

Auth
├─ SignInPage
├─ AuthProvider            — context exposing user, signIn, signOut
└─ ProtectedRoute          — redirects to /signin if no user

Dashboard
├─ HeroStats               — 3 stat cards
├─ UpcomingRenewals        — horizontally scrollable strip
├─ CategoryDonutChart      — Recharts donut + center total + legend
├─ SmartInsightsPanel      — list of insight cards (alert, duplicate, redundancy, savings)
├─ ActiveSubscriptions     — search + sort + filter chips + grid
└─ SubscriptionCard        — single sub card with brand color accent

Add Flow
├─ AddSubscriptionModal    — full-screen overlay
├─ ServiceSearchBar
├─ CategoryFilterChips
├─ ServiceCardGrid
├─ ServiceCard             — collapsed/expanded states with tier sub-cards
├─ TierCard                — selectable tier inside an expanded service
├─ ConfirmAddStep          — pick renewal date + trial flag
└─ CustomServiceForm

Detail
├─ SubscriptionDetailDrawer
└─ EditSubscriptionForm

Settings
├─ CurrencySelector
├─ AccountSection
└─ DangerZone

Common
├─ BrandLogo               — wraps Clearbit URL + fallback initials
├─ EmptyState              — illustration + headline + CTA
├─ Skeleton                — animated shimmer placeholders
├─ Toast / ToastProvider
├─ ConfirmDialog
├─ Modal                   — base modal primitive
├─ Drawer                  — base side-drawer primitive
└─ Button, Input, Select   — styled primitives
```

---

## 6. Firebase Data Structure

### 6.1 Firestore collections

```
users/{uid}
  ├─ email: string
  ├─ displayName: string | null
  ├─ currency: "USD" | "CAD" | "EUR" | "GBP"
  ├─ createdAt: timestamp
  └─ updatedAt: timestamp

users/{uid}/subscriptions/{subscriptionId}
  ├─ serviceId: string | null         // null when custom
  ├─ name: string                     // "Netflix" or custom name
  ├─ logoUrl: string                  // Clearbit URL or custom URL
  ├─ brandColor: string               // hex, used for accent
  ├─ category: string                 // "Entertainment", "Music", ...
  ├─ tierName: string                 // "Premium", "Family", etc.
  ├─ cost: number                     // raw price as listed (USD)
  ├─ billingCycle: "monthly" | "yearly" | "weekly" | "quarterly"
  ├─ monthlyEquivalent: number        // computed on write for fast totals
  ├─ renewalDate: timestamp
  ├─ status: "active" | "paused" | "trial"
  ├─ trialEndsAt: timestamp | null
  ├─ notes: string
  ├─ createdAt: timestamp
  └─ updatedAt: timestamp

users/{uid}/snapshots/{YYYY-MM}
  ├─ month: string                    // "2026-05"
  ├─ totalMonthly: number
  ├─ totalYearly: number
  ├─ activeCount: number
  ├─ byCategory: { [category: string]: number }
  └─ recordedAt: timestamp
```

### 6.2 Snapshot strategy
- On app load, check if a snapshot for the current month exists. If not, create
  one from the current totals.
- On every subscription add/edit/delete, update the current month's snapshot in
  place. Past months are immutable.
- This gives us a clean monthly history with zero cron jobs and no Cloud Functions.

### 6.3 Security rules (sketch)

```
match /users/{uid} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
  match /{collection}/{doc} {
    allow read, write: if request.auth != null && request.auth.uid == uid;
  }
}
```

---

## 7. Subscription Catalog JSON Structure

Stored at `src/data/services.ts` (typed) so TypeScript validates every entry.

```ts
export type BillingCycle = "monthly" | "yearly" | "weekly" | "quarterly";

export type ServiceTier = {
  name: string;          // "Premium"
  price: number;         // 22.99 — always USD in source data
  cycle: BillingCycle;   // "monthly"
};

export type Service = {
  id: string;            // "netflix"
  name: string;          // "Netflix"
  domain: string;        // "netflix.com"  → Clearbit
  category: Category;
  brandColor: string;    // "#E50914"
  tiers: ServiceTier[];
};

export type Category =
  | "Entertainment" | "Music" | "Gaming" | "Storage & Productivity"
  | "Fitness & Health" | "News & Reading" | "Security & VPN"
  | "AI Tools" | "Developer Tools" | "Social & Communication"
  | "Design & Creative" | "Education" | "Food & Lifestyle";
```

Example shape (file holds the full list provided in the brief):

```ts
export const SERVICES: Service[] = [
  {
    id: "netflix",
    name: "Netflix",
    domain: "netflix.com",
    category: "Entertainment",
    brandColor: "#E50914",
    tiers: [
      { name: "Standard with Ads", price: 6.99, cycle: "monthly" },
      { name: "Standard",           price: 15.49, cycle: "monthly" },
      { name: "Premium",            price: 22.99, cycle: "monthly" },
    ],
  },
  // ...all other services from the brief
];
```

---

## 8. Clearbit Logo API Usage

- URL pattern: `https://logo.clearbit.com/{domain}`
- Used directly in `<img src>` — no key, no SDK.
- A `<BrandLogo>` component wraps the `<img>` and:
  - Sets `loading="lazy"`.
  - On error, falls back to a colored circle with the service's first letter using
    its `brandColor` background — so the UI never shows a broken image.
- Custom subscriptions can supply their own logo URL or use the initials fallback.

---

## 9. Design System

### 9.1 Color scheme (dark, locked)

| Token | Value | Use |
|---|---|---|
| `bg-app` | `#0A0A0B` | Page background |
| `bg-surface` | `#121214` | Cards, panels |
| `bg-surface-2` | `#1A1A1D` | Elevated surfaces, hover |
| `border-subtle` | `#26262B` | Dividers, card borders |
| `text-primary` | `#F5F5F7` | Headings, primary text |
| `text-secondary` | `#9C9CA3` | Secondary text |
| `text-muted` | `#5F5F66` | Tertiary, captions |
| `accent` | `#7C5CFF` | Default brand accent (primary buttons, links) |
| `success` | `#3FB950` | Active status, savings |
| `warning` | `#F0883E` | Renewals in 3–7 days |
| `danger` | `#F85149` | Trial expiring, delete |

Each subscription card uses **its service's brand color** as a strong accent —
left edge gradient, hover glow, and tier highlight — over the neutral dark base.
This is what gives the app an Apple-Wallet "deck of branded cards" feel.

### 9.2 Typography

- Family: **Inter** (loaded via `@fontsource/inter` weights 400, 500, 600, 700).
- Scale (Tailwind aliases):
  - `text-2xs` 11 — micro labels
  - `text-xs` 12 — captions
  - `text-sm` 14 — body small
  - `text-base` 16 — body
  - `text-lg` 18 — card titles
  - `text-2xl` 24 — section headings
  - `text-4xl` 36 — hero numbers
- Tabular numerals for all money amounts (`font-feature-settings: "tnum"`).

### 9.3 Visual language

- Border radius: `rounded-2xl` for cards, `rounded-xl` for inputs/buttons.
- Subtle inner highlight on cards (1px top white-alpha border) for depth.
- Brand-color gradient overlay on subscription cards (12% opacity at top → 0%).
- Soft shadows: `shadow-[0_4px_24px_rgba(0,0,0,0.45)]` on elevated cards.
- Smooth transitions (200ms ease-out) on hover, tier expansion, drawer slide.

---

## 10. Folder Structure

```
subscription-tracker/
├─ public/
│  └─ illustrations/             # empty-state SVGs
├─ src/
│  ├─ components/
│  │  ├─ layout/                 # AppShell, Sidebar, BottomNav, TopBar
│  │  ├─ auth/                   # SignInPage, ProtectedRoute, AuthProvider
│  │  ├─ dashboard/              # HeroStats, UpcomingRenewals, CategoryDonutChart,
│  │  │                          # SmartInsightsPanel, ActiveSubscriptions, SubscriptionCard
│  │  ├─ add/                    # AddSubscriptionModal, ServiceCardGrid, ServiceCard,
│  │  │                          # TierCard, ConfirmAddStep, CustomServiceForm
│  │  ├─ detail/                 # SubscriptionDetailDrawer, EditSubscriptionForm
│  │  ├─ settings/               # CurrencySelector, AccountSection, DangerZone
│  │  └─ common/                 # BrandLogo, EmptyState, Skeleton, Toast, Modal,
│  │                             # Drawer, ConfirmDialog, Button, Input, Select
│  ├─ pages/                     # DashboardPage, SettingsPage, SignInPage
│  ├─ hooks/                     # useAuth, useSubscriptions, useCurrency, useToast,
│  │                             # useInsights
│  ├─ lib/
│  │  ├─ firebase.ts             # Firebase init
│  │  ├─ firestore.ts            # CRUD helpers for subs, snapshots, user doc
│  │  ├─ insights.ts             # duplicate / redundancy / savings logic
│  │  ├─ money.ts                # billing-cycle normalization, currency formatting
│  │  └─ dates.ts                # renewal calculations, "in X days" helpers
│  ├─ data/
│  │  └─ services.ts             # full hardcoded catalog
│  ├─ types/
│  │  └─ index.ts                # Subscription, Service, Tier, Category, etc.
│  ├─ styles/
│  │  └─ globals.css             # Tailwind directives, font-face, base styles
│  ├─ App.tsx                    # router + providers
│  ├─ main.tsx                   # entry
│  └─ vite-env.d.ts
├─ .env.local                    # Firebase config (gitignored)
├─ .env.example                  # documents required env vars
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ package.json
└─ README.md
```

---

## 11. Step-by-Step Build Order

Each step is a meaningful, demoable chunk. Commit after each.

1. **Project scaffold** — `npm create vite@latest` (React + TS) → install Tailwind,
   react-router-dom, lucide-react, recharts, firebase, @fontsource/inter. Configure
   Tailwind dark theme tokens. Verify dev server runs.
2. **Layout shell** — AppShell with Sidebar (desktop) + BottomNav (mobile) + TopBar.
   Wire up routes for `/`, `/settings`, `/signin`. Static dummy content.
3. **Firebase setup** — create the project, enable Firestore + Auth (Google + Email).
   Add config to `.env.local`. Build `lib/firebase.ts`. Write initial security rules.
4. **Authentication** — AuthProvider + SignInPage with Google and Email/Password.
   ProtectedRoute. Verify sign-in/sign-out and that `users/{uid}` is created on
   first sign-in.
5. **Service catalog** — type definitions + the full `services.ts` data file with
   all categories, services, tiers, domains, and brand colors from the brief.
6. **BrandLogo component** — Clearbit `<img>` with initials fallback. Use it in a
   throwaway dev page to verify all logos render.
7. **Add Subscription modal** — full-screen overlay, search bar, category chips,
   grid of ServiceCards, inline expansion with TierCards, ConfirmAddStep with
   renewal date + trial flag. CustomServiceForm.
8. **Firestore CRUD** — `lib/firestore.ts` and `useSubscriptions` hook with real-time
   listener. Wire the Add modal to actually create docs. Verify in Firebase console.
9. **Active subscriptions list** — SubscriptionCard with brand-color accent, grid
   layout, search, sort, category filter chips. Empty state when zero subs.
10. **Subscription detail drawer** — side-slide drawer with Edit/Pause/Delete.
    EditSubscriptionForm. Confirm dialogs for destructive actions.
11. **Hero stats + money helpers** — `lib/money.ts` for billing-cycle normalization
    and currency formatting. HeroStats component.
12. **Donut chart** — Recharts donut, category aggregation, center total label,
    custom legend.
13. **Upcoming renewals strip** — `lib/dates.ts` helpers, horizontally scrollable
    cards, special styling for ≤7 days.
14. **Smart Insights panel** — `lib/insights.ts` with duplicate, redundancy, savings,
    and renewal-alert generators. Render as a list of insight cards.
15. **Trial tracker logic** — exclude trials from totals, "expiring in X days"
    badge, prominent dashboard warning ≤3 days.
16. **Monthly snapshots** — on app load and on every CRUD, upsert
    `users/{uid}/snapshots/{YYYY-MM}`.
17. **Settings page** — CurrencyProvider context, CurrencySelector, account info,
    danger zone (delete account flow with `Auth.deleteUser` + Firestore wipe).
18. **Polish pass** — empty states with illustrations, skeleton loaders for
    Firestore initial load, ToastProvider + toasts on every action, friendly
    error states, focus rings, keyboard accessibility on modal/drawer.
19. **Responsive QA** — exercise the app at 375 / 768 / 1280 / 1920 widths. Fix
    any layout breaks.
20. **Deploy to Vercel** — see deployment checklist below.

---

## 12. Vercel Deployment Checklist

- [ ] Push the repo to GitHub (private or public — public is better for portfolio).
- [ ] In Vercel: "New Project" → import the repo → framework preset auto-detects Vite.
- [ ] Add all `VITE_FIREBASE_*` env vars from `.env.local` to Vercel project settings.
- [ ] Add the Vercel preview and production URLs to Firebase Auth →
      "Authorized domains."
- [ ] Confirm Firestore security rules are deployed and tested
      (`firebase deploy --only firestore:rules` from CLI, or paste in console).
- [ ] First deploy → verify: sign-in works, can add a sub, logo loads, refresh
      persists data, sign-out works.
- [ ] Run Lighthouse on the production URL — aim for 90+ in Performance and 100
      in Accessibility/Best Practices/SEO.
- [ ] Add a custom domain if desired (`subs.yourname.dev`) and update Firebase
      authorized domains.
- [ ] Update README with: live URL, screenshots, tech stack, "how to run locally."
- [ ] Add the live URL and repo link to your portfolio site.

---

## 13. Out of Scope (explicit)

The following were intentionally deferred to keep MVP scope tight; they may
become "v1.1" features later:
- Light theme toggle.
- CSV export.
- Keyboard shortcuts.
- Bar chart per subscription.
- Monthly trend line chart (data is being captured; chart can be added later).
- Live FX conversion via API.
- Email/push reminders.

---

**Status: awaiting review.** Do not start coding until this plan is explicitly
approved.
