import { styled } from "../../styles";

export const CardContainer = styled('div', {
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '4px',
  width: '100%',

  a: {
    textDecoration: 'none',
  },

  '.productImage': {
    objectFit: 'contain',
    width: '180px',
    height: '100%'
  }
}, {
  variants: {
    render: {
      mobile: {
        '.productImage': {
          objectFit: 'contain',
          width: '180px',
          height: '100%'
        }
      },
      desktop: {
        '.productImage': {
          objectFit: 'fill',
          width: '280px',
          height: '100%',
          borderRadius: '4px',
        }
      }
    }
  }
})

export const ContentText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem',

  h4:{
    color: '$black',
    
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  div: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-end',
  }
}, {
  variants: {
    render: {
      mobile: {
       h4: {
        fontSize: '0.75rem',
        fontWeight: 400,
        maxWidth: '180px',
       }
      },
      desktop: {
        h4: {
          fontSize: '0.875rem',
          fontWeight: 400,
          maxWidth: '250px',
         },
         div: {
          justifyContent: 'space-between'
         }
      }
    }
  }
})