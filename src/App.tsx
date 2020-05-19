import React from 'react';
import './App.scss';
import User from './components/User/User';
import Login from './components/Login/Login';
import Register from './components/register/Register';
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
        <Route path="/register" exact={true} component={Register}/>
        <Route path="/user" exact={true} component={User}/>
      </Router>
    );
  }
}

export default App;
