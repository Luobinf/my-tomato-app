import React from 'react';
import {format} from 'date-fns';
import './CountDown.scss';
import { DurationContext} from '../../User/duration-context';

interface CountDownProps {
  restTime: number,
  onFinish: () => void
}

interface CountDownState {
  restTime: number,
  duration?: number
}


class CountDown extends React.Component<CountDownProps, CountDownState> {
  private timerID: number | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      restTime: this.props.restTime,  //会有1s误差
      duration: 25 * 60 *1000
    };
  }

  componentDidMount(): void {
    // console.log('剩余时间', this.props.restTime);
    this.timerID = setInterval(() => {
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
        clearInterval(this.timerID);
      }
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }


  render() {
    let {restTime} = this.state;
    console.log(2020)
    console.log(new Date(restTime).getSeconds())
    console.log(2020)
    let time: string = format(restTime, 'mm:ss');
    const seconds: number = new Date(restTime).getMinutes() * 60 + new Date(restTime).getSeconds();
    return (
      <DurationContext.Consumer>
        {
          ( {duration}) => {
            return (
              <div className='countdown'>
                <span className="text">{time}</span>
                <div className="mask" style={{width: (1 - seconds * 1000 / duration ) * 100 + '%'}}/>
              </div>
            );
          }
        }
      </DurationContext.Consumer>
    );
  }
}

export default CountDown;
