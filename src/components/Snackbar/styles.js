export default {
  snackbar: {
    display: 'flex',
    position: 'fixed',
    bottom: '0',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 24px',
    backgroundColor: '#323232',
    minWidth: '568px',
    transform: 'translateX(-50%)',

    '@media (max-width : 768px)': {
      width: '100%',
      left: 0,
      transform: 'none',
    },

    '& span': {
      fontSize: '0.875rem',
      marginLeft: 'auto',
      marginRight: 0,
      height: '48px',
      display: 'flex',
      alignItems: 'center',
    },
  },
};
