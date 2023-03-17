import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
})

export const SectionHighlighted = styled(
  'section',
  {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    h2: {
      color: '$graphite',
      marginTop: '2rem',
      marginBottom: '2rem',
    },
  },
  {
    variants: {
      render: {
        mobile: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          h2: {
            marginLeft: '1rem',
          },
        },
        desktop: {
          h2: {
            marginLeft: 0,
          },
        },
      },
    },
  },
)

export const GridCards = styled(
  'div',
  {
    display: 'grid',
  },
  {
    variants: {
      render: {
        mobile: {
          gridTemplateColumns: 'repeat(2, minmax(170px, 100%))',
          justifyItems: 'center',
          alignItems: 'center',
          width: '100%',
          gap: '0.5rem',
        },
        desktop: {
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
        },
      },
    },
  },
)
