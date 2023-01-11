import { styled } from "..";

export const Container = styled('main', {
  width: '100%',
})

export const FilterSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2rem',
  marginBottom: '2rem',

  h2: {
    color: '$yellow500'
  },

  ul: {
    display: 'flex',
    gap: '1rem',

    li: {
      listStyle: 'none',
      background: '$yellow500',
      width: '150px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',

      '&.active': {
        background: '$orange500'
      },
      
      '&:hover':{
        opacity: '0.8'
      },

      a:{
        textDecoration: 'none',
        color:'$white',
        fontWeight: 600,
      },

     
    }
  }
})