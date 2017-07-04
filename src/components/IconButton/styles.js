export default {
  iconButton: {
    textDecoration: 'none',
    cursor: 'pointer',
    margin: '0 8px',
    color: 'white',
    position: 'relative',

    '&::before': {
      position: 'absolute',
      top: '-30%',
      left: '-33%',
      width: '40px',
      height: '40px',
      content: '""',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      opacity: 0,
      willChange: 'opacity',
      transition: 'opacity cubic-bezier(0, 0, .2, 1) 100ms',
    },

    '&:hover::before': {
      opacity: 0.4,
    },

    '&:active::before': {
      opacity: 1,
    },
  },
};
