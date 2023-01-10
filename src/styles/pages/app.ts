import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  gap: '2rem',
  position: 'relative',
})

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  margin: '0 auto',
  backgroundColor: '$black',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  zIndex: 99,
})

export const MainContainer = styled('main', {
  marginTop: 'calc(141px + 2rem)'
})

export const FooterContainer = styled('footer', {
  width: '100%',
  paddingTop: '10px',
  background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',
})

export const ContentFooter = styled('div', {
  padding: '2rem 0',
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  background: '$white',
})