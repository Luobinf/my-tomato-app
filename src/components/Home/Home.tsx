import React from 'react';
import axios from '../../config/axios';
import history from '../../config/history';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './Home.scss';
import Todos from '../Todos/Todos';
import Tomatoes from '../left/Tomatoes/Tomatoes';
import Statistics from '../Statistics/Statistics';
import Footer from '../Footer/Footer';
import Progress from '../Progress/Progress';

interface IRouter {
  history: any
}

interface IndexState {
  user: any,
  tomatoes: any[]
}

class Home extends React.Component<IRouter,IndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      tomatoes: []
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

  handleMenuClick = () => {
    console.log(12);
  };


  getAllTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.setState({
        tomatoes: response.data.resources
      });
    } catch (e) {
      throw new Error('无法获取所有的番茄');
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 60 * 1000 * 3});  //设置闹钟时长
      let tomato = response.data.resource;
      let tomatoes = this.state.tomatoes;
      tomatoes.push(tomato);
      this.setState({
        tomatoes
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  updateTomatoes = async (id: number, info: any) => {
    try {
      const response = await axios.put(`tomatoes/${id}`, {
        ...info
      });
      // console.log('更新之前的番茄',this.state.tomatoes);
      let tomatoes = this.state.tomatoes.map(tomato => {
        if (id === tomato.id) {
          return response.data.resource;
        } else {
          return tomato;
        }
      });
      this.setState({
        tomatoes
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  componentDidMount () {
    this.getAllTomatoes();
  }

  render() {
    // console.log(9999999999999,this.state.tomatoes);
    const menu = (
      <Menu onClick={this.handleMenuClick}>
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
    // @ts-ignore
    return (
      <div className='home'>
        <header>
          <div className='nav'>
            <div className='logo'>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-tomato"/>
              </svg>
              <h2 className='title'>番茄时间</h2>
            </div>
            {dropDown}
          </div>
        </header>
        <main className='home-main'>
          <Tomatoes
            tomatoes={this.state.tomatoes}
            startTomato={this.startTomato}
            updateTomatoes={this.updateTomatoes}
          />
          <Todos />
        </main>
        <Statistics tomatoes={this.state.tomatoes}/>
        <Footer/>
        <Progress/>
      </div>
    );
  }
}

export default Home;
