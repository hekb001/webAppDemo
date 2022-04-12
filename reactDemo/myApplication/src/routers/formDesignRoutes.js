import React from 'react'
import { Route } from 'react-router-dom'
import { getAsyncComponent } from "utils";
const FormDesignList = () => import('views/formDesign');
const FormDesign = () => import('views/formDesign/design');
export default (
  <Route>
    <Route path="/form-list" component={getAsyncComponent(FormDesignList, 'sub02')} />
    <Route path="/form-design/:id?" component={getAsyncComponent(FormDesign, 'sub02')} />
  </Route>
)