import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Home extends Component {
  goBack=()=>{
    browserHistory.goBack();
  }
    render() {
      return (
        <div className="App">
          <div>主页</div>
          <div onClick={this.goBack}>返回</div>
        </div>
      );
    }
  }

  export default Home;