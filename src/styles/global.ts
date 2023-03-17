import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: '#f9f9f9',
    '-webkit-font-smoothing': 'antialiased',
    color: '$black',
  },
  html: {
    scrollBehavior: 'smooth',
  },
  'body, input, textarea, button': {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '$black',
  },
})
