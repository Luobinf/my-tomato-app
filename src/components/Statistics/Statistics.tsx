import React from 'react';
import './Statistics.scss';
// @ts-ignore
import {connect} from 'react-redux';
import Polygon from './Polygon/Polygon';
// @ts-ignore
import Rect from './Rect/Rect';
import {format} from 'date-fns';
import _ from 'lodash';
import History from './History/History';
import Count from './Count/Count';
import {updateTodos} from '../../redux/actions/todos';
import axios from '../../config/axios';
import StatisticsHistory from './StatisticsHistory/StatisticsHistory';
import ReactDOM from 'react-dom';

interface StatisticsProps {
  todos: any[],
  tomatoes: any[]
}

interface StatisticsState {
  flag1: boolean,
  flag2: boolean,
  flag3: boolean,
  activeHistory: string
}

class Statistics extends React.Component<StatisticsProps,StatisticsState> {
  private statisticsHistory: React.RefObject<any>;
  constructor(props: Readonly<StatisticsProps>) {
    super(props);
    this.state = {
      flag1: false,
      flag2: false,
      flag3: false,
      activeHistory: ''
    };
    this.statisticsHistory = React.createRef();
  }

  get deletedTodos() {
    return this.props.todos.filter((todo: { completed: any; deleted: any; }) => {
      return todo.deleted;
    });
  }

  get finishedTodos() {
    return this.props.todos.filter((todo: { completed: any; }) => {
      return todo.completed;
    });
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return format(new Date(todo.updated_at).getTime(), 'yyyy-MM-d');
    });
  }

  get finishedTomatoes() {
    return this.props.tomatoes.filter((tomato) => {
      return tomato.created_at && tomato.ended_at && !tomato.aborted;
    });
  }

  get deletedTomatoes() {
    return this.props.tomatoes.filter(tomato => {
        return tomato.aborted;
      }
    );
  }

  get dailyFinishedTomatoes() {
    return _.groupBy(this.finishedTomatoes, (tomato) => {
      return format(new Date(tomato.created_at).getTime(), 'yyyy-MM-dd');
    });
  }

  get dailyDeletedTomatoes() {
    return _.groupBy(this.deletedTomatoes, (tomato) => {
      return format(new Date(tomato.created_at).getTime(), 'yyyy-MM-dd');
    });
  }

  get finishedDates() {
    return Object.keys(this.dailyFinishedTomatoes).sort((a, b) => {
      return Date.parse(b) - Date.parse(a);
    });
  }

  get deletedDates() {
    return Object.keys(this.dailyDeletedTomatoes).sort((a, b) => {
      return Date.parse(b) - Date.parse(a);
    });
  }

  get weekTomatoes() {
    const data = _.groupBy(this.finishedTomatoes, (todo) => {
      return format(new Date(todo.updated_at).getTime(), 'E');
    });
    const weekData = [
      {
        count: data['Mon'] && data['Mon'].length
      },
      {
        count: data['Tue'] && data['Tue'].length
      },
      {
        count: data['Wed'] && data['Wed'].length
      },
      {
        count: data['Thu'] && data['Thu'].length
      },
      {
        count: data['Fri'] && data['Fri'].length
      },
      {
        count: data['Sat'] && data['Sat'].length
      },
      {
        count: data['Sun'] && data['Sun'].length
      }
    ];
    return weekData;
  }

  handleClick  = (value: string,e: { currentTarget: any; }) =>{
    e.currentTarget.classList.toggle('active');  //设置激活的背景颜色
    if(value === 'statistics') {
      // const dom = ReactDOM.findDOMNode(this.statisticsHistory.current);
      //@ts-ignore
      // dom.classList.toggle('active');
      if(this.state.activeHistory !== 'statistics') {
        this.setState({
          activeHistory: 'statistics'
        });
      } else {
        this.setState({
          activeHistory: ''
        });
      }
      //@ts-ignore
      // const { height } = dom.getBoundingClientRect();
      // window.scrollBy( {
      //   top: height,
      //   left: 0,
      //   behavior: 'smooth'
      // });
    } else if (value === 'tomato') {
      // const dom = document.querySelector('.history');
      //@ts-ignore
      // dom.classList.toggle('active');
      if(this.state.activeHistory !== 'tomato') {
        this.setState({
          activeHistory: 'tomato'
        });
      } else {
        this.setState({
          activeHistory: ''
        });
      }
      //@ts-ignore
      // console.log(dom.getBoundingClientRect());
    } else {
      // const dom = document.querySelector('.history');
      //@ts-ignore
      // dom.classList.toggle('active');
      //@ts-ignore
      // console.log(dom.getBoundingClientRect());
      if(this.state.activeHistory !== 'todo') {
        this.setState({
          activeHistory: 'todo'
        });
      } else {
        this.setState({
          activeHistory: ''
        });
      }
    }
  };

  render() {
    return (
      <div className='statistics'>
        <ul>
          <li onClick={this.handleClick.bind(this,'statistics')} className={this.state.activeHistory==='statistics' ? 'active' : undefined }>
            <div className='census'>
              <div className='text'>
                <span className='count'>统计</span>
                <span className='accumulate'>一周累计</span>
                <span className='total'>{this.finishedTodos.length}</span>
              </div>
              <div className='picture'>
                <Rect data={this.weekTomatoes}/>
              </div>
            </div>
          </li>
          <li onClick={this.handleClick.bind(this,'tomato')} className={this.state.activeHistory==='tomato' ? 'active' : undefined }>
            <div className='census'>
              <div className='text'>
                <span className='count'>番茄历史</span>
                <span className='accumulate'>累计完成番茄</span>
                <span className='total'>{this.finishedTomatoes.length || 0}</span>
              </div>
              <div className='picture'>
                <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
              </div>
            </div>
          </li>
          <li onClick={this.handleClick.bind(this,'todo')} className={this.state.activeHistory==='todo' ? 'active' : undefined }>
            <div className='census'>
              <div className='text'>
                <span className='count'>任务历史</span>
                <span className='accumulate'>累计完成任务</span>
                <span className='total'>{this.finishedTodos.length || 0}</span>
              </div>
              <div className='picture'>
                <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
              </div>
            </div>
          </li>
        </ul>
        {
          this.state.activeHistory === 'statistics' ? <StatisticsHistory
          tomatoes={this.finishedTomatoes}
          todos={this.finishedTodos}
          ref={this.statisticsHistory}
          /> : null
        }
        {
          this.state.activeHistory === 'tomato' ? <History
            flag='tomato'
            finishedDates={this.finishedDates}
            deletedDates={this.deletedDates}
            dailyFinishedTomatoes={this.dailyFinishedTomatoes}
            dailyDeletedTomatoes={this.dailyDeletedTomatoes}
          /> : null
        }
        {
          this.state.activeHistory === 'todo' ? <History flag='todo' /> : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => {
  // state表示store的reducer函数的state，ownProps表示外界传递给<Todos />组件的props。
  // console.log(101010);   //疑惑：这边得到的state为什么是一个对象，且对象里面有todos键,看index.ts文件就能明白是为什么了。
  // console.log(state);
  return {
    todos: state.todos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  updateTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
