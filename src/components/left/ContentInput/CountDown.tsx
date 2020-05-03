import React from 'react';
import {format} from 'date-fns';
import _ from 'lodash';

interface CountDownProps {
  restTime: number,
  onFinish: () => void
}

interface CountDownState {
  restTime: number
}

let timerID: NodeJS.Timeout;

class CountDown extends React.Component<CountDownProps, CountDownState> {
  constructor(props: any) {
    super(props);
    this.state = {
      restTime: this.props.restTime
    };
  }

  componentDidMount(): void {
    console.log('剩余时间', this.props.restTime);
    timerID = setInterval(() => {
      if (this.state.restTime > 1000) {
        this.setState((state) => {
          return {
            restTime: state.restTime - 1000
          };
        });
      } else {
        this.setState({
          restTime: 0
        });
        this.props.onFinish();
        clearInterval(timerID);
      }
    }, 1000);
  }

  render() {
    let {restTime} = this.state;
    let time = format(restTime, 'mm:ss');
    return (
      <div className='countdown'>
        {time}
      </div>
    );
  }

  componentWillUnmount(): void {
    clearInterval(timerID);
  }
}

export default CountDown;
