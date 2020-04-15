import React from 'react';
import './App.scss';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/signUp" exact={true} component={SignUp}/>
      </Router>
    );
  }
}

export default App;
