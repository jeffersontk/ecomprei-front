import { styled } from "../../styles";

export const CategoriesList = styled('ul', {
  background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',
  height: '50px',
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',

  li:{
    listStyle: 'none',
    color: '$white',
    fontWeight: 600,
    transition: 'transform 0.5s',
    
    a:{
      cursor: 'pointer',
      textDecoration: 'none',
      color: '$white',

      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },

    '&:hover':{
      transform: 'scale(1.2)'
    }
  }
})