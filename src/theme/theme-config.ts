import type { Theme, Direction, CommonColors, ThemeProviderProps } from '@mui/material/styles';
import type { ThemeCssVariables } from './types';
import type { PaletteColorKey, PaletteColorNoChannels } from './core/palette';

// ----------------------------------------------------------------------

export type ThemeConfig = {
  direction: Direction;
  classesPrefix: string;
  cssVariables: ThemeCssVariables;
  defaultMode: ThemeProviderProps<Theme>['defaultMode'];
  modeStorageKey: ThemeProviderProps<Theme>['modeStorageKey'];
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<PaletteColorKey, PaletteColorNoChannels> & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: {
      [K in 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 as `${K}`]: string;
    };
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  defaultMode: 'light',
  modeStorageKey: 'theme-mode',
  direction: 'ltr',
  classesPrefix: 'minimal',
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'Public Sans Variable',
    secondary: 'Barlow',
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: '#DDE9F5',
      light: '#8AA4C4',
      main: '#1E293B',
      dark: '#0F172A',
      darker: '#050A1C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#F3F5F7',
      light: '#D7E0E7',
      main: '#64758B',
      dark: '#182235',
      darker: '#0E1323',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#C8F1F9',
      light: '#5CB8DE',
      main: '#045891',
      dark: '#023368',
      darker: '#001945',
      contrastText: '#ffffff',
    },
    success: {
      lighter: '#E7F8CC',
      light: '#9DD765',
      main: '#367A0F',
      dark: '#1A5707',
      darker: '#093A02',
      contrastText: '#FFFFFF',
    },

    warning: {
      lighter: '#FBEFC9',
      light: '#EBBE5F',
      main: '#BF7301',
      dark: '#894700',
      darker: '#5B2800',
      contrastText: '#1C252E',
    },
    error: {
      lighter: '#F9CECF',
      light: '#DD6A85',
      main: '#8E1349',
      dark: '#660944',
      darker: '#440339',
      contrastText: '#FFFFFF',
    },
    grey: {
      50: '#FCFDFD',
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#1C252E',
      900: '#141A21',
    },
    button: {
      lighter: '#D7FCFE',
      light: '#5CB8DE',
      main: '#38BDF8',
      dark: '#1C70B2',
      darker: '#0A3977',
      contrastText: '#ffffff',
    },
    accent: {
      lighter: '#EDFEFA',
      light: '#C9FEFB',
      main: '#A5F3FC',
      dark: '#539BB5',
      darker: '#1F5278',
      contrastText: '#ffffff',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
  },
};
