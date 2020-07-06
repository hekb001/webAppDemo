import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import allRoutes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';

ReactDOM.render(
    <Router history={browserHistory}>
        {allRoutes()}</Router>,
    document.getElementById('root')
);