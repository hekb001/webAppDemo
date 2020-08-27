import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import Home from '../views/Home';
export default () => (
    <Route>
        <Route path='/home' component={Home}></Route>
    </Route>
)