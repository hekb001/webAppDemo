import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import CompanyInfo from '../views/CompanyInfo';
export default () => (
    <Route>
        <Route path='/companyInfo' component={CompanyInfo}></Route>
    </Route>
)