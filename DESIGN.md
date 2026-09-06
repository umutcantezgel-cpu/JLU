---
name: JLU Gießen Accounting Tutor - Bibi & Rabia Edition
colors:
  surface: '#ffffff'
  surface-dim: '#f1f5f9'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8fafc'
  surface-container: '#f1f5f9'
  surface-container-high: '#e2e8f0'
  surface-container-highest: '#cbd5e1'
  on-surface: '#0f172a'
  on-surface-variant: '#475569'
  inverse-surface: '#1e293b'
  inverse-on-surface: '#f8fafc'
  outline: '#cbd5e1'
  outline-variant: '#e2e8f0'
  surface-tint: '#165a97'
  primary: '#165a97'
  on-primary: '#ffffff'
  primary-container: '#eaf7ff'
  on-primary-container: '#0b3259'
  inverse-primary: '#93c5fd'
  secondary: '#0b3259'
  on-secondary: '#ffffff'
  secondary-container: '#e2e8f0'
  on-secondary-container: '#0f172a'
  tertiary: '#d97706'
  on-tertiary: '#ffffff'
  tertiary-container: '#fef3c7'
  on-tertiary-container: '#78350f'
  error: '#b91c1c'
  on-error: '#ffffff'
  error-container: '#fee2e2'
  on-error-container: '#7f1d1d'
  success: '#15803d'
  on-success: '#ffffff'
  success-container: '#e5f0cf'
  on-success-container: '#14532d'
  primary-fixed: '#dbeafe'
  primary-fixed-dim: '#bfdbfe'
  on-primary-fixed: '#0b3259'
  on-primary-fixed-variant: '#165a97'
  background: '#f8fafc'
  on-background: '#0f172a'
  surface-variant: '#f1f5f9'
  border-hairline: '#e2e8f0'
  text-primary: '#0f172a'
  text-muted: '#64748b'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '48px'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '40px'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '32px'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '28px'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '24px'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '20px'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '16px'
    letterSpacing: 0.08em
  t-account-header:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '700'
    lineHeight: '18px'
    letterSpacing: 0.04em
  ledger-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '20px'
  ledger-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '16px'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  sidebar-width: 280px
  tutor-drawer-width: 440px
  margin-mobile: 16px
  margin-desktop: 32px
---

# Design System: JLU Gießen Accounting Tutor (Rabia Edition)

## 1. Visual Theme & Atmosphere
The design system reflects the prestigious academic heritage of **Justus-Liebig-Universität Gießen (Fachbereich 02 – Wirtschaftswissenschaften)** merged with a modern, distraction-free digital learning workspace.

The aesthetic is **Bright Academic Precision**: crisp white canvases, authoritative JLU-Blau branding, hairline structural dividers, and monospaced financial tables. It eliminates cognitive friction, allowing students like Rabia to master complex double-entry bookkeeping (*Buchführung*) and managerial cost accounting (*Kostenrechnung*) with absolute calm and confidence.

Key characteristics:
- **Atmospheric Clarity:** Bright, well-lit canvas (`#F8FAFC`) with elevated pure white surfaces (`#FFFFFF`) to minimize visual fatigue during long study sessions.
- **Academic Authority:** Grounded by official JLU-Blau (`#165A97`) and JLU Deep Navy (`#0B3259`). No flashy consumer-app gimmicks, no childish illustrations, and no aggressive neon gradients.
- **Tactile Learning Tools:** Interactive T-Accounts (*T-Konten*), tactile Buchungssatz input chips, and a persistent 1-Click AI Tutor drawer powered by Google Gemini.

---

## 2. Color Palette & Roles

| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **JLU Blue (Primary)** | `#165A97` | Official university primary color; primary buttons, active lecture badges, progress meters, selected states. |
| **JLU Navy (Secondary)** | `#0B3259` | Academic header bars, module category titles, dark container badges. |
| **JLU Soft Tint** | `#EAF7FF` | Subtle background highlight for selected exercises, active nav links, and formula containers. |
| **Canvas Bright** | `#F8FAFC` | Main application background (Slate-50); soft on the eyes, higher contrast than pure gray. |
| **Pure Surface** | `#FFFFFF` | Card backgrounds, T-Account tables, modal sheets, input field surfaces. |
| **Deep Charcoal Text** | `#0F172A` | Primary typography (Slate-900); crisp, sharp contrast for readability. |
| **Muted Slate** | `#64748B` | Secondary descriptions, exercise IDs, metadata, inactive tab indicators. |
| **Hairline Border** | `#E2E8F0` | Subtle 1px structural lines for cards, tables, and sidebar dividers. |
| **Academic Amber (Notice)** | `#D97706` / `#FEF3C7` | Highlight badges, "Achtung"-notices (e.g. Vorsteuer vs. USt distinction, Klausurfallen). |
| **Academic Emerald (Success)**| `#15803D` / `#E5F0CF` | Correct booking entries, balanced accounts, passed exercise badges. |
| **Academic Crimson (Error)** | `#B91C1C` / `#FEE2E2` | Unbalanced bookings, incorrect accounts, negative saldo indicators. |

---

## 3. Typography Architecture

- **UI & Headlines:** **Plus Jakarta Sans** (Weights: 400, 500, 600, 700). High x-height, refined academic proportions, crisp rendering on high-DPI displays.
- **Financial Data & Syntax:** **JetBrains Mono** (Weights: 400, 500, 700). Used unconditionally for:
  - T-Accounts (*T-Konten*) debit/credit amounts
  - Buchungssatz strings (`Kasse 750,00 € an Bank 750,00 €`)
  - Balance sheet tables (*Bilanz*, *GuV*, *BAB*)
  - Mathematical formulas and percentages
- **Banned Typography:**
  - `Inter` is banned (too generic, lack of academic personality).
  - Generic decorative serifs (`Times New Roman`, `Georgia`, `Garamond`) are banned.

---

## 4. Specialized Component Stylings

### A. The JLU Header & Navigation
- **Height:** 64px, pinned to top with `backdrop-filter: blur(12px)`.
- **Branding:** Left-aligned official Justus-Liebig-Universität Gießen textmark with faculty subtitle (*FB 02 Wirtschaftswissenschaften — Prof. Dr. Ewelt-Knauer & Prof. Dr. Wöhrmann*).
- **Module Switcher:** Clean pill selector: `Buchführung (Bibi Edition)` vs. `Kostenrechnung (Managerial Accounting)`.
- **Right Zone:** Rabia's Study Profile, Klausur Countdown Widget (z.B. "Noch 18 Tage bis zur Klausur"), and Gemini API Key Status indicator.

### B. The T-Account Widget (`T-Konto`)
- **Structure:** Clean 2-column tabular card split down the middle by a crisp 2px vertical border (`#CBD5E1`).
- **Header:** Full width top bar displaying the account name (e.g., `Aktivkonto: Betriebs- und Geschäftsausstattung (BGA)` or `Passivkonto: Bankkredit`).
- **Sides:** Left side labeled **Soll** (`#165A97`), right side labeled **Haben** (`#165A97`).
- **Values:** Numbers formatted in `JetBrains Mono` right-aligned, with currency symbol `€`.
- **Footer:** Automatic Saldo balancing row with double bottom border (`border-bottom: 3px double #0B3259`).

### C. The Buchungssatz Composer
- **Visual Pattern:** Interactive chip-based sentence builder:
  `[Per / Soll: Konto-Auswahl] [Betrag €] an [Haben: Konto-Auswahl] [Betrag €]`
- **Validation Badge:** Real-time indicator showing whether *Soll = Haben* (Axiom der doppelten Buchführung).
- **Bilanzwirkung Tag:** Automatic chip showing the transaction type:
  `[Aktivtausch]`, `[Passivtausch]`, `[Bilanzverlängerung]`, `[Bilanzverkürzung]`, or `[Erfolgswirksam (GuV)]`.

