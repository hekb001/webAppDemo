import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils'
import { UserAuthWrapper } from 'components/AuthCert';
const CompanyInfo = () => import('../views/CompanyInfo');
const Component = getAsyncComponent(CompanyInfo);

export default () => (
    <Route>
        <Route path='/companyInfo' component={UserAuthWrapper(Component, '15')}></Route>
    </Route>
)