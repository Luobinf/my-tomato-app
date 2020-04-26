import React from 'react';
import './TomatoesAction.scss';
import {Button, Input} from 'antd';
import axios from '../../config/axios';
// import CountDownHook from './CountDownHook';
import CountDown from './CountDown'
import {CloseCircleOutlined} from '@ant-design/icons';


interface TomatoesButtonProps {
  startTomato: () => void,
  updateTomato: (payload: any) => any,
  unfinishedTomato: any
}

interface TomatoesButtonState {
  description: string
}


class TomatoesAction extends React.Component<TomatoesButtonProps,TomatoesButtonState> {
  constructor(props: Readonly<TomatoesButtonProps>) {
    super(props);
    this.state = {
      description: ''
    };
  }

  handleChange = (e: { target: { value: any; }; }) => {
    this.setState({
      description: e.target.value
    })
  };

  handlePressEnter = () => {
    this.addDescription()
  };

  onFinish = () => {
    console.log('倒计时已经完成了');
    this.forceUpdate();
  };

  addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,{
        description: this.state.description,
        ended_at: new Date()
      });
      this.setState({
        description: ''
      });
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const { startTomato, unfinishedTomato } = this.props;
    let html = <div/>;
    if(unfinishedTomato == undefined) {
      html = <Button className='start-tomato-btn' onClick={startTomato} >开始番茄</Button>
    } else {
      const startedAt = Date.parse(unfinishedTomato.started_at);
      const duration = unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if(timeNow - startedAt > duration) {
        html = (
          <div>
            <Input
              placeholder='请输入刚刚完成的任务'
              value={this.state.description}
              onChange={this.handleChange}
              onPressEnter={this.handlePressEnter}
            />
            <CloseCircleOutlined />
          </div>
        );
      } else if(timeNow - startedAt < duration ){
        const timer = duration - (timeNow - startedAt);
        html = <CountDown timer={timer} onFinish={this.onFinish} />  //倒计时
      }
    }
    return (
      <div className='start-tomato-btn-wrapper'>
        {html}
      </div>
    );
  }
}

export default TomatoesAction;
