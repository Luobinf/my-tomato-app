import React from 'react';

interface CountDownProps {
  timer: number,
  onFinish: () => void
}

interface CountDownStates {
  countDown: number
}

let timerID: NodeJS.Timeout;

class CountDown extends React.Component<CountDownProps, CountDownStates> {
  constructor(props: Readonly<CountDownProps>) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  componentDidMount(): void {
    timerID = setInterval(
      () => {
        let time = this.state.countDown;
        this.setState({
          countDown: time - 1000
        });
        if (time < 1000) {
          //告诉父组件，完成倒计时
          this.props.onFinish();
          clearInterval(timerID);
        }
      }
      , 1000);
  }

  componentWillUnmount(): void {
    clearInterval(timerID);
  }

  render() {
    //倒计时功能需要完善一下。
    console.log(this.state.countDown);
    let minutes = Math.floor(this.state.countDown / 1000 / 60);
    let seconds = Math.floor(this.state.countDown / 1000 % 60);
    // let time = `${minutes} < 10 ? 0${minutes} : ${minutes} : ${seconds} < 10 ? 0${seconds} : ${seconds}`;
    return (
      <div className='countdown'>
        {minutes} : {seconds}
      </div>
    );
  }
}

export default CountDown;
