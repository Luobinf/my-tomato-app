import React from 'react';
import axios from '../../config/axios';
import {Menu, Dropdown, Tooltip, Modal, InputNumber, message} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import './User.scss';
import Todos from '../Todos/Todos';
import Tomatoes from '../left/Tomatoes/Tomatoes';
import Statistics from '../Statistics/Statistics';
import Footer from '../Footer/Footer';
import Progress from '../Progress/Progress';
//@ts-ignore
import {connect} from 'react-redux';
import {initTodos, updateTodos, editTodo} from '../../redux/actions/todos';
import { DurationContext } from './duration-context';
import Icon from '../Icon/Icon';

interface IndexProps {
  history: any,
  initTodos: (params: any[]) => void,
  todos: any[]
}

interface IndexState {
  user: any,
  tomatoes: any[],
  modalVisible: boolean,
  tomatoDuration: number,
}


class User extends React.Component<IndexProps, IndexState> {
  private refresh: React.RefObject<any>;
  private desc: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      tomatoes: [],
      modalVisible: false,
      tomatoDuration: 25 * 60 * 1000,
    };
    this.loginOut = this.loginOut.bind(this);
    this.refresh = React.createRef();
    this.desc = React.createRef();
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

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((todo: any) => {
        return Object.assign({}, todo, {editing: false});
      });
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: this.state.tomatoDuration});  //设置番茄时长
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

  handleSettings = () => {
    this.setState({
      modalVisible: true
    });
  };

  handleOk = () => {
    // console.log(55555555);
    this.setState({
      modalVisible: false
    });
    message.success('设置成功！！！');
  };

  handleCancel = () => {
    // console.log(11);
    this.setState({
      modalVisible: false
    });
  };

  handleTomatoDuration = (value: any) => {
    // console.log(value);
    if(typeof value === 'number' && value >= 1 && value <= 60) {
      this.setState({
        tomatoDuration: value * 60 * 1000
      });
    } else {
      message.error('您的输入有误！！！');
    }
  };

  componentDidMount() {
    let p1 = this.getAllTomatoes();
    let p2 = this.getTodos();
    //等到获取到所有的番茄和任务数据之后，再改变刷新icon状态
    Promise.all([p1, p2]).then(() => {
      this.refresh.current.classList.remove('active');
      this.desc.current.classList.toggle('active');
    }).catch((e) => {
      throw new Error(e);
    });
  }

  render() {
    // console.log(9999999999999,this.state.tomatoes);
    // console.log(9999999999999,this.props.todos);
    const { modalVisible } = this.state;
    const modalDOM = (
      <Modal
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered={true}
        className="modal"
      >
        <div className="duration-wrapper">
          <div className="duration">
            <span className="title">设置番茄时长: </span>
            <InputNumber min={1} max={60} defaultValue={25} onChange={this.handleTomatoDuration} />
          </div>
          <span className="number">请输入10 — 60之间的数字</span>
        </div>
      </Modal>
    );
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.handleSettings}>
          <UserOutlined />
          偏好设置
        </Menu.Item>
        {modalDOM}
        <Menu.Item key="2" onClick={this.loginOut}>
          <UserOutlined/>
          注销
        </Menu.Item>
      </Menu>
    );
    const dropDown = (
      <div className='user'>
        <span className="desc" ref={this.desc}>正在同步数据</span>
        <Tooltip placement="topLeft" title='同步数据'>
          <span  className="icon refresh active" ref={this.refresh}>
            <Icon name="refresh"/>
          </span>
        </Tooltip>
        <Dropdown overlay={menu}>
          <span>
            {this.state.user && this.state.user.account}<DownOutlined style={{marginLeft: '8px'}}/>
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
              <Icon name="user_tomato" />
              <h2 className='title'>番茄时间</h2>
            </div>
            {dropDown}
          </div>
        </header>
        <main className='home-main'>
          <DurationContext.Provider value={{duration: this.state.tomatoDuration}}>
            <Tomatoes
              tomatoes={this.state.tomatoes}
              startTomato={this.startTomato}
              updateTomatoes={this.updateTomatoes}
            />
          </DurationContext.Provider>
          <Todos/>
        </main>
        <Statistics tomatoes={this.state.tomatoes}/>
        <Footer/>
        <Progress/>
      </div>
    );
  }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => {
  // state表示store的reducer函数的state，ownProps表示外界传递给<Todos />组件的props。
  // console.log(101010);   //疑惑：这边得到的state为什么是一个对象，且对象里面有todos键,看index.ts文件就能明白是为什么了。
  // console.log(state);
  // console.log(101010);
  return {
    todos: state.todos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  initTodos,
  updateTodos,
  editTodo
};


export default connect(mapStateToProps, mapDispatchToProps)(User);
