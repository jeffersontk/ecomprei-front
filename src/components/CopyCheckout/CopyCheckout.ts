import { styled } from '../../styles'

export const CopyCheckoutContainer = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    justifyContent: 'center',
    alignItems: 'center',

    a: {
      textDecoration: 'none',
      textAlign: 'center',
      border: 'none',
      cursor: 'pointer',

      background: '$orange500',
      color: '$white',
      width: '100%',
      height: '45px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      fontWeight: 600,
      borderRadius: '4px',
    },

    img: {
      height: 'auto',
      objectFit: 'contain',
    },
  },
  {
    variants: {
      render: {
        mobile: {
          img: {
            width: '390px',
            maxHeight: '360px',
            gridArea: 'copy',
          },
        },
        desktop: {
          img: {
            width: '450px',
            maxHeight: '600px',
          },
        },
      },
    },
  },
)

export const Slider = styled('div', {})

export const SliderContainer = styled(
  'div',
  {
    width: '450px !important',
    img: {
      width: '450px',
      height: 'auto',
      objectFit: 'contain',
    },
  },
  {
    variants: {
      render: {
        mobile: {
          width: '390px !important',

          img: {
            maxHeight: '360px',
            objectFit: 'contain',
          },
        },
        desktop: {
          width: '450px !important',
          img: {
            width: '450px',
            height: 'auto',
            objectFit: 'contain',
          },
        },
      },
    },
  },
)

export const ThumbnailContainer = styled('div', {
  img: {
    width: '100%',
    height: '100px',
    objectFit: 'contain',
  },
})

export const TextContainer = styled(
  'div',
  {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  {
    variants: {
      direction: {
        left: {},
        right: {},
      },
    },
  },
)
export const ContentText = styled(
  'div',
  {
    background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    minHeight: '60px',
    position: 'relative',
    borderRadius: '16px',

    '.title': {
      width: '100%',
      fontWeight: 'bold',
      color: '$white',
      textAlign: 'center',
    },
    span: {
      width: '95%',
      color: '$white',
      padding: '0.875rem',
    },
  },
  {
    variants: {
      render: {
        mobile: {
          '.title': {
            fontSize: '1rem',
          },
        },
        desktop: {
          '.title': {
            fontSize: '1.5rem',
          },
          span: {
            width: '80%',
          },
        },
      },
      direction: {
        left: {
          '::after': {
            position: 'absolute',
            background: '$black',
            width: '100%',
          },
        },

        right: {
          '&::before': {
            background: '$black',
            width: '100%',
          },
        },
      },
    },
  },
)
