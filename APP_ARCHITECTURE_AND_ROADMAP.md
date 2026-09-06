# Technische App-Architektur & GitHub / Vercel Roadmap
**Projekt:** JLU Gießen Accounting Tutor (Rabia Edition)  
**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, Google Gemini API (`@google/genai`)  
**Deployment-Ziel:** GitHub Repository + Vercel Deployment

---

## 1. Übersicht & Gesamt-Workflow

```
[1. Google Stitch]  -->  DESIGN.md hochladen & Screens mit Prompts generieren
         |
[2. AI Studio]      -->  System Prompt testen & Gemini API Key generieren
         |
[3. Web-App]        -->  Next.js App mit JLU-Design, T-Konten & 1-Klick KI bauen
         |
[4. Deployment]     -->  Push to GitHub & 1-Klick Live-Deploy auf Vercel
```

---

## 2. Projekt-Struktur der fertigen Web-App

```
jlu-accounting-tutor/
├── app/
│   ├── layout.tsx                # Universitäts-Header, JLU-Brand, Metadaten
│   ├── page.tsx                  # Dashboard & Vorlesungs-Navigator
│   ├── arena/                    # Interaktive Übungs-Arena
│   │   └── page.tsx              # Buchungs-Pad mit Live T-Konten
│   ├── studio/                   # Rabias Schwachstellen-Studio (Folge 1-3)
│   │   └── page.tsx
│   ├── klausur/                  # JLU Probeklausur-Simulator mit Timer
│   │   └── page.tsx
│   └── api/
│       └── tutor/                # Gemini API Route für den 1-Klick Tutor
│           └── route.ts
├── components/
│   ├── JLUHeader.tsx             # Offizieller Header mit Uni-Wappen & Timer
│   ├── TKontoWidget.tsx          # Dynamisches T-Konto (Soll / Haben / Saldo)
│   ├── BuchungssatzComposer.tsx  # Interaktiver Satz-Baukasten (Per an)
│   ├── AITutorDrawer.tsx         # Slide-Over Panel für Gemini Erklärungen
│   └── ExerciseCard.tsx          # Aufgaben-Karte mit Schwierigkeitsgrad & Tags
├── data/
│   └── exercises.json            # Komplette Datenbank aller JLU-Aufgaben
├── lib/
│   └── gemini.ts                 # Google GenAI Client Initialisierung
├── public/
│   └── jlu-logo.svg              # Offizielles JLU Gießen Logo / Signet
├── DESIGN.md                     # Design-System-Spezifikation
├── .env.local                    # GEMINI_API_KEY=...
└── package.json
```

---

## 3. Gemini API Integration (`app/api/tutor/route.ts`)

Sobald du deinen API-Key aus Google AI Studio hast, wird er in `.env.local` hinterlegt:
`GEMINI_API_KEY=AIzaSy...`

Die API-Route ruft Gemini mit strukturiertem Streaming oder JSON auf:

```typescript
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { exerciseId, taskDescription, userAttempt, question } = await req.json();

    const systemInstruction = `Du bist der offizielle JLU Gießen Accounting Tutor für Rabia.
Erkläre ihr die Aufgabe nach der didaktischen 4-Schritt-Methode:
1. Der Kerngedanke (kurz und einprägsam)
2. Die Konten-Logik (Aktiv/Passiv/Erfolgskonto, Soll oder Haben)
3. Die exakte Rechnung & der finale Buchungssatz
4. JLU-Klausur-Tipp von Prof. Ewelt-Knauer / Prof. Wöhrmann`;

    const prompt = `Aufgabe: ${taskDescription}
Rabias bisheriger Versuch: ${userAttempt || 'Noch keine Eingabe'}
Rabias spezifische Frage: ${question || 'Bitte erkläre mir diese Aufgabe Schritt für Schritt'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    return NextResponse.json({ explanation: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 4. Struktur der Aufgaben-Datenbank (`data/exercises.json`)

Die Aufgaben aus den im Workspace liegenden Vorlesungen und Probeklausuren werden als typisierte JSON-Struktur hinterlegt:

```json
[
  {
    "id": "folge-1-4",
    "lecture": "Folge 1 – Die Gründung",
    "module": "Buchführung",
    "title": "Der Flohmarktbesuch",
    "storyContext": "Bibi kauft Secondhand-Möbel für 750 € auf dem Flohmarkt bar aus der Kasse, nachdem sie das Geld vom Bankkonto abgehoben hat.",
    "category": "Aktivtausch",
    "difficulty": "Einfach",
    "rabiaFocus": true,
    "solution": {
      "bookings": [
        { "soll": "Kasse", "haben": "Bank", "amount": 750 },
        { "soll": "BGA", "haben": "Kasse", "amount": 750 }
      ],
      "balanceEffect": "Aktivtausch",
      "balanceSumChange": 0
    }
  },
  {
    "id": "folge-2-2",
    "lecture": "Folge 2 – Der Wareneinkauf",
    "module": "Buchführung",
    "title": "Anschaffung der Küchenmaschine",
    "storyContext": "Bibi kauft eine Küchenmaschine für 2.000 € netto (19% MwSt.). 30% bezahlt sie sofort per Banküberweisung, 70% auf Ziel.",
    "category": "Anschaffung & Umsatzsteuer",
    "difficulty": "Mittel",
    "rabiaFocus": true,
    "solution": {
      "bookings": [
        { "soll": ["BGA", "Vorsteuer"], "haben": ["Bank", "Verbindlichkeiten LuL"], "amounts": [2000, 380, 714, 1666] }
      ],
      "balanceEffect": "Aktiv-Passiv-Mehrung (Bilanzverlängerung)",
      "balanceSumChange": 1666
    }
  }
]
```

---

## 5. Deployment auf GitHub & Vercel

1. **Git Repository initialisieren:**
   ```bash
   git init
   git add .
   git commit -m "feat: JLU Gießen Accounting Tutor für Rabia"
   ```
2. **Auf GitHub pushen:**
   ```bash
   gh repo create jlu-accounting-tutor --public --source=. --push
   ```
3. **Vercel Deployment:**
   - Mit Vercel verbinden (`vercel` CLI oder direkt auf [vercel.com](https://vercel.com) importieren).
   - In den Vercel Environment Variables den Key hinterlegen:
     `GEMINI_API_KEY = AIzaSy...`
   - Die App ist sofort unter einer schnellen `.vercel.app` Domain weltweit erreichbar!
