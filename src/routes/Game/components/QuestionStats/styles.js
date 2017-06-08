export default {
  questionStatsCard: {
    padding: '25px 40px',
    margin: '20px',
    height: 'auto',
    boxSizing: 'border-box',
    borderRadius: '2px',
    overflow: 'hidden',
    fontSize: '18px',
    color: '#000000',
    backgroundColor: '#eeeeee',
    boxShadow: `0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 1px 5px 0px rgba(0, 0, 0, 0.12)`
  },

  stat: {
    outline: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    '& i.material-icons': {
      width: '24px',
      height: '24px',
      marginLeft: '7px',
      marginRight: 0,
      color: 'rgba(0, 0, 0, 0.55)',
    }
  }
};