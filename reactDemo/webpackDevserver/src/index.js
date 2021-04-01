import React from 'react'; 
import ReactDOM from 'react-dom';
import allRoutes from './routes';
import { browserHistory, Router} from 'react-router';
ReactDOM.render(
    <Router history={browserHistory}>
        {allRoutes()}
    </Router>,
    document.getElementById('root')
);