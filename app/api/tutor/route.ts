import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { JLU_CORPUS } from '@/data/jluCorpus';

const SYSTEM_INSTRUCTION = `Du bist der persönliche, hochqualifizierte akademische KI-Tutor für das Modul 'Accounting' (Buchführung und Kostenrechnung) am Fachbereich 02 Wirtschaftswissenschaften der Justus-Liebig-Universität Gießen (JLU).

Deine primäre Studentin ist Rabia. Dein Ziel ist es, ihr jede Frage und jede Buchungsaufgabe geduldig, didaktisch brillant, rechnerisch präzise und mit universitärem JLU-Standard zu erklären.

=== NOTEBOOKLM-WISSENSBASIS & VOLLSTÄNDIGER JLU-LEHRKORPUS ===
Du hast vollen Zugriff auf das gesamte Curriculum von Prof. Dr. Corinna Ewelt-Knauer (Buchführung / Financial Accounting, Folgen 1-10) und Prof. Dr. Arnt Wöhrmann (Kostenrechnung / Managerial Accounting, Lerneinheiten 2-12, inklusive der Original-Probeklausur mit Musterlösungen).

Hier ist dein vollständiger Vorlesungs- und Klausurkorpus:
${JLU_CORPUS}

=== BESONDERER FOKUS: TEIL 1, 2 UND 3 & RABIAS HANDSCHRIFTLICHE NOTIZEN ===
Rabia hat zu Folge 1, 2 und 3 handschriftliche Notizen und Skizzen auf ihren Arbeitsblättern angefertigt. Du kennst ihre typischen Verständnis-Hürden und gehst bei jeder Frage sofort darauf ein:
1. Folge 1 (Aufgabe 1.1 / 1.3): Externes RW (HGB: Dokumentation §238, Rechenschaft, Gläubigerschutz) vs. Internes RW (Wirtschaftlichkeitskontrolle, Kostenrechnung, interne Zahlungsfähigkeit bei Prof. Wöhrmann).
2. Folge 1 (Aufgabe 1.2 / 1.3): Bilanz (Stichtag 31.12., Vermögens- und Finanzlage) vs. GuV (Zeitraum 01.01.-31.12., Ertragslage).
3. Folge 1 (Aufgabe 1.4): Flohmarkt-Möbelkauf bar (450 € / 750 €): Reiner Aktivtausch! BGA nimmt im Soll zu, Kasse nimmt im Haben ab. Netto-Aktivseite = 0. Bilanzsumme bleibt gleich, nur Vermögensstruktur ändert sich!
4. Folge 1 (Aufgabe 1.5): Bankkredit 30.000 €: Bilanzverlängerung / Aktiv-Passiv-Mehrung! Bankguthaben (Aktiva Soll) und Bankschulden (Passiva Haben) steigen beide um 30.000 €.
5. Folge 1 (Aufgabe 1.6): Tilgung vs. Zinsen: 'Bankkredit 4.000 € an Bank 4.000 €' ist reine Tilgung (Schuldenabbau = Bilanzverkürzung, erfolgsneutral). Zinsen sind separater Aufwand (Zinsaufwand an Bank) und mindern die GuV!
6. Folge 1 (Aufgabe 1.7): Inventar (§240 HGB: Staffelform, Mengengerüst kg/Stk/Liter, Art und Einzelwert) vs. Bilanz (§266 HGB: Kontenform T-Konto, aggregierte Positionen nur in Euro).
7. Folge 2 (Aufgabe 2.1): Systematik der 4 Bilanzveränderungen im Wareneinkauf.
8. Folge 2 (Aufgabe 2.2 - KERNAUFGABE): Anschaffung Küchenmaschine 2.000 € netto + 19% USt (380 €) = 2.380 € brutto. 30% Bank (714 €) + 70% Ziel (1.666 €).
   - Warum KEINE Anzahlung? Weil die Maschine sofort geliefert wurde (Gefahrenübergang vollzogen)! Sie gehört sofort zum Anlagevermögen und wird als BGA aktiviert! Anzahlungen existieren nur VOR Leistungserbringung!
   - Warum steigt die Bilanzsumme um 1.666 €? Aktivseite: +2.000 (BGA) + 380 (Vorsteuer) - 714 (Bank) = +1.666 €. Passivseite: +1.666 € (Verbindlichkeiten LuL).
9. Folge 2 (Aufgabe 2.3): Steuerberechnung & Geldtransfers. Rabia versuchte, Steuer auf einen Kredit (3000 / 1.19) zu berechnen. Reines Geldgeschäft (Darlehen, Tilgung, Abhebung) hat NIEMALS Vorsteuer oder Umsatzsteuer (§1 Abs. 1 UStG)! Bei Bruttopreisen mit Steuer: Netto = Brutto / 1,19 (bzw. / 1,07). Niemals einfach 19% abziehen!
10. Folge 2 (Aufgabe 2.4): Erdbeerkauf mit Anzahlung vor Lieferung (400 € netto, 7% USt). Bei Anzahlung vor Lieferung darf Vorsteuer nach §15 Abs. 1 Nr. 1 UStG sofort bei Überweisung der Anzahlung gezogen werden: Geleistete Anzahlungen 200 € und Vorsteuer 14 € an Bank 214 €. Bei Lieferung erfolgt Verrechnung.
11. Folge 2 (Aufgabe 2.5): Kauf von Rohstoffen bar mit 7% Vorsteuer (150 € netto + 10,50 € VSt an Kasse 160,50 €). Reiner Aktivtausch.
12. Folge 3 (Aufgabe 3.1 & 3.2): GuV als Unterkonto des Eigenkapitals (Passivseite)! Der Saldo der GuV fließt am 31.12. in das Eigenkapitalkonto (Jahresüberschuss mehrt EK im Haben; Jahresfehlbetrag mindert EK im Soll).
13. Folge 3 (Aufgabe 3.3): Warum stehen Aufwendungen im SOLL und Erträge im HABEN? Eigenkapital ist Passivkonto (Minderung im Soll, Mehrung im Haben). Aufwand mindert EK -> Soll. Ertrag mehrt EK -> Haben!
14. Folge 3 (Aufgabe 3.4 & 3.5): Eisherstellung aus Vorräten (340 € / 350 € Früchte). WARUM KASSE GRUNDFALSCH IST! Bei der internen Produktion fließt kein Bargeld. Rohstoffe lagen im Lager.
   - Buchung GKV: Aufwand für Rohstoffe 340 € an Rohstoffe 340 € UND Fertigerzeugnisse 340 € an Bestandsmehrungen (Ertrag) 340 €.
   - Warum erfolgsneutral? Aufwand (340 €) gleicht Ertrag (340 €) exakt aus -> Erfolgswirkung = 0 €!
15. Folge 3 (Aufgabe 3.7): Die Matrix der Zahlungs- und Erfolgswirksamkeit (Maschinenkauf Ziel, Blitzeinschlag/AfA, Zinsgutschrift, Barkauf).

=== DEINE DIDAKTISCHE 4-SCHRITT-METHODE ===
1. DER KERNGEDANKE: Beseitige den typischen Denkfehler sofort und ohne Umschweife (mit direktem Bezug zu Rabias Überlegungen).
2. DIE KONTEN-LOGIK: Welche Konten sind betroffen? Aktiv/Passiv/Erfolg? Zunahme/Abnahme? Soll oder Haben?
3. DIE RECHNUNG & DER BUCHUNGSSATZ: Exakte Beträge (Netto, Vorsteuer, Brutto) und formeller Satz "Per [Soll] an [Haben]".
4. JLU-KLAUSUR-TIPP & MERKHILFE: Warnhinweis vor den typischen Klausurfallen von Prof. Ewelt-Knauer und Prof. Wöhrmann.

TONE OF VOICE:
Ermutigend, glasklar, didaktisch strukturiert, akademisch präzise, übersichtlich mit Absätzen und Listen.`;

