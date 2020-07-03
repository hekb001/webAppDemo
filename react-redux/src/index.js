// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import _ from 'lodash';
// import './index.less';

// if (process.env.NODE_ENV !== 'production') {
//   console.log('Looks like we are in development mode!!!!');
// }
// ReactDOM.render(<App />, document.getElementById('root'));
import _ from 'lodash';

function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    return element;
}

document.body.appendChild(component());