import React from 'react';
import CountDown from './CountDown';
import {Input, Button, Tooltip, Modal} from 'antd';
import {CloseCircleOutlined, EnterOutlined} from '@ant-design/icons/lib';
import './ContentInput.scss';

interface ContentInputProps {
  unfinishedTomatoes: any,
  startTomato: () => void,
  updateTomatoes: (param1: number, param2: any) => Promise<boolean> | undefined
}

interface ContentInputState {
  description: string,
  modalVisible: boolean
}

class ContentInput extends React.Component<ContentInputProps, ContentInputState> {
  constructor(props: Readonly<ContentInputProps>) {
    super(props);
    this.state = {
      description: '',
      modalVisible: false
    };
  }

  handleChange = (event: { target: { value: any; }; }) => {
    this.setState({
      description: event.target.value
    });
  };

  handlePressEnter = (event: any) => {
    //倒计时完成后发送请求，增加一个tomato
    let description = event.target.value;
    const id = this.props.unfinishedTomatoes.id;
    this.props.updateTomatoes(id, {
      description,
      ended_at: new Date()
    });
    this.setState({
      description: ''
    });
  };

  startTomato = () => {
    this.props.startTomato();
  };

  onFinish = () => {
    this.forceUpdate();
  };

  handleAbortedTomato = () => {
    const id = this.props.unfinishedTomatoes.id;
    let response = this.props.updateTomatoes(id, {
      aborted: true
    });
    return response;
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  handleOk = () => {
    let val = this.handleAbortedTomato();
    if (val) {
      this.setState({
        modalVisible: false
      });
    } else {
      throw new Error('放弃番茄出错');
    }
  };

  handleCloseClick = () => {
    this.setState({
      modalVisible: true
    });
  };

  render() {
    const {unfinishedTomatoes} = this.props;
    let content = <div/>;

    const modal = (
      <Modal
        centered
        visible={this.state.modalVisible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <p>确定放弃这个番茄吗?</p>
      </Modal>
    );

    if (unfinishedTomatoes === null || unfinishedTomatoes === undefined) {
      content = (
        <div className='countdown-wrapper'>
          <Button onClick={this.startTomato} className='start-btn' block>
            开始番茄
          </Button>
        </div>
      );
    } else {
      //获取时间 如果现在时间减去创建时间大于duration时间，则。。。。。
      let createdAt = +new Date(unfinishedTomatoes.created_at);
      let duration = +new Date(unfinishedTomatoes.duration);
      let nowTime = +new Date();
      if (nowTime - createdAt >= duration) {
        //任务已经完成了，否则任务没有完成
        // @ts-ignore
        content = (
          <div className='countdown-wrapper'>
            <Input
              placeholder='请输入刚刚完成的任务'
              value={this.state.description}
              onChange={this.handleChange}
              onPressEnter={this.handlePressEnter}
              className='input'
            />
            <Tooltip placement="left" title='按回车键提交'>
              <EnterOutlined className='enter'/>
            </Tooltip>
            <Tooltip placement="topLeft" title='点击取消番茄'>
              <CloseCircleOutlined
                className='close'
                onClick={this.handleCloseClick}
              />
            </Tooltip>
            {modal}
          </div>
        );
      } else if (nowTime - createdAt < duration) {
        let restTime = duration - (nowTime - createdAt);
        content = (
          <div className='countdown-wrapper'>
            <CountDown restTime={restTime} onFinish={this.onFinish}/>
            <CloseCircleOutlined
              className='close'
              onClick={this.handleCloseClick}
            />
            {modal}
          </div>
        );
      }
    }
    //这里要获取到最新一次已经完成的任务
    return (
      <div className='content-input'>
        {content}
      </div>
    );
  }
}

export default ContentInput;
