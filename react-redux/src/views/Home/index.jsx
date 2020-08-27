import React, { Component } from 'react';
import {Button} from 'antd';
import { Link, browserHistory } from 'react-router';

class Home extends Component {
  goBack=()=>{
    browserHistory.goBack();
  }
    render() {
      return (
        <div className="App">
          <div>主页</div>
          <Button onClick={this.goBack} type='primary'>返回</Button>
        </div>
      );
    }
  }

  export default Home;