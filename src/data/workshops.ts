// Facts copied from the two NCA workshop pages. Keep this file limited to what
// those pages state; no prices.

export type WorkshopId = 'developer' | 'alle-abteilungen';

export interface Workshop {
  id: WorkshopId;
  title: string;
  trainer: string;
  url: string;
  intro: string;
  format: string;
  learnings: string[];
}

export const workshops: Record<WorkshopId, Workshop> = {
  developer: {
    id: 'developer',
    title: 'NCA KI Workshop für Developer',
    trainer: 'Benjamin Klein',
    url: 'https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer',
    intro:
      'Ein Tag für Developer, Tester und Admins, die mit KI Agenten produktiv arbeiten wollen, statt Code aus dem Chat zu kopieren.',
    format: 'Inhouse bei euch vor Ort, ein Tag von 9.00 bis 16.30 Uhr.',
    learnings: [
      'Einen Harness bauen',
      'Context Engineering beherrschen',
      'Entscheidungen festhalten mit ADR und PDR',
      'Prüfen statt glauben',
    ],
  },
  'alle-abteilungen': {
    id: 'alle-abteilungen',
    title: 'NCA KI Workshop für alle Abteilungen',
    trainer: 'Roland Golla',
    url: 'https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-alle-abteilungen',
    intro: 'Ein Tag für alle Abteilungen, nicht nur für das Entwicklerteam.',
    format: 'Inhouse bei euch vor Ort, ein Tag von 9.00 bis 16.30 Uhr.',
    learnings: [
      'Chats sinnvoll einsetzen',
      'Regeln festlegen',
      'Aus einer Aufgabe ein Tool machen',
      'Als Team weitermachen',
    ],
  },
};
