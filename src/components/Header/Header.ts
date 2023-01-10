import { styled } from "../../styles";

export const Container = styled('div', {
  width: '100%',
  maxWidth: '1280px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '4rem'
})

export const SearchContainer = styled('div', {
  width: '600px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  
  backgroundColor: '$white',
  borderWidth: '3px',
  borderColor: '$yellow500',
  borderStyle: 'solid',
  borderRadius: 8,

  input: {
    outline: 'none',
    border: 'none',
    width: '100%',
    borderRadius: 8,
    paddingLeft: 4,
  },

  button :{
    height: '35px',
    width: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    border: 'none',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    cursor: 'pointer',
    
    backgroundColor: '$yellow500',

    svg:{
      width: '1.5rem',
      height: '1.5rem',
      color: '$white'
    }
  }
})

export const CartButton = styled('button', {
  background: 'transparent',
  border: 'none',
  position: 'relative',

  cursor: 'pointer',

  svg: {
    width: '2.5rem',
    height: '2.5rem',
    color: '$yellow500'
  },
  span: {
    position: 'absolute',
    top: -5,
    right: -10,

    background: '$yellow500',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: '50%',

    color: '$white'
  }
})