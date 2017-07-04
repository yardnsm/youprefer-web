export default {
  '@global': {
    body: {
      backgroundColor: '#424242',
    },
  },

  default: {
    fontFamily: ['Heebo', 'sans-serif'],
    direction: 'rtl',
    boxSizing: 'border-box',
  },

  main: {
    extend: 'default',
    color: '#F6F6F6',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: 'auto',
  },

  wrapper: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '840px',
    paddingTop: '80px',

    '@media (max-width: 940px)': {
      width: 'auto',
    },
  },
};
