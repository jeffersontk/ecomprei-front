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
  background: '$yellow500',
  paddingLeft: '1rem',
  height: '40px',
  color: '$white',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

export const ContentCard = styled('div', {
  display: 'flex',
  padding: '1rem',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: '1.5rem',

  button: {
    width: '100px',
    height: '40px',

    border: 'none',
    background: '$yellow300',
    borderRadius: '4px',

    color: '$white',
    fontWeight: 600,
    cursor: 'pointer',

    '&:hover':{
      background: '$yellow500',
    }
  }
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Price = styled('strong', {
  display: 'flex',
  fontSize: '1.85rem',
  color: '$black',
  position: 'relative',

  span: {
    position: 'absolute',
    top: 2,
    right: 30,

    fontSize: '1rem'
  }
})

export const RealPrice = styled('span', {
  display: 'flex',
  textDecoration: 'line-through',
  position: 'relative',
  color: '$gray300',
  fontWeight: 600,

  span: {
    textDecoration: 'line-through',
    position: 'absolute',
    top: 0,
    left: 52,

    fontSize: '0.75rem'
  }
})

export const DescriptionPrice = styled('span', {
  display: 'flex',
  fontSize: '0.85rem',
  position: 'relative',
  color: '$red300',  
  fontWeight: 500,

  span: {
    position: 'absolute',
    top: 0,
    right: -13,
    fontSize: '0.55rem'
  }
})
