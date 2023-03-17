import { styled } from '../../styles'

export const CategoriesList = styled(
  'ul',
  {
    width: '100%',

    li: {
      listStyle: 'none',
      color: '$white',
      fontWeight: 600,
      transition: 'transform 0.5s',

      svg: {
        border: ' 2px solid $orange500',
        borderRadius: '50%',
        height: '60px',
        width: '60px',
        padding: '0.5rem',
      },

      a: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '$orange500',

        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
      },

      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
  },
  {
    variants: {
      render: {
        mobile: {
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '1rem 0',
          maxWidth: '390px',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          li: {
            a: {
              fontSize: '0.875rem',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        },
        desktop: {
          height: 'auto',
          maxWidth: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
      },
    },
  },
)
