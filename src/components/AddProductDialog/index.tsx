import React from 'react'
import { styled, keyframes } from '../../styles';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {MdClose} from 'react-icons/md'


const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeout = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: 'rgba(0,0,0, 0.5)',
  position: 'fixed',
  inset: 0,

  '&[data-state="open"]': {
    animation: `${fadeIn} 300ms ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeout} 200ms ease-out`,
  },
});
interface DialogProps {
  children: React.ReactNode
}


export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$orange500',
  color: '$white',
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

  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  '&[data-state="open"]': {
    animation: `${fadeIn} 300ms ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeout} 200ms ease-out`,
  },
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  fontFamily: 'inherit',
  background: '$white',
  border: 'none',
  borderRadius: '100%',
  height: '25px',
  width: '25px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$orange500',
  position: 'absolute',
  top: '1rem',
  right: '1rem',

  '&:hover': {
    opacity: '0.8',
    cursor: 'pointer',
  }
});

export const DialogContent = ({ children, ...props }: DialogProps) => (
  <StyledContent {...props}>
    {children}
    <StyledCloseButton>
      <MdClose />
    </StyledCloseButton>
  </StyledContent>
);

export const DialogTrigger = DialogPrimitive.Trigger;