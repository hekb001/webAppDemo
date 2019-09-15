import React from 'react';
import App from '../App';
import TreeDataList from '../Component/TreeDataList/TreeDataList';
import DataPicker from '../Component/DataPicker/DataPicker';
import CasCaders from '../Component/CasCaders/CasCaders';
import Forms from '../Component/Forms/Forms';
import TableList from '../Component/TableList/TableList';
import Drawer from '../Component/Drawers';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

 const routers = <Router >
        <div>
            <Route exact path="/" component={App} />
            <Route path="/treeSelect" component={TreeDataList} />
            <Route path="/datapicker" component={DataPicker} />
            <Route path="/cascaders" component={CasCaders} />
            <Route path="/forms" component={Forms} />
            <Route path="/table" component={TableList} />
            <Route path="/drawer" component={Drawer} />
        </div>
 </Router>
export default routers;
