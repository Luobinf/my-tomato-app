import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import {Link} from 'react-router-dom';
import background from '../../images/background.jpeg';
import axios from '../../config/axios';
import {message} from 'antd';

let classNames = require('classnames');

const Wrapper = styled.div`
   background-image: url(${background});
   background-size: auto;
   position: relative;
   &::after {
   content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.5;
   }
  .login-header {
    padding: 20px;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      color: white;
      font-weight: 700;
      font-size: 14px;
      .icon {
        height: 50px;
        width: 50px;
        fill: white;
        margin-right: 8px;
      }
    }
    .nav-wrapper {
      .navigation .nav-box .navigation-menu {
        > li {
          display: inline-block;
          padding: 0 15px;
          margin-right: 40px;
          cursor: pointer;
          transition: all 0.5s;
          &:hover {
            background: rgba(200,200,200,0.2);
          }
          > .icon {
            width: 1em;
            height: 1em;
            background: white;
            margin-right: 4px;
          }
          > a {
              padding: 10px 0;
              display: inline-block;
              color: white;
              cursor: pointer;
              font-size: 14px;
              font-weight: lighter;                          
            }
          }         
        }
      }
    }
  }
`;

const Main = styled.main`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
  position: relative;
  z-index: 10;
  .card {
   //background-color: #999999;
    padding: 0 20px 20px 20px;
    background: white;
    border-radius: 4px;
    .card-head {
      background: linear-gradient(60deg, rgb(38, 198, 218), rgb(0, 172, 193));
      text-align: center;
      padding: 30px 90px;
      border-radius: 4px;
      box-shadow: 0 3px 5px rgba(0,0,0,0.3);
      margin-top: -50px;
      .card-title {
        font-size: 20px;
        color: white;
        font-weight: 700;
        margin: 0;
        padding-bottom: 30px;
      }
      .social {
        .icon {
          width: 20px;
          height: 20px;
          fill: white;
          margin-right: 20px;
          &:last-child {
          margin-right: 0;
          }
        }
      }
    }
    .project-name {
      text-align: center;
      font-size: 18px;
      color: rgba(0,0,0,0.87);
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      margin: 0;
      padding: 20px 0; 
    }
    .card-content {
      position: relative;
      .card-input {
        display: flex;
        align-items: center;
        margin: 20px 0;
        > span {
           display: inline-block;
           padding: 10px;
           .icon {
             width: 20px;
             height: 20px;
        }
        }       
        .input-wrapper {
          position: relative;
          flex: 1;
          margin-left: 10px;
          &:after {
            content: '';
            position: absolute;
            z-index: 3;
            left: 50%;
            bottom: 0;
            height: 2px;
            background: #9c27b0;
            width: 0;
            transition: all 0.5s;
            //transform: translateX(-50%);
          }
          &.active::after {
           left: 0;
           transform: translateX(0);
           width: 100%;
          }
          > label {
            position: absolute;
            left: 0;
            bottom: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
            z-index: 1;
            &.active {
              top: -20px;
              font-size: 14px;
            }
          }
          > input {
             border: none;
             border-bottom: 1px solid rgba(85,85,85);
             width: 100%;
             padding-bottom: 10px;
             position: relative;
             cursor: auto;
           }
        }
      }
      .submit {
        text-align: center;
        > .btn {
          color: rgba(233,30,99);
          font-size: 18px;
          font-weight: 300;
          border: none;
          background: transparent;
          padding: 10px 40px;
          cursor: pointer;
          position: relative;
          &.isDisabled {
            cursor: not-allowed; 
          }
          > .btn-background {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            &::after {
              content: '';
              position: absolute;
              left: 50%;
              top: 0;
              bottom: 0;
              width: 0;
              border-radius: 4px;
            }
            &.active {
              &::after {
               left: 0;
               width: 100%;
               background: pink;
               opacity: 0.2;
               transition: all 0.5s; 
              }
            }
          }        
        }
      }
    }
  }
`;

interface UserState {
  account: string,
  password: string,
  passwordConfirmation: string,
  isDisabled: boolean
}

