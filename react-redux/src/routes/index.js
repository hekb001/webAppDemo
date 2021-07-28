import React from 'react';
import { HashRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import Home from '../views/Home';
import HomeRoute from './homeRoute';
import CompanyInfoRoute from './companyInfoRoute';

import App from '../views/App';
const Error=()=>(
    <div>出错了</div>
)
export default () => (
    <Router >
        <Switch>
            <Redirect exact from="/" to={"/home"} />
            <Route path='/error' component={Error}></Route>
            <Route>
                <App>
                    {HomeRoute()}
                    {CompanyInfoRoute()}
                </App>
            </Route>
        </Switch>
    </Router>
)

