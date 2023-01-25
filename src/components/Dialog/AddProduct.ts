import { styled } from "../../styles"
import * as Dialog from '@radix-ui/react-dialog'

export const DialogContainer = styled(Dialog.Root,{
  '.DialogOverlay': {
    backgroundColor: '$black',
    position: 'fixed',
    inset: 0,
    animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  },

  '.DialogContent': {
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'90vw',
    maxWidth: '600px',
    maxHeight: '85vh',
    padding: '25px',
    animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  },

  '.DialogContent:focus': {
    outline: 'none',
  },
  
  '.DialogTitle': {
    margin: 0,
    fontWeight: 500,
    color: '$orange500',
    fontSize: '17px',
  },
  
  '.Button': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    padding:' 0 15px',
    fontSize: '15px',
    lineHeight: 1,
    fontWeight: 500,
    height: '35px',
  },

  '.Button.primary': {
    backgroundColor: '$orange500',
    color: '$white',
    boxShadow: '0 2px 10px var(--blackA7)',
  },
  '.Button.primary:hover': {
    opacity: '0.8'
  },

  '.Button.primary:focus': {
    boxShadow: '0 0 0 2px black',
  },
  
  '.IconButton': {
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: '25px',
    width: '25px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$orange500',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  '.IconButton:hover': {
    opacity: '0.8'
  },

  '.IconButton:focus': {
    boxShadow: '0 0 0 2px $orange500',
  },
  
  '.Fieldset': {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '15px',
  },
  
  '.Label': {
    fontSize: '15px',
    color: '$orange500',
    width: '90px',
    textAlign: 'right',
  },
  
  '.Input': {
    width: '100%',
    flex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    padding: '0 10px',
    fontSize: '15px',
    lineHeight: 1,
    color:  '$orange500',
    boxShadow: '0 0 0 1px $orange500',
    height:' 35px',
  },
  '.Input:focus': {
    boxShadow: '0 0 0 2px $orange500',
  },
  
  '@keyframes overlayShow': {
    'from': {
      opacity: 0,
    },
    'to': {
      opacity: 1,
    }
  },
  
  '@keyframes contentShow': {
    'from': {
      opacity: 0,
      transform: 'translate(-50%, -48%) scale(0.96)',
    },
    'to': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    }
  }
  
})