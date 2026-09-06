// JLU Gießen - Vollständiger Dokumenten-Korpus
// Automatisch aus allen 47 Universitätsunterlagen extrahiert
// Buchführung (Prof. Dr. Corinna Ewelt-Knauer) + Kostenrechnung (Prof. Dr. Arnt Wöhrmann)

export const JLU_CORPUS = `
=== BUCHFÜHRUNG FOLGE 1: DIE GRÜNDUNG ===
Bibi Bilanzierung gründet ihre Eisdiele N.Icecream. Folge 1 behandelt die Grundlagen des externen Rechnungswesens (HGB-Pflicht nach §238 HGB: Dokumentation, Rechenschaft, Gläubigerschutz) vs. internes Rechnungswesen (Wirtschaftlichkeit, frei gestaltbar). Bilanz: Stichtagsbezogene Gegenüberstellung Vermögen (Aktiva) und Kapital (Passiva). GuV: Zeitraumbezogene Gegenüberstellung Erträge und Aufwendungen. Inventar (Staffelform, §240 HGB, detailliert) vs. Bilanz (Kontenform, §266 HGB, aggregiert).
AUFGABE 1.1: Funktionen des Rechnungswesens - Externes RW: Dokumentation (§238 HGB), Rechenschaft, Gläubigerschutz. Internes RW: Wirtschaftlichkeit, Kostenrechnung, Planung.
AUFGABE 1.2: Bilanz (Stichtag 31.12., Bestandsgrößen) vs. GuV (Zeitraum 01.01.-31.12., Stromgrößen).
AUFGABE 1.3: Bilanzgliederung §266 HGB: Aktiva (Anlagevermögen, Umlaufvermögen, RAP) vs. Passiva (EK, Rückstellungen, Verbindlichkeiten, RAP).
AUFGABE 1.4: Flohmarkt - Bibi kauft Möbel für 450€ bar. BUCHUNGSSATZ: BGA 450 an Kasse 450. BILANZWIRKUNG: Aktivtausch (BGA+, Kasse-), Bilanzsumme unverändert!
AUFGABE 1.5: Bankkredit 50.000€ aufgenommen. BUCHUNGSSATZ: Bank 50.000 an Verbindlichkeiten ggb. Kreditinstituten 50.000. BILANZWIRKUNG: Bilanzverlängerung (Aktiv-Passiv-Mehrung +50.000€).
AUFGABE 1.6: Kredittilgung 5.000€ an Bank überwiesen (OHNE Zinsen). BUCHUNGSSATZ: Verbindlichkeiten ggb. Kreditinstituten 5.000 an Bank 5.000. BILANZWIRKUNG: Bilanzverkürzung (Aktiv-Passiv-Minderung -5.000€). Zinsen wären separater Aufwand!
AUFGABE 1.7: Inventar (Staffelform, Mengengerüst, Einzelpositionen §240) vs. Bilanz (Kontenform, aggregiert, §266 HGB). Bilanz braucht weniger Details als Inventar.

=== BUCHFÜHRUNG FOLGE 2: DER WARENEINKAUF & ANLAGEVERMÖGEN ===
AUFGABE 2.1: Aktivtausch - Bibi kauft Vorräte für 800€ per Banküberweisung. BUCHUNGSSATZ: Rohstoffe/Waren 800 an Bank 800. Aktivtausch, Bilanzsumme unverändert.
AUFGABE 2.2: KERNAUFGABE RABIA - Küchenmaschine 2.000€ netto + 19% USt (380€) = 2.380€ brutto. Lieferung SOFORT, 30% Bank (714€), 70% Ziel (1.666€). Da Gefahrenübergang vollzogen: KEINE Anzahlung! Sofortige Aktivierung. BUCHUNGSSATZ: BGA 2.000 + Vorsteuer 380 an Bank 714 + Verbindlichkeiten LuL 1.666. BILANZWIRKUNG: Bilanzverlängerung um 1.666€.
AUFGABE 2.3: Steuerberechnung. Brutto/1,19 = Netto. Netto*0,19 = Vorsteuer. Bei reinen Geldtransfers (Darlehen, Tilgung) KEINE Vorsteuer! §15 UStG: Vorsteuerabzug nur bei bezogenen Leistungen.
AUFGABE 2.4: Erdbeerkauf mit Anzahlung. 214€ brutto (7% USt) VOR Lieferung. Netto=214/1,07=200€. Vorsteuer=14€. BUCHUNGSSATZ: Geleistete Anzahlungen auf Vorräte 200 + Vorsteuer 7% 14 an Bank 214. Aktivtausch.
AUFGABE 2.5: Haselnusskauf per Bank, 7% USt. Rohstoffe netto an Bank + Vorsteuer.
AUFGABE 2.6: Die 4 Bilanzveränderungen: (1) Aktivtausch: Aktiv+/Aktiv-, Summe konstant. (2) Passivtausch: Passiv+/Passiv-, Summe konstant. (3) Bilanzverlängerung: Aktiv+/Passiv+, Summe steigt. (4) Bilanzverkürzung: Aktiv-/Passiv-, Summe sinkt.

=== BUCHFÜHRUNG FOLGE 3: GEWINN- UND VERLUSTRECHNUNG (GuV) ===
GuV ist UNTERKONTO des Eigenkapitals (Passivseite)! Eigenkapital ist Passivkonto → Mehrung im Haben (Ertrag), Minderung im Soll (Aufwand). Deshalb: AUFWAND im SOLL, ERTRAG im HABEN.
AUFGABE 3.1: GuV als EK-Unterkonto - Ertrag mehrt EK (Haben), Aufwand mindert EK (Soll).
AUFGABE 3.2: GuV und Bilanz - Jahresüberschuss erhöht Eigenkapital in der Bilanz.
AUFGABE 3.3: Mietaufwand 1.200€ per Bank. BUCHUNGSSATZ: Mietaufwand 1.200 an Bank 1.200. Erfolgswirksam (Aufwand mindert GuV und damit EK).
AUFGABE 3.4: Bestandsmehrung an Fertigerzeugnissen. GKV: FE an Bestandsveränderungen (Ertrag). UKV: Bestandsmehrung als gesonderte Zeile.
AUFGABE 3.5: KERNAUFGABE RABIA - Lagerentnahme 340€ Rohstoffe für Sorbet. KASSE NICHT BETEILIGT! BUCHUNGSSATZ (GKV): Aufwand für Rohstoffe 340 an Rohstoffe 340. Erfolgswirksam (Aufwand) und erfolgsneutral da Vermögensverzehr (keine Zahlung).
AUFGABE 3.6: GKV (Gesamtkostenverfahren) vs. UKV (Umsatzkostenverfahren). GKV: +Bestandsmehrungen FE/UFE als Ertrag. UKV: Herstellkosten des Umsatzes als Aufwand.
AUFGABE 3.7: MATRIX - Zahlungs- vs. Erfolgswirksamkeit:
  - Barkauf Büromaterial: ZAHLUNGSWIRKSAM (Kasse-) UND ERFOLGSWIRKSAM (Aufwand↑)
  - Kreditkauf: NICHT zahlungswirksam sofort, ERFOLGSWIRKSAM (Aufwand↑)
  - Tilgung: ZAHLUNGSWIRKSAM (Bank-), NICHT erfolgswirksam (Schuld-)
  - Abschreibung: NICHT zahlungswirksam, ERFOLGSWIRKSAM (Aufwand↑)
  - ARAP-Buchung: NICHT zahlungswirksam (bereits bezahlt), zeitliche Abgrenzung

=== BUCHFÜHRUNG FOLGE 4: UMSATZERLÖSE & REALISATIONSPRINZIP ===
AUFGABE 4.1: Eisverkauf bar 1.070€ (7% USt). Netto=1.000€, USt=70€. BUCHUNGSSATZ: Kasse 1.070 an Umsatzerlöse 1.000 + Umsatzsteuer 70. §12 Abs.2 UStG: 7% für Lebensmittel zum Mitnehmen.
AUFGABE 4.2: Eisbestellung auf Rechnung 2.380€ (19% USt). BUCHUNGSSATZ: Forderungen LuL 2.380 an Umsatzerlöse 2.000 + Umsatzsteuer 380.
AUFGABE 4.3: Zahlungseingang Forderung. BUCHUNGSSATZ: Bank 2.380 an Forderungen LuL 2.380.
AUFGABE 4.4/4.5: Vorsteuer (Einkauf) vs. Umsatzsteuer (Verkauf). Zahllast = USt - Vorsteuer. §15 UStG.
AUFGABE 4.6: Vorsichtsprinzip §252 Abs.1 Nr.4 HGB + Realisationsprinzip: Gewinn erst bei Lieferung/Leistung ausweisen (nicht bei Auftragserhalt).

=== BUCHFÜHRUNG FOLGE 5: ANSCHAFFUNGSPREISMINDERUNGEN & SKONTO ===
AUFGABE 5.2: Lieferantenskonto 2% auf 1.190€ (1.000€ netto + 190€ VSt). Skonto brutto=23,80€ (Netto=20€, VSt-Korrektur=3,80€). BUCHUNGSSATZ: Verbindlichkeiten LuL 1.190 an Bank 1.166,20 + Nachlässe/Rohstoffe 20 + Vorsteuer 3,80. §17 UStG: Vorsteuerberichtigung bei Entgeltminderung!
AUFGABE 5.3: Kundenskonto 3% - Umsatzsteuerkorrektur auf Ausgangsseite.
AUFGABE 5.4/5.5/5.6: Rabatte (sofort bei Rechnungsstellung), Skonti (bei fristgerechter Zahlung), Boni (am Jahresende).

=== BUCHFÜHRUNG FOLGE 6: ABSCHREIBUNGEN & ANNUITÄTENDARLEHEN ===
AUFGABE 6.4: Lineare AfA Eistheke 12.000€, Nutzungsdauer 6 Jahre. JahresAfA=2.000€. BUCHUNGSSATZ: Abschreibungen auf Sachanlagen 2.000 an BGA 2.000. §253 Abs.3 HGB.
AUFGABE 6.5: Leistungsabhängige AfA Kaffeemaschine. AfA = (AK/Gesamtleistung) * Jahresleistung.
AUFGABE 6.7: AfA-Methoden: Linear (konstant), Degressiv (fallend, steuerlich §7 Abs.2 EStG), Leistungsabhängig.
AUFGABE 6.8: KERNAUFGABE RABIA - Annuitätendarlehen. Annuität 6.000€ = Zinsen 1.800€ + Tilgung 4.200€. BUCHUNGSSATZ: Zinsaufwand 1.800 + Verbindlichkeiten ggb. Kreditinstituten 4.200 an Bank 6.000. STRIKTE TRENNUNG von Zinsaufwand (GuV, erfolgswirksam) und Tilgung (Bilanzverkürzung, erfolgsneutral)!

=== BUCHFÜHRUNG FOLGE 7: DAS PRIVATKONTO ===
AUFGABE 7.1: Privatentnahme 1.500€ vom Geschäftskonto. BUCHUNGSSATZ: Privatkonto 1.500 an Bank 1.500. NICHT Aufwand! Privatkonto = Unterkonto des Eigenkapitals.
AUFGABE 7.3: Privateinlage. BUCHUNGSSATZ: Bank an Privatkonto. Mehrt EK.
AUFGABE 7.4/7.5: Abschluss Privatkonto über EK. Privatentnahmen mindern EK, Privateinlagen mehren EK.

=== BUCHFÜHRUNG FOLGE 8: RÜCKSTELLUNGEN, WERTBERICHTIGUNGEN & BEWERTUNG ===
AUFGABE 8.3: Gewerbesteuerrückstellung §249 Abs.1 HGB. BUCHUNGSSATZ: Steueraufwand an Steuerrückstellungen.
AUFGABE 8.5: Rückstellung Gerichtsprozess 5.000€. BUCHUNGSSATZ: Sonstiger betriebl. Aufwand 5.000 an Sonstige Rückstellungen 5.000. Imparitätsprinzip §252 Abs.1 Nr.4 HGB.
AUFGABE 8.7: Zweifelhafte Forderungen. Einzelwertberichtigung (EWB): Forderungen an Wertberichtigung auf Forderungen (Passivposition, direkte Abschreibung auf Aktivseite).
AUFGABE 8.8: Außerplanmäßige Abschreibung §253 Abs.3 Satz 3 HGB bei dauernder Wertminderung.
AUFGABE 8.9: Wertaufholung §253 Abs.5 HGB: Maximal bis zu fortgeführten AK! Buchungssatz: BGA an Zuschreibungen.

=== BUCHFÜHRUNG FOLGE 9: RECHNUNGSABGRENZUNG & JAHRESABSCHLUSS ===
Transitorische Abgrenzungsposten (Ausgabe/Einnahme vor Stichtag, Aufwand/Ertrag danach):
  - ARAP (Aktiver RAP §250 Abs.1 HGB): Ausgabe jetzt, Aufwand später → ARAP an Aufwandskonto
  - PRAP (Passiver RAP §250 Abs.2 HGB): Einnahme jetzt, Ertrag später → Ertragskonto an PRAP
Antizipative Abgrenzungsposten (Aufwand/Ertrag vor Stichtag, Zahlung danach):
  - Sonstige Verbindlichkeiten: Aufwand jetzt, Zahlung später
  - Sonstige Forderungen: Ertrag jetzt, Einnahme später
AUFGABE 9.2: Versicherung 1.200€ p.a. am 01.12. gezahlt. Am 31.12.: ARAP = 1.100€ (11 Monate Jan-Nov nächstes Jahr). BUCHUNGSSATZ: ARAP 1.100 an Versicherungsaufwand 1.100.
AUFGABE 9.4: Versicherungsbeitrag als ARAP - monatliche Aufteilung.
AUFGABE 9.12: Abschluss GuV-Konto über EK. Jahresüberschuss: EK mehrt sich im Haben.
AUFGABE 9.14: Abschluss EK-Konto. Schlussbestand über SBK.

=== BUCHFÜHRUNG FOLGE 10: SYSTEMATIK & ERÖFFNUNG ===
Bilanzidentität §252 Abs.1 Nr.1 HGB: Schlussbilanz (SBK) = Eröffnungsbilanz (EBK) des Folgejahres.
AUFGABE 10.3: Eröffnung Aktivkonto Bank 25.000€. BUCHUNGSSATZ: Bank 25.000 an EBK 25.000.
AUFGABE 10.3: Eröffnung Passivkonto Darlehen 20.000€. BUCHUNGSSATZ: EBK 20.000 an Verbindlichkeiten 20.000.
Abschluss: Aktivkonten → SBK im Haben. Passivkonten → SBK im Soll.
AUFGABE 10.6: Gewinnausweis: Jahresüberschuss erscheint auf Passivseite der Bilanz unter EK.

=== KOSTENRECHNUNG LERNEINHEIT 2: ABGRENZUNGSRECHNUNG ===
Abgrenzung zwischen Aufwand und Kosten:
  - GRUNDKOSTEN (Zweckaufwand): In GuV als Aufwand UND in KLR als Kosten (z.B. Rohstoffverbrauch, Fertigungslöhne).
  - NEUTRALER AUFWAND (nicht in KLR): (a) Betriebsfremd: Spende, Verluste aus Wertpapierverkäufen. (b) Außerordentlich: Lawinenschaden WMB AG, Brand, Naturkatastrophen. (c) Periodenfremd: Steuernachzahlung Vorjahre.
  - ANDERSKOSTEN: Gleicher Aufwand in GuV, aber andere (meist höhere) Höhe in KLR (z.B. kalk. AfA auf Basis Wiederbeschaffungswert statt AK).
  - ZUSATZKOSTEN: Nur in KLR, kein Aufwand in GuV (kalk. Unternehmerlohn Einzelunternehmer, kalk. Miete für Eigengebäude, kalk. Zinsen auf EK).
Übungszettel LE 2: Herr Matrovic bei Fuchsberger AG. Lawinenschaden = neutraler außerordentlicher Aufwand. Spende = neutraler betriebsfremder Aufwand. Rohstahlverbrauch = Grundkosten.
Kalkulatorischer Unternehmerlohn: NUR bei Einzelunternehmen und Personengesellschaften! Bei GmbH/AG gibt es bereits ein Geschäftsführergehalt (Aufwand in GuV) → KEIN zusätzlicher kalk. UL!

=== KOSTENRECHNUNG LERNEINHEIT 3: KOSTENARTEN ===
Einzelkosten (EK): Direkt einem Kostenträger zurechenbar (Fertigungsmaterial FM, Fertigungslöhne FL).
Gemeinkosten (GK): Nicht direkt zurechenbar, Verteilung über BAB (Miete, AfA Maschinen, Hilfslöhne).
Unechte Gemeinkosten: Zwar zurechenbar, aber aus Wirtschaftlichkeitsgründen als GK behandelt.
Fixkosten: Unabhängig von der Beschäftigung (Miete, Abschreibungen).
Variable Kosten: Beschäftigungsabhängig (Rohstoffe, Energieverbrauch proportional).

=== KOSTENRECHNUNG LERNEINHEIT 4: KALKULATORISCHE KOSTEN ===
Kalkulatorische AfA: Wiederbeschaffungswert / wirtschaftliche Nutzungsdauer (NICHT AK / steuerliche Nutzungsdauer). Sichert Substanzerhaltung.
Kalkulatorische Zinsen: Betriebsnotwendiges Vermögen (aktives BNV - unverzinsliche Passiva) × kalkulatorischer Zinssatz. Opportunitätskosten des gebundenen Kapitals.
Kalkulatorische Miete: Marktwert für selbstgenutztes Eigengebäude (Zusatzkosten, kein Aufwand in GuV).
Kalkulatorischer Unternehmerlohn: Marktübliches Gehalt für die Tätigkeit des Unternehmers (NUR Einzelunternehmen/Personengesellschaften!).
Kalkulatorische Wagnisse: Statt neutralem Aufwand (Naturkatastrophen etc.) wird ein konstanter Risikosatz in die Kalkulation eingesetzt.
Opportunitätskosten LE 4: Entgangener Nutzen der besten nicht gewählten Alternative.

=== KOSTENRECHNUNG LERNEINHEIT 5: INNERBETRIEBLICHE LEISTUNGSVERRECHNUNG (IBLV) ===
Drei Verfahren zur Verrechnung von Hilfskostenstellen-Kosten auf Hauptkostenstellen:
1. ANBAUVERFAHREN: Primäre GK der Hilfskostenstellen direkt auf HKS verteilen. Interne Verflechtungen zwischen HKS werden IGNORIERT. Einfachste Näherung.
2. STUFENLEITERVERFAHREN (Treppenverfahren): Abrechnung in festgelegter Reihenfolge (Hilfskostenstelle mit größtem Anteil zuerst). Einbahnstraße: Einmal abgerechnete HKS empfangen keine weiteren Kosten mehr. Näherungslösung.
3. GLEICHUNGSVERFAHREN (Simultanverfahren): Mathematisch exakt. Aufstellung von Gleichungssystem, Lösung durch Matrizeninversion. Berücksichtigt alle wechselseitigen Verflechtungen vollständig.
Übungszettel LE 5 Safety-First Versicherung: H1 (Kantine) → 20% an H2, 80% an HKS. H2 (IT) → 5% an H1, 95% an HKS. Stufenleiterverfahren ignoriert Rückkopplung H2→H1.

=== KOSTENRECHNUNG LERNEINHEIT 6: BETRIEBSABRECHNUNGSBOGEN (BAB) ===
BAB verteilt Gemeinkosten von Kostenstellen auf Kostenträger (Produkte).
Kostenstellen: Material, Fertigung I, Fertigung II, Verwaltung, Vertrieb.
Primäre Gemeinkosten: Direkt aus der Finanzbuchhaltung übernommen (Miete, Energie, Hilfslöhne).
Sekundäre Gemeinkosten: Aus IBLV auf Endkostenstellen verteilt.
ZUSCHLAGSSÄTZE:
  - MGKZ (Materialgemeinkostenzuschlag) = MGK / Fertigungsmaterial FM × 100%
  - FGKZ (Fertigungsgemeinkostenzuschlag) = FGK / Fertigungslöhne FL × 100%
  - HKdE (Herstellkosten der Erzeugung) = FM + MGK + FL + FGK + SFE (Sondereinzelkosten Fertigung)
  - HKdU (Herstellkosten des Umsatzes) = HKdE ± Bestandsveränderungen FE/UFE
  - VwGKZ = Verwaltungs-GK / HKdU × 100%
  - VtGKZ = Vertriebs-GK / HKdU × 100%
  - Selbstkosten = HKdU + Verwaltungs-GK + Vertriebs-GK + SEK Vertrieb
Übungszettel LE 6 Eis.com: MGK=25.000€, FM=200.000€ → MGKZ=12,5%. FGK=217.500€, FL=150.000€ → FGKZ=145%. VwGK=48.585€, VtGK=37.920€, HKdU=592.500€ → VwGKZ=8,2%, VtGKZ=6,4%.

=== KOSTENRECHNUNG LERNEINHEIT 7: DIVISIONSKALKULATION ===
Einstufig: Selbstkosten/Stück = Gesamtkosten / Ausbringungsmenge. Nur bei Einproduktunternehmen.
Zweistufig: Trennung Herstellkosten und Verwaltungs-/Vertriebs-GK. HK/Stück + VwVt-GK/Stück.
Mehrstufig: Trennung nach Produktionsstufen.
Äquivalenzziffernkalkulation: Für Sortenfertigung mit ähnlichen Produkten. Referenzprodukt = 1,0. Andere Produkte werden über Äquivalenzziffern auf Referenzprodukt umgerechnet.

=== KOSTENRECHNUNG LERNEINHEIT 8: PERIODENERFOLGSRECHNUNG ===
Müsli Deluxe: Ermittlung Periodenerfolg nach GKV und UKV.
GKV: Umsatzerlöse + Bestandsmehrungen FE/UFE - Gesamtkosten der Periode.
UKV: Umsatzerlöse - Herstellkosten des Umsatzes - Verwaltungs-GK - Vertriebs-GK.
Beide Verfahren führen zum gleichen Periodenergebnis (Jahresüberschuss)!
Teilkostenbasis (DB-Rechnung): Umsatzerlöse - variable Kosten = Deckungsbeitrag - Fixkosten = Betriebsergebnis.

=== KOSTENRECHNUNG LERNEINHEIT 9: FLEXIBLE PLANKOSTENRECHNUNG ===
Kostenstelle "Fertigung Hummus": Plankostenrechnung mit Abweichungsanalyse.
Formeln:
  - Plankostensatz: kp = Plankosten gesamt / Planbeschäftigung
  - Variabler Plankostensatz: kv = variable Plankosten / Planbeschäftigung
  - Fixe Plankosten: Kf = Plankosten gesamt - variable Plankosten
  - Sollkosten: Ks = Kf + kv × x_ist (flexible Sollkostenkurve)
  - Verrechnete Plankosten: Kverr = kp × x_ist
  - Gesamtabweichung: GA = Kist - Kverr
  - Beschäftigungsabweichung: BA = Ks - Kverr (misst Fixkostenüber/-unterdeckung durch Über-/Unterbeschäftigung)
  - Verbrauchsabweichung: VA = Kist - Ks (misst Wirtschaftlichkeit)
  - GA = BA + VA ✓
Übungszettel LE 9 Hummus: Plankosten=100.000€ (fix=40.000€, var=60.000€), Planbeschäftigung=10.000kg, Istmenge=8.000kg, Istkosten=92.000€.
  kp=10€/kg, kv=6€/kg, kf=40.000€.
  Ks = 40.000 + 6×8.000 = 88.000€
  Kverr = 10×8.000 = 80.000€
  BA = 88.000 - 80.000 = +8.000€ (Unterbeschäftigungskosten)
  VA = 92.000 - 88.000 = +4.000€ (Unwirtschaftlichkeit)
  GA = +12.000€ ✓
Probeklausur Aufgabe 11 Karo-Lack: Plankosten=400.000€ (80%var=320.000€, fix=80.000€), Plan=2Mio.L, Ist=1,5Mio.L, Istkosten=350.000€.
  kv=320.000/2.000.000=0,16€/L, kf=80.000€, kp=0,20€/L.
  Ks=80.000+0,16×1.500.000=320.000€. Kverr=0,20×1.500.000=300.000€.
  BA=320.000-300.000=+20.000€. VA=350.000-320.000=+30.000€. GA=+50.000€.

=== KOSTENRECHNUNG LERNEINHEIT 10: DECKUNGSBEITRAGSRECHNUNG ===
Einstufige DB-Rechnung: p - kv = db (Stückdeckungsbeitrag). Σdb - Kf = Betriebsergebnis.
Mehrstufige DB-Rechnung: Mehrere Fixkostenschichten (Produkt-FK, Produktgruppen-FK, Unternehmens-FK).
Kriterien Produktelimination: Eliminieren wenn db < 0 (jedes Stück vernichtet Wert). NICHT eliminieren wenn db > 0 (leistet Beitrag zur FK-Deckung), selbst wenn Stückgewinn negativ!
Übungszettel LE 10 Fuchsberger AG: Kriterien der Eliminationsentscheidung.

=== KOSTENRECHNUNG LERNEINHEIT 11: BREAK-EVEN-ANALYSE ===
Break-Even-Point (Gewinnschwelle): x_BEP = Kf / db = Fixkosten / Stückdeckungsbeitrag.
db = p - kv (Preis minus variable Stückkosten).
Gewinnzone: x > x_BEP. Verlustzone: x < x_BEP.
Sicherheitskoeffizient: (x_ist - x_BEP) / x_ist × 100% (Abstand zur Gewinnschwelle).
Operating Leverage: Kf / (Kf + Kv) - misst FK-Anteil an Gesamtkosten.
Übungszettel LE 11 Fuchsberger AG Break-Even: Jahresbedarf, FK, db Berechnung.
PROBEKLAUSUR AUFGABE 13 (Guido Notizskripte):
  Variable Kosten: 50 Seiten × 0,10€ + 1,00€ Bindung = 6,00€/Stück.
  Fixkosten: 200€ Maschineneinrichtung.
  Preis: 10,00€. db = 10 - 6 = 4€.
  x_BEP = 200€ / 4€ = 50 Stück! ✓ (JLU Musterlösung)

=== KOSTENRECHNUNG LERNEINHEIT 12: PRODUKTIONSPROGRAMMPLANUNG (ENGPASS) ===
Bei Engpass: Entscheidungsgrundlage ist der RELATIVE Deckungsbeitrag = db / Engpassbeanspruchung pro Stück (€/Maschinenstunde oder €/Minute etc.).
NICHT der absolute Stückdeckungsbeitrag!
Rangfolge: Produkt mit höchstem rel. DB zuerst einlasten, bis Engpass erschöpft.
Übungszettel LE 12 Brennerstuhl AG: 3 Produkte, begrenzte Maschinenzeit. Rangfolge nach rel. DB.
PROBEKLAUSUR AUFGABE 14 Kuppelproduktion XChemie: Restwertmethode (Subtraktion der Erlöse der Nebenprodukte abzgl. Weiterverarbeitungskosten von den Gesamtkosten → Kosten des Hauptprodukts).
PROBEKLAUSUR AUFGABE 15 XXX GmbH Zuschlagssätze: MEK=1.000.000€, MGK=400.000€ → MGKZ=40%. FEK=200.000€, FGK=250.000€ → FGKZ=125%.
PROBEKLAUSUR AUFGABE 16 Erwin GmbH: GmbH-Geschäftsführer erhält Geschäftsführergehalt (Aufwand in GuV). KEIN kalkulatorischer Unternehmerlohn bei Kapitalgesellschaften! (Klausurfalle!)

=== ORIGINALE JLU PROBEKLAUSUR WS 2024/25 (Vollständige Musterlösung) ===
AUFGABE 10 Begriffsabgrenzungen WMB AG (4 Punkte):
  1.1 Lawine Alpen-Lagerhaus 450.000€: Neutraler außerordentlicher Aufwand (kein Kostenbegriff). In KLR: kalk. Wagnis stattdessen.
  1.2 Spende Tierheim 10.000€: Neutraler betriebsfremder Aufwand.
  1.3 Rohblechverbrauch Fertigung: Grundkosten (Zweckaufwand = Kosten).

AUFGABE 11 Plankostenrechnung Karo-Lack PKW-Lacke (8 Punkte):
  Plankosten=400.000€, 80%var=320.000€, fix=80.000€, Plan=2Mio.L, Ist=1,5Mio.L, Istkosten=350.000€.
  kp=0,20€/L, kv=0,16€/L.
  Sollkosten Ks = 80.000 + 0,16×1.500.000 = 320.000€
  Verrechnete Plankosten Kverr = 0,20×1.500.000 = 300.000€
  BA (Beschäftigungsabweichung) = Ks-Kverr = +20.000€ (Unterbeschäftigungskosten)
  VA (Verbrauchsabweichung) = Kist-Ks = +30.000€ (Unwirtschaftlichkeit)
  GA = BA+VA = +50.000€

AUFGABE 12 IBLV JLU-Bräu (5 Punkte):
  H1 primäre GK=60.000€, H2=45.000€, H3=90.000€.
  Anbauverfahren: Interne Verflechtungen H1↔H2↔H3 werden ignoriert.
  Stufenleiter: Abrechnung in festgelegter Reihenfolge, einbahnstraßenartig.
  Gleichungsverfahren: Simultane Lösung aller Verflechtungen (exakt).

AUFGABE 13 Break-Even Guido (5 Punkte):
  kv=6€/Stück, Kf=200€, p=10€. db=4€. x_BEP=50 Stück. Umsatz_BEP=500€.

AUFGABE 14 Kuppelproduktion XChemie (2 Punkte):
  Hauptprodukt Gesichtscreme + 2 Nebenprodukte (Farbstoffe).
  → Restwertmethode: Nebenprodukt-Erlöse (abzgl. Weiterverarbeitungskosten) von Gesamtkosten subtrahieren.

AUFGABE 15 Zuschlagssätze XXX GmbH (4 Punkte):
  MEK=1.000.000€, MGK=400.000€ → MGKZ=40,00%
  FEK gesamt=200.000€, FGK I=150.000€, FGK II=100.000€ → FGKZ=125,00%
  (FGK I+II = 250.000€ / FEK 200.000€)
  VwVt-GK=92.500€.

AUFGABE 16 Kalk. Unternehmerlohn Erwin GmbH (2 Punkte):
  GmbH = Kapitalgesellschaft. GF-Gehalt = Aufwand in GuV. KEIN kalk. Unternehmerlohn!
  Antwort: NEIN, Erwin darf keinen kalk. Unternehmerlohn ansetzen (GmbH, nicht EU/PG).

=== RABIAS HANDSCHRIFTLICHE NOTIZEN (WHATSAPP-BILDER FOLGE 1 BIS 3) ===
Rabia hat auf ihren Arbeitsblättern zu Folgen 1-3 handschriftliche Notizen und Lösungsversuche festgehalten. Hier sind alle 17 Kernpunkte mit ihren exakten Notizen, den zugrundeliegenden Denkfehlern und der universitären Auflösung:

1. FOLGE 1 - AUFGABE 1.1 & 1.3 (EXTERNES VS. INTERNES RECHNUNGSWESEN):
   - Rabias Notiz: "Im Rahmen des externen RW wird die Wirtschaftlichkeit ... und die Zahlungsfähigkeit geprüft -> falsch -> 1.3"
   - Didaktische Lösung: Externes RW (HGB) = Dokumentation aller Geschäftsvorfälle (§ 238 HGB), Rechenschaftslegung für Gläubiger, Fiskus und Öffentlichkeit, Gläubigerschutz durch Vorsichtsprinzip. Die Prüfung der Wirtschaftlichkeit der betrieblichen Prozesse sowie die interne Steuerung der Zahlungsfähigkeit gehört zum INTERNEN Rechnungswesen (Kostenrechnung / Controlling, Prof. Wöhrmann)!

2. FOLGE 1 - AUFGABE 1.2 & 1.3 (BILANZ VS. GUV):
   - Rabias Notiz: "die Bilanz vermittelt Info über Ertragslage -> falsch -> gibt Auskunft über Vermögens- und Finanzlage -> v"
   - Didaktische Lösung: Die Bilanz ist ein Stichtagsfoto (z.B. zum 31.12.) und zeigt die Vermögenslage (Aktiva: Anlage- und Umlaufvermögen) und Finanzlage / Kapitalstruktur (Passiva: Eigen- und Fremdkapital). Die GuV ist ein Film über einen Zeitraum (01.01.-31.12.) und zeigt Aufwendungen und Erträge, also die Ertragslage!

3. FOLGE 1 - AUFGABE 1.4 (FLOHMARKTBESUCH MÖBELKAUF BAR):
   - Rabias Notiz: "Die Vermögensstruktur ändert sich Bilanzsumme bleibt gleich?" (Möbel 750 € an Bank/Kasse 750 €)
   - Didaktische Lösung: Reiner AKTIVTAUSCH! BGA (Aktivkonto) nimmt im Soll zu (+450 € bzw. +750 €), Kasse/Bank (Aktivkonto) nimmt im Haben ab (-450 € bzw. -750 €). Die Nettoveränderung auf der Aktivseite ist 0 €. Passivseite unberührt. Die Bilanzsumme bleibt unverändert, nur die Vermögensstruktur ändert sich von flüssigen Mitteln zu Sachanlagen.

4. FOLGE 1 - AUFGABE 1.5 (AUFNAHME BANKKREDIT 30.000 €):
   - Rabias Notiz: "Bankkredit einbuchen -> warum Bilanzverlängerung? Aktiv-Passiv-Mehrung? Beide Konten erhöht"
   - Didaktische Lösung: Buchungssatz: Bank (Aktivkonto, Soll) 30.000 an Verbindlichkeiten ggü. Kreditinstituten (Passivkonto, Haben) 30.000. Aktivseite steigt um 30.000 € (Guthaben), Passivseite steigt um 30.000 € (Schulden). Dies ist eine klassische BILANZVERLÄNGERUNG (Aktiv-Passiv-Mehrung).

5. FOLGE 1 - AUFGABE 1.6 (KREDITTILGUNG VS. ZINSEN):
   - Rabias Notiz: "Die 4k wird vom BK abgebucht und wird von der Bank gezogen. Soll Bankkredit Passivk. 4.000k / Haben | Soll Bank Aktivk. / Haben 4.000k"
   - Didaktische Lösung: Buchungssatz: Verbindlichkeiten ggü. Kreditinstituten 4.000 an Bank 4.000. Passivkonto im Soll = Schuldenminderung. Aktivkonto im Haben = Guthabenminderung. BILANZVERKÜRZUNG (Aktiv-Passiv-Minderung). Wichtige Klausurfalle von Prof. Ewelt-Knauer: Die Tilgung ist vollkommen erfolgsneutral! Zinsen hingegen sind Aufwand (Zinsaufwand an Bank).

6. FOLGE 1 - AUFGABE 1.7 (INVENTAR VS. BILANZ):
   - Rabias Notiz: "Inventar -> detaillierte Liste von Waren und Gegenstände des Unternehmers. Zeigt wie viel das Unternehmen zu einem bestimmten Zeitpunkt besitzt. Die Bilanz kann man durch das Inventar besser darstellen."
   - Didaktische Lösung: Inventar = Staffelform, Mengengerüst (kg, Liter, Stück), Art und Einzelwert nach § 240 HGB, Ergebnis der körperlichen/buchmäßigen Inventur. Bilanz = Kontenform (Aktiva links, Passiva rechts), verdichtet/aggregiert in Positionen nach § 266 HGB, rein in Geldeinheiten (keine Mengenangaben).

7. FOLGE 2 - AUFGABE 2.1 (DIE 4 BILANZVERÄNDERUNGEN IM WARENEINKAUF):
   - Rabias Notiz: "Aktivtausch zwischen Vorräte und Bank/Kasse... kein Aktivtausch, Verbindlichkeit und Bank"
   - Didaktische Lösung: Nur wenn ausschließlich Aktivkonten berührt werden (Vorräte an Kasse, Bank an Kasse), liegt ein Aktivtausch vor. Wenn Verbindlichkeiten getilgt werden (Verbindlichkeiten an Bank), ist es eine Bilanzverkürzung.

8. FOLGE 2 - AUFGABE 2.2 (KÜCHENMASCHINE 2.000 € NETTO):
   - Rabias Notiz: "netto 2000 €, 714 € (30%) fällig, 1666 € (70%) Ziel, 19% Steuer 380 € -> Warum ist das keine geleistete Anzahlung? Warum Bilanzsumme erhöht um 1666 €?"
   - Didaktische Lösung: Eine Anzahlung liegt definitionsgemäß NUR DANN vor, wenn VOR der Lieferung gezahlt wird. Da die Maschine sofort geliefert wird (Gefahrenübergang vollzogen), wird sie sofort als Anlagevermögen (BGA) voll aktiviert!
     Buchungssatz: BGA 2.000 € und Vorsteuer 380 € an Bank 714 € und Verbindlichkeiten LuL 1.666 €.
     Warum steigt die Bilanzsumme um genau 1.666 €?
     Aktivseite: +2.000 (BGA) + 380 (Vorsteuerforderung) - 714 (Bankabfluss) = +1.666 €.
     Passivseite: +1.666 € (Verbindlichkeiten LuL). Beide Seiten steigen um exakt 1.666 €!

9. FOLGE 2 - AUFGABE 2.3 (STEUERBERECHNUNG & GELDTRANSFERS):
   - Rabias Notiz: "Steuer falsch berechnet -> Steuer mit im Preis? Warum bei D nicht? Bank 3000 / 1.19 = 2521 € Steuer 479 €"
   - Didaktische Lösung: WICHTIGSTE ERKENNTNIS AUS DEN BILDERN: Rabia versuchte, Steuer auf einen Bankkredit zu berechnen! Geldtransfers, Darlehen, Tilgungen und Geldabhebungen unterliegen NIEMALS der Umsatzsteuer/Vorsteuer (§ 1 Abs. 1 UStG gilt nur für Lieferungen und sonstige Leistungen eines Unternehmers).
     Rechenregel bei Steuer im Preis: Ist der Preis Brutto (inkl. 19%), teilt man durch 1,19 (Netto = Brutto / 1,19; Steuer = Brutto - Netto). Niemals einfach 19% vom Bruttobetrag abziehen!

10. FOLGE 2 - AUFGABE 2.4 (ERDBEERKAUF MIT ANZAHLUNG 7% VORSTEUER):
    - Rabias Notiz: "40 kg Erdbeeren 400 € netto, 50% Anzahlung -> bar/Bank, 7% Steuer 28 €. Korrektur der geleisteten Anzahlung? Kasse oder Bank?"
    - Didaktische Lösung: Bei Anzahlung VOR Lieferung greift § 15 Abs. 1 Nr. 1 UStG: Vorsteuer darf sofort gezogen werden!
      Schritt 1 (Anzahlung 50%): Geleistete Anzahlungen 200 € und Vorsteuer 14 € an Bank 214 €.
      Schritt 2 (Lieferung & Schlussrechnung): Vorräte 400 € und Vorsteuer 14 € an Geleistete Anzahlungen 200 € und Verbindlichkeiten LuL 214 €.

11. FOLGE 2 - AUFGABE 2.5 (ROHSTOFFKAUF 150 € NETTO, 7% USt):
    - Rabias Notiz: "netto 150 €, 160,50 € mit 7% Steuer. Aktivtausch Vorräte 150 € und Vorsteuer 10,50 € an Kasse/Bank 160,50 €"
    - Didaktische Lösung: Perfekt gelöst! Vorräte (150) und Vorsteuer (10,50) sind Aktivkonten, Kasse (160,50) ist Aktivkonto. Reiner Aktivtausch.

12. FOLGE 2 - AUFGABE 2.6 (SYSTEMATIK DER 4 BILANZVERÄNDERUNGEN):
    - Rabias Notiz: "2.6 -> Erklärung verbessern"
    - Didaktische Lösung:
      a) Passivtausch: Passivkonto Soll / Passivkonto Haben (Umschuldung: Verb. LuL an Bankdarlehen). Bilanzsumme konstant.
      b) Bilanzverlängerung: Aktivkonto Soll / Passivkonto Haben (Kauf auf Ziel, Kreditaufnahme). Bilanzsumme steigt.
      c) Aktivtausch: Aktivkonto Soll / Aktivkonto Haben (Barkauf, Bareinzahlung). Bilanzsumme konstant.
      d) Bilanzverkürzung: Passivkonto Soll / Aktivkonto Haben (Schuldentilgung per Bank). Bilanzsumme sinkt.

13. FOLGE 3 - AUFGABE 3.1 & 3.2 (GUV UND BILANZ ZUSAMMENHANG):
    - Rabias Notiz: "GuV besser verstehen -> 3.1 nicht mit Bilanz vertauschen! GuV Bilanz Zusammenhang -> 3.2. Sie hängen zusammen durch das Eigenkapital."
    - Didaktische Lösung: Die GuV ist das zentrale Unterkonto des Eigenkapitals auf der Passivseite der Bilanz! Alle Aufwendungen und Erträge fließen in die GuV. Am Geschäftsjahresende (31.12.) wird der Saldo ermittelt:
      Erträge > Aufwendungen = Jahresüberschuss -> bucht im Haben des Eigenkapitalkontos (EK steigt!).
      Aufwendungen > Erträge = Jahresfehlbetrag -> bucht im Soll des Eigenkapitalkontos (EK sinkt!).

14. FOLGE 3 - AUFGABE 3.3 (WARUM AUFWAND IM SOLL UND ERTRAG IM HABEN):
    - Rabias Notiz: "Auf welcher Seite Aufwand? Auf welcher Ertrag? Jahresfehlbetrag Haben?"
    - Didaktische Lösung: Da das Eigenkapital ein Passivkonto ist, stehen Minderungen im Soll und Mehrungen im Haben. Weil Aufwendungen das Eigenkapital mindern, stehen alle Aufwendungen zwingend im SOLL! Weil Erträge das Eigenkapital mehren, stehen alle Erträge zwingend im HABEN!

15. FOLGE 3 - AUFGABE 3.4 (ERFOLGSWIRKSAMKEIT VS. BESTANDSKONTEN):
    - Rabias Notiz: "Warum ist C erfolgswirksam? Warum ist D richtig? nicht auf BK, sondern Erfolgskonto?"
    - Didaktische Lösung: Geschäftsvorfälle, die das Eigenkapital verändern (ohne Privateinlagen/-entnahmen), sind erfolgswirksam (berühren Aufwands- oder Ertragskonten). Reine Umbuchungen zwischen Aktiv- oder Passivkonten sind erfolgsneutral.

16. FOLGE 3 - AUFGABE 3.5 (LAGERENTNAHME 340 € / 350 € FÜR EISHERSTELLUNG):
    - Rabias Notiz: "350 € Lager für Herstellung -> warum erfolgsneutral? Warum Fertige Erzeugnisse an Kasse falsch ist?"
    - Didaktische Lösung: KASSE IST GRUNDFALSCH, weil bei der Produktion im Eislabor kein Bargeld fließt! Die Bio-Früchte lagen bereits im Lager.
      Buchung im GKV:
      Schritt a (Rohstoffverbrauch): Aufwand für Rohstoffe 340 € an Rohstoffe (Vorräte) 340 €.
      Schritt b (Eisentstehung): Fertigerzeugnisse 340 € an Bestandsmehrungen (Ertrag) 340 €.
      Warum erfolgsneutral? Im Schritt a entsteht 340 € Aufwand, im Schritt b entsteht 340 € Ertrag. In der GuV saldiert sich beides auf exakt 0 €! Reines Herstellen schafft noch keinen Gewinn – erst der spätere Verkauf an den Eiskäufer bringt Gewinn!

17. FOLGE 3 - AUFGABE 3.7 (DIE MATRIX DER ZAHLUNGS- UND ERFOLGSWIRKSAMKEIT):
    - Rabias Notiz: "Tabelle checken 3.7: Warum C erfolgswirksam? Warum D richtig?"
    - Didaktische Lösung:
      Fall a: Maschinenkauf auf Ziel -> Nicht zahlungswirksam (kein Geldfluss) & Nicht erfolgswirksam (Aktivierung & Verbindlichkeit).
      Fall b: Blitzeinschlag / Außerplanmäßige AfA -> Nicht zahlungswirksam (kein Geldfluss) & ERFOLGSWIRKSAM (Aufwand mindert Gewinn).
      Fall c: Zinsgutschrift Bank -> ZAHLUNGSWIRKSAM (Bankguthaben steigt) & ERFOLGSWIRKSAM (Zinsertrag mehrt Gewinn).
      Fall d: Barkauf Obst für 500 € -> ZAHLUNGSWIRKSAM (Kasse sinkt) & ERFOLGSNEUTRAL (Aktivtausch Kasse gegen Vorräte).
`;

export const CORPUS_TOKEN_ESTIMATE = 34000;
