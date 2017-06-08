export default {
  flatButton: {
    color: '#ffffff',
    cursor: 'pointer',
    willChange: 'background',
    display: 'inline-block',
    position: 'relative',
    height: '46px',
    padding: '0 16px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '2px',
    outline: 'none',
    background: 'transparent',
    textAlign: 'center',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 300,
    textTransform: 'uppercase',
    overflow: 'hidden',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    transition: 'background cubic-bezier(0, 0, .2, 1) 100ms',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)'
    },

    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)'
    },

    '&.fullWidth': {
      width: '100%'
    },

    '&.hidden': {
      visibility: 'hidden'
    }
  }
};