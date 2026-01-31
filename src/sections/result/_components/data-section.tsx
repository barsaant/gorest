'use client';

import type { DataDoc } from './types';

import * as React from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { getAccent } from './theme';
import { IconByKey } from './icons';
import { RichText } from './rich-text';
import { Pill, Section, Callout } from './ui';
import { BlockRenderer } from './block-render';

export const DataSection = ({ data }: { data: DataDoc }) => (
    <Stack
      spacing={2.5}
      sx={(t) => {
        const accent = getAccent(t);

        return {
          position: 'relative',
          p: { xs: 0, sm: 0.25 },
          '&:before': {
            content: '""',
            position: 'absolute',
            inset: -18,
            background: `radial-gradient(980px 420px at 12% 0%, rgba(${accent} / 0.18) 0%, rgba(${accent} / 0) 62%),
                         radial-gradient(820px 340px at 88% 22%, rgba(${accent} / 0.12) 0%, rgba(${accent} / 0) 58%)`,
            filter: 'blur(3px)',
            pointerEvents: 'none',
          },
        };
      }}
    >
      <Stack spacing={1} sx={{ position: 'relative' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Pill label={data.meta.pillLabel} icon={IconByKey[data.meta.pillIcon]} />
          <Typography
            variant="caption"
            sx={(t) => ({
              opacity: 0.8,
              fontWeight: 900,
              letterSpacing: 0.45,
              textTransform: 'uppercase',
              color: `rgba(${t.vars.palette.button.mainChannel} / 0.86)`,
            })}
          >
            {data.meta.subtitle}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ opacity: 0.55, position: 'relative' }} />

      {data.sections.map((s) => (
        <Section key={s.index} index={s.index} title={s.title}>
          <Stack spacing={1}>
            {s.blocks.map((b, i) => (
              <BlockRenderer key={i} block={b} />
            ))}
          </Stack>
        </Section>
      ))}

      <Callout
        tone={data.footer.warning.tone}
        title={data.footer.warning.title}
        tokens={data.footer.warning.content}
      />

      <Box
        sx={(t) => {
          const accent = getAccent(t);

          return {
            p: 1.75,
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            border: 'none',
            bgcolor: `rgba(${t.vars.palette.background.paperChannel} / 0.52)`,
            backgroundImage: `linear-gradient(180deg,
              rgba(${accent} / 0.14) 0%,
              rgba(${t.vars.palette.background.paperChannel} / 0.52) 55%,
              rgba(${t.vars.palette.background.defaultChannel} / 0.40) 100%
            )`,
            '&:before': {
              content: '""',
              position: 'absolute',
              inset: -1,
              background: `radial-gradient(920px 340px at 10% 0%, rgba(${accent} / 0.18) 0%, rgba(${accent} / 0) 62%)`,
              pointerEvents: 'none',
            },
          };
        }}
      >
        <Stack spacing={0.75} sx={{ position: 'relative' }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            {data.footer.summary.chips.map((c, i) => (
              <Chip
                key={i}
                icon={IconByKey[c.icon] as any}
                label={c.label}
                size="small"
                sx={(t) => {
                  const accent = getAccent(t);

                  return {
                    height: 28,
                    borderRadius: 999,
                    fontWeight: 950,
                    border: 'none',
                    bgcolor: `rgba(${t.vars.palette.background.paperChannel} / 0.50)`,
                    backgroundImage: `linear-gradient(180deg, rgba(${accent} / 0.18), rgba(${accent} / 0.08))`,
                    '& .MuiChip-label': { px: 1.15 },
                    '& .MuiChip-icon': {
                      ml: 0.85,
                      mr: -0.35,
                      opacity: 0.92,
                      color: `rgb(${accent})`,
                    },
                  };
                }}
              />
            ))}
          </Stack>

          <Typography variant="body1" sx={{ fontWeight: 950, lineHeight: 1.45 }}>
            <RichText tokens={data.footer.summary.titleParts} />
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.92, lineHeight: 1.75 }}>
            <RichText tokens={data.footer.summary.body} />
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
