import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { Repository } from '../pages/Repository';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/repositories/:repository+" exact component={Repository} />
  </Switch>
);
