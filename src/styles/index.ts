import {createStitches} from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme
} = createStitches({
  theme:{
    colors:{
      white: '#f9f9f9',

      gray900: '#121214',
      gray800: '#202024',
      gray300: '#999999',
      gray100: '#e1e1e6',

      black: '#221F23',
      graphite: '#303A44',

      yellow300: '#F5AE26',
      yellow500: '#FEA800',
      orange500: '#F07301',

      green500: '#00875f',
      green300: '#00b37e',

      red300: '#EB5757',
    },
    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
})
