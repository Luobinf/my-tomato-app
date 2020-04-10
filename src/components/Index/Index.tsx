import React from 'react';
import {Button} from 'antd';

interface IRouter {
  history: any
}

export default class Index extends React.Component<IRouter> {
  constructor(props: any) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleLogin() {
    this.props.history.push('/login');
  }
  handleSignUp() {
    this.props.history.push('/signUp');
  }
  render() {
    return (
      <div className={'index'}>
        hello index
        <Button onClick={this.handleLogin}>登录</Button>
        <Button onClick={this.handleSignUp}>注册</Button>
      </div>
    );
  }
}
