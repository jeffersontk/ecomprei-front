import { styled } from "../../styles";

export const CategoriesList = styled('ul', {
  background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',
  width: '100%',
  marginTop: '1rem',

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
}, {
  variants: {
    render: {
      mobile: {
        display: 'grid',
        gridTemplateColumns: 'minmax(100px, 150px) minmax(100px, 150px)',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '0.75rem',
        height: '100%',
        padding: '1rem 0',

        li:{
          a: {
            fontSize: '0.875rem'
          }
        }
      },
      desktop: {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
    }
  }
})