import React from 'react';
import axios from '../../config/axios';
import {Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import './Login.scss';

interface UserLoginInfo {
  account: string,
  password: string
}

//第一个参数用于声明props，第二个参数用来声明state的
class Login extends React.Component<any, UserLoginInfo> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }

  onChange = (key: keyof UserLoginInfo, value: string) => {
    const newState = {};
    // @ts-ignore
    newState[key] = value;
    this.setState(newState);
  };
  submit = async () => {
    const {account, password} = this.state;
    try {
      await axios.post('/sign_in/user', {
        account,
        password
      });
      console.log('成功');
      this.props.history.push('/index');  //跳转到首页
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const {account, password} = this.state;
    return (
      <div className="loginWrapper">
        <div className="login">
          <h2>番茄工作法</h2>
          <Input
            placeholder="请输入用户名"
            prefix={<UserOutlined className="site-form-item-icon"/>}
            value={account}
            onChange={(e) => this.onChange('account', e.target.value)}
          />
          <Input.Password placeholder='请输入密码' value={password}
                          onChange={(e) => this.onChange('password', e.target.value)}/>
          <Button onClick={this.submit} className='loginBtn' type='primary'>登录</Button>
          <p>
            如果你还没有账号,请立即<Link to='/signUp'>注册</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
