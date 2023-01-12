import { styled } from "../../styles";

export const Container = styled('div', {
  width: '100%',
  maxWidth: '1140px',
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

    span: {
      color: '$white',
    },

    input:{
      width: '250px',
      height: '35px',
      paddingLeft: '0.5rem',
      borderRadius: 4,
      border: 'none',
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

export const Sac = styled('div', {
  marginTop: '1rem',
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const MenuFooter = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  ul:{
    marginTop: '1rem',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',

    li: {
      a:{
        textDecoration: 'none',
        color: '$black',

        '&:hover': {
          opacity: '0.9'
        }
      }
    }
  }
})

export const Informative = styled('div', {
  borderWidth: '1px',
  borderTopColor: '$black',
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
      width: '30px',
      color: '$orange500'
    }
  }
})