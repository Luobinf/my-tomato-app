import React from 'react';
import  Index from './components/Index/Index'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class App extends React.Component{
  render() {
    return (
      <Router>
        <Route path="/" exact={true} component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/signUp" component={SignUp}/>
      </Router>
    )
  }
}

export default App