// Parse list of keys from env
function getKeys(commaSeparated?: string, single?: string): string[] {
  const list: string[] = [];
  if (commaSeparated) {
    list.push(...commaSeparated.split(',').map((k) => k.replace(/["']/g, '').trim()).filter(Boolean));
  }
  if (single) {
    const cleanSingle = single.replace(/["']/g, '').trim();
    if (cleanSingle && !list.includes(cleanSingle)) {
      list.unshift(cleanSingle);
    }
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

    const isExamQuestion = context?.includes('KLAUSURFRAGE');
    const userPrompt = `Aufgaben-Kontext: ${context || 'Allgemeine Buchführung / KLR am FB 02 WiWi'}
${history ? `Bisheriger Verlauf: ${JSON.stringify(history)}\n` : ''}
Rabias Frage / Sachverhalt: "${question}"

${
  isExamQuestion
    ? 'WICHTIG (KLAUSUR-MODUS): Rabia befindet sich gerade in einer Prüfungssimulation! Gib ihr didaktische Denkanstöße, erkläre das methodische Vorgehen und die Konten/Formeln, aber verrate ihr NICHT die finale Zahl oder den Buchungssatz 1:1, sondern leite sie an, es selbst zu berechnen.'
    : 'Bitte erkläre dies Rabia im universitären JLU-Standard strukturiert nach den 4 Schritten.'
}`;

    // 1. Try Google Gemini Keys with Gemini 2.5 Flash & Extended Thinking
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
          model: 'gemini-2.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            thinkingConfig: {
              thinkingBudget: -1, // Dynamic extended thinking
            },
            maxOutputTokens: 8192,
            temperature: 0.2,
          },
        });

        if (response.text) {
          return NextResponse.json({
            reply: response.text,
            source: 'gemini-2.5-flash-thinking',
          });
        }
      } catch (geminiError: any) {
        console.warn(`Gemini key failed or revoked, rotating to next key... Error: ${geminiError?.message?.slice(0, 120)}`);
      }
    }

    // 2. Try OpenRouter Keys with Gemini 2.5 Flash & Reasoning
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
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: SYSTEM_INSTRUCTION },
              { role: 'user', content: userPrompt },
            ],
            max_tokens: 4096,
            reasoning: {
              effort: 'high',
            },
            temperature: 0.2,
          }),
        });

        if (orResponse.ok) {
          const orData = await orResponse.json();
          const reply = orData.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              source: 'openrouter-gemini-2.5-flash-thinking',
            });
          }
        } else {
          const errBody = await orResponse.text();
          console.warn(`OpenRouter key status ${orResponse.status}: ${errBody.slice(0, 100)}`);
        }
      } catch (orError: any) {
        console.warn(`OpenRouter request failed, rotating... Error: ${orError?.message}`);
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

  if (q.includes('anzahlung') || q.includes('rührmaschine') || q.includes('küchenmaschine') || q.includes('2.000') || q.includes('1.666')) {
    return `### 1. DER KERNGEDANKE (Rabias Notiz zu Folge 2.2)
Eine Anzahlung liegt nach HGB nur dann vor, wenn Geld fließt, **bevor** die Ware geliefert wird (Vorleistung). Da Bibi die Rührmaschine sofort geliefert bekommt und abnimmt (Gefahrenübergang vollzogen), hat sie die wirtschaftliche Verfügungsmacht erlangt – die Maschine wird **sofort voll als BGA (Sachanlagen)** aktiviert!

### 2. DIE KONTEN-LOGIK & BILANZVERÄNDERUNG
- **BGA** (Aktivkonto): Zugang der Maschine um 2.000,00 € ➔ **SOLL**
- **Vorsteuer 19%** (Aktivkonto / Forderung an Finanzamt): Zunahme um 380,00 € ➔ **SOLL**
- **Bank** (Aktivkonto): Minderung durch 30% Sofortüberweisung (714,00 €) ➔ **HABEN**
- **Verbindlichkeiten LuL** (Passivkonto): Zunahme der Restschuld von 70% (1.666,00 €) ➔ **HABEN**

### 3. EXAKTE RECHNUNG & WARUM DIE BILANZSUMME UM 1.666 € STEIGT:
- Netto: 2.000,00 €
- 19% Vorsteuer: 380,00 €
- Brutto: 2.380,00 €
- Sofort fällig per Bank (30% von 2.380 €): 714,00 €
- Ziel/Verbindlichkeit (70% von 2.380 €): 1.666,00 €

**Wirkung auf die Bilanz:**
- **Aktivseite:** +2.000 € (BGA) + 380 € (Vorsteuer) - 714 € (Bank) = **+1.666,00 €**
- **Passivseite:** +1.666,00 € (Verbindlichkeiten LuL)
➔ **Bilanzsumme steigt um exakt 1.666,00 € (Bilanzverlängerung)!**

**Offizieller JLU Buchungssatz:**
> **BGA 2.000,00 € und Vorsteuer 380,00 € an Bank 714,00 € und Verbindlichkeiten LuL 1.666,00 €**

### 4. JLU-KLAUSUR-TIPP (Prof. Dr. Ewelt-Knauer)
Klausurfalle: Niemals die 30% als 'Geleistete Anzahlungen' verbuchen, wenn die Lieferung bereits erfolgt ist! Die Vorsteuer entsteht sofort in voller Höhe bei Leistungserbringung.`;
  }

  if (q.includes('sorbet') || q.includes('lagerentnahme') || q.includes('340') || q.includes('350') || q.includes('herstellung')) {
    return `### 1. DER KERNGEDANKE (Rabias Notiz zu Folge 3.5)
In deiner Notiz stand 'Fertige Eis an Kasse' – **Kasse ist grundfalsch**, weil bei der Eisherstellung im Labor kein Bargeld fließt! Bibi hat die Früchte und den Zucker bereits vorher gekauft, sie lagen im Lager.

### 2. DIE KONTEN-LOGIK & ZWEI BUCHUNGSSCHRITTE
1. **Rohstoffverbrauch:** Früchte verlassen das Vorratslager:
   > **Aufwand für Rohstoffe 340,00 € an Rohstoffe (Vorräte) 340,00 €**
2. **Fertiges Eis entsteht:** Neues fertiges Produkt wird ins Kühlhaus eingelagert:
   > **Fertigerzeugnisse 340,00 € an Bestandsmehrung an Fertigerzeugnissen (Ertrag) 340,00 €**

### 3. WARUM IST DIE HERSTELLUNG ERFOLGSNEUTRAL?
- In Schritt 1 buchst du **340 € Aufwand** (mindert die GuV).
- In Schritt 2 buchst du **340 € Ertrag** (mehrt die GuV).
- $+340 € - 340 € = \mathbf{0 €}$!
- **Didaktischer Grund:** Man wird nicht reicher, bloß weil man Früchte zu Eis gefriert. Erst wenn das Eis an der Theke an Kunden **verkauft** wird, entsteht der Gewinn!

### 4. JLU-KLAUSUR-TIPP (Prof. Dr. Ewelt-Knauer)
Prof. Ewelt-Knauer fragt diesen Vorgang extrem gerne ab, um zu prüfen, wer den Unterschied zwischen bloßer Produktion (erfolgsneutral) und Vertrieb/Umsatz (Gewinnrealisation nach § 252 Abs. 1 Nr. 4 HGB) verstanden hat!`;
  }

  if (q.includes('erdbeere') || q.includes('7%') || q.includes('214')) {
    return `### 1. DER KERNGEDANKE (Rabias Notiz zu Folge 2.4)
Bei einer Anzahlung VOR Lieferung darf die Vorsteuer nach § 15 Abs. 1 Nr. 1 UStG sofort bei Überweisung geltend gemacht werden!
Erdbeeren sind Grundnahrungsmittel = **7% ermäßigter Steuersatz** nach § 12 Abs. 2 UStG.

### 2. RECHNUNG & BUCHUNGSSATZ
- Bruttoüberweisung: 214,00 €
- Nettoanzahlung = $214 / 1,07 = 200,00 €$
- Vorsteuer (7%) = $200 \times 0,07 = 14,00 €$

**Buchungssatz der Anzahlung:**
> **Geleistete Anzahlungen auf Vorräte 200,00 € und Vorsteuer 14,00 € an Bank 214,00 €**

### 3. SCHLUSSRECHNUNG BEI LIEFERUNG (400 € NETTO)
Wenn alle Erdbeeren geliefert werden:
> **Vorräte 400,00 € und Vorsteuer 14,00 € an Geleistete Anzahlungen 200,00 € und Verbindlichkeiten LuL 214,00 €**`;
  }

  if (q.includes('extern') || q.includes('intern') || q.includes('wirtschaftlichkeit')) {
    return `### 1. DER KERNGEDANKE (Rabias Notiz zu Folge 1.1)
**Externes Rechnungswesen (HGB / Finanzbuchhaltung):**
- Gesetzlich streng geregelt nach §§ 238 ff. HGB.
- Adressaten: Externe Dritte (Gläubiger, Banken, Finanzamt, Gerichte, Kunden).
- Hauptaufgaben: **Dokumentationsfunktion**, **Rechenschaftslegung** und **Gläubigerschutz**.

**Internes Rechnungswesen (Kostenrechnung / Controlling bei Prof. Dr. Wöhrmann):**
- Gesetzlich frei gestaltbar.
- Adressaten: Interne Unternehmensführung (Management).
- Hauptaufgabe: **Prüfung der Wirtschaftlichkeit** und interne Liquiditäts-/Kostenstellensteuerung!

### 2. MERKSATZ FÜR DIE JLU-KLAUSUR
Wirtschaftlichkeit der Leistungserstellung ist niemals Aufgabe des externen RW nach HGB, sondern gehört zwingend in die Kosten- und Leistungsrechnung!`;
  }

  if (q.includes('bilanz vs. guv') || (q.includes('stichtag') && q.includes('zeitraum')) || q.includes('ertragslage')) {
    return `### 1. DER KERNGEDANKE (Rabias Notiz zu Folge 1.2 & 1.3)
- **Die Bilanz** ist eine **Stichtagsrechnung (z.B. zum 31.12.)**. Sie zeigt als Foto die **Vermögens- und Finanzlage** (Aktiva = Vermögen, Passiva = Kapital/Schulden).
- **Die GuV** ist eine **Zeitraumbetrachtung (01.01. bis 31.12.)**. Sie zeigt als Film die Erträge und Aufwendungen und vermittelt die **Ertragslage**!

### 2. MERKSATZ
Bilanz = Foto zum Stichtag (Vermögen & Schulden).
GuV = Film des gesamten Geschäftsjahres (Gewinn oder Verlust).`;
  }

  if (q.includes('guv') && (q.includes('unterkonto') || q.includes('eigenkapital') || q.includes('soll') || q.includes('haben'))) {
    return `### 1. DER KERNGEDANKE (Rabias Notiz zu Folge 3.1, 3.2 & 3.3)
**Die GuV ist das zentrale Unterkonto des Eigenkapitals auf der Passivseite der Bilanz!**

### 2. WARUM STEHEN AUFWENDUNGEN IM SOLL UND ERTRÄGE IM HABEN?
- Das Konto **Eigenkapital** ist ein **Passivkonto**.
- Bei Passivkonten gilt:
  - **Minderungen stehen im SOLL.**
  - **Mehrungen stehen im HABEN.**
- Da **Aufwendungen das Eigenkapital mindern**, stehen alle Aufwendungen im **SOLL** des GuV-Kontos!
- Da **Erträge das Eigenkapital mehren**, stehen alle Erträge im **HABEN** des GuV-Kontos!

### 3. DER JAHRESABSCHLUSS
Am 31.12. schließt die GuV über das Eigenkapitalkonto ab:
- **Jahresüberschuss (Gewinn):** 'GuV an Eigenkapital' (mehrt EK im Haben).
- **Jahresfehlbetrag (Verlust):** 'Eigenkapital an GuV' (mindert EK im Soll).`;
  }

  return `### 1. DER KERNGEDANKE
Im System der doppelten Buchführung gilt das Axiom: Jeder Geschäftsvorfall berührt mindestens zwei Konten, und **Summe Soll = Summe Haben**.

### 2. DIE KONTEN-LOGIK
- **Aktivkonten:** Mehrung im **Soll**, Minderung im **Haben** (z.B. BGA, Bank, Kasse, Vorsteuer).
- **Passivkonten:** Minderung im **Soll**, Mehrung im **Haben** (z.B. Eigenkapital, Verbindlichkeiten).
- **Aufwandskonten:** Buchung im **Soll** (mindert Eigenkapital).
- **Ertragskonten:** Buchung im **Haben** (mehrt Eigenkapital).

### 3. JLU-KLAUSUR-TIPP (FB 02 WiWi)
Prüfe stets:
1. Welche Konten sind berührt?
2. Handelt es sich um Aktiv-, Passiv- oder Erfolgskonten?
3. Ist der Vorfall erfolgswirksam (GuV) oder erfolgsneutral (reine Bilanzveränderung)?`;
}
