import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-with-rtl/dist/css/bootstrap.rtl.css';
import 'react-notifications/lib/notifications.css';
import 'src/views/layout/layout.scss'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'src/views/home/home';
import Project from 'src/views/project/project';
import User from 'src/views/user/user'
import Signup from './views/signup/signup';
import Login from './views/login/login';

ReactDOM.render(
  <Router>
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/project/:id" component={Project} />
    <Route exact path="/user/:id" component={User} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
