import { styled } from '../../styles'

export const Container = styled('div', {
  width: '100%',
  maxWidth: '1140px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
})

export const Section = styled(
  'section',
  {},
  {
    variants: {
      render: {
        mobile: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
        desktop: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
      },
    },
  },
)

export const Sac = styled('div', {
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const MenuFooter = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  ul: {
    marginTop: '1rem',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',

    li: {
      a: {
        textDecoration: 'none',
        color: '$black',

        '&:hover': {
          opacity: '0.9',
        },
      },
    },
  },
})

export const Informative = styled(
  'div',
  {
    borderWidth: '1px',
    borderTopColor: '$black',
    borderTopStyle: 'solid',
    paddingTop: '1rem',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
      textAlign: 'center',
      fontSize: '0.875rem',
    },
  },
  {
    variants: {
      render: {
        mobile: {
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        },
        desktop: {
          flexDirection: 'row',
        },
      },
    },
  },
)

export const SocialFooter = styled(
  'div',
  {
    div: {
      display: 'flex',
      gap: '1rem',
    },
    a: {
      textDecoration: 'none',
      color: '$white',
    },
    svg: {
      height: '30px',
      width: '30px',
      color: '$orange500',
    },
  },
  {
    variants: {
      render: {
        mobile: {
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
        },
        desktop: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        },
      },
    },
  },
)
