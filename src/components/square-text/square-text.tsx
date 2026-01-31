import React from 'react';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

export function SquareText({
  text,
  size = 40,
  radius = 12,
}: {
  text: string;
  size?: number;
  radius?: number;
}) {
  return (
    <Box
      sx={(t) => ({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        alignItems: 'center',
      })}
    >
      {Array.from(text.toUpperCase()).map((ch, i) =>
        ch === ' ' ? (
          <Box key={i} sx={{ width: size * 0.45 }} />
        ) : (
          <Box
            key={i}
            sx={(t) => ({
              width: size,
              height: size,
              display: 'grid',
              placeItems: 'center',
              borderRadius: radius,
              border: `1px solid ${alpha(t.palette.text.primary, 0.12)}`,
              background: alpha(t.palette.background.paper, 0.75),
              boxShadow: `0 10px 30px ${alpha(t.palette.common.black, 0.06)}`,
              color: alpha(t.palette.text.primary, 0.75),
              fontWeight: 800,
              fontSize: size * 0.52,
              lineHeight: 1,
              userSelect: 'none',
            })}
          >
            {ch}
          </Box>
        )
      )}
    </Box>
  );
}
