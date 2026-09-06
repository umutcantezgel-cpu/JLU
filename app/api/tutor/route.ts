import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `Du bist der persönliche, hochqualifizierte akademische KI-Tutor für das Modul 'Accounting' (Buchführung und Kostenrechnung) am Fachbereich Wirtschaftswissenschaften der Justus-Liebig-Universität Gießen (JLU).

Deine primäre Studentin ist Rabia. Dein Ziel ist es, ihr jede Frage und jede Buchungsaufgabe geduldig, didaktisch brillant, rechnerisch präzise und mit universitärem JLU-Standard zu erklären.

DEIN LEHR-KONTEXT & JLU-CURRICULUM:
1. Buchführung & Finanzberichterstattung (Prof. Dr. Corinna Ewelt-Knauer):
   - Fallstudie: 'Bibi Bilanzierung' (@bibi.bilanzierung) und ihre Eisdiele 'N.Icecream GmbH'.
   - Schwerpunkte:
     * Inventar vs. Bilanz (Staffelform vs. Kontenform, Detaillierungsgrad nach § 240 vs. § 266 HGB)
     * 4 Bilanzveränderungen: Aktivtausch, Passivtausch, Bilanzverlängerung (Aktiv-Passiv-Mehrung), Bilanzverkürzung (Aktiv-Passiv-Minderung)
     * Buchungssätze im System der doppelten Buchführung (Soll an Haben)
     * Vorsteuer (19% & 7%), Umsatzsteuer, Vorsteuerabzugsberechtigung (§ 15 UStG), kein Steuerabzug bei reinen Geldtransfers / Krediten
     * Sofortige Aktivierung von Sachanlagen (BGA) bei Lieferung vs. Geleistete Anzahlungen (§ 266 HGB) nur VOR Leistungserbringung
     * Erfolgskonten (Aufwendungen im Soll, Erträge im Haben)
     * GuV als Unterkonto des Eigenkapitals (Passivseite)
     * Eisherstellung: Rohstoffentnahme (Aufwand) und Bestandsmehrung fertiger Erzeugnisse (Ertrag) als erfolgsneutraler Zyklus
2. Kostenrechnung (Prof. Dr. Arnt Wöhrmann):
   - Grundbegriffe: Auszahlung, Ausgabe, Aufwand, Kosten
   - Kostenarten- und Kostenstellenrechnung
   - Betriebsabrechnungsbogen (BAB): Primärkosten, Sekundärkosten, Gemeinkostenzuschlagssätze (MGKZ, FGKZ, VwGKZ, VtGKZ)
   - Kalkulation (Zuschlagskalkulation, Herstellkosten d. Erzeugung/Umsatzes, Selbstkosten)
   - Deckungsbeitragsrechnung & Break-Even

DEINE DIDAKTISCHE 4-SCHRITT-METHODE:
1. DER KERNGEDANKE: Beseitige den typischen Denkfehler sofort und ohne Umschweife.
2. DIE KONTEN-LOGIK: Welche Konten sind betroffen? Aktiv/Passiv/Erfolg? Zunahme/Abnahme? Soll oder Haben?
3. DIE RECHNUNG & DER BUCHUNGSSATZ: Exakte Beträge (Netto, Vorsteuer, Brutto) und formeller Satz "Per [Soll] an [Haben]".
4. JLU-KLAUSUR-TIPP & MERKHILFE: Warnhinweis vor den typischen Klausurfallen von Prof. Ewelt-Knauer und Prof. Wöhrmann.

TONE OF VOICE:
Ermutigend, glasklar, didaktisch strukturiert, akademisch präzise, übersichtlich mit Absätzen und Listen.`;

// Parse list of keys from env
function getKeys(commaSeparated?: string, single?: string): string[] {
  const list: string[] = [];
  if (commaSeparated) {
    list.push(...commaSeparated.split(',').map(k => k.trim()).filter(Boolean));
  }
  if (single && !list.includes(single.trim())) {
    list.unshift(single.trim());
  }
  return list;
}

