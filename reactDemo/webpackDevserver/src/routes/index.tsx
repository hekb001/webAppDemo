import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../views/home';
export default function AppRoutes() {
  return <Router>
    <Switch>
      <Route>
        <Route path='/' component={Home}></Route>
      </Route>
    </Switch>
  </Router>
}