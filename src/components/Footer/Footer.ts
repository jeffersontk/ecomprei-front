import { styled } from "../../styles";

export const Container = styled('div', {
  width: '100%',
  maxWidth: '1280px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem'
})

export const Section = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  form:{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.5rem',
    background: '$black',
    borderRadius: 4,

    input:{
      width: '250px',
      height: '35px',
      paddingLeft: '0.5rem'
    },
    
    textarea:{
      paddingLeft: '0.5rem'

    },

    button:{
      height: '35px',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      
      backgroundColor: '$yellow500',

      color: '$white',
      fontSize: '1rem',
      fontWeight: 'bold'
    }
  }
})

export const AboutUs = styled('div', {
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const Informative = styled('div', {
  borderWidth: '1px',
  borderTopColor: '$white',
  borderTopStyle: 'solid',
  paddingTop: '1rem',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  div: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: '1rem',
    a:{
      textDecoration: 'none',
      color: '$white',
    },
    svg: {
      height: '30px',
      width: '30px'
    }
  }
})