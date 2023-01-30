import { keyframes, styled } from "../../styles";

export const Container = styled('div', {
  width: '100%',
  maxWidth: '1140px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
}, {
  variants: {
    render: {
      mobile: {
        padding: '1rem'
      },
      desktop: {
        padding: '2rem 0',
      }
    }
  }
})

export const HeaderSearchAndCart = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}, {
  variants: {
    render: {
      mobile: {
        justifyContent: 'space-between',
        alignItems: 'center',

        div: {
          display: 'flex',
        }
      },
      desktop: {
        justifyContent: 'space-between',
      },
    }
  }
})

export const BurgerButton = styled('button', {
  background: 'transparent',
  border: 'none',
  marginRight: '1rem',

  svg: {
    color: '$white',
  }
}, {
  variants: {
    visible: {
      show: {
        display: 'block'
      },
      hidden: {
        display: 'none'
      }
    }
  }
})

export const ButtonOpenSearch = styled('button', {
  border: 'none',
  background: '$black',
  color: '$yellow500',
  marginRight: '0.5rem'
}, {
  variants: {
    visible: {
      show: {
        display: 'block',
      },
      hidden: {
        display: 'none',
      }
    }
  }
})
export const ButtonCloseSearch = styled('button', {
  border: 'none',
  background: '$black',
  color: '$yellow500',
})

export const SearchContainer = styled('div', {
  width: '100%',

},{
  variants:{
    visible: {
      show: {
        display: 'flex !important',
        flexDirection: 'column',

        '.headerSearchContainer': {
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      },
      hidden: {
        display: 'none !important',
      }
    }
  }
})

export const InputContainer = styled('div', {
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  
  backgroundColor: '$white',
  borderWidth: '3px',
  borderColor: '$yellow500',
  borderStyle: 'solid',
  borderRadius: 8,

  input: {
   backgroundColor: '#f9f9f9',
    outline: 'none',
    border: 'none',
    width: '100%',
    borderRadius: 8,
    paddingLeft: '1rem',
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
    
    '&:hover':{
      backgroundColor: '$yellow300',
    },

    svg:{
      width: '1.5rem',
      height: '1.5rem',
      color: '$white'
    }
  }
},{
  variants:{
    render: {
      mobile: {
        width: '100%'
      },
      desktop: {
        width: '600px',
      }
    },
    visible: {
      show: {
        display: 'flex  !important'
      },
      hidden: {
        display: 'none !important',
      }
    }
  }
})
export const SuggestionContainer = styled('div', {

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

const goIn = keyframes({
  '0%': {
    opacity: 0,
    transform: "translateX(-10px)",
  },
  '100%': { 
    opacity: 1,
    transform: "translateX(0px)",
  },
});

const goOut = keyframes({
  '0%': {
    opacity: 1,
    transform: "translateX(0px)",
  },
  '100%': { 
    opacity: 0,
    transform: "translateX(-10px)",
  },
});

export const Navigation = styled('nav', {
  position: 'relative',
  
  ul:{
    display: 'flex',
    gap: '1rem',
    listStyle: 'none',

    li: {
    listStyle: 'none',
      a:{
        textDecoration: 'none',
        color: '$white',
        fontWeight: 600,

        '&:hover': {
          color: '$yellow500'
        }
      }
    }
  }
}, {
  variants: {
    render: {
      mobile: {
        position: 'absolute',
        top: 0,
        left: -600,
       backgroundColor: '#f9f9f9',
        height: '100vh',
        width: '50%',
        padding: '0 1rem',
        paddingTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'left display 0.2s',
        
        button: {
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          border: 'none',
          background: 'none'
        },
        a: {
          textDecoration: 'none',
          color: '$graphite',
         
          h4: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        },
        ul: {
          flexDirection: 'column',
          listStyle: 'none',
          li:{
            listStyle: 'none',
            a: {
              color: '$gray300'
            }
          }
        }
      },
      desktop: {  
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        ul: {
          listStyle: 'none',
        }
      }
    },
    visible: {
      show: {
        animation: `${goIn}  ease-in 0.2s`,
        left: 0,
        display: 'flex !important',
      },
      hidden: {
        animation: `${goOut} ease-in 0.2s`,
        left: -600,
        display: 'none !important'
      }
    }
  }
})