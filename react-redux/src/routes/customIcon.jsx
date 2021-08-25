import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils'
import { UserAuthWrapper } from 'components/AuthCert';
const CustomIcon = () => import('../views/CustomIcon');
const Componet = getAsyncComponent(CustomIcon,'1','4');

export default () => (
    <Route
        path='/customIcon'
        component={UserAuthWrapper(Componet,'12')}>
    </Route>
)