import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Login from './components/login';
import Auth from './components/authUser';
import Register from './components/register';
import Logout from './components/logout';
import Myposts from './components/myposts';
import FindFriends from './components/findFriends';

function App() {
  return (
    <Router>
      <div>
        
        <Route path="/" exact component={Login} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/register" exact component={Register} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/myposts" exact component={Myposts} />
        <Route path="/findfriends" exact component={FindFriends} />
      </div>
    </Router>
  );
}

export default App;
