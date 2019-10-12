import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from './actions/ui';
import { attachConnectionListener, dettachConnectionListeners } from './utils/connection';
import { register as registerServiceWorker } from './registerServiceWorker';

import {
  connectedToServer,
  disconnectedFromServer,
  readyForOfflineSnackbar,
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
  constructor(props) {
    super(props);

    this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
    this.onServiceWorkerInstall = this.onServiceWorkerInstall.bind(this);
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

    // Register service worker
    registerServiceWorker({
      onInstall: this.onServiceWorkerInstall,
    });
  }

  componentWillUnmount() {
    dettachConnectionListeners();
  }

  onServiceWorkerInstall() {
    const { createSnackbar } = this.props;

    createSnackbar({
      message: readyForOfflineSnackbar,
      duration: 5000,
    });
  }

  updateConnectionStatus(status) {
    const { createSnackbar } = this.props;

    if (this.snackbarTimeout) {
      clearTimeout(this.snackbarTimeout);
    }

    this.snackbarTimeout = setTimeout(() => {
      createSnackbar({
        message: status ? connectedToServer : disconnectedFromServer,
        duration: 2000,
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
