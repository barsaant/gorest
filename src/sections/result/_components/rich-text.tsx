import type { RichToken } from './types';

import * as React from 'react';

import Box from '@mui/material/Box';

import { IconByKey } from './icons';
import { getAccent } from './theme';

export const RichText = ({ tokens }: { tokens: RichToken[] }) => (
    <>
      {tokens.map((x, i) => {
        if (x.t === 'text') return <React.Fragment key={i}>{x.v}</React.Fragment>;
        if (x.t === 'bold') return <b key={i}>{x.v}</b>;
        if (x.t === 'icon')
          return (
            <Box
              key={i}
              component="span"
              sx={{ display: 'inline-flex', ml: 0.75, verticalAlign: 'middle', opacity: 0.9 }}
            >
              {IconByKey[x.v] as any}
            </Box>
          );
        return (
          <Box
            key={i}
            component="span"
            sx={(t) => {
              const accent = getAccent(t);
              return {
                textDecoration: 'underline',
                textDecorationThickness: '2px',
                textUnderlineOffset: '3px',
                textDecorationColor: `rgba(${accent} / 0.90)`,
              };
            }}
          >
            {x.v}
          </Box>
        );
      })}
    </>
  );
