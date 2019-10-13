import PropTypes from 'prop-types';

// react-router shit
export default {
  history: PropTypes.shape({
    listen: PropTypes.func,
    push: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
