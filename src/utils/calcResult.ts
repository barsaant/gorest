export const calcResult = (answers: number[]) => {
  if (answers.length !== 16) {
    throw new Error('16 answers required');
  }

  const A = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const B = answers.slice(4, 8).reduce((a, b) => a + b, 0);
  const C = answers.slice(8, 12).reduce((a, b) => a + b, 0);
  const D = answers.slice(12, 16).reduce((a, b) => a + b, 0);

  return [
    { name: 'ЭРЧ ХҮЧ БА БИЕ МАХБОД', value: A },
    { name: 'МӨНГӨ БА ХЯНАЛТ', value: B },
    { name: 'АЖИЛ БА ӨСӨЛТ', value: C },
    { name: 'ХАРИЛЦАА БА ДОТООД ХҮН ', value: D },
  ];
};
