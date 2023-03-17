import { keyframes } from '@stitches/react'
import { styled } from '../../../styles'

export const goIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(-50px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0px)',
  },
})

export const MenuContainer = styled('aside', {
  background: '$graphite',
  maxWidth: '350px',
  height: '100vh',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '$white',

  '.current': {
    background: 'linear-gradient(135deg, #F07301 0%, #FEA800  100%)',
    padding: '0.5rem 1rem',
    marginLeft: '-1rem',
    borderRadius: '8px',
    transition: 'background 1s',
    animation: `${goIn}  ease-in 0.2s`,

    fontWeight: 600,
  },
})
