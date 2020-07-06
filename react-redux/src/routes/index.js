import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import Home from '../views/Home';
import App from '../views/App.jsx';
export default () => (
    <Route>
        <Route path='/' component={App}></Route>
        <Route path='/home' component={Home}></Route>
    </Route>
)

