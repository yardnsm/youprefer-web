export default {
  toolbar: {
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#212121',
    color: '#ffffff',
    boxSizing: 'border-box',
    zIndex: 5,
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                0px 4px 5px 0px rgba(0, 0, 0, 0.14),
                0px 1px 10px 0px rgba(0, 0, 0, 0.12)`
  },

  toolbarRow: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '64px',
    padding: '20px 28px',
    paddingLeft: '16px',
    boxSizing: 'border-box'
  },

  toolbarRowInner: {
    display: 'inline-flex',
    flex: 1,
    alignItems: 'flex-start',
    minWidth: 0,
    zIndex: 1,
    justifyContent: 'flex-start',
    order: -1,
  },

  toolbarRowSeperator: {
    marginRight: 'auto'
  }
};