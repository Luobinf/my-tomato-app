import React from 'react';
import Index from './components/Index/Index';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import './App.scss';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact={true} component={Index}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/signUp" exact={true} component={SignUp}/>
      </Router>
    );
  }
}

export default App;
