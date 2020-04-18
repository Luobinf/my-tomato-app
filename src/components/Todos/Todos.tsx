import React from 'react';
import axios from '../../config/axios';
import './Todos.scss';
import TodosInput from './TodosInput';
import TodoItem from './TodoItem';

//表示todos是一个数组，数组里面可以是任何东西
interface TodosState {
  todos: any[]
}

class Todos extends React.Component<any,TodosState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo = async (params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.post('todos',params);
      this.setState({
        todos: [...todos,response.data.resource]
      })
    }catch (e) {
      throw new Error(e);
    }
  };

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((item: any) => {
        return Object.assign({},item,{editing: false});
      });
      this.setState({
        todos: todos
      });
    }catch (e) {
      throw new Error(e);
    }
  };

  get completedTodos () {
    return this.state.todos.filter( (todo) => {
      return todo.completed;
    })
  }

  get unCompletedTodos () {
    return this.state.todos.filter( (todo) => {
      return !todo.completed;
    })
  }

  get deletedTodos () {
    return this.state.todos.filter( (todo) => {
      return todo.deleted;
    })
  }

  updateTodo = async (id: number,params:any) => {
    const { todos } = this.state;
    try {
      const response = await axios.put(`/todos/${id}`,params);
      const newTodos = todos.map((todo) => {
        if(id === todo.id) {
          return response.data.resource;
        } else {
          return todo;
        }
      });
      this.setState(
        {
          todos: newTodos
        }
      );
    }catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  toEditing = (id:number) => {
    const { todos } = this.state;
    const newTodos = todos.map(item => {
      if(item.id === id) {
        return Object.assign({},item,{editing:true});
      } else {
        return Object.assign({},item,{editing:false});
      }
    });
    this.setState({
      todos: newTodos
    });
  };

  componentDidMount(): void {
   this.getTodos();
  }

  render() {
    return (
      <div className='todos'>
        <TodosInput addTodo={(params: any) => this.addTodo(params)}/>
        <div className='todoLists'>
          {
            this.unCompletedTodos.map((item) => {
              return (
                <TodoItem key={ item.id } {...item} update={this.updateTodo} toEditing={this.toEditing}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Todos;
