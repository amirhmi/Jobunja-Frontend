import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-with-rtl/dist/css/bootstrap.rtl.css';
import 'src/views/layout/layout.scss'
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from 'src/views/home/home';
import Project from 'src/views/project/project';

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Home} />
    {/* <Route path="/Project" component={Project} /> */}
    {/* <Route path="/profile" component={User} /> */}
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
