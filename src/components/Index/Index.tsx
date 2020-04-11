import React from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';

interface IRouter {
  history: any
}

interface IndexState {
  user: any
}

class Index extends React.Component<IRouter> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  async componentWillMount() {
    await this.getMe();
  }
  getMe = async () => {
    try {
      const response = await axios.get('me');
      console.log(response);
      this.setState({
        user: response.data
      })
    }catch (e) {
      console.error('获取用户失败');
    }
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
        <p>欢迎, {this.state.user && this.state.user.account}</p>
        <Button onClick={this.handleLogin}>登录</Button>
      </div>
    );
  }
}

export default Index;
