import { styled } from "../../../styles";
import { goIn } from "../../Header/Header";


export const SearchContainer = styled('div', {
  width: '100%',
},{
  variants:{
    visible: {
      show: {
        display: 'flex',
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
    },
    render: {
      mobile: {
        position: 'fixed',
        height: 'auto',
        top: '4.5rem',
        left: '0',
        background: '$black',
        padding: '1rem',
        animation: `${goIn}  ease-in 0.2s`,
      },
      desktop: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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

export const ButtonOpenContainer = styled('div', {}, {
  variants: {
    visible: {
      show: {
        display: 'block',
      },
      hidden: {
        display: 'none !important',
      }
    },
    render: {
      mobile: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      },
      desktop: {
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
        display: 'none !important',
      }
    }
  }
})

export const ButtonCloseSearch = styled('button', {
  border: 'none',
  background: 'transparent',
  color: '$yellow500',
})


export const SuggestionContainer = styled('div', {
  maxHeight: '400px',
  overflow: 'auto',

  display: 'flex',
  flexDirection: 'column',
  
  '.card-search': {
    background: '$white',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '0.875rem',
    borderRadius: '4px',
    padding: '0.5rem',

    '.product-info': {
      display: 'flex',
      gap: '0.5rem',
      span: {
        color: '$graphite',
        fontWeight: 500,
        maxWidth: '185px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }
    },
    '.product-action': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '0.875rem',
      
      button: {
        
        svg: {
          color: '$orange500'
        }
      }

    },
  },
  '.product-notfound':{
    background: '$white',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    padding: '0.5rem',
    marginTop: '0.875rem',
    
    span: {
      color: '$orange500'
    }
  }
}, {
  variants: {
    render: {
      desktop: {
        background: 'rgba(36,30,37, 0.75)',
        borderRadius: '4px',
        width: '600px',
        padding: '1rem',
        position: 'absolute',
        top: '5rem',
        zIndex: '99',
        display: 'flex !important'
      },
      mobile: {
        display: 'none !important'
      }
    }
  }
})