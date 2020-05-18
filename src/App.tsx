import React from 'react';
import './App.scss';
import User from './components/User/User';
import Login from './components/Log/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
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
        <Route path="/register" exact={true} component={SignUp}/>
        <Route path="/user" exact={true} component={User}/>
      </Router>
    );
  }
}

export default App;
