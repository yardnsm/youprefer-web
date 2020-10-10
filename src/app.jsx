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
  questionsSynced,
} from './config/strings';

import Database from './utils/database';

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

  async syncDatabase() {
    const { createSnackbar } = this.props;
    const newlyQuestions = await Database.syncQuestions();

    if (newlyQuestions > 0) {
      createSnackbar({
        message: newlyQuestions + questionsSynced,
        duration: 2000,
      });
    }
  }

  async syncTransactions() {
    const { createSnackbar } = this.props;
    const pushedTransactions = await Database.syncTransactions();

    if (process.env.NODE_ENV !== 'production') {
      createSnackbar({
        message: `${pushedTransactions} were synced.`,
        duration: 5000,
      });
    }
  }

  updateConnectionStatus(status) {
    const { createSnackbar } = this.props;

    if (this.snackbarTimeout) {
      clearTimeout(this.snackbarTimeout);
    }

    // If connected, sync remote databse and offline transactions
    if (status) {
      this.syncDatabase();
      this.syncTransactions();
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
