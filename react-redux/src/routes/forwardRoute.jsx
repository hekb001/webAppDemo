import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils'
import { UserAuthWrapper } from 'components/AuthCert';
const CompanyInfo = () => import('../views/Forward');
const Component = getAsyncComponent(CompanyInfo, '1', '5');

export default () => (
    <Route>
        <Route path='/forward' component={UserAuthWrapper(Component, '12')}></Route>
    </Route>
)