import React from 'react';
import {  BrowserRouter as Router,Redirect,  Switch,Route } from 'react-router-dom'
import Home from '../views/Home';
export default () => (

<Router>
<Switch>
  <Route>
    <Home>
        <Route path='/' component={Home}></Route>
    </Home>
  </Route>
</Switch>
</Router>
)