# JLU Gießen Accounting Tutor (Rabia Edition) 🎓

Eine moderne, interaktive Web-App im **Duolingo-Stil** für das Modul **Accounting** (Buchführung & Finanzberichterstattung bei Prof. Dr. Corinna Ewelt-Knauer und Kostenrechnung bei Prof. Dr. Arnt Wöhrmann) am Fachbereich Wirtschaftswissenschaften der **Justus-Liebig-Universität Gießen (JLU)**.

Optimiert für **Desktop, Tablet und Smartphone** mit haptischem Feedback, Buchungssatz-Baukasten (Wort-Chips), T-Konten-Visualisierung und integriertem **1-Klick KI-Tutor** (Google Gemini).

---

## 🚀 Features

- **Gamifizierter Duolingo-Lernpfad:** Lerneinheiten für Folge 1 bis 10 und Kostenrechnung LE 1 bis 12.
- **Rabias 17-Punkte-Schwachstellen-Studio:** Gezielte Aufarbeitung aller handschriftlichen Notizen und Fragen zu Folge 1, 2 und 3.
- **Interaktiver Buchungssatz-Baukasten:** Wähle per Klick/Tap auf dem Handy die passenden Konten und Beträge für Soll und Haben.
- **Echte T-Konten (Soll / Haben):** Automatische Zunahmen, Abnahmen und Saldenberechnung nach deutschen HGB-Standards.
- **1-Klick KI-Erklärer ("JLU Didaktik-Copilot"):** Schritt-für-Schritt Erklärung nach der 4-Punkte-Methode (Kerngedanke, Konten-Logik, Rechnung, Klausur-Tipp).
- **Audio-Synthesizer:** Belohnende Töne bei Erfolg und sanfte Hinweise bei Fehlern über die native Web Audio API (keine externen MP3s nötig).
- **Google AI Studio / Gemini Integration:** Bereit für deinen individuellen Gemini API-Key mit lokalem Didaktik-Fallback.

---

## 🛠️ Schnellstart (Lokal)

```bash
# 1. Repository klonen
git clone https://github.com/umutcantezgel-cpu/JLU.git
cd JLU

# 2. Abhängigkeiten installieren
npm install

# 3. Lokalen Entwicklungsserver starten
npm run dev
```

Die App öffnet sich sofort unter `http://localhost:5173`.

---

## 🚢 Deployment auf Vercel

1. Importiere dieses Repository auf [vercel.com](https://vercel.com).
2. Framework-Preset: **Vite** (wird automatisch erkannt).
3. (Optional) Hinterlege unter Environment Variables:
   `VITE_GEMINI_API_KEY = dein-gemini-api-key`
4. Klicke auf **Deploy** — die App ist sofort live und auf allen Smartphones und Tablets nutzbar!

---

## 📖 Dokumentation im Projekt

- [`DESIGN.md`](./DESIGN.md) — Das offizielle JLU Design System für Google Stitch
- [`STITCH_PROMPTS_AND_SETUP.md`](./STITCH_PROMPTS_AND_SETUP.md) — Prompt-Suite für Google Stitch Screens
- [`GOOGLE_AI_STUDIO_PROTOTYPE_SPEC.md`](./GOOGLE_AI_STUDIO_PROTOTYPE_SPEC.md) — System Instructions & Test-Prompt für Google AI Studio
- [`RABIA_BWL_ERKLAERUNGEN_FOLGE_1_3.md`](./RABIA_BWL_ERKLAERUNGEN_FOLGE_1_3.md) — Didaktische Aufklärung aller 17 handschriftlichen Probleme
