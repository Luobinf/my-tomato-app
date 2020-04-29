import React from 'react';
import CountDown from './CountDown';
import { Input, Button } from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons/lib';

interface ContentInputProps {
  unfinishedTomatoes: any
}

interface ContentInputState {
  description: string
}

class ContentInput extends React.Component<ContentInputProps,ContentInputState> {
  constructor(props: Readonly<ContentInputProps>) {
    super(props);
    this.state = {
      description: ''
    };
  }

  handleChange = (event: { target: { value: any; }; }) => {
    this.setState({
      description: event.target.value
    });
  };

  handlePressEnter = () => {
    //回车之后发送请求，增加一个tomato
  };

  render() {
    const { unfinishedTomatoes } = this.props;
    let content = <div/>;
    if(unfinishedTomatoes == undefined) {
      content = (
        <div>
          <Button>
            开始番茄
          </Button>
        </div>
      );
    } else {
      //获取时间 如果现在时间减去创建时间大于duration时间，则。。。。。
      let createdAt = +new Date(unfinishedTomatoes.created_at);
      let duration = +new Date(unfinishedTomatoes.duration);
      let nowTime = +new Date();
      if(nowTime - createdAt >= duration) {
        //任务已经完成了，否则任务没有完成
        content = (
          <div>
            <Input
              placeholder='请输入刚刚完成的任务'
              value={this.state.description}
              onChange={this.handleChange}
              onPressEnter={this.handlePressEnter}
            />
            <CloseCircleOutlined className='close' />
          </div>
        );
      } else if(nowTime - createdAt < duration){
        content = (
          <div>
            <CountDown/>
            <CloseCircleOutlined className='close' />
          </div>
        );
      }
    }
    //这里要获取到最新一次已经完成的任务
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default ContentInput;
