import { P1 } from './P1';
import { P2 } from './P2';
import { P3 } from './P3';
import { P4 } from './P4';

export const STYLE_DATA_MAP: Record<string, any> = {
  P1,
  P2,
  P3,
  P4,
};

export const StylesDataFinder = (styles: string[]) => {
  const key = styles.join('');
  return STYLE_DATA_MAP[key] ?? null;
};
