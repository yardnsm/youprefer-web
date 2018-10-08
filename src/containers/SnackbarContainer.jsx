import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '../components/Snackbar';
import LocalPropTypes from '../prop-types';

const mapStateToProps = ({ ui: { snackbars } }) => ({
  snackbars,
});

const SnackbarContainer = ({ snackbars }) => (
  <div>
    {snackbars.reverse().map(({ id, message, action }) => (
      <Snackbar
        key={id}
        message={message}
        action={action}
      />
    ))}
  </div>
);

SnackbarContainer.propTypes = {
  snackbars: PropTypes.arrayOf(LocalPropTypes.snackbar),
};

SnackbarContainer.defaultProps = {
  snackbars: [],
};

export default connect(mapStateToProps)(SnackbarContainer);
