import { styled } from "../../styles";

export const SliderContainer = styled('div', {
  marginBottom: '1rem',
  position: 'relative',

  img:{
    objectFit: 'fill',
    width: '100%',
    height: 'auto'
  },
}, {
  variants: {
    render: {
      mobile: {
        button: {
          position: 'absolute',
          bottom: '5rem',
          right: '2rem',
          width: '200px',
          height: '40px',
          border: 'none',
          borderRadius: '4px',
          color: '$white',
          fontSize: '1rem',
          fontWeight: 600,
          background: '$orange500'
        }
      },
      desktop: {
        button: {
          position: 'absolute',
          bottom: '40%',
          right: '40%',
          width: '200px',
          height: '40px',
          border: 'none',
          borderRadius: '4px',
          color: '$white',
          fontSize: '1rem',
          fontWeight: 600,
          background: '$orange500'
        }
      }
    },
    visible: {
      show: {
        display: 'flex  !important'
      },
      hidden: {
        display: 'none !important'
      },
    }
  }
})

export const Dots = styled('div', {
    display: 'flex',
    padding:' 10px 0',
    justifyContent: 'center',

  
   '.dot': {
    border: 'none',
    width: '10px',
    height: '10px',
    background: '#c5c5c5',
    borderRadius: '50%',
    margin: '0 5px',
    padding: '5px',
    cursor: 'pointer',
  },
  
  '.dots:focus': {
    outline: 'none',
  },
  
  '.dot.active': {
    background: '#000',
  }
})