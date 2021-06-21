import React from 'react';
import { HashRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import Home from '../views/Home';
import HomeRoute from './homeRoute';
import CompanyInfoRoute from './companyInfoRoute';

import App from '../views/App.jsx';
export default () => (
    <Router >
        <Switch>
            <Route>
                <Route path='/' component={App}></Route>
                {HomeRoute()}
                {CompanyInfoRoute()}
            </Route>
        </Switch>
    </Router>
)

