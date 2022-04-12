import React from "react";
import { Route } from "react-router-dom";
import { getAsyncComponent } from "utils";

const processes = () => import("views/process");
const ProcessDesign = () => import("views/process/design");

export default (
  <Route>
    <Route path="/processes" component={getAsyncComponent(processes, 'sub01')} />
    <Route
      path="/process-macker/:id?"
      currentOpenKeys='sub01'
      component={getAsyncComponent(ProcessDesign, 'sub01')}
    />
  </Route>
);
