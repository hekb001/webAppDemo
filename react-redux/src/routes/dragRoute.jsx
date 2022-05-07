import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils'
import { UserAuthWrapper } from 'components/AuthCert';
const Drag = () => import('../views/Drag');
const Componet = getAsyncComponent(Drag,'1','6');

export default () => (
    <Route
        path='/useDrag'
        component={UserAuthWrapper(Componet,'12')}>
    </Route>
)