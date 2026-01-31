export const getAccent = (t: any) =>
  (t?.vars?.palette?.accent?.mainChannel as string) ||
  (t?.vars?.palette?.primary?.mainChannel as string);
