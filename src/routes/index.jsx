import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Game from './Game';
import NotFound from './NotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/not-found" component={NotFound} />
      <Route path="/:questionId" component={Game} />
      <Route path="/" component={Game} />
    </Switch>
  </Router>
);

export default Routes;
