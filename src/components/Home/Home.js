import React from "react";
import styled, {keyframes} from "styled-components";
import { Link } from "react-router-dom";
import Icon from '../Icon/Icon';

const rotato = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(3);
  }
  100% {
    transform: scale(5);
  }
`;


const HomeWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //background: black;  这个背景可加可不加，我觉得还是不加比较好看
  &::after {
    content: '';
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #4096ee 0%,#39ced6 100%);
    opacity: 0.75;
}
`;

const Header = styled.header`
  padding: 20px;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;
  .navbar {
    //border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      height: 50px;
      width: 50px;
      fill: white;
    }
    .nav-wrapper {
      .navigation .nav-box .navigation-menu {
        > li {
          display: inline-block;
          padding: 0 15px;
          > a {
            padding: 10px 0;
            display: inline-block;
            color: white;
            font-size: 16px;
            cursor: pointer;
            position: relative;          
            &::after {
              height: 2px;
              content: '';
              background-color: white;
              position: absolute;
              left: 0;
              bottom: 0;
              //transition: all 0.5s;
            }
            &:hover {
              &::after {
                width: 100%;
               }
            }
          }
        }
      }
    }
  }
`

const Main = styled.main`
  position: relative;
  left: 0;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  .title {
    text-align: center;
    > h3 {
      font-size: 26px;
      color: white;
      font-weight: lighter;
    }
    > h1 {
      font-size: 50px;
      color: white;
      font-weight: 500;
    }
  }
  .btn-wrapper {
    padding-top: 60px;
    > button {
      width: 130px;
      border: 1px solid white;
      background: none;
      padding: 15px 30px;
      color: white;
      font-size: 16px;
      position: relative;
      overflow: hidden;
      &:focus {
        outline: none;
      }
      &:last-child {
        margin-left: 20px;
      }
      &::after {
        animation: ${rotato} .3s linear forwards;
      }
      &:hover {
        color: black;
        &::after {
          position: absolute;
          content: '';
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #61dafb;
          top: 50%;
          left: 50%;
          margin-left: -20px;
          margin-top: -20px;
          z-index: -1;
        }
      }
    }
  }
`;

class Home  extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSwitchRouter = (address) => {
    this.props.history.push(address);
  }

  render() {
    return (
      <HomeWrapper className="home-wrapper">
        <Header>
          <div className="navbar">
            <Icon name="tomato" />
            <div className="nav-wrapper">
              <nav className="navigation">
                <div className="nav-box">
                  <ul className="navigation-menu">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </Header>
        <Main>
          <div className="title">
            <h3>
              HELLO, WELCOME TO
            </h3>
            <h1>
              TOMATO TIME
            </h1>
          </div>
          <div className="btn-wrapper">
            <button onClick={() => this.handleSwitchRouter('login')}>Login</button>
            <button onClick={() => this.handleSwitchRouter('register')}>Register</button>
          </div>
        </Main>
      </HomeWrapper>
    );
  }
}

export default Home;
