'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { IconByKey } from './icons';
import { getAccent } from './theme';
import { RichText } from './rich-text';

export const NumberBadge = ({ n }: { n: number }) => (
  <Box
    sx={(t) => {
      const accent = getAccent(t);

      return {
        width: 32,
        height: 32,
        borderRadius: 999,
        display: 'grid',
        placeItems: 'center',
        fontWeight: 950,
        fontSize: 13,
        color: t.palette.text.primary,
        border: 'none',
        backgroundImage: `linear-gradient(180deg,
          rgba(${accent} / 0.22) 0%,
          rgba(${t.vars.palette.background.paperChannel} / 0.75) 45%,
          rgba(${t.vars.palette.background.defaultChannel} / 0.62) 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: -2,
          background: `radial-gradient(40px 34px at 30% 28%, rgba(${accent} / 0.55), rgba(${accent} / 0) 70%)`,
          filter: 'blur(0.5px)',
          pointerEvents: 'none',
        },
      };
    }}
  >
    <Box sx={{ position: 'relative' }}>{n}</Box>
  </Box>
);

export const Pill = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
  <Chip
    icon={icon as any}
    label={label}
    size="small"
    sx={(t) => {
      const accent = getAccent(t);

      return {
        height: 28,
        borderRadius: 999,
        fontWeight: 900,
        color: t.palette.text.primary,
        border: 'none',
        bgcolor: `rgba(${t.vars.palette.background.paperChannel} / 0.55)`,
        backgroundImage: `linear-gradient(180deg, rgba(${accent} / 0.20), rgba(${accent} / 0.08))`,
        '& .MuiChip-label': { px: 1.25, letterSpacing: 0.2 },
        '& .MuiChip-icon': { ml: 0.8, mr: -0.4, opacity: 0.92, color: `rgb(${accent})` },
      };
    }}
  />
);

export const Tag = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
  <Chip
    icon={icon as any}
    label={label}
    size="small"
    sx={(t) => {
      const accent = getAccent(t);

      return {
        height: 26,
        borderRadius: 999,
        fontWeight: 900,
        color: t.palette.text.primary,
        border: 'none',
        bgcolor: `rgba(${t.vars.palette.background.paperChannel} / 0.45)`,
        backgroundImage: `linear-gradient(180deg, rgba(${accent} / 0.16), rgba(${accent} / 0.06))`,
        '& .MuiChip-label': { px: 1.1 },
        '& .MuiChip-icon': { ml: 0.75, mr: -0.35, opacity: 0.92, color: `rgb(${accent})` },
      };
    }}
  />
);

export const Bullet = ({ tokens }: { tokens: any[] }) => (
  <Stack direction="row" spacing={1} alignItems="flex-start">
    <Box
      sx={(t) => {
        const accent = getAccent(t);
        return {
          mt: '9px',
          width: 8,
          height: 8,
          borderRadius: 99,
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(${accent} / 0.95) 0%, rgba(${accent} / 0.30) 55%, rgba(${accent} / 0) 70%)`,
          flex: '0 0 auto',
        };
      }}
    />
    <Typography variant="body2" sx={{ opacity: 0.92, lineHeight: 1.75 }}>
      <RichText tokens={tokens as any} />
    </Typography>
  </Stack>
);

export const KV = ({ k, v }: { k: React.ReactNode; v: string }) => (
  <Stack
    direction="column"
    spacing={1.25}
    alignItems="baseline"
    sx={(t) => {
      const accent = getAccent(t);

      return {
        p: 1.1,
        borderRadius: 2.25,
        border: 'none',
        bgcolor: `rgba(${t.vars.palette.background.paperChannel} / 0.50)`,
        backgroundImage: `linear-gradient(180deg,
          rgba(${accent} / 0.10) 0%,
          rgba(${t.vars.palette.background.paperChannel} / 0.50) 55%,
          rgba(${t.vars.palette.background.defaultChannel} / 0.44) 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: -1,
          background: `radial-gradient(520px 160px at 18% 0%, rgba(${accent} / 0.10), rgba(${accent} / 0) 55%)`,
          pointerEvents: 'none',
        },
      };
    }}
  >
    <Typography variant="subtitle2" sx={{ fontWeight: 950, opacity: 0.9, display: 'inline-flex' }}>
      {k}
    </Typography>
    <Typography variant="body2" sx={{ opacity: 0.95 }}>
      {v}
    </Typography>
  </Stack>
);

export const Section = ({
  index,
  title,
  children,
}: {
  index: number;
  title: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Stack spacing={1.1}>
    <Stack direction="row" spacing={1} alignItems="center">
      <NumberBadge n={index} />
      <Stack spacing={0.3} sx={{ minWidth: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 950, letterSpacing: -0.2, lineHeight: 1.15 }}>
          {title}
        </Typography>
        <Box
          sx={(t) => {
            const accent = getAccent(t);
            return {
              height: 2,
              width: 96,
              borderRadius: 999,
              backgroundImage: `linear-gradient(90deg, rgba(${accent} / 0.95), rgba(${accent} / 0.00))`,
              opacity: 0.95,
            };
          }}
        />
      </Stack>
    </Stack>
    <Stack spacing={0.9} sx={{ pl: 0.25 }}>
      {children}
    </Stack>
  </Stack>
);

export const Callout = ({
  tone = 'info',
  title,
  tokens,
}: {
  tone?: 'info' | 'warn' | 'success';
  title: string;
  tokens: any[];
}) => (
  <Box
    sx={(t) => {
      const accent = getAccent(t);

      const map = {
        info: `rgb(${accent})`,
        warn: t.palette.warning.lighter,
        success: t.palette.success.lighter,
      } as const;

      const c = map[tone];

      return {
        p: 1.6,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
        bgcolor: alpha(c, 0.08),
        backgroundImage: `linear-gradient(180deg, ${alpha(c, 0.14)} 0%, ${alpha(
          c,
          0.06
        )} 55%, rgba(${t.vars.palette.background.defaultChannel} / 0.22) 100%)`,
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: -1,
          background: `radial-gradient(620px 220px at 12% 0%, ${alpha(c, 0.22)} 0%, ${alpha(
            c,
            0
          )} 62%)`,
          pointerEvents: 'none',
        },
        '& .calloutTitle': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          position: 'relative',
        },
        '& .calloutIcon': { color: c, opacity: 0.95 },
        '& .calloutBar': {
          height: 2,
          width: 74,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${alpha(c, 0.95)}, ${alpha(c, 0)})`,
          mt: 0.65,
          mb: 0.5,
          position: 'relative',
        },
      };
    }}
  >
    <Typography variant="subtitle2" sx={{ fontWeight: 950, mb: 0.25, position: 'relative' }}>
      <span className="calloutTitle">
        <span className="calloutIcon">
          {tone === 'info' ? IconByKey.info : tone === 'warn' ? IconByKey.warn : IconByKey.check}
        </span>
        {title}
      </span>
    </Typography>
    <Box className="calloutBar" />
    <Typography variant="body2" sx={{ opacity: 0.92, lineHeight: 1.7, position: 'relative' }}>
      <RichText tokens={tokens as any} />
    </Typography>
  </Box>
);

export const TitleLine = ({ tone, text }: { tone: 'bad' | 'good'; text: string }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {tone === 'bad' ? IconByKey.cancel : IconByKey.check}
    <Typography variant="subtitle2" sx={{ fontWeight: 950 }}>
      {text}
    </Typography>
  </Stack>
);
