import type { IconKey } from './icons';

export type RichToken =
  | { t: 'text'; v: string }
  | { t: 'bold'; v: string }
  | { t: 'icon'; v: IconKey }
  | { t: 'underlineAccent'; v: string };

export type Block =
  | { type: 'paragraph'; content: RichToken[] }
  | { type: 'bullets'; items: { content: RichToken[] }[] }
  | { type: 'kv'; items: { k: string; v: string }[] }
  | { type: 'callout'; tone: 'info' | 'warn' | 'success'; title: string; content: RichToken[] }
  | { type: 'titleLine'; tone: 'bad' | 'good'; text: string }
  | { type: 'subhead'; text: string; mt?: number }
  | { type: 'rules'; items: { icon: 'check' | 'cancel'; label: string; v: string }[] }
  | { type: 'microplan'; items: { content: RichToken[] }[] }
  | { type: 'spacer' };

export type SectionData = { index: number; title: string; blocks: Block[] };

export type DataDoc = {
  meta: {
    pillLabel: string;
    pillIcon: IconKey;
    subtitle: string;
    tagLabel: string;
    tagIcon: IconKey;
  };
  hero: { title: string; subtitle: RichToken[] };
  sections: SectionData[];
  footer: {
    warning: { tone: 'warn'; title: string; content: RichToken[] };
    summary: {
      chips: { icon: IconKey; label: string }[];
      titleParts: RichToken[];
      body: RichToken[];
    };
  };
};
