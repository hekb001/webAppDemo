import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import App from "views/app";
import NotFound from "views/NotFound";
import { getAsyncComponent } from "utils";
// const Error = () => import(/* webpackChunkName: 'error' */ "views/Error");
// const Page = () => import(/* webpackChunkName: 'page' */ "views/Page");
import processDesignRoutes from './processDesignRoutes';
import formDesignRoutes from './formDesignRoutes';
const LoginView = () => import('views/login');

export default ({ history }) => (
  <Router>
    <Switch>
      <Redirect exact from="/" to={"/login"} />
      {/* <Route path="/error" component={getAsyncComponent(Error)} /> */}
      <Route path="/login" exact  component={getAsyncComponent(LoginView)} />
      <Route>
        <App history={history}>
            {processDesignRoutes}
            {formDesignRoutes}
          </App>
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
