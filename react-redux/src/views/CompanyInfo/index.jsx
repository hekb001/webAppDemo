import React, { Component } from 'react';
import store from '../../store/configureStore';
import { Button } from 'antd';
import {  browserHistory } from 'react-router';

class CompanyInfo extends Component {
componentDidMount(){
    alert(JSON.stringify(store.getState()))
}
  render() {
    return (
      <div >
       公司详情页
      </div>
    );
  }
}

export default CompanyInfo;