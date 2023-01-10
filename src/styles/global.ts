import { globalCss } from ".";

export const globalStyles = globalCss({
  '*':{
    margin: 0,
    padding: 0,
  },
  body:{
    background: '$white',
    '-webkit-font-smoothing': 'antialiased',
    color: '$black',
  },
  'body, input, textarea, button': {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '$black',
  }
})