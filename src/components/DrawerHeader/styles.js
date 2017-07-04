export default {
  drawerHeader: {
    width: '100%',
    height: '160px',
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
  },

  // TODO: convert to SVG for performance
  drawerHeaderInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: 'rotate(-30deg) scale(1.75)',

    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '50%',
    },

    '&::before': {
      backgroundColor: '#2196f3',
      left: 0,
    },

    '&::after': {
      backgroundColor: '#f44336',
      right: 0,
    },
  },

  questionCircleImg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
  },
};
