import React from 'react';
import axios from '../../config/axios';
import {Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import './SignUp.scss';

interface UserSignUpInfo {
  account: string,
  password: string,
  passwordConfirmation: string
}

//第一个参数用于声明props的类型的，第二个参数用来声明state的
class SignUp extends React.Component<any, UserSignUpInfo> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: ''
    };
    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmation = this.onChangeConfirmation.bind(this);
  }

  onChangeAccount(e: { target: { value: any; }; }) {
    this.setState({
      account: e.target.value
    });
  }

  onChangePassword(e: { target: { value: any; }; }) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeConfirmation(e: { target: { value: any; }; }) {
    this.setState({
      passwordConfirmation: e.target.value
    });
  }

  submit = async () => {
    const {account, password, passwordConfirmation} = this.state;
    try {
      //发送用户账户名密码等信息给服务器，ajax请求无刷新
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      });
      console.log('成功');
      this.props.history.push('/'); //跳转到首页
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const {account, password, passwordConfirmation} = this.state;
    return (
      <div className="signUpWrapper">
        <div className="signUp">
          <h2>番茄工作法</h2>
          <Input
            placeholder="请输入用户名"
            prefix={<UserOutlined className="site-form-item-icon"/>}
            value={account}
            onChange={this.onChangeAccount}
          />
          <Input.Password placeholder='请输入密码' value={password} onChange={this.onChangePassword}/>
          <Input.Password placeholder='请确认密码' value={passwordConfirmation} onChange={this.onChangeConfirmation}/>
          <Button onClick={this.submit} className='signUpBtn' type='primary'>注册</Button>
          <p>
            如果你有账号,请立即<Link to='/login'>登陆</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;
