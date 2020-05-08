import React from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import './History.scss';
import _ from 'lodash';
import {format} from 'date-fns';
import {Tabs} from 'antd';
import { Pagination } from 'antd';

const TabPane = Tabs.TabPane;

/**
 * @param date 输入日期："2020-05-01T02:34:50.759Z" 这种格式
 * @param date 返回值为 16：45 形式
 */
function formatTime(date: any) {
  return format(new Date(date).getTime(), 'HH:mm');

}

interface HistoryProps {
  todos: any[],
  flag: string,
  finishedDates: any[],
  dailyFinishedTomatoes: any[],
  deletedDates: any[],
  dailyDeletedTomatoes: any[]
}

const TodoItem = (props: any) => {
  // console.log(props);
  if(props.flag === 'tomato') {
    const {tomato} = props;
    const createdTime = formatTime(tomato.created_at);
    const endedTime = formatTime(tomato.ended_at);
    return (
      <div className='content-item'>
        <span className='time'>{createdTime} - {endedTime}</span>
        <span className='description'>{tomato.description || '描述内容为空'}</span>
      </div>
    );
  } else {
    const {todo} = props;
    const createdTime = formatTime(todo.created_at);
    const completedTime = formatTime(todo.completed_at);
    return (
      <div className='content-item'>
        <span className='time'>{createdTime} - {completedTime}</span>
        <span className='description'>{todo.description}</span>
      </div>
    );
  }
};

class History extends React.Component<HistoryProps> {
  constructor(props: Readonly<HistoryProps>) {
    super(props);
  }

  get finishedTodos() {
    return this.props.todos.filter(todo => {
        return todo.completed && !todo.deleted;
      }
    );
  }

  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return format(new Date(todo.updated_at).getTime(), 'yyyy-MM-dd');
    });
  }

  get dailyDeletedTodos() {
    return _.groupBy(this.deletedTodos, (todo) => {
      return format(new Date(todo.updated_at).getTime(), 'yyyy-MM-dd');
    });
  }

  get finishedDates() {
    return Object.keys(this.dailyFinishedTodos).sort((a, b) => {
      return Date.parse(b) - Date.parse(a);
    });
  }

  get deletedDates() {
    return Object.keys(this.dailyDeletedTodos).sort((a, b) => {
      return Date.parse(b) - Date.parse(a);
    });
  }

  get deletedTodos() {
    return this.props.todos.filter(todo => {
        return todo.deleted;
      }
    );
  }

  render() {
    const { flag } = this.props;
    let finishedTodoList, deletedTodoList, finishedTomatoList, deletedTomatoList;
    if(flag === 'tomato') {
      finishedTomatoList = (
        <div>
          {
            this.props.finishedDates.map(date => {
              return (
                <div key={date} className='todoItem'>
                  <div className='head'>
                    <span className='date'>{date}</span>
                    {this.props.dailyFinishedTomatoes[date].length > 0 ?
                      <span className='count'>完成了{this.props.dailyFinishedTomatoes[date].length}个番茄</span> : null}
                  </div>
                  <div className='content'>
                    {
                      this.props.dailyFinishedTomatoes[date].map((tomato: { id: any; }) => <TodoItem tomato={tomato} key={tomato.id} flag='tomato'/>)
                    }
                  </div>
                </div>
              );
            })
          }
          <Pagination current={1} total={this.props.finishedDates.length} pageSize={3}/>
        </div>
      );

      deletedTomatoList = (
        <div>
          {
            this.props.deletedDates.map(date => {
              // console.log(this.dailyDeletedTodos[date]);
              return (
                <div key={date} className='todoItem'>
                  <div className='head'>
                    <span className='date'>{date}</span>
                    {this.props.dailyDeletedTomatoes[date].length > 0 ?
                      <span className='count'>删除了{this.props.dailyDeletedTomatoes[date].length}个番茄</span> : null}
                  </div>
                  <div className='content'>
                    {
                      this.props.dailyDeletedTomatoes[date].map((tomato: { id: any; }) => <TodoItem tomato={tomato} key={tomato.id} flag='tomato'/>)
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      );
    } else if(flag === 'todo') {
      finishedTodoList = (
        <div>
          {
            this.finishedDates.map(date => {
              console.log(this.dailyFinishedTodos[date]);
              return (
                <div key={date} className='todoItem'>
                  <div className='head'>
                    <span className='date'>{date}</span>
                    {this.dailyFinishedTodos[date].length > 0 ?
                      <span className='count'>完成了{this.dailyFinishedTodos[date].length}个任务</span> : null}
                  </div>
                  <div className='content'>
                    {
                      this.dailyFinishedTodos[date].map(todo => <TodoItem todo={todo} key={todo.id} flag='todo'/>)
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      );

      deletedTodoList = (
        <div>
          {
            this.deletedDates.map(date => {
              console.log(this.dailyDeletedTodos[date]);
              return (
                <div key={date} className='todoItem'>
                  <div className='head'>
                    <span className='date'>{date}</span>
                    {this.dailyDeletedTodos[date].length > 0 ?
                      <span className='count'>删除了{this.dailyDeletedTodos[date].length}个任务</span> : null}
                  </div>
                  <div className='content'>
                    {
                      this.dailyDeletedTodos[date].map(todo => <TodoItem todo={todo} key={todo.id}/>)
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      );
    }
    return (
      <div className='history'>
        <Tabs defaultActiveKey='1'>
          <TabPane key='1' tab={ flag==='tomato' ? '已完成的番茄' : '已完成的任务'}>
            { flag === 'tomato' ? finishedTomatoList : finishedTodoList }
          </TabPane>
          <TabPane key='2' tab={ flag==='tomato' ? '打断记录' : '已删除的任务'}>
            { flag === 'tomato' ? deletedTomatoList : deletedTodoList }
          </TabPane>
        </Tabs>
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

export default connect(mapStateToProps)(History);
