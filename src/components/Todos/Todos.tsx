import React from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import { updateTodos, editTodo} from '../../redux/actions/todos';
import TodosInput from './TodosInput';
import TodoItem from './TodoItem';
import './Todos.scss';
import { Collapse, Empty } from 'antd';

const { Panel } = Collapse;

//表示todos是一个数组，数组里面可以是任何东西
interface TodosState {
  todos: any[]
}

class Todos extends React.Component<any, TodosState> {
  constructor(props: any) {
    super(props);
  }

  get completedTodos() {
    return this.props.todos.filter((todo: {
      deleted: boolean;
      completed: boolean; }) => {
      return todo.completed && !todo.deleted;
    });
  }

  get unCompletedTodos() {
    return this.props.todos.filter((todo: {
      deleted: boolean;
      completed: boolean; }) => {
      return !todo.completed && !todo.deleted;
    });
  }

  render() {
    return (
      <div className='todos'>
        <TodosInput/>
        <div className='todoLists'>
          <div className='task'>
            {
              this.unCompletedTodos.length > 0 ? this.unCompletedTodos.map((item: any) => {
                return (
                  <TodoItem key={item.id} {...item} descriptionSituation={'完成任务'} />
                );
              }) : <Empty className='empty' />
            }
          </div>
          <div>
            {
              this.completedTodos.length > 0 && <Collapse className='finishedTasks'>
                <Panel header="最近完成的任务" key="1">
                  {
                    this.completedTodos.map((item: any) => {
                      return (
                        <TodoItem key={item.id} {...item} descriptionSituation={'删除任务'} />
                      );
                    })
                  }
                </Panel>
              </Collapse>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => {
  return {
    todos: state.todos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  updateTodos,
  editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
