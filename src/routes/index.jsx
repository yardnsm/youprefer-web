import React from 'react';
import { Switch } from 'react-router';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Game from './Game';

const Routes = () =>
  <Router>
    <Switch>
      <Route path='/:questionId' component={Game} />
      <Route path='/' component={Game} />
    </Switch>
  </Router>;

export default Routes;