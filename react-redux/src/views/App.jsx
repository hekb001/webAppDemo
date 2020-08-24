import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class App extends Component {
  goHome=()=>{
    browserHistory.push('/home')
  }
    render() {
      return (
        <div className="App">
          <div onClick={this.goHome}>跳转到主页</div>
        </div>
      );
    }
  }

  export default App;