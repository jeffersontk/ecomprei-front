import { styled } from "../../styles";

export const SliderContainer = styled('div', {
  marginTop: '1rem',
  position: 'relative',

  img:{
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  },

  button: {
    position: 'absolute',
    bottom: '5rem',
    right: '2rem',
    width: '200px',
    height: '40px',
    border: 'none',
    borderRadius: '4px',
    color: '$white',
    fontSize: '1rem',
    fontWeight: 600,
    background: '$orange500'
  }
})