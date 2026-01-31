import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Logo } from 'src/components/logo';

type HomeLayoutProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

export const HomeLayout = ({ children, title, description }: HomeLayoutProps) => (
  <Box
    sx={(t) => {
      const isDark = t.palette.mode === 'dark';

      const bg = t.vars.palette.background.defaultChannel;
      const paper = t.vars.palette.background.paperChannel;

      const accent = t.vars.palette.accent.mainChannel;
      const primary = t.vars.palette.primary.mainChannel;

      const grain = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E`;

      const mesh = isDark
        ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='640' viewBox='0 0 640 640'%3E%3Cdefs%3E%3Cpattern id='g' width='64' height='64' patternUnits='userSpaceOnUse'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3Cpath d='M0 0L64 64' fill='none' stroke='rgba(255,255,255,0.035)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='640' height='640' fill='url(%23g)'/%3E%3C/svg%3E`
        : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='640' viewBox='0 0 640 640'%3E%3Cdefs%3E%3Cpattern id='g' width='64' height='64' patternUnits='userSpaceOnUse'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='rgba(0,0,0,0.075)' stroke-width='1'/%3E%3Cpath d='M0 0L64 64' fill='none' stroke='rgba(0,0,0,0.035)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='640' height='640' fill='url(%23g)'/%3E%3C/svg%3E`;

      return {
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        paddingBlock: { xs: 6, md: 8 },
        backgroundColor: t.vars.palette.background.default,

        backgroundImage: isDark
          ? `
            radial-gradient(1200px 600px at 50% -10%, rgba(${primary} / 0.18) 0%, transparent 60%),
            radial-gradient(900px 520px at 12% 18%, rgba(${accent} / 0.12) 0%, transparent 62%),
            radial-gradient(900px 520px at 88% 8%, rgba(${accent} / 0.10) 0%, transparent 62%),
            linear-gradient(180deg, rgba(${bg} / 1) 0%, rgba(${bg} / 1) 100%)
          `
          : `
            radial-gradient(1200px 600px at 50% -10%, rgba(${primary} / 0.12) 0%, transparent 62%),
            radial-gradient(900px 520px at 12% 18%, rgba(${accent} / 0.10) 0%, transparent 64%),
            radial-gradient(900px 520px at 90% 10%, rgba(${primary} / 0.08) 0%, transparent 64%),
            linear-gradient(180deg, rgba(${bg} / 1) 0%, rgba(${bg} / 1) 100%)
          `,

        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            url("${mesh}"),
            radial-gradient(700px 420px at 78% 22%,
              rgba(${t.vars.palette.common.whiteChannel} / ${isDark ? 0.07 : 0.15}) 0%,
              transparent 62%
            ),
            radial-gradient(520px 260px at 18% 10%,
              rgba(${primary} / ${isDark ? 0.1 : 0.07}) 0%,
              transparent 68%
            )
          `,
          backgroundRepeat: 'repeat, no-repeat, no-repeat',
          backgroundSize: '640px 640px, auto, auto',
          backgroundPosition: 'center, center, center',
          opacity: isDark ? 0.75 : 0.55,
          mixBlendMode: isDark ? 'screen' : 'multiply',
          filter: isDark ? 'blur(0.25px)' : 'blur(0.15px)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0) 100%)',
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `url("${grain}")`,
          opacity: isDark ? 0.085 : 0.06,
          mixBlendMode: isDark ? 'screen' : 'multiply',
        },
      };
    }}
  >
    <Container sx={{ width: '100%' }}>
      <Stack sx={{ width: '100%', minHeight: '100%', alignItems: 'center' }}>
        <Stack alignItems="center" spacing={1.5} sx={{ mb: 4 }}>
          <Box
            sx={(t) => ({
              position: 'relative',
              display: 'inline-flex',
              borderRadius: 999,
              padding: '10px 14px',
              background:
                t.palette.mode === 'dark'
                  ? `rgba(${t.vars.palette.background.paperChannel} / 0.24)`
                  : `rgba(${t.vars.palette.background.paperChannel} / 0.55)`,
              border:
                t.palette.mode === 'dark'
                  ? `1px solid rgba(${t.vars.palette.common.whiteChannel} / 0.08)`
                  : `1px solid ${alpha(t.palette.divider, 0.8)}`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow:
                t.palette.mode === 'dark'
                  ? `0 18px 60px ${alpha(t.palette.common.black, 0.55)}`
                  : `0 14px 40px ${alpha(t.palette.common.black, 0.1)}`,
            })}
          >
            <Logo isSingle={false} />
          </Box>

          {title && (
            <Typography
              variant="h4"
              sx={(t) => {
                const isDark = t.palette.mode === 'dark';
                const primary = t.vars.palette.primary.mainChannel;
                const accent = t.vars.palette.accent.mainChannel;

                return {
                  textAlign: 'center',
                  fontWeight: 900,
                  letterSpacing: -0.9,
                  lineHeight: 1.06,
                  position: 'relative',
                  display: 'inline-block',
                  color: t.vars.palette.text.primary,
                  textShadow: isDark
                    ? `0 14px 42px rgba(${primary} / 0.22)`
                    : `0 12px 34px rgba(${primary} / 0.12)`,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: -10,
                    right: -10,
                    bottom: -10,
                    height: 18,
                    pointerEvents: 'none',
                    background: `radial-gradient(50% 100% at 50% 0%, rgba(${accent} / ${
                      isDark ? 0.22 : 0.16
                    }) 0%, transparent 70%)`,
                    filter: 'blur(2px)',
                    opacity: isDark ? 0.9 : 0.7,
                  },
                };
              }}
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="body1"
              sx={(t) => ({
                textAlign: 'center',
                maxWidth: 560,
                color: alpha(t.palette.text.primary, t.palette.mode === 'dark' ? 0.72 : 0.78),
                lineHeight: 1.6,
              })}
            >
              {description}
            </Typography>
          )}

          <Box
            sx={(t) => {
              const isDark = t.palette.mode === 'dark';
              const accent = t.vars.palette.accent.mainChannel;
              const primary = t.vars.palette.primary.mainChannel;

              return {
                width: 'min(520px, 92%)',
                height: 1,
                mt: 1.2,
                opacity: isDark ? 0.9 : 1,
                background: isDark
                  ? `linear-gradient(90deg, transparent, rgba(${accent} / 0.24), rgba(${primary} / 0.22), transparent)`
                  : `linear-gradient(90deg, transparent, rgba(${accent} / 0.20), rgba(${primary} / 0.18), transparent)`,
              };
            }}
          />
        </Stack>

        <Card
          sx={(t) => {
            const isDark = t.palette.mode === 'dark';
            const accentCh = t.vars.palette.accent.mainChannel;
            const primaryCh = t.vars.palette.primary.mainChannel;
            const paper = t.vars.palette.background.paperChannel;

            return {
              width: '100%',
              maxWidth: 620,
              p: { xs: 2.75, sm: 3.5 },
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              border: `1px solid ${
                isDark ? `rgba(${accentCh} / 0.20)` : alpha(t.palette.divider, 0.85)
              }`,
              backgroundColor: isDark
                ? `rgba(${t.vars.palette.background.paperChannel} / 0.80)`
                : `rgba(${paper} / 0.93)`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: isDark
                ? [
                    `0 34px 110px ${alpha(t.palette.common.black, 0.65)}`,
                    `0 1px 0 rgba(${t.vars.palette.common.whiteChannel} / 0.06) inset`,
                  ].join(', ')
                : [
                    `0 22px 70px ${alpha(t.palette.common.black, 0.12)}`,
                    `0 1px 0 rgba(${t.vars.palette.common.whiteChannel} / 0.70) inset`,
                  ].join(', '),

              '& > *': { position: 'relative', zIndex: 2 },

              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: isDark
                  ? `linear-gradient(180deg, rgba(${t.vars.palette.common.whiteChannel} / 0.07) 0%, transparent 42%)`
                  : `linear-gradient(180deg, rgba(${t.vars.palette.common.whiteChannel} / 0.38) 0%, transparent 58%)`,
                zIndex: 1,
              },

              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -2,
                pointerEvents: 'none',
                zIndex: 0,
                background: isDark
                  ? `
                    radial-gradient(520px 240px at 18% 6%, rgba(${primaryCh} / 0.18) 0%, transparent 62%),
                    radial-gradient(520px 240px at 88% 12%, rgba(${accentCh} / 0.16) 0%, transparent 62%)
                  `
                  : `
                    radial-gradient(520px 240px at 18% 6%, rgba(${primaryCh} / 0.10) 0%, transparent 62%),
                    radial-gradient(520px 240px at 88% 12%, rgba(${accentCh} / 0.10) 0%, transparent 62%)
                  `,
                filter: 'blur(2px)',
                opacity: 1,
              },
            };
          }}
        >
          <Box
            sx={(t) => ({
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: t.palette.mode === 'dark' ? 0.55 : 0.32,
              backgroundImage: `radial-gradient(1px 1px at 18px 18px, rgba(${t.vars.palette.common.whiteChannel} / 0.25) 0, transparent 60%)`,
              backgroundSize: '22px 22px',
              maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)',
              WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)',
              zIndex: 1,
            })}
          />

          <Box sx={{ position: 'relative', zIndex: 2, borderRadius: 2.5 }}>{children}</Box>
        </Card>
      </Stack>
    </Container>
  </Box>
);
