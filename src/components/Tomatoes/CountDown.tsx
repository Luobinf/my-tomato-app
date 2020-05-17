import React from 'react';
import './CountDown.scss';

interface CountDownProps {
  timer: number,
  duration: number,
  onFinish: () => void
}

interface CountDownStates {
  countDown: number
}

// let timerID: NodeJS.Timeout | undefined;


class CountDown extends React.Component<CountDownProps, CountDownStates> {
  private timerID:  number | undefined;
  constructor(props: Readonly<CountDownProps>) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  componentDidMount(){
    this.timerID  = setInterval(
      () => {
        let time = this.state.countDown;
        this.setState({
          countDown: time - 1000
        });
        if (time < 1000) {
          //告诉父组件，完成倒计时
          this.props.onFinish();
          clearInterval(this.timerID);
        }
      }
      , 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    //倒计时功能需要完善一下。
    let percent = 1 - this.state.countDown / this.props.duration;
    console.log(percent);
    console.log(this.state.countDown);
    let minutes = Math.floor(this.state.countDown / 1000 / 60);
    let seconds = Math.floor(this.state.countDown / 1000 % 60);
    // let time = `${minutes} < 10 ? 0${minutes} : ${minutes} : ${seconds} < 10 ? 0${seconds} : ${seconds}`;
    return (
      <div className='countdown'>
        {minutes} : {seconds}
        <div className="process" style={{width: `${percent * 100}%`}}>

        </div>
      </div>
    );
  }
}

export default CountDown;
