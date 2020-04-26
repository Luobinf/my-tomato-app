import React from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import {initTodos, updateTodos, editTodo} from '../../redux/actions/todos';
import axios from '../../config/axios';
import TodosInput from './TodosInput';
import TodoItem from './TodoItem';
import './Todos.scss';

//表示todos是一个数组，数组里面可以是任何东西
interface TodosState {
  todos: any[]
}

class Todos extends React.Component<any, TodosState> {
  constructor(props: any) {
    super(props);
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((todo: any) => {
        return Object.assign({}, todo, {editing: false});
      });
      //调用this.props.initTodos相当于这样做 store.dispatch({
      //     type: INIT_TODOS,
      //     payload: todos
      //   };)
      //上述是react-redux帮你做了，因此你可以不用写store.dispatch({...})
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };

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

  get deletedTodos() {
    return this.props.todos.filter((todo: { deleted: any; }) => {
      return todo.deleted;
    });
  }

  componentDidMount(): void {
    this.getTodos();
  }

  render() {
    return (
      <div className='todos'>
        <TodosInput/>
        <div className='todoLists'>
          <div>
            {
              this.unCompletedTodos.map((item: any) => {
                return (
                  <TodoItem key={item.id} {...item}/>
                );
              })
            }
          </div>
          <div>
            <h4>已完成的任务</h4>
            {
              this.completedTodos.map((item: any) => {
                return (
                  <TodoItem key={item.id} {...item}/>
                );
              })
            }
          </div>
          <div>
            <h4>已删除的任务</h4>
            {
              this.deletedTodos.map((item: any) => {
                return (
                  <TodoItem key={item.id} {...item}/>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => {
  // state表示store的reducer函数的state，ownProps表示外界传递给<Todos />组件的props。
  // console.log(101010);   //疑惑：这边得到的state为什么是一个对象，且对象里面有todos键,看index.ts文件就能明白是为什么了。
  // console.log(state);
  // console.log(101010);
  return {
    todos: state.todos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  initTodos,
  updateTodos,
  editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
