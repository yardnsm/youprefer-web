export default {
  menuItem: {
    position: 'relative',
    padding: '0 16px',
    outline: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '48px',
    backgroundColor: '#ffffff',
    transition: 'background cubic-bezier(0, 0, .2, 1) 250ms',

    '&:hover': {
      backgroundColor: '#e5e5e5',
    },

    '&:active': {
      backgroundColor: '#d8d8d8',
    },

    '& i.material-icons': {
      width: '24px',
      height: '24px',
      marginLeft: '32px',
      marginRight: 0,
      color: 'rgba(0, 0, 0, 0.55)',
    },
  },
};
