import { globalCss } from ".";

export const globalStyles = globalCss({
  '*':{
    margin: 0,
    padding: 0,
  },
  body:{
    background: '#fff',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
  'body, input, textarea, button': {
    fontFamily: 'Open Sans',
    fontWeight: 400,
  }
})