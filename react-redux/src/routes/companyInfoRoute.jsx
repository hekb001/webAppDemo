import React from 'react';
import { Route } from 'react-router-dom'
const CompanyInfo = () => import('../views/CompanyInfo');

export default () => (
    <Route>
        <Route path='/companyInfo' component={CompanyInfo}></Route>
    </Route>
)