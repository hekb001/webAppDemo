import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils'
const Home = () => import('../views/Home');

export default () => (
    <Route>
        <Route path='/home' component={getAsyncComponent(Home)}></Route>
    </Route>
)