import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ITEMS = [
  { value: 1, label: 'Огт тэгээгүй' },
  { value: 2, label: 'Хааяа' },
  { value: 3, label: 'Дундаж' },
  { value: 4, label: 'Ихэнхдээ' },
  { value: 5, label: 'Байнга тэгсэн' },
] as const;

export const Likert = ({ value, onChange }: { value?: number; onChange: (v: number) => void }) => (
  <Box
    sx={{
      borderRadius: 3.25,

      p: 1.35,
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',

      backdropFilter: 'blur(10px)',
    }}
  >
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(5, minmax(0, 1fr))' },
        gap: 1,
      }}
    >
      {ITEMS.map((it) => {
        const active = value === it.value;

        return (
          <Box
            key={it.value}
            role="button"
            tabIndex={0}
            onClick={() => onChange(it.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onChange(it.value);
            }}
            sx={(t) => {
              const isDark = t.palette.mode === 'dark';

              const paperCh = t.vars.palette.background.paperChannel;
              const primaryCh = t.vars.palette.primary.mainChannel;
              const accentCh = t.vars.palette.accent.mainChannel;

              const baseBorder = varAlpha(t.vars.palette.dividerChannel, isDark ? 0.62 : 0.8);
              const activeBorder = varAlpha(primaryCh, isDark ? 0.62 : 0.44);

              return {
                position: 'relative',
                isolation: 'isolate',
                cursor: 'pointer',
                userSelect: 'none',
                outline: 'none',
                borderRadius: 2.9,
                p: { xs: 1.2, sm: 1.1 },
                display: 'flex',
                alignItems: 'center',
                gap: 1.15,
                flexDirection: { xs: 'row', sm: 'column' },
                textAlign: { xs: 'left', sm: 'center' },

                border: `1px solid ${active ? activeBorder : baseBorder}`,

                backgroundColor: t.vars.palette.background.paper,
                backgroundImage: active
                  ? `
                    linear-gradient(
                      180deg,
                      rgba(${paperCh} / ${isDark ? 0.72 : 0.92}) 0%,
                      rgba(${paperCh} / ${isDark ? 0.56 : 0.82}) 100%
                    ),
                    radial-gradient(
                      120% 120% at 50% -20%,
                      ${varAlpha(accentCh, isDark ? 0.22 : 0.14)} 0%,
                      transparent 62%
                    ),
                    radial-gradient(
                      90% 90% at 18% 18%,
                      ${varAlpha(primaryCh, isDark ? 0.24 : 0.12)} 0%,
                      transparent 60%
                    )
                  `
                  : `
                    linear-gradient(
                      180deg,
                      ${varAlpha(paperCh, isDark ? 0.62 : 0.88)} 0%,
                      ${varAlpha(paperCh, isDark ? 0.5 : 0.78)} 100%
                    )
                  `,

                transition:
                  'transform 140ms ease, border-color 160ms ease, filter 160ms ease, box-shadow 200ms ease',

                '&:focus-visible': {
                  boxShadow: `0 0 0 4px ${varAlpha(primaryCh, isDark ? 0.22 : 0.16)}`,
                },
              };
            }}
          >
            <Box
              sx={(t) => {
                const isDark = t.palette.mode === 'dark';
                const primaryCh = t.vars.palette.primary.mainChannel;
                const accentCh = t.vars.palette.accent.mainChannel;

                return {
                  width: 25,
                  height: 25,
                  borderRadius: 999,
                  display: 'grid',
                  placeItems: 'center',
                  flex: '0 0 25px',

                  backgroundImage: active
                    ? `linear-gradient(
                        135deg,
                        ${varAlpha(accentCh, isDark ? 0.26 : 0.18)} 0%,
                        ${varAlpha(primaryCh, isDark ? 0.18 : 0.1)} 100%
                      )`
                    : 'none',

                  border: `2px solid ${
                    active
                      ? varAlpha(primaryCh, isDark ? 0.95 : 0.78)
                      : varAlpha(t.vars.palette.text.primaryChannel, 0.22)
                  }`,

                  boxShadow: active
                    ? isDark
                      ? `0 12px 30px ${varAlpha(primaryCh, 0.18)}`
                      : `0 12px 26px ${varAlpha(primaryCh, 0.12)}`
                    : 'none',
                };
              }}
            >
              <Box
                sx={(t) => {
                  const isDark = t.palette.mode === 'dark';
                  const primary = t.vars.palette.primary;
                  return {
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    backgroundImage: active
                      ? `linear-gradient(135deg, ${primary.light} 0%, ${primary.main} 70%, ${primary.dark} 100%)`
                      : 'none',
                    boxShadow: active
                      ? isDark
                        ? `0 0 0 4px ${varAlpha(t.vars.palette.primary.mainChannel, 0.18)}`
                        : `0 0 0 4px ${varAlpha(t.vars.palette.primary.mainChannel, 0.1)}`
                      : 'none',
                  };
                }}
              />
            </Box>

            <Typography
              sx={(t) => ({
                fontWeight: active ? 600 : 500,
                color: active ? t.vars.palette.text.primary : t.vars.palette.text.secondary,
                lineHeight: 1.15,
                fontSize: 13,
                letterSpacing: 0.15,
              })}
            >
              {it.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  </Box>
);
