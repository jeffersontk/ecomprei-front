import { styled } from '..'

export const SuccessContainer = styled(
  'section',
  {
    width: '100%',
    height: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
  },
  {
    variants: {
      render: {
        desktop: {
          flexDirection: 'row',
          height: '400px',
        },
        mobile: {
          flexDirection: 'column',
          height: '100%',
        },
      },
    },
  },
)

export const StatusCheckout = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',

    '.headerText': {
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        color: '#2D3748',
      },
      span: {
        fontSize: '1.25rem',
        marginTop: '1rem',
      },
    },

    '.contact-text': {
      color: '#2D3748',
      fontWeight: 500,
    },
  },
  {
    variants: {
      render: {
        desktop: {
          width: '75%',
        },
        mobile: {
          width: '90%',
        },
      },
    },
  },
)

export const StatusBar = styled(
  'div',
  {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginLeft: '5px',

    span: {
      fontWeight: 600,
    },

    '.status-check': {
      display: 'flex',
      alignItems: 'center',
      width: '200px',

      svg: {
        height: '30px',
        width: '30px',
        color: '#38A169',
        zIndex: '20',

        ':not:first-child': {
          marginLeft: '-5px',
        },
      },
    },
    '.status-progress': {
      display: 'flex',
      alignItems: 'center',
      width: '220px',

      svg: {
        height: '30px',
        width: '30px',
        color: '#E2E8F0',
        marginLeft: '-5px',
        zIndex: '20',
      },
    },
    '.bar': {
      height: '10px',
      width: '100%',
    },
    '.check': {
      background: '#38A169',
      marginLeft: '-5px',
    },
    '.progress': {
      background: '#E2E8F0',
    },
  },
  {
    variants: {
      render: {
        desktop: {
          maxWidth: '100%',
          overflow: 'hidden',
        },
        mobile: {
          maxWidth: '370px',
          overflow: 'scroll',
        },
      },
    },
  },
)

export const ProductCheckout = styled('div', {
  height: '100%',
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',

  '.box': {
    minWidth: '200px !important',
  },
  img: {
    borderRadius: '4px',
    width: '200px !important',
    height: '200px',
    objectFit: 'contain',
  },

  h3: {
    maxWidth: '200px',
    color: '#2D3748',
    fontSize: '1rem',
    fontWeight: 600,
  },

  a: {
    background: '$orange500',
    color: '$white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',

    '&:hover': {
      cursor: 'pointer',
      opacity: '0.9',
    },
  },
})
