import { styled } from "../../styles";

export const BannerContainer = styled('div', {
  position: 'relative',
  
  img: {
    maxWidth: '1140px',
    width: '100%',
    maxHeight: '490px',
    objectFit: 'contain'
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
}, {
  variants: {
    render: {
      mobile:{
        img: {
          maxWidth: '1140px',
          width: '100%',
          maxHeight: '450px',
          objectFit: 'contain',
        },
        
        a: {
          display: 'none !important'
        }
      },
      desktop: {
        img:{
          maxWidth: '1140px',
          maxHeight: '435px',
        },

        a: {
          display: 'flex'
        }
      }
    }
  }
})

export const BannerContent = styled('div', {}, {
  variants: {
    visible: {
      show: {
        display: 'block !important'
      },
      hidden: {
        display: 'none !important'
      }
    }
  }
})