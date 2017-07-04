export default {
  optionCard: {
    padding: '15px 50px',
    margin: '20px',
    width: '50%',
    height: '200px',
    boxSizing: 'border-box',
    borderRadius: '2px',
    overflow: 'hidden',
    transform: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    position: 'relative',
    backgroundImage: 'url("assets/img/lighting_overlay.png")',
    backgroundSize: '100% 100%',
    boxShadow: `0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 1px 5px 0px rgba(0, 0, 0, 0.12)`,

    // Small devices, need to set properly
    // for row aligning
    '@media (max-width: 768px)': {
      margin: '10px !important',
      width: '80%',

      '&::after': {
        top: '100% !important',
        left: '50% !important',
        transform: 'translate(-50%, -38%) !important',
      },

      '&.second::after': {
        top: '0 !important',
        right: '50% !important',
        transform: 'translate(50%, -62%) !important',
      },
    },

    '@media (max-width: 480px)': {
      width: '90%',
    },

    // Hover effect
    '&::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: '""',
      background: 'rgba(0, 0, 0, 0.25)',
      opacity: 0,
      zIndex: 1,
      willChange: 'opacity',
      transition: 'opacity cubic-bezier(0, 0, .2, 1) 700ms',
    },

    '&:hover::before': {
      opacity: 0.6,
    },

    '&:active::before': {
      opacity: 1,
    },

    // When selected
    '&.selected::before': {
      opacity: 1,
      backgroundImage: 'url("assets/img/check_sign.png")',
      backgroundPosition: '10px 10px',
      backgroundSize: '40px',
      backgroundRepeat: 'no-repeat',
    },

    // The 'sliced' shape
    // TODO: convert to SVG for better performance
    '&::after': {
      position: 'absolute',
      top: '50%',
      left: 0,
      content: '""',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#424242',
      transform: 'translate(-62%, -50%)',
      zIndex: 2,
      boxShadow: `inset 0px 0px 18px 3px rgba(0, 0, 0, 0.25),
                  0px 1px 0px 1px rgba(255, 255, 255, 0.15),
                  0px 0px 0px 1px rgba(255, 255, 255, 0.1)`,
    },

    // Colors
    '&.first': {
      backgroundColor: '#2196f3',
      marginLeft: '10px',
    },

    '&.second': {
      backgroundColor: '#f44336',
      marginRight: '10px',

      // '.second' is at right, so we need to
      // align the 'sliced shape' properly
      '&::after': {
        right: 0,
        transform: 'translate(62%, -50%)',
      },
    },
  },

  optionCardInner: {
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 3,
  },

  // ----------------

  backPercentage: {
    fontSize: '3em',
    color: 'rgba(255, 255, 255, 0.85)',
    textShadow: '0px 3px 40px rgba(0, 0, 0, 0.55)',
    marginBottom: '8px',
  },

  backVotes: {
    fontWeight: 300,
    letterSpacing: 1.5,
    fontSize: '0.75em',
    marginBottom: '18px',
  },

  backValue: {
    letterSpacing: 1.5,
  },
};
