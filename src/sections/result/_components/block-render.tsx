'use client';

import type { Block } from './types';

import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { IconByKey } from './icons';
import { getAccent } from './theme';
import { RichText } from './rich-text';
import { KV, Bullet, Callout, TitleLine } from './ui';

export const BlockRenderer = ({ block }: { block: Block }) => {
  if (block.type === 'spacer') return <Box sx={{ mt: 1 }} />;

  if (block.type === 'paragraph')
    return (
      <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.75 }}>
        <RichText tokens={block.content} />
      </Typography>
    );

  if (block.type === 'bullets')
    return (
      <Stack spacing={0.85}>
        {block.items.map((x, i) => (
          <Bullet key={i} tokens={x.content} />
        ))}
      </Stack>
    );

  if (block.type === 'kv')
    return (
      <Stack spacing={1}>
        {block.items.map((x, i) => (
          <KV key={i} k={x.k} v={x.v} />
        ))}
      </Stack>
    );

  if (block.type === 'callout')
    return <Callout tone={block.tone} title={block.title} tokens={block.content} />;

  if (block.type === 'titleLine') return <TitleLine tone={block.tone} text={block.text} />;

  if (block.type === 'subhead')
    return (
      <Typography variant="subtitle2" sx={{ fontWeight: 950, mt: block.mt ?? 0 }}>
        {block.text}
      </Typography>
    );

  if (block.type === 'rules')
    return (
      <Stack spacing={1}>
        {block.items.map((x, i) => (
          <KV
            key={i}
            k={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {x.icon === 'check' ? IconByKey.check : IconByKey.cancel}
                {x.label}
              </span>
            }
            v={x.v}
          />
        ))}
      </Stack>
    );

  if (block.type === 'microplan')
    return (
      <Stack
        spacing={1}
        sx={(t) => {
          const accent = getAccent(t);
          return {
            p: 1.5,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            border: 'none',
            bgcolor: `rgba(${t.vars.palette.background.paperChannel} / 0.52)`,
            backgroundImage: `linear-gradient(180deg,
              rgba(${accent} / 0.12) 0%,
              rgba(${t.vars.palette.background.paperChannel} / 0.52) 55%,
              rgba(${t.vars.palette.background.defaultChannel} / 0.42) 100%
            )`,
            '&:before': {
              content: '""',
              position: 'absolute',
              inset: -1,
              background: `radial-gradient(780px 260px at 18% 0%, rgba(${accent} / 0.14) 0%, rgba(${accent} / 0) 60%)`,
              pointerEvents: 'none',
            },
          };
        }}
      >
        {block.items.map((x, i) => (
          <Typography
            key={i}
            variant="body2"
            sx={{ opacity: 0.92, lineHeight: 1.75, position: 'relative' }}
          >
            <RichText tokens={x.content} />
          </Typography>
        ))}
      </Stack>
    );

  return null;
};
