# HowLongToGo — Full Strategy Report
**Date:** 2026-06-16  
**Project:** howlongtogo (competitor to howlongagogo.com)

---

## TABLE OF CONTENTS

1. [Competitor Profile — howlongagogo.com](#1-competitor-profile)
2. [Competitive Landscape](#2-competitive-landscape)
3. [Strengths & Weaknesses Audit](#3-strengths--weaknesses-audit)
4. [SEO Analysis & Opportunities](#4-seo-analysis--opportunities)
5. [Feature Gap Analysis](#5-feature-gap-analysis)
6. [User Segment Analysis](#6-user-segment-analysis)
7. [Unique Selling Propositions](#7-unique-selling-propositions)
8. [Monetization Models](#8-monetization-models)
9. [Technical Architecture](#9-technical-architecture)
10. [Internal Linking Strategy](#10-internal-linking-strategy)
11. [Content Strategy](#11-content-strategy)
12. [Strategic Roadmap](#12-strategic-roadmap)
13. [Top Opportunities Ranked](#13-top-opportunities-ranked)
14. [Legal & Originality Compliance](#14-legal--originality-compliance)
15. [90-Day Action Plan](#15-90-day-action-plan)
16. [Tech Stack Decision](#16-tech-stack-decision)

---

## 1. COMPETITOR PROFILE

### What It Is
howlongagogo.com is a free date utility toolkit centered on one core value proposition: answering "how long ago/until was/is [date/event]?" Operated as an indie project (BuyMeACoffee presence, single operator "James") with surprising traction for its size.

### Verified Metrics
| Metric | Value |
|---|---|
| Monthly Organic Traffic | ~780K visits |
| Domain Rating (Ahrefs) | 56 |
| Referring Domains | 2,300+ |
| Traffic Value (estimated) | $19,200/month |
| Global Rank (Semrush) | ~33,247 |
| US Rank | ~9,765 |

### URL Architecture (Programmatic SEO Patterns)
```
/date/{year}                              → "How long ago was 1885?"
/date/{month}/{day}                       → "How long until July 21?"
/age/{year}/{month}/{day}                 → Age calculator per birth date
/countdown/events                         → All event countdowns listing
/countdown/create/{type}                  → Create countdown by type
/countdown/create/single/{type}           → Single event countdown
/countdown/{holiday}/how-many-{day}s-until-{holiday}  → SEO variants
/faqs                                     → FAQ page
/register                                 → User accounts (basic)
```

### Current Feature Set
1. Age Calculator (years/months/weeks/days from birth date)
2. Days Between Dates
3. Business Days Calculator (excludes weekends + country holidays)
4. Day of the Week resolver
5. Date Add/Subtract Calculator
6. Custom Countdown Builder (shareable URL)
7. Live Countdowns to 80+ Holidays/Events
8. Countdown themed templates (birthday, wedding, holiday, retirement, baby)
9. iOS App (Agogo Countdown)

### Monetization
- Display advertising (primary)
- BuyMeACoffee voluntary donations (supplemental)
- No premium tier, no API, no B2B product

---

## 2. COMPETITIVE LANDSCAPE

| Competitor | Monthly Traffic | DR | Traffic Value | Key Differentiator |
|---|---|---|---|---|
| howlongagogo.com | 780K | 56 | $19K | Countdown + date calc combo |
| days.to | 807K | 51 | $31K | Cleaner UI, countdown focus |
| howlonghowmany.com | 845K | 18 | $9.5K | Similar pSEO, lower quality |
| calculat.io | 2.4M | 47 | $130K | Broad calculator site |
| calendarr.com | 6.4M | 70 | $264K | Calendar + holidays depth |
| inchcalculator.com | 5.1M | 78 | $462K | Unit conversion + calculators |
| countdown-timer.app | 675K | 27 | $7.7K | App-style countdown UI |
| calculator.net | 29.8M | 84 | $5.7M | Everything calculator |
| timeanddate.com | 65.4M | ~90 | $4.9M rev | Authoritative time authority |

**Key insight:** timeanddate.com earns $4.9M with 13 employees from 65M visits. howlongagogo.com earns ~$19K/month from 780K visits. The traffic-to-revenue efficiency gap is enormous. A well-executed platform can scale to $500K–$2M+/year.

---

## 3. STRENGTHS & WEAKNESSES AUDIT

### howlongagogo.com Strengths
- Programmatic SEO executed well (year, day, age, holiday variant pages)
- Memorable brand + catchy name
- Shareable countdowns with unique URLs
- Themed templates serve real emotional use cases
- Existing DR 56 — meaningful domain authority for an indie project
- Mobile app extends brand beyond web

### howlongagogo.com Weaknesses
- No meaningful content depth — pages are thin (<300 words of useful content)
- No user accounts with persistence across devices
- Zero AI or personalization
- No data visualization — purely text results
- Poor international coverage — holiday calculator barely scratches global holidays
- No time zone awareness — date-only, not datetime
- No historical/cultural context on year pages
- No FAQ schema, no HowTo schema, missing rich results
- No email/notification system
- No community or social layer
- App is iOS-only — no Android, no PWA
- Very low traffic value per visitor ($0.025/visit)
- No B2B offering — no embeddable widgets, no API

### Missed Opportunities
- Historical events context (what happened in 1885?)
- Time zone-aware countdowns
- Multiple simultaneous countdown tracking
- Notification/alert system (email/push when X days until event)
- Astronomical data (moon phases)
- Productivity integration (Google Calendar, Outlook)
- Life statistics ("you've slept ~X hours since birth")
- Comparison tools ("how long ago was WWII vs. the moon landing?")
- Recurring event tracking
- Localized holiday awareness per country (190+ countries)

---

## 4. SEO ANALYSIS & OPPORTUNITIES

### How howlongagogo.com Generates Traffic (Programmatic SEO Engine)

**Tier 1 — Year pages:** `/date/{year}` for years 1–2100. Captures "how long ago was [year]?"

**Tier 2 — Month/Day pages:** `/date/{month}/{day}` captures "how long until [date]" and "how long ago was [date]"

**Tier 3 — Age calculator pages:** `/age/{year}/{month}/{day}` — "age calculator born [date]"

**Tier 4 — Holiday countdown variants:** `/countdown/{holiday}/how-many-{weekday}s-until-{holiday}` — multiplies holiday pages by 7 weekdays

### Where Their SEO Falls Short
1. No contextual enrichment — no featured snippets or backlinks due to hollow content
2. No FAQ schema — missing rich results for "how long ago was 1969" type queries
3. No HowTo schema for calculators
4. No historical context to attract editorial links
5. No topical clusters around holiday content
6. No "days since" famous events pages

### Keyword Universe
```
Tier 1 — High volume:
├── how long ago was [year]                    (100K+ searches/mo aggregate)
├── how long until [holiday]                   (500K+ searches/mo aggregate)
├── how many days until [holiday]              (very high seasonal volume)
├── how many days since [date/event]           (underserved)
├── age calculator                             (high volume, competitive)
├── days between dates                         (high volume)
└── how many weeks until [event]               (moderate, underserved)

Tier 2 — Moderate volume, lower competition:
├── how long ago was [famous event]
├── days until my birthday
├── business days calculator
├── how many months until [date]
├── what day of the week was [date]
└── countdown timer for [event type]

Tier 3 — Long-tail programmatic:
├── how many [weekday]s until [holiday]
├── how old am I if born in [year]
├── how many days since [famous date]
├── how long ago was [decade]
├── how many minutes until midnight
└── how long until I retire (if born in [year])
```

### New Programmatic SEO Opportunities

**Opportunity 1 — Famous Events Database**
`/event/moon-landing`, `/event/fall-of-berlin-wall` — 500+ pages with rich context, public domain images, timeline visualizations. Earn editorial backlinks naturally.

**Opportunity 2 — Celebrity Age Pages**
`/celebrity/born-[year]` or `/age/[celebrity-name]` — "How old is [celebrity]?" is among the most searched questions on Google.

**Opportunity 3 — Country × Holiday Matrix**
`/holidays/[country]/[year]` — Every country × every holiday × every year = tens of thousands of pages.

**Opportunity 4 — "N Days From Today" Calculator**
`/days-from-today/100`, `/days-from-today/365` — Highly searched, easy to generate, low competition.

**Opportunity 5 — Zodiac, Season, Moon Phase Integration**
`/date/july/21/zodiac` — Crossover with astrology content (huge, underserved audience).

---

## 5. FEATURE GAP ANALYSIS

| Feature | howlongagogo.com | Our Platform |
|---|---|---|
| Age Calculator | Basic | Advanced (multiple units + life stats) |
| Days Between | Basic | Full (working days, holidays, weekends) |
| Business Days | Limited countries | 190+ countries |
| Day of Week | Yes | Yes + time zone aware |
| Date Add/Subtract | Yes | Yes + recurring patterns |
| Custom Countdowns | Yes (shareable URL) | Yes + persistence + notifications |
| Live Holiday Countdowns | 80+ events | 500+ events, 190+ countries |
| Historical Event Pages | None | 500+ famous events with context |
| Celebrity Age Calculator | None | Yes |
| Time Zone Support | None | Full (IANA timezone database) |
| Notifications/Reminders | None | Email + push (web) |
| User Accounts | Basic | Full profiles, saved countdowns |
| Data Visualization | None | Timeline charts, progress rings |
| AI Features | None | Natural language input, insights |
| Social/Sharing | URL share only | Cards, widgets, embeds |
| Embeddable Widget | None | Yes (B2B/blog use case) |
| API | None | Public + paid tiers |
| Android App | No | Yes (PWA + native) |
| Dark Mode | Unknown | Yes |
| Offline Support | No | Yes (PWA) |
| Schema Markup | Limited | Complete (FAQ, HowTo, Event, Speakable) |
| Multiple Countdowns | No | Yes (dashboard) |
| Recurring Events | No | Yes (annual auto-reset) |
| Life Statistics | No | Yes ("you've lived 10,950 days") |
| Historical Context | No | Yes (what happened that year) |
| Moon Phases / Astronomy | No | Yes |
| Comparison Tool | No | Yes |
| Calendar Export | No | Yes (iCal, Google Calendar) |
| Productivity Integrations | No | Yes (Calendar sync, Notion, Slack) |
| Multi-language | Limited | 20+ languages |

---

## 6. USER SEGMENT ANALYSIS

### Segment 1 — The Curious (~40%)
**Who:** People who randomly wonder "how long ago was [year/event]?"
**Pain:** Gets the answer but no context, bounces immediately
**Opportunity:** Add fascinating historical context, share cards, "did you know" panels

### Segment 2 — Event Planners / Personal Milestones (~25%)
**Who:** Tracking countdown to wedding, birthday, graduation, retirement, baby due date
**Pain:** No reminders, no beautiful display, no sharing beyond URL
**Opportunity:** Beautiful shareable countdown cards, email reminders at 30/7/1 day, social sharing with auto-generated preview images

### Segment 3 — Professionals / Project Managers (~15%)
**Who:** Need business days calculation, contract deadlines, SLA tracking
**Pain:** Basic business days calculator with limited countries
**Opportunity:** Professional-grade calculator (190+ countries), API access, calendar export

### Segment 4 — Students / Researchers (~10%)
**Who:** History students, researchers comparing time periods
**Pain:** No historical context, no comparison tools
**Opportunity:** Comparison tools, decade summaries, historical event database

### Segment 5 — Health & Life Tracking (~5%)
**Who:** Sobriety, pregnancy, fitness milestones, relationship anniversaries
**Pain:** Generic countdown with no domain-specific features
**Opportunity:** Sobriety tracker, pregnancy countdown, anniversary reminders

### Segment 6 — Businesses / Developers (~5%)
**Who:** Need embeddable widgets, countdown APIs
**Pain:** No widget or API exists
**Opportunity:** JS embed widget, REST API, premium B2B tier

---

## 7. UNIQUE SELLING PROPOSITIONS

Ranked by impact:

1. **"The Richest Date Experience on the Web"** — Every date comes with historical context, life statistics, astronomical data, and beautiful visualization.

2. **"Smart Countdowns That Remember You"** — User accounts, saved countdowns, automatic reminders across channels, recurring annual reset.

3. **"Every Holiday, Every Country"** — 500+ events across 190 countries. The only date platform that works for every human on Earth.

4. **"Natural Language Time"** — Type "how long until my daughter's 18th birthday" and get the answer.

5. **"Time, Visualized"** — Interactive timeline visualizations, progress rings, comparative charts.

6. **"The Business Time Machine"** — Enterprise-grade business day calculations with every country's official holiday calendar and API access.

---

## 8. MONETIZATION MODELS

### Model 1 — Display Advertising (Baseline)
- AdSense / Mediavine / Raptive
- Target: $15–$25 RPM
- At 5M monthly visits: $75K–$125K/month

### Model 2 — Premium Subscription ($4.99–$9.99/month)
- Ad-free, unlimited saves, email/SMS reminders, calendar sync, custom themes, API access
- Target: 1% conversion at 5M visits = 50K × $5 = $250K/month

### Model 3 — API Access (B2B)
- Tiers: Free (1K req/day), Pro ($29/mo), Business ($99/mo), Enterprise (custom)
- Year 2 target: $20K–$50K MRR

### Model 4 — Embeddable Widgets
- Free (branded) + Paid ($9–$29/month, unbranded)
- Year 2 target: 2K customers × $15 = $30K/month

### Model 5 — Affiliate Partnerships
- Travel booking, event ticketing, gift ideas, party supplies
- Target: $5K–$20K/month passive

### Model 6 — B2B Holiday Calendar Data
- License maintained holiday data for 190+ countries
- Annual licensing: $500–$5,000/year per client
- Year 3 target: 100 clients = $200K–$500K ARR

### Model 7 — Sponsored Countdowns
- Brands sponsor "official" countdowns to their events
- Flat rate: $500–$5,000/event

---

## 9. TECHNICAL ARCHITECTURE

### Stack

**Frontend:**
- Next.js 15 (App Router) — SSR/ISR for SEO-critical programmatic pages
- TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animations/visualizations)
- PWA support (next-pwa)

**Backend:**
- Next.js Route Handlers on Vercel Fluid Compute
- Luxon + date-fns-tz (timezone-aware date math)
- NextAuth.js v5 (email + Google OAuth)

**Database:**
- Neon (PostgreSQL) — user accounts, saved countdowns, events
- Upstash Redis — caching holiday data, popular calculations
- Vercel Edge Config — feature flags, A/B test config

**AI:**
- Claude API (claude-haiku-4-5) — natural language date parsing only
- Vercel AI Gateway — unified API, observability
- Only called when input is not a clean parseable date (cost-gated)

**SEO Infrastructure:**
- next-sitemap — auto-generates sitemaps for programmatic pages
- @vercel/og — dynamic OG image generation at the edge
- ISR (revalidate: 3600) for date pages
- JSON-LD structured data on every page

**Deployment:**
- Vercel (primary) — ISR, Edge Network, Image Optimization, Fluid Compute
- Cloudflare (DNS + DDoS protection)

### Why Claude API (Not howlongagogo's approach)

howlongagogo only accepts structured form inputs (calendar pickers). We use the Claude API exclusively for **natural language input parsing** — e.g., "how long until my daughter's 18th birthday if she was born March 5 2012". This is a key differentiator.

- Uses claude-haiku-4-5 (cheapest, fastest model: ~$0.0001/query)
- Only triggered when input fails standard date parsing
- All actual calculations are pure local math — no API needed for that
- Cost at 1M NL queries/month ≈ $100

### Rendering Strategy
```typescript
// Date pages — ISR (generated on demand, cached 1hr)
export const revalidate = 3600

// Seed most-visited pages at build
export async function generateStaticParams() {
  return Array.from({ length: 200 }, (_, i) => ({
    year: String(1900 + i)
  }))
}
// All other years generated on first request, then cached at edge
```

### Sitemap Architecture
```
sitemap-index.xml
├── sitemap-core.xml          (main tools, about, legal)
├── sitemap-years.xml         (year 1 → 2100 = 2,100 URLs)
├── sitemap-monthday.xml      (all 365 month/day combos)
├── sitemap-events.xml        (500+ historical + holiday events)
├── sitemap-countries.xml     (190 countries × holiday pages)
├── sitemap-age.xml           (birth year pages 1900→2024)
└── sitemap-celebrity.xml     (celebrity age pages)
```
Total: 15,000–50,000+ indexable URLs at launch, scaling to 100K+.

### Schema Markup Per Page Type
- **Date pages:** `FAQPage` + `Speakable` + `BreadcrumbList`
- **Calculator pages:** `HowTo` + `FAQPage`
- **Holiday pages:** `Event` + `FAQPage` + `BreadcrumbList`
- **Countdown pages:** `Event` (startDate) + `WebApplication`
- **Historical event pages:** `Article` + `FAQPage`

---

## 10. INTERNAL LINKING STRATEGY

```
Homepage
├── → Core Tools Hub
├── → Holiday Countdown Hub → Individual Holiday Pages
├── → Historical Events Hub → Individual Event Pages
├── → Country Calendar Hub → Country Pages → Holiday Pages
└── → Create Countdown → Account Dashboard

Year Page (/date/1969)
├── → "What happened in 1969?" (historical events)
├── → Related years (1968, 1970, 1979, 1959)
├── → Age calculator for people born in 1969
├── → Decade hub (1960s)
└── → Nearby famous events (moon landing, Woodstock)

Holiday Page (/holiday/us/christmas)
├── → Country hub (all US holidays)
├── → Same holiday other countries
├── → Days until Christmas countdown
├── → How many weekdays until Christmas (× 7 variants)
└── → Related holidays (Thanksgiving → Christmas → New Year)
```

---

## 11. CONTENT STRATEGY

### Content Clusters

**Cluster 1 — Time Literacy Hub**
Educational articles earning backlinks from schools and productivity blogs.

**Cluster 2 — Historical Event Database**
500+ significant global events with exact elapsed time, historical photos (public domain), significance, and related events.

**Cluster 3 — Cultural Calendar Hub**
Deep guides on major holidays per country: origin, traditions, dates (past + future 10 years).

**Cluster 4 — Life Milestone Content**
"What does it feel like to turn 10,000 days old?", "1 billion seconds: the milestone most people miss" — viral content driving social sharing and backlinks.

**Cluster 5 — Productivity & Business**
"How to calculate SLA deadlines," "business day calculator for contracts" — high commercial intent, supports B2B API product.

### AI-Powered Content Features
- Natural language date input resolution
- Life stats panel ("Since your birth, you've experienced X full moons, X leap years")
- Historical parallax ("The gap between WWI and WWII is shorter than Nirvana's Nevermind to today")
- Personalized insights based on saved events

---

## 12. STRATEGIC ROADMAP

### MVP (Months 1–3) — Foundation & Traffic
**Goal: 100K monthly visitors, 5K indexed pages**

```
Core Calculators:
□ Age Calculator — with life statistics panel
□ Days Between Dates — with working days, weekends, public holidays
□ Date Add/Subtract — with recurring event support
□ Day of the Week — with time zone awareness
□ Days Until/Since — natural language friendly

Programmatic SEO Foundation:
□ /date/[year] pages — 2,100 pages
□ /date/[month]/[day] pages — 365 pages
□ /holiday/[country]/[holiday] — 1,000 pages (50 countries × 20 holidays)
□ Complete JSON-LD schema on every page type
□ Auto-generated sitemap index

Infrastructure:
□ Next.js 15 + Vercel deployment
□ PostgreSQL (Neon) for structured data
□ Upstash Redis for calculation caching
□ OG image generation for social sharing

SEO Basics:
□ FAQ schema on every page
□ Core Web Vitals: LCP < 1.2s, CLS = 0
□ Canonical URLs, meta tags, structured breadcrumbs
□ robots.txt + sitemap submitted to GSC
```

### Phase 2 (Months 4–8) — Differentiation & Depth
**Goal: 500K monthly visitors, first revenue**

```
User System:
□ Account creation (email + OAuth)
□ Saved countdown dashboard
□ Email reminders (7 days, 1 day before events)
□ Push notifications (PWA)
□ Recurring annual countdowns

Content Depth:
□ Historical events database (200+ events)
□ "What happened in [year]?" panels
□ Life statistics panel
□ Decade hub pages

Advanced Tools:
□ Natural language input (Claude Haiku API)
□ Multi-timezone countdown builder
□ Business days calculator — 100+ countries
□ Comparison tool

Monetization Start:
□ Display ads
□ Premium subscription beta
□ Affiliate links on holiday pages

Expanded pSEO:
□ /age/[year]/[month]/[day] pages
□ /days-from-today/[n] — 365 pages
□ Country × holiday matrix — 190 countries
□ /event/[famous-event] — 200+ pages
```

### Phase 3 (Months 9–18) — Scale & Revenue
**Goal: 2M+ monthly visitors, $50K+/month revenue**

```
AI Features:
□ Natural language date parsing (Claude Haiku)
□ "Time Insights" — AI-generated facts about any time period
□ Personalized milestone detection
□ Smart holiday recommendations by location

B2B Products:
□ Embeddable countdown widget
□ REST API v1
□ Holiday calendar data licensing
□ White-label countdown pages

Mobile:
□ PWA with full offline support
□ Android app
□ iOS app (improved)
□ Push notifications

Extended pSEO (50,000+ pages):
□ Celebrity age pages (1,000+ public figures)
□ Zodiac + season integration
□ Moon phase data on all date pages
□ Famous birthdays for every calendar day

International:
□ 20+ languages
□ Country-specific landing pages
□ Culturally localized date formats
```

---

## 13. TOP OPPORTUNITIES RANKED

### Highest SEO Impact
1. Historical Event Pages (500+ with rich content) — backlink magnet, featured snippet targets
2. Country × Holiday Matrix (50,000+ programmatic pages)
3. Celebrity Age Pages (1,000+ pages, massive search volume)
4. FAQ Schema + Speakable on all pages — voice search capture
5. "Days From Today" pages (underserved, high intent)

### Highest Revenue Impact
1. Premium Subscription — recurring, defensible
2. Display Ads at Scale — 2M visits at $20 RPM = $40K/month
3. B2B Holiday Calendar API — high-margin, low support burden
4. Affiliate on Holiday/Event Pages
5. Embeddable Widgets (paid)

### Highest Retention Impact
1. Email Reminders — event-triggered re-engagement
2. Multiple Saved Countdowns Dashboard
3. Annual Recurring Countdowns
4. Life Statistics Panel — emotional connection
5. Push Notifications

### Strongest Long-Term Moats
1. Holiday Data Accuracy at Scale (190+ countries)
2. Historical Event Database (DR compounds over years)
3. User Countdown Libraries (switching cost)
4. B2B API Relationships (enterprise stickiness)
5. Brand Authority ("TimeAndDate for personal time")

---

## 14. LEGAL & ORIGINALITY COMPLIANCE

- All copy and UI must be 100% original
- Holiday data sourced from official government sources (public domain) or licensed datasets
- Historical event data written originally or licensed from reputable providers
- Celebrity information derived only from public facts (birth dates are public record)
- No screenshots or derivative works from competitors
- Original brand name, logo, domain, and visual identity
- All images: original, licensed stock, or Creative Commons with attribution

---

## 15. 90-DAY ACTION PLAN

```
Week 1–2: Foundation
□ Register domain + brand name
□ Set up Vercel + GitHub repo
□ Configure Next.js 15 project with TypeScript
□ Set up Neon PostgreSQL + Upstash Redis
□ Build core date calculation engine (original implementation)
□ Implement all 5 core calculators

Week 3–4: SEO Infrastructure
□ Build programmatic page templates for /date/[year] and /date/[month]/[day]
□ Seed year data (1–2100) into database
□ Implement complete JSON-LD schema for each page type
□ Generate sitemap-index + all sub-sitemaps
□ Deploy and submit to Google Search Console

Week 5–6: Content Depth
□ Write original content templates for year pages
□ Build holiday database (50 countries, top 20 holidays each)
□ Create holiday page template with countdown + context
□ Implement life statistics panel for age calculator

Week 7–8: Polish & Performance
□ Core Web Vitals optimization (LCP < 1.2s)
□ Dynamic OG image generation for all page types
□ Mobile-responsive design polish
□ PWA setup (offline support, installable)

Week 9–10: Accounts & Retention
□ Auth system (NextAuth.js + email + Google OAuth)
□ Saved countdowns dashboard
□ Email reminder system (7 days, 1 day before)
□ Custom countdown builder

Week 11–12: Launch & Monetization
□ Google AdSense setup
□ Submit sitemap, monitor GSC for indexing
□ Outreach for initial backlinks
□ Set up analytics (Plausible or GA4)
□ Soft launch + social media presence
```

---

## 16. TECH STACK DECISION

### Full Stack
| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR/ISR for SEO, RSC, edge-ready |
| Language | TypeScript | Type safety across 50K+ programmatic pages |
| Styling | Tailwind CSS + shadcn/ui | Fast, consistent, no design debt |
| Animation | Framer Motion | Countdown rings, timeline visualizations |
| PWA | next-pwa | Offline support, mobile installable |
| API | Next.js Route Handlers | Zero-config serverless on Vercel Fluid Compute |
| Date Engine | Luxon + date-fns-tz | Accurate timezone-aware date math |
| Auth | NextAuth.js v5 | Email + Google OAuth |
| Primary DB | Neon (PostgreSQL) | Serverless Postgres, preview branches |
| Cache | Upstash Redis | Edge-compatible, caches holiday data |
| Edge Config | Vercel Edge Config | Feature flags, A/B tests |
| AI (NL only) | Claude API (claude-haiku-4-5) | NL date parsing, ~$0.0001/query |
| AI Gateway | Vercel AI Gateway | Observability, fallbacks |
| Sitemaps | next-sitemap | Auto-generates sitemap index for 50K+ pages |
| OG Images | @vercel/og | Dynamic social preview images at edge |
| Analytics | Plausible | Privacy-first, no cookie banner |
| Errors | Sentry | Catch date calculation edge cases |
| Hosting | Vercel | ISR, Edge Network, all native |
| DNS/CDN | Cloudflare | Additional DDoS protection |

### API Usage Clarification
howlongagogo.com uses **zero external APIs** — all calculations are pure JS date math.  
We also do all calculations locally. The Claude API is used **only** for natural language input parsing:

- User types: "how long until my daughter's 18th birthday if she was born March 5 2012"
- Claude Haiku parses this to: `{ targetDate: "2030-03-05", mode: "until" }`
- Our engine does the actual math locally
- API call only triggers when input fails standard date regex parsing
- Cost: ~$0.0001/query → at 1M NL queries/month = ~$100/month total

Everything else — all 50,000+ programmatic pages, all calculations, all countdowns — is pure local computation.

---

*Report generated: 2026-06-16*  
*Working directory: /var/www/html/own-project/howlongtogo*
