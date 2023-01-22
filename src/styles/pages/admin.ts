import { table } from 'console';
import { styled } from '..';

export const Container = styled('div', {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'calc(-157px)',
  background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',
})

export const FormContainer = styled('form', {
  height: '100px',
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1rem',
  background: '$white',
  borderRadius: '4px',

  input: {
    border: 'none',
    background: '$white',
    borderBottom: '1px solid $gray300',
    outline: 'none',
  },

  button: {
    background: '$orange500',
    height: '40px',
    border: 'none',
    color: '$white',
  }
})

export const AdminContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    padding: '1rem',
    background: 'linear-gradient(135deg, #FEA800 0%, #F07301 100%)',

    h2: {
      color: '$white',
    },

    '.open-dialog': {
      background: '$white',
      padding: '0.5rem 1rem',
      border: 'none',
      color: '$orange500',
      borderRadius: '4px',
      fontWeight: 600,

      '&:hover': {
        cursor: 'pointer',
      }
    }
  },

  table: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    padding: '1rem',
    textAlign: 'left',
    boxSizing: 'border-box',
    display: 'table',
    borderCollapse: 'separate',
    textIndent: 'initial',
    borderSpacing: '0px',
    borderColor: '$white',
    color: '$graphite',

    thead: {
      display: 'table-header-group',
      verticalAlign: 'middle',
      borderColor: 'inherit',
      textAlign: 'left',
      borderCollapse: 'collapse',

      tr: {
        display: 'table-row',
        verticalAlign: 'inherit',
        borderColor: 'inherit',

        th: {
          display: 'table-cell',
          verticalAlign: 'inherit',
          fontWeight: 'bold',
          textAlign: '-internal-center',
          borderBottom: '1px solid $gray100',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }
      },
    },
    tbody: {
      tr: {
        td: {
          maxWidth: '150px',
          borderBottom: '1px solid $gray100',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }
      }
    }
  }
})

export const FormNewProduct = styled('form', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.875rem',

  '.box': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  input: {
    height: '30px',
    border: 'none',
    borderRadius: '4px',
    outline: 'none',
    paddingLeft: '0.5rem'
  },

  select: {
    height: '30px',
    border: 'none',
    borderRadius: '4px',
    outline: 'none',
  },
  
  button: {
    height: '40px',
    border: 'none',
    borderRadius: '4px',
    background: '$white',
    color: '$orange500',
    fontWeight: 600,
    fontSize: '1rem'
  },

  '.contentArraysItems': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',

    '.inputsAdds': {
      input: {
        width: '87%',
      },
      button: {
        background: '#fff',
        color: '$orange500',
        fontSize: '0.875rem',
        lineHeight: '0.875rem',
        height: '30px',
        width: '25px',
        marginLeft: '0.25rem',

        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    '.itemsList': {
      marginTop: '0.5rem',
      background: '$white',
      padding: '0.875rem 0.5rem',
      borderRadius: '4px',
      minHeight: '20px',
      height: 'auto',

      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '0.25rem',

      span: {
        background: '$orange500',
        padding: '0.3rem 0.875rem',
        paddingRight: '0.3rem',
        borderRadius: '100px',
        color: '$white',

        display: 'flex',
        justifyContent: 'space-between',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',

        button: {
          background: '$yellow500',
          color: '$white',
          fontSize: '0.675rem',
          lineHeight: '0.875rem',
          height: '20px',
          minWidth: '20px',
          borderRadius: '100px',
          marginRight: '10px'
        }
      }
    },
    '.itemsListImage': {
      marginTop: '0.5rem',
      background: '$white',
      padding: '0.875rem 0.5rem',
      borderRadius: '4px',
      minHeight: '20px',
      height: 'auto',

      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '0.25rem',

      span: {
        background: '$orange500',
        padding: '0.3rem 0.875rem',
        paddingRight: '0.3rem',
        borderRadius: '100px',
        color: '$white',

        display: 'flex',
        justifyContent: 'space-between',
        
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',

        button: {
          background: '$yellow500',
          color: '$white',
          fontSize: '0.675rem',
          lineHeight: '0.875rem',
          height: '20px',
          minWidth: '20px',
          borderRadius: '100px',
          marginRight: '10px'
        }
      }
    }
  },

  '.switch-container': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    
    '.switch': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
  
      '.SwitchRoot': {
        width: '42px',
        height: '25px',
        backgroundColor: '$graphite',
        border: 'none',
        borderRadius: '9999px',
        position: 'relative',
        boxShadow: '0 2px 10px $graphite',
        '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
        outline: 'none'
      },
     '.SwitchRoot:focus': {
        boxShadow: '0 0 0 2px $graphite',
        outline: 'none'
      },
  
      '.SwitchRoot[data-state="checked"]': {
        backgroundColor: '$white',
        outline: 'none'
      },
      
      '.SwitchThumb': {
        display: 'block',
        width: '21px',
        height: '21px',
        backgroundColor: '$white',
        borderRadius: '9999px',
        boxShadow: '0 2px 2px $graphite',
        transition: 'transform 100ms',
        transform: 'translateX(2px)',
        willChange: 'transform',
        outline: 'none'
      },
  
      '.SwitchThumb[data-state="checked"]': {
        transform: 'translateX(19px)',
        outline: 'none',
        backgroundColor: '$orange500',
      }
    }
  }
})