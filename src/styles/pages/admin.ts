import { table } from 'console';
import { styled } from '..';

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

    h2: {
      color: '$orange500',
    },

    button: {
      border: 'none',
      background: '$orange500',
      width: '100px',
      height: '40px',
      borderRadius: '4px',
      color: '$white',

      '&:hover':{
        opacity: '0.8',
        cursor: 'pointer'
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
    borderColor: '$gray100',

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
          borderBottom: '1px solid $gray100',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          whiteSpace: 'nowrap',
        }
      }
    }
  }
})