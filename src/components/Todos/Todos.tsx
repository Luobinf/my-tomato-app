import React from 'react';
import TodosInput from './TodosInput';
import axios from '../../config/axios';

class Todos extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos',params);
      console.log(response.data);
    }catch (e) {
      throw new Error(e);
    }
  };
  render() {
    return (
      <div className='todos'>
        <TodosInput addTodo={(params: any) => this.addTodo(params)}/>
      </div>
    )
  }
}

export default Todos;