class Register extends React.Component<any,UserState>{
  private username: React.RefObject<any>;
  private password: React.RefObject<any>;
  private passwordLabel: React.RefObject<any>;
  private usernameLabel: React.RefObject<any>;
  private btnBack: React.RefObject<any>;
  private confirmPassword: React.RefObject<any>;
  private confirmPasswordLabel: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: '',
      isDisabled: false
    };
    this.username = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
    this.usernameLabel = React.createRef();
    this.passwordLabel = React.createRef();
    this.confirmPasswordLabel = React.createRef();
    this.btnBack = React.createRef();
  }

  handleInputFocus = (e: any,value: string) => {
    if(value === 'username') {
      this.username.current.classList.add('active');
      this.usernameLabel.current.classList.add('active');
    } else if(value === 'password') {
      this.password.current.classList.add('active');
      this.passwordLabel.current.classList.add('active');
    } else if(value === 'confirmPassword') {
      this.confirmPassword.current.classList.add('active');
      this.confirmPasswordLabel.current.classList.add('active');
    }
  };

  handleInputBlur = (e: any,value:string) => {
    if(value === 'username') {
      this.username.current.classList.remove('active');
      if(e.target.value === '') {
        this.usernameLabel.current.classList.remove('active');
      }
    } else if(value === 'password') {
      this.password.current.classList.remove('active');
      if(e.target.value === '') {
        this.passwordLabel.current.classList.remove('active');
      }
    } else if(value === 'confirmPassword') {
      this.confirmPassword.current.classList.remove('active');
      if(e.target.value === '') {
        this.confirmPasswordLabel.current.classList.remove('active');
      }
    }
  };

  btnBackAddListener = () => {
    const element = this.btnBack.current;
    this.setState({
      isDisabled: true
    });
    element.classList.add('active');
    element.addEventListener('transitionend', () => {
      element.classList.remove('active');
    });
  };

  handleUserRegister = async () => {
    const {account, password, passwordConfirmation} = this.state;
    if(account === '' || password === '' || passwordConfirmation === '') {
      message.error('请输入用户名和密码！');
      this.setState({
        isDisabled: false
      });
      return;
    }
    if(password !== passwordConfirmation) {
      message.error('两次输入的密码不一致！');
      this.setState({
        isDisabled: false
      });
      return;
    }
    try {
      let response = await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      });
      // console.log(response);
      this.props.history.push('/user'); //跳转到用户页
    } catch (e) {
      // console.log(e.response);
      // console.log('error',e.response.data.errors.account[0]);  这里会有bug，当网络出现问题时
      const err = e.response.data.errors.account[0];
      if(err === 'has already been taken') {
        message.error('用户名已存在！');
      }
    }
    //按钮置为可用状态
    this.setState({
      isDisabled: false
    });
  };

  handleSubmit = () => {
    this.btnBackAddListener();
    this.handleUserRegister();
  };

  // componentWillUnmount() {
  //   const element = this.btnBack.current;
  //   element.removeEventListener('transitionend',)
  // }

  onChangeAccount = (e: { target: { value: any; }; }) => {
    this.setState({
      account: e.target.value
    });
  };

  onChangePassword = (e: { target: { value: any; }; }) => {
    this.setState({
      password: e.target.value
    });
  };

  onChangeConfirmation = (e: { target: { value: any; }; }) => {
    this.setState({
      passwordConfirmation: e.target.value
    });
  };

  render() {
    const btnClass = classNames({
      isDisabled: this.state.isDisabled,
      btn: true
    });
    return (
      <Wrapper className="login">
        <header className="login-header">
          <div className="navbar">
            <div className="logo">
              <Icon name="tomato" />
              番茄时间
            </div>
            <div className="nav-wrapper">
              <nav className="navigation">
                <div className="nav-box">
                  <ul className="navigation-menu">
                    <li>
                      <Icon name="home"/>
                      <Link to="/">首页</Link>
                    </li>
                    <li>
                      <Icon name="r"/>
                      <Link to="/login">登录</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <Main>
          <div className="card">
            <div className="card-head">
              <h4 className="card-title">Register</h4>
              <div className="social">
                <Icon name="google"/>
                <Icon name="twitter"/>
                <Icon name="facebook"/>
              </div>
            </div>
            <p className="project-name">TomatoTime</p>
            <div className="card-content">
              <div className="card-input">
                <span>
                  <Icon name="username"/>
                </span>
                <div className="input-wrapper" ref={this.username}>
                  <label className="username-label" ref={this.usernameLabel}>Username</label>
                  <input
                    type="text"
                    onFocus={(e) => this.handleInputFocus(e,'username')}
                    onBlur={(e) => this.handleInputBlur(e,'username')}
                    onChange={this.onChangeAccount}
                  />
                </div>
              </div>
              <div className="card-input">
                 <span>
                  <Icon name="password"/>
                </span>
                <div className="input-wrapper" ref={this.password}>
                  <label className="password-label" ref={this.passwordLabel}>Password</label>
                  <input
                    type="password"
                    onFocus={(e) => this.handleInputFocus(e,'password')}
                    onBlur={(e) => this.handleInputBlur(e,'password')}
                    onChange={this.onChangePassword}
                  />
                </div>
              </div>
              <div className="card-input">
                 <span>
                  <Icon name="confirm_password"/>
                </span>
                <div className="input-wrapper" ref={this.confirmPassword}>
                  <label className="password-label" ref={this.confirmPasswordLabel}>Confirm Password</label>
                  <input
                    type="password"
                    onFocus={(e) => this.handleInputFocus(e,'confirmPassword')}
                    onBlur={(e) => this.handleInputBlur(e,'confirmPassword')}
                    onChange={this.onChangeConfirmation}
                  />
                </div>
              </div>
              <div className="submit">
                <button className={btnClass} onClick={this.handleSubmit} disabled={this.state.isDisabled}>
                  Register
                  <div className="btn-background" ref={this.btnBack} />
                </button>
              </div>
            </div>
          </div>
        </Main>
      </Wrapper>
    );
  }
}

export default Register;
