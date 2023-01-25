import { styled } from "../../styles";

export const ButtonDropMenu = styled('button', {
  border: 'none',
  background: '$white',
})

export const MenuListDropdown = styled('div', {
  padding: '0.5rem',
  background: '$white',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.575rem',

  button: {
    display: 'flex',
    gap: '0.5rem',
    border: 'none',
    background: '$white',
    padding: '5px',

    fontWeight: 600,
    fontSize: '0.875rem',
    color: '$graphite',
    
    '&:hover': {
      background: '$orange500',
      color: '$white', 
      borderRadius: '4px',
      cursor: 'pointer',
    }
  }
})