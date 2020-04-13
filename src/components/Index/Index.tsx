import React from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';

interface IRouter {
  history: any
}

interface IndexState {
  user: any
}

class Index extends React.Component<IRouter,IndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
    this.loginOut = this.loginOut.bind(this);
  }

  async componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
    //获取当前用户信息
    const response = await axios.get('me');
    this.setState({
      user: response.data
    });
  };

  loginOut() {
    //注销
    localStorage.setItem('x-token', '');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className={'index'}>
        <header>
          <p>欢迎, {this.state.user && this.state.user.account}</p>
          <Button onClick={this.loginOut}>注销</Button>
        </header>
      </div>
    );
  }
}

export default Index;
