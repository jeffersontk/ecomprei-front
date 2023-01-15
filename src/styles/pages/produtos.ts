import { styled } from "..";

export const Container = styled('main', {
  width: '100%',
})

export const Title = styled('h2', {
  color: '$yellow500',
  marginBottom: '2rem',
  marginTop: '2rem',
  lineHeight: '40px'
})

export const ProductSlider = styled('section', {
  marginTop: '2rem',
  marginBottom: '2rem',
  display: 'flex',
  position: 'relative',

}, {
  variants: {
    visible: {
      show: {
        display: 'flex'
      },
      hidden: {
        display: 'none !important'
      }
    }
  }
})

export const Product = styled('div',{
  height: '350px',
  color: '$white',
  transition: 'width 0.5s',
  position: 'relative',

  a:{
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    
    textDecoration: 'none',

    width: '150px',
    height: '35px',
    color: '$white',
    background: '$orange500',
    borderRadius: '4px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },

  '&.product1': {
    background: '$gray100',
    width: '220px',

    a: {
      display: 'none',
    },
    
    '&:hover': {
      background: '$green300',
      width: '100%',

      a: {
        display: 'flex',
      },
    }
  },
  '&.product2': {
    background: '$gray300',
    width: '220px',
    a: {
      display: 'none',
    },
    '&:hover': {
      background: '$green300',
      width: '100%',
      a: {
        display: 'flex',
      },
    }
  },
  '&.product3': {
    background: '$gray800',
    width: '220px',
    a: {
      display: 'none',
    },
    '&:hover': {
      background: '$green300',
      width: '100%',
      a: {
        display: 'flex',
      },
    }
  },
  '&.product4': {
    background: '$gray900',
    width: '620px',
   
    '&:hover': {
      background: '$green300',
      width: '100%',
    }
  },
})

export const FilterSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
 
  marginTop: '2rem',
  marginBottom: '2rem',

  h2: {
    color: '$yellow500',  
    lineHeight: '45px',
  },

  ul: {
    display: 'flex',
    gap: '1rem',

    li: {
      listStyle: 'none',
      color: '$yellow500',
      width: '100px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: 'transparent',
      borderBottomStyle: 'solid',
      borderBottomWidth: '5px',

      '&.active': {
        borderBottomColor: '$orange500',
        borderBottomStyle: 'solid',
        borderBottomWidth: '5px',
        a: {
          color: '$orange500',
        }
      },
      
      '&:hover':{
        opacity: '0.8'
      },

      a:{
        textDecoration: 'none',
        color: '$yellow500',
        fontWeight: 600,
      },

     
    }
  }
}, {
  variants: {
    render: {
      mobile: {
        flexDirection: 'column',
        padding: '0 1rem',
        h2 :{
          fontSize: '1.2rem'
        }
      },
      desktop: {
        flexDirection: 'row',
        alignItems: 'center',
      }
    }
  }
})