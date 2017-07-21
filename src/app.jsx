import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from './actions/ui';

import AppLayout from './layouts/AppLayout';
import Routes from './routes';

/*
 * Main components. Handle some global stuff etc.
 */

 const mapStateToProps = ({ ui: { isOnline } }) => ({
  isOnline,
});

const mapDispatchToProps = dispatch => ({
  updateOnlineState: () => { dispatch(uiActions.updateOnlineState()); },
});

class App extends React.Component {

  constructor() {
    super();

    this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('online', this.updateConnectionStatus);
    window.addEventListener('offline', this.updateConnectionStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateConnectionStatus);
    window.removeEventListener('offline', this.updateConnectionStatus);
  }

  updateConnectionStatus() {
    this.props.updateOnlineState(navigator.onLine);
    console.log(navigator.onLine)
  }

  render() {
    return (
      <AppLayout>
        <Routes />
      </AppLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
