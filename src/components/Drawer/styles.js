export default {
  drawer: {
    position: 'fixed',
    top: '64px',
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    boxSizing: 'border-box',
    contain: 'strict',
    zIndex: 8,

    '@media (max-width : 768px)': {
      top: 0,
      zIndex: 9,
    }
  },

  drawer_open: {
    pointerEvents: 'auto',

    '& $drawerOverlay': {
      opacity: 1
    },

    '& $drawerInner': {
      transform: 'none'
    }
  },

  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    opacity: 0,
    willChange: 'opacity',
    transition: 'opacity cubic-bezier(0, 0, .2, 1) 350ms'
  },

  drawerInner: {
    background: '#ffffff',
    right: 0,
    height: '100%',
    transform: 'translateX(100%)',
    willChange: 'transform',
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    width: 'calc(100% - 56px)',
    maxWidth: '280px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    touchAction: 'none',
    transition: 'transform cubic-bezier(0, 0, .2, 1) 350ms',
    boxShadow: `0px 8px 10px -5px rgba(0, 0, 0, 0.2),
                0px 16px 24px 2px rgba(0, 0, 0, 0.14),
                0px 6px 30px 5px rgba(0, 0, 0, 0.12)`
  }
};