import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils'
const CompanyInfo = () => import('../views/CompanyInfo');

export default () => (
    <Route>
        <Route path='/companyInfo' component={getAsyncComponent(CompanyInfo)}></Route>
    </Route>
)