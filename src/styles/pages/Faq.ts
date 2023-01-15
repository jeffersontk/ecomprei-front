import { styled } from '..';
export const FaqSection = styled('section', {
  maxWidth: '550px',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
  marginBottom: '1rem',


  h1: {
    color: '$graphite'
  },
  details:{
    outline: 'none',
    borderColor: '$orange500',
    borderStyle: 'solid',
    borderWidth: '2px',
    padding: '1rem',
    borderRadius: '4px',

    summary: {
      listStyle: 'none',
      fontWeight: 600,
      color: '$orange500',
      cursor: 'pointer'
    },
    p:{
      marginTop: '1rem',
      color: '$graphite'
    }
  },

  'details summary::before': { 
    content: "▼",
    paddingRight: '0.5em',
    color: '$orange500' 
    /* you can style it however you want, use background-image for example */
  },
  
  /* By using [open] we can define different styles when the disclosure widget is open */
  'details[open] summary::before': { 
    content: "▲",
    paddingRight: '0.5em',
    color: '$orange500'
  }
})