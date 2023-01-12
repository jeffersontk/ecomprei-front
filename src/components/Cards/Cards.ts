import { styled } from "../../styles";

export const Card = styled('div', {
  height: '100%',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})


export const ImageContainer = styled('div', {
  marginTop: '1rem',
})

export const ContentImage = styled('div', {
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'relative'
})

export const CardDiscount = styled('div', {
  img:{
    position: 'absolute',
    top: 0,
    left: -1,
  },

  span: {
    position: 'absolute',
    top: 25,
    left: 5,
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '$white',
    transform: 'rotate(-47deg)',
  }
})

export const CartButton = styled('button', {
  position: 'absolute',
  top: 10,
  right: '1rem',

  width: '35px',
  height: '35px',
  background: 'transparent',
  borderRadius: '50%',
  border: 'none',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  cursor: 'pointer',
  
  '&:hover':{
    transform: 'scale(1.1)'
  },
  
  svg: {
    width: '20px',
    height: '20px',
    color: '$graphite',
  }
})

export const PriceContent = styled('div', {
})

export const ContainerTitle = styled('div', {
  background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',
  paddingLeft: '1rem',
  height: '40px',
  color: '$white',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

export const ContentCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '0.5rem',

  '.action': {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    
    a: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
      width: '100%',
      height: '40px',
  
      border: 'none',
      background: '$orange500',
      borderRadius: '4px',
  
      color: '$white',
      fontWeight: 600,
      cursor: 'pointer',
  
      textDecoration: 'none',
  
      '&:hover':{
        background: '$yellow300',
      }
    }
  },
    
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  div:{
    display: 'flex',
    width: '100%',
    gap: '1rem'
  }
})

export const Price = styled('strong', {
  display: 'flex',
  fontSize: '1.85rem',
  color: '$black',

  span: {
    fontSize: '1rem'
  }
})

export const RealPrice = styled('span', {
  display: 'flex',
  textDecoration: 'line-through',
  color: '$gray300',
  fontWeight: 600,

  span: {
    textDecoration: 'line-through',

    fontSize: '0.75rem'
  }
})

export const DescriptionPrice = styled('span', {
  display: 'flex',
  fontSize: '0.85rem',
  color: '$red300',  
  fontWeight: 500,

  span: {
    fontSize: '0.55rem'
  }
})