export async function POST(req: NextRequest) {
  try {
    const { question, context, history } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Frage darf nicht leer sein.' },
        { status: 400 }
      );
    }

    const geminiKeys = getKeys(process.env.GEMINI_API_KEYS, process.env.GEMINI_API_KEY);
    const openRouterKeys = getKeys(process.env.OPENROUTER_API_KEYS, process.env.OPENROUTER_API_KEY);

    const userPrompt = `Aufgaben-Kontext: ${context || 'Allgemeine Buchführung / KLR am FB 02 WiWi'}
${history ? `Bisheriger Verlauf: ${JSON.stringify(history)}\n` : ''}
Rabias Frage / Sachverhalt: "${question}"

Bitte erkläre dies Rabia im universitären JLU-Standard strukturiert nach den 4 Schritten.`;

    // 1. Try Google Gemini Keys (with key rotation on quota / failure)
    for (const key of geminiKeys) {
      try {
        const ai = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              'User-Agent': 'jlu-accounting-tutor',
            },
          },
        });

        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2,
          },
        });

        if (response.text) {
          return NextResponse.json({
            reply: response.text,
            source: 'gemini-direct',
          });
        }
      } catch (geminiError: any) {
        console.warn(`Gemini key failed, rotating to next key... Error: ${geminiError?.message}`);
      }
    }

    // 2. Try OpenRouter Keys (Fallback provider)
    for (const orKey of openRouterKeys) {
      try {
        const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${orKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://jlu-accounting-tutor.vercel.app',
            'X-Title': 'JLU Accounting Tutor',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.0-flash-001',
            messages: [
              { role: 'system', content: SYSTEM_INSTRUCTION },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.2,
          }),
        });

        if (orResponse.ok) {
          const orData = await orResponse.json();
          const reply = orData.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              source: 'openrouter-gemini',
            });
          }
        }
      } catch (orError: any) {
        console.warn(`OpenRouter key failed, rotating... Error: ${orError?.message}`);
      }
    }

    // 3. Deterministic JLU Didactic Fallback Engine
    const fallbackReply = generateFallbackResponse(question, context);
    return NextResponse.json({
      reply: fallbackReply,
      source: 'jlu-didactic-fallback',
    });

  } catch (error: any) {
    console.error('Server error in /api/tutor:', error);
    const fallbackReply = generateFallbackResponse('allgemein');
    return NextResponse.json({
      reply: fallbackReply,
      source: 'jlu-didactic-fallback',
    });
  }
}