### D. The 1-Click AI Tutor Drawer ("JLU Accounting Copilot")
- **Trigger:** Prominent, high-contrast button on every exercise: `"Schritt-für-Schritt mit KI erklären"` (Styled with JLU-Blau and a subtle academic spark badge).
- **Drawer Behavior:** Smooth slide-over drawer (width: 440px on desktop, full screen on mobile) appearing from the right.
- **Didactic 4-Step Breakdown Structure:**
  1. **Der Kerngedanke:** 1-2 Sätze ohne Fachchinesisch.
  2. **Die Buchungs-Logik:** Welches Konto ist betroffen? Aktiv oder Passiv? Soll oder Haben?
  3. **Die exakte Rechnung:** Netto, 19% bzw. 7% USt/Vorsteuer, Zahlungsziel, Bruttobetrag.
  4. **JLU-Klausur-Tipp:** Häufige Fehlerquellen (z.B. warum keine Vorsteuer bei Bankkredit!).

### E. Rabia's Weakness Tracker ("Folge 1–3 Problem-Löser")
- Dedicated quick-access filter highlighting the exact topics Rabia struggled with on her handwritten notes:
  - *Externes vs. Internes Rechnungswesen (1.3)*
  - *Aktivtausch vs. Bilanzverlängerung (1.4 & 1.5)*
  - *Geleistete Anzahlungen vs. sofortiger Anlagenzugang (2.2 & 2.4)*
  - *Vorsteuerberechnung: Netto vs. Brutto (2.3)*
  - *GuV als Unterkonto des Eigenkapitals (3.1 & 3.2)*
  - *Erfolgswirksamkeit von Bestandsveränderungen (3.4 & 3.5)*

---

## 5. Layout Principles & Responsive Architecture

- **Desktop Layout (≥ 1024px):**
  - Left persistent sidebar (260px): Lecture navigator (Prolog, Folge 1–10, LE 1–12, Probeklausur).
  - Central exercise workspace (max-width: 960px): Active exercise, interactive input form, dynamic T-Accounts, instant feedback.
  - Right slide-over drawer (440px): On-demand AI explanations, didactic walk-throughs, formula sheet.
- **Mobile Collapse (< 768px):**
  - Full single-column flow.
  - T-Accounts switch from dual-column to tabbed view (`Soll` tab / `Haben` tab) if viewport width is below 380px.
  - Touch targets minimum 48px.
  - Drawer covers 100% viewport width with top sticky close header.

---

## 6. Motion & Micro-Interactions

- **Spring Dynamics:** `stiffness: 120, damping: 18` for natural, tactile responsiveness.
- **Button Feedback:** `-1px translateY` on active press with subtle border shadow contraction.
- **AI Shimmer:** Subtle academic shimmer loading state while Gemini generates the step-by-step breakdown (no generic spinning spinners).
- **Success Confetti / Pulse:** Micro-green pulse when a tricky booking is solved correctly on the first attempt.

---

## 7. Anti-Patterns & Banned AI Clichés

- **No Emojis:** Replace all emojis with refined SVG stroke icons (`lucide-react`: `BookOpen`, `Sparkles`, `Calculator`, `HelpCircle`, `CheckCircle2`, `ArrowRightLeft`).
- **No Neon Purple/Blue AI Glow:** Strictly university-grade academic styling. AI assistance is presented as a scholarly tutor, not a sci-fi bot.
- **No Pure Black (`#000000`):** Use Slate-900 (`#0F172A`) for primary text.
- **No 3-Column Identical Feature Grids:** Use functional, asymmetric layouts tailored to accounting workflows (e.g., Problem Context | Interactive Booking Pad | Dynamic T-Accounts).
- **No Mockup Placeholders:** All practice data must be real, authenticated JLU Gießen accounting curriculum content.
