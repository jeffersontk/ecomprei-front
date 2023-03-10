import { styled } from "..";

export const ContainerSectionCheckout = styled('section', {
 
}, {
  variants: {
    render: {
      mobile: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '390px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        gridTemplateAreas: '"checkout" "copy"',
      },
      desktop: {
        width: '100%',
        display: 'grid',    
        alignItems: 'flex-start',
        gridTemplateColumns: 'minmax(100px, 758px) 350px',
        gap: '2rem',
        gridTemplateAreas: '"copy checkout"',
      }
    }
  }
})

export const CardCheckoutContainer = styled('div', {
  width: '100%',
  maxHeight: '100%',
  padding: '1rem',
  borderRadius: '8px',
  background: '#f9f9f9',

}, {
  variants: {
    render: {
      mobile: {
        gridArea: 'checkout',
        marginLeft: '0.25rem',
        boxShadow: 'none',
      },
      desktop: {
        gridArea: 'checkout',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }
    }
  }
})

export const ImageContainer = styled('div', {
  background: 'transparent',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1rem',

  position: 'relative',

  img: {
    width: 'auto',
    height: 'auto',
    objectFit: 'cover'
  }
})

export const Divider = styled('div', {
  width: '100%',
  height: '1px',
  background: '$gray100',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
})

export const DetailProduct = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  h2:{
    color: '$graphite'
  }
})

export const ContentSelects = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  div:{
    display: 'flex',
    
    label: {
      margin:0
    },

    select: {
      border: 'none',
      background: 'transparent',

      outline: 'none'
    }
  }
})

export const PriceInfo = styled('div', {
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-end'
})

export const OldPrice = styled('span', {
  textDecoration: 'line-through',
  color: '$red300',
  fontWeight: 600,
  
})
export const NewPrice = styled('span', {
  fontSize: '1.35rem',
  fontWeight: 600,
  color: '$graphite'
})

export const DetailPrice = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',

  div:{
    display: 'flex',
    justifyContent: 'space-between',

    span: {
      fontWeight: 600,
      color: '$graphite',
    },

  }
})

export const TotalPrice = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  fontSize: '1.5rem',

  marginTop: '1rem',
  marginBottom: '1rem',

  strong: {
    color: '$graphite',
  }
})

export const ButtonCheckout = styled('button', {
  border: 'none',
  background: '$orange500',
  color: '$white',
  width: '100%',
  height: '40px',
  borderRadius: '4px',
  fontSize: '1.15rem',
  fontWeight: 600,

  '&:hover': {
    opacity: '0.9',
    cursor: 'pointer',
  }
})

export const ButtonAddToCart = styled('button', {
  marginTop: '1rem',
  width: '100%',
  height: '35px',
  
  borderRadius: '4px',
  border: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '$orange500',

 backgroundColor: '#f9f9f9',

  fontWeight: 600,
  color: '$orange500',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
})