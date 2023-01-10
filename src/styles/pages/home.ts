import { styled } from "..";

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem'
})

export const Banner = styled('div', {
  position: 'relative',
  
  img: {
    maxWidth: '1300px',
    maxHeight: '435px'
  },

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


export const SectionHighlighted = styled('section', {
  width: '100%',
  h2:{
    color: "$graphite",
    marginTop: '2rem',
    marginBottom: '2rem',
  }
})

export const Categories = styled('ul', {
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
    cursor: 'pointer',
    transition: 'transform 0.5s',

    '&:hover':{
      transform: 'scale(1.2)'
    }
  }
})

export const GridCards = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',
})