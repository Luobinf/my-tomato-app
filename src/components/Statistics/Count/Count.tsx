import React from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import _ from 'lodash';
import {format} from 'date-fns';
import {Tabs} from 'antd';
import StatisticChart from '../Charts/StatisticChart';

const TabPane = Tabs.TabPane;

/**
 * @param date 输入日期："2020-05-01T02:34:50.759Z" 这种格式
 * @param date 返回值为 16：45 形式
 */
function formatTime(date: any) {
  return format(new Date(date).getTime(), 'HH:mm');

}

interface TodosHistoryProps {
  todos: any[]
}

const TodoItem = (props: any) => {
  // console.log(props);
  const {todo} = props;
  const createdTime = formatTime(todo.created_at);
  const completedTime = formatTime(todo.completed_at);
  return (
    <div className='content-item'>
      <span className='time'>{createdTime} - {completedTime}</span>
      <span className='description'>{todo.description}</span>
    </div>
  );
};

class Count extends React.Component<TodosHistoryProps> {
  constructor(props: Readonly<TodosHistoryProps>) {
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
    const finishedTodoList = (
      <div className='finishedTodoList'>
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
                <StatisticChart/>
                <div className='content'>
                  {
                    this.dailyFinishedTodos[date].map(todo => <TodoItem todo={todo} key={todo.id}/>)
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    );

    const deletedTodoList = (
      <div className='deletedTodoList'>
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

    return (
      <div className='todos-history'>
        <Tabs defaultActiveKey='1'>
          <TabPane key='1' tab='番茄统计'>
            {finishedTodoList}
          </TabPane>
          <TabPane key='2' tab='任务统计'>
            {deletedTodoList}
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

export default connect(mapStateToProps)(Count);
