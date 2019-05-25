import React from 'react';
import logo from './logo.svg';
import TreeDataList from './TreeDataList/TreeDataList'
// import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
        <TreeDataList></TreeDataList>
      </header>
    </div>
  );
}

export default App;
