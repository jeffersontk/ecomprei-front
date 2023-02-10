import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  gap: '2rem',
  position: 'relative',
})

export const HeaderContainer = styled('header', {
  width: '100%',
  margin: '0 auto',
  backgroundColor: '$black',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  zIndex: 999,
}, {
  variants: {
    visible: {
      show: {
        display: 'flex',
      },
      hidden: {
        display: 'none !important',
      }
    }
  }
})

export const MainContainer = styled('main', {
  marginTop: 'calc(141px + 2rem)',
  width: '100%',
  maxWidth: '1140px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}, {
  variants: {
    render: {
      mobile: {
        marginTop: 'calc(77px + 1rem)',
        padding: '0 1rem',
      },
      desktop: {
        marginTop: 'calc(150px + 1rem)',
        padding: '0',
      }
    }
  }
})

export const InformativeContainer = styled('section', {
  width: '100%',
  maxWidth: '1140px',
  
  svg: {
    color: '$orange500'
  },

  '.informative': {
    width: '240px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',

    '.informativeText': {
      display: 'flex',
      flexDirection: 'column',
      
      strong:{
        color: '$orange500'
      },
      span: {
        fontSize: '0.75rem',
        color: '$graphite', 
      }
    }
  }
}, {
  variants: {
    render: {
      mobile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.5rem',
        
        '.informative': {
          marginLeft: '2rem',
          width: '80%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }
      },
      desktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }
    }
  }
},{
  variants: {
    visible: {
      show: {
        display: 'flex',
      },
      hidden: {
        display: 'none !important',
      }
    }
  }
})

export const FooterContainer = styled('footer', {
  width: '100%',
  paddingTop: '10px',
  background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',
}, {
  variants: {
    visible: {
      show: {
        display: 'flex',
      },
      hidden: {
        display: 'none !important',
      }
    }
  }
})

export const ContentFooter = styled('div', {
  padding: '1rem 0',
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
 backgroundColor: '#f9f9f9',
})