function generateFallbackResponse(question: string, context?: string): string {
  const q = question.toLowerCase();

  if (q.includes('anzahlung') || q.includes('rührmaschine') || q.includes('küchenmaschine') || q.includes('2.000')) {
    return `### 1. DER KERNGEDANKE
Eine Anzahlung liegt nach HGB nur dann vor, wenn Geld fließt, **bevor** die Ware geliefert wird (schwebendes Geschäft). Da Bibi die Rührmaschine sofort geliefert bekommt und abnimmt, hat sie die wirtschaftliche Verfügungsmacht erlangt – die Maschine wird sofort voll als **Sachanlagevermögen (BGA)** aktiviert!

### 2. DIE KONTEN-LOGIK
- **0840 BGA** (Aktivkonto): Zugang der Maschine um 2.000,00 € ➔ **SOLL**
- **1576 Vorsteuer 19%** (Aktivkonto / Forderung an das Finanzamt): Zunahme um 380,00 € ➔ **SOLL**
- **1200 Bank** (Aktivkonto): Minderung durch 30% Sofortüberweisung (714,00 €) ➔ **HABEN**
- **4400 Verbindlichkeiten LuL** (Passivkonto): Zunahme der Restschuld von 70% (1.666,00 €) ➔ **HABEN**

### 3. DIE EXAKTE RECHNUNG & BUCHUNGSSATZ
- Netto: 2.000,00 €
- 19% Vorsteuer: 380,00 €
- Bruttogesamtbetrag: 2.380,00 €
- 30% Sofort (Bank): 714,00 €
- 70% Ziel (Verb. LuL): 1.666,00 €

**Offizieller JLU Buchungssatz:**
> **BGA 2.000,00 € und Vorsteuer 380,00 € an Bank 714,00 € und Verbindlichkeiten LuL 1.666,00 €**

**Bilanzwirkung:** Netto-Bilanzverlängerung (Aktiv-Passiv-Mehrung) um **+1.666,00 €**!

### 4. JLU-KLAUSUR-TIPP (Prof. Dr. Ewelt-Knauer)
Häufige Falle: Die 30% niemals als 'Geleistete Anzahlungen' buchen, sobald die Rechnung vorliegt und die Ware übergeben wurde! Und Achtung: Vorsteuer entsteht sofort in voller Höhe bei Leistungserbringung, egal ob 30% oder 100% bezahlt wurden.`;
  }

  if (q.includes('skonto') || q.includes('steuer') || q.includes('minderung')) {
    return `### 1. DER KERNGEDANKE
Skonto mindert nachträglich die Bemessungsgrundlage der Anschaffungskosten. Daher muss bei Skontoabzug nicht nur die Verbindlichkeit gemindert, sondern auch die zuvor geltend gemachte Vorsteuer anteilig an das Finanzamt korrigiert (zurückgeführt) werden.

### 2. DIE KONTEN-LOGIK
- Verbindlichkeiten LuL werden im **Soll** voll ausgebucht.
- Das Bankkonto wird im **Haben** mit dem tatsächlich gezahlten Skontobetrag gemindert.
- Der Skontoabzug mindert die Anschaffungskosten (BGA bzw. Vorräte) und die **Vorsteuer im Haben**.

### 3. JLU-KLAUSUR-TIPP
Vergiss in der Klausur niemals die Vorsteuerkorrektur bei Skonto! Ein Skonto ohne Vorsteueranpassung führt zum sofortigen Punktabzug bei Prof. Ewelt-Knauer.`;
  }

  if (q.includes('extern') || q.includes('intern') || q.includes('wirtschaftlichkeit')) {
    return `### 1. DER KERNGEDANKE
**Externes Rechnungswesen (HGB):** Richtet sich an Außenstehende (Finanzamt, Banken, Gläubiger). Zweck ist Dokumentation, Rechenschaftslegung und Gläubigerschutz.
**Internes Rechnungswesen (KLR / Controlling):** Dient der internen Führung, Wirtschaftlichkeitskontrolle und Kostenstellensteuerung (Prof. Dr. Wöhrmann).

### 2. DIE KONTEN-LOGIK
Wirtschaftlichkeit der Produktion gehört niemals ins HGB, sondern zwingend in die Kosten- und Leistungsrechnung!`;
  }

  return `### 1. DER KERNGEDANKE
Im System der doppelten Buchführung gilt das Axiom: Jeder Geschäftsvorfall berührt mindestens zwei Konten, und **Summe Soll = Summe Haben**.

### 2. DIE KONTEN-LOGIK
- **Aktivkonten:** Mehrung im **Soll**, Minderung im **Haben** (z.B. BGA, Bank, Kasse, Vorsteuer).
- **Passivkonten:** Minderung im **Soll**, Mehrung im **Haben** (z.B. Eigenkapital, Verbindlichkeiten).
- **Aufwandskonten:** Buchung im **Soll** (mindert Eigenkapital).
- **Ertragskonten:** Buchung im **Haben** (mehrt Eigenkapital).

### 3. JLU-KLAUSUR-TIPP
Prüfe stets vor Saldo-Ziehung, ob deine Buchung erfolgswirksam (GuV) oder erfolgsneutral (reiner Aktiv-/Passivtausch bzw. Bilanzveränderung) ist!`;
}
