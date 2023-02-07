import { styled } from '..';
export const CartContainer = styled('section', {
  width: '100%',
  display: 'grid',    

}, {
  variants: {
    render: {
      mobile: {
        gridTemplateColumns: '390px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
      },
      desktop: {
        alignItems: 'flex-start',
        gridTemplateColumns: 'minmax(100px, 758px) 350px',
        gap: '2rem',
      }
    }
  }
})

export const BoxImage = styled('div', {
  padding: '0.5rem',
}, {
  variants: {
    render: {
      desktop: {
        img:{
          width: '200px',
          borderRadius: '8px'
        }
      },
      mobile: {
        img: {
          borderRadius: '8px'
        }
      }
    }
  }
})

export const CartContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',

  h2: {
    color: '$graphite',
  }
})

export const CartProduct = styled('div', {
  display: 'flex',
  gap: '1rem',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  padding: '1rem',
  borderRadius: '4px',

  img:{
    width: '70px',
    height: 'auto',
    objectFit: 'contain',
  },
  
  '.details-content': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    '.details': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
      color: '$graphite',
      
      '.product-name': {
        maxWidth: '250px',
        fontSize: '1rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',  
      },
      '.product-price': {
        fontWeight: 600,
        
        '.discount':{
          color: '$red300'
        },
        '.quantityDiscount': {
          marginLeft: '1rem',
          background: '$white',
          color: '$orange500',
          borderRadius: '4px',
          padding: '4px'
        }
      }
     
    },

    '.total': {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '0.5rem',

      svg: {
        '&:hover':{
          opacity: '0.8',
          cursor: 'pointer'
        }
      },

     /*  '.count': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',

        button: {
          border: 'none',
          background: '$yellow300',
          width: '25px',
          height: '25px',
          color: '$white',
          borderRadius: '40px',
          
          '&:hover':{
            opacity: '0.8',
            cursor: 'pointer'
          }
        }
      } */
    }
  }
})

export const CartResume = styled('div', {
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  padding: '1rem',
  borderRadius: '4px',

  h2: {
    color: '$graphite',
  },
  '.textContent': {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    border: 'none',
    background: '$orange500',
    color: '$white',
    height: '40px',
    borderRadius: '4px',

    '&:hover':{
      opacity: '0.9',
      cursor: 'pointer'
    }
  }
})