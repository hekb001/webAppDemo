import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils'
import { UserAuthWrapper } from 'components/AuthCert';
const Home = () => import('../views/Home');
const Componet = getAsyncComponent(Home, '1', '1');

export default () => (
    <Route
        path='/home'
        component={UserAuthWrapper(Componet, '12')}>
    </Route>
)