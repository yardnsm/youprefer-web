import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '../components/Snackbar';

const mapStateToProps = ({ ui: { snackbars } }) => ({
  snackbars,
});

const SnackbarContainer = ({ snackbars }) =>
  (<div>
    {snackbars.map(({ id, message, action }) =>
      (<Snackbar
        key={id}
        message={message}
        action={action}
      />),
    )}
  </div>);

SnackbarContainer.propTypes = {
  snackbars: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(SnackbarContainer);
