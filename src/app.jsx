import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from './actions/ui';
import { attachConnectionListener, dettachConnectionListeners } from './utils/connection';

import {
  connectedToServer,
  disconnectedFromServer,
} from './config/strings';

import AppLayout from './layouts/AppLayout';
import Routes from './routes';

/*
 * Main component. Handle some global stuff etc.
 */

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  createSnackbar: (options) => { dispatch(uiActions.createSnackbar(options)); },
});

class App extends React.Component {

  constructor() {
    super();

    this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
  }

  componentDidMount() {
    attachConnectionListener(this.updateConnectionStatus);

    // Remove progress indicator
    const progressIndicatorElem = document.getElementById('youprefer-progress-indicator');
    if (progressIndicatorElem) {
      setTimeout(() => {
        progressIndicatorElem.classList.add('available');

        setTimeout(() => {
          progressIndicatorElem.outerHTML = '';
        }, 1500);
      }, 1000);
    }
  }

  componentWillUnmount() {
    dettachConnectionListeners();
  }
  updateConnectionStatus(status) {
    if (this.snackbarTimeout) {
      clearTimeout(this.snackbarTimeout);
    }

    this.snackbarTimeout = setTimeout(() => {
      this.props.createSnackbar({
        message: status ? connectedToServer : disconnectedFromServer,
        duration: 5000,
      });
    }, 2000);
  }

  render() {
    return (
      <AppLayout>
        <Routes />
      </AppLayout>
    );
  }
}

App.propTypes = {
  createSnackbar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
