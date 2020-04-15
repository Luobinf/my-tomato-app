import React from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';
import history from '../../config/history';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './Home.scss';
import Todos from '../Todos/Todos';
import '../Todos/Todos.scss';

interface IRouter {
  history: any
}

interface IndexState {
  user: any
}

class Home extends React.Component<IRouter,IndexState> {
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
    function handleMenuClick() {
      console.log(121212);
    }
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
          <UserOutlined />
          账号
        </Menu.Item>
        <Menu.Item key="2">
          <UserOutlined />
          偏好设置
        </Menu.Item>
        <Menu.Item key="3" onClick={this.loginOut}>
          <UserOutlined />
          注销
        </Menu.Item>
      </Menu>
    );
    const dropDown = (
      <div className='user'>
        <Dropdown overlay={menu}>
          <span>
            {this.state.user && this.state.user.account}<DownOutlined style={{marginLeft: '8px'}} />
          </span>
        </Dropdown>
      </div>
    );
    return (
      <div className='home'>
        <header>
          <div className='nav'>
            <div className='logo'>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-tomato"></use>
              </svg>
              <h2 className='title'>番茄时间</h2>
            </div>
            {dropDown}
          </div>
        </header>
        <main style={{marginTop: '10px'}}>
          <Todos/>
        </main>
      </div>
    );
  }
}

export default Home;
