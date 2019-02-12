import React from 'react';
import {render} from 'react-dom';
// below lines are unnecessary as Router component does the job indirectly
// import StorePicker from './components/StorePicker';
// import App from './components/App';
import Router from './components/Router';
import './css/style.css';

render(<Router />, document.getElementById('main'));