import { styled } from "..";

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4rem'
})

export const Banner = styled('div', {
  position: 'relative',

  a: {
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    left: '18.5%',
    bottom: '20%',

    border: 'none',
    borderRadius: 4,
    width: '230px',
    height: '40px',
    backgroundColor: '$black',
    color: '$white',
    fontWeight: 'bold',

    '&:hover':{
      opacity: "0.95"
    }
  }
})