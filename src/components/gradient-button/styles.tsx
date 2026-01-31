'use client';

import type { ButtonProps } from '@mui/material/Button';

import { varAlpha } from 'minimal-shared/utils';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

type GradientVariant = 'primary' | 'secondary' | 'neutral';

type GradientButtonProps = ButtonProps & {
  gradient?: GradientVariant;
};

export const GradientButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'gradient',
})<{
  gradient?: GradientVariant;
}>(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 999,
  fontWeight: 800,
  letterSpacing: 0.2,
  textTransform: 'none',
  paddingInline: theme.spacing(4),
  minHeight: 44,
  boxShadow: 'none',
  transition: 'transform 180ms ease, filter 180ms ease, box-shadow 220ms ease',
  backgroundColor: 'transparent',
  '&.MuiButton-contained': {
    backgroundColor: 'transparent',
  },

  '& .MuiButton-startIcon, & .MuiButton-endIcon': { position: 'relative', zIndex: 1 },
  '& .MuiButton-iconSizeLarge > *:first-of-type': { fontSize: 20 },

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    zIndex: -1,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -10,
    borderRadius: 'inherit',
    zIndex: -1,
    filter: 'blur(18px)',
    opacity: theme.palette.mode === 'dark' ? 0.6 : 0.4,
    transition: 'opacity 220ms ease, filter 220ms ease',
    pointerEvents: 'none',
  },

  '& > *': { position: 'relative', zIndex: 1 },

  '&:hover': {
    transform: 'translateY(-1px)',
    filter: 'saturate(1.08)',
  },

  '&:active': {
    transform: 'translateY(0px)',
  },

  '&.Mui-disabled': {
    opacity: 0.55,
    pointerEvents: 'none',
  },

  variants: [
    {
      props: { size: 'large' },
      style: {
        minHeight: 48,
        paddingInline: theme.spacing(4.25),
      },
    },

    {
      props: { gradient: 'primary' },
      style: {
        color: theme.palette.primary.contrastText,
        '&::before': {
          backgroundImage: `linear-gradient(
            135deg,
            ${theme.vars.palette.button.light} 0%,
            ${theme.vars.palette.button.main} 55%,
            ${theme.vars.palette.button.dark} 100%
          )`,
        },
        '&::after': {
          background: `radial-gradient(
            60% 60% at 50% 35%,
            ${varAlpha(theme.vars.palette.button.mainChannel, 0.55)} 0%,
            transparent 70%
          )`,
        },
        '&:hover::after': {
          opacity: theme.palette.mode === 'dark' ? 0.8 : 0.55,
          filter: 'blur(20px)',
        },
      },
    },

    {
      props: { gradient: 'secondary' },
      style: {
        color: theme.palette.accent.contrastText,
        '&::before': {
          backgroundImage: `linear-gradient(
            135deg,
            ${theme.vars.palette.accent.light} 0%,
            ${theme.vars.palette.accent.main} 55%,
            ${theme.vars.palette.accent.dark} 100%
          )`,
        },
        '&::after': {
          background: `radial-gradient(
            60% 60% at 50% 35%,
            ${varAlpha(theme.vars.palette.accent.mainChannel, 0.55)} 0%,
            transparent 70%
          )`,
        },
        '&:hover::after': {
          opacity: theme.palette.mode === 'dark' ? 0.8 : 0.55,
          filter: 'blur(20px)',
        },
      },
    },

    {
      props: { gradient: 'neutral' },
      style: {
        color: theme.vars.palette.text.primary,
        '&::before': {
          backgroundImage: `linear-gradient(
            135deg,
            rgba(${theme.vars.palette.background.paperChannel} / 0.92) 0%,
            ${theme.vars.palette.background.paper} 100%
          )`,
        },
        border: `1px solid ${varAlpha(theme.vars.palette.dividerChannel, 0.7)}`,
        '&::after': {
          background: `radial-gradient(
            60% 60% at 50% 35%,
            ${varAlpha(theme.vars.palette.text.primaryChannel, theme.palette.mode === 'dark' ? 0.22 : 0.14)} 0%,
            transparent 70%
          )`,
        },
      },
    },
  ],
}));

export const GradientButton = ({ gradient = 'primary', ...props }: GradientButtonProps) => (
  <GradientButtonRoot gradient={gradient} disableElevation variant="contained" {...props} />
);
