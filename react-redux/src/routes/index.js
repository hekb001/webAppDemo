import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import Home from '../views/Home';
import HomeRoute from './homeRoute';
import CompanyInfoRoute from './companyInfoRoute';
import progressBarRoute from './progressBar';
import CustomIconRoute from './customIcon';
import ForwardRoute from './forwardRoute';
import DragRoute from './dragRoute';

import App from '../views/App';
const Error = () => (
    <div>出错了</div>
)
export default () => (
    <Router >
        <Switch>
            <Redirect exact from="/" to={"/home"} />
            <Route path='/error' component={Error}></Route>
            {HomeRoute()}
            <Route>
                <App>
                    {CompanyInfoRoute()}
                    {progressBarRoute()}
                    {CustomIconRoute()}
                    {ForwardRoute()}
                    {DragRoute()}
                </App>
            </Route>
        </Switch>
    </Router>
)

