import React from 'react';
import { Input } from 'antd';
import './TodosInput.scss';

interface TodosInputState {
  description: string
}

interface TodosInputProps {
  addTodo: (params: any) => void
}

class TodosInput extends React.Component<TodosInputProps,TodosInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }
  onKeyUp(e: any) {
    if(e.keyCode === 13 && this.state.description !== '') {
      this.addTodo();
    }
  }
  addTodo() {
    // 发送请求，提交todo 这里输入框只负责展示，将请求交给父组件身去处理
    console.log('add todo');
    this.props.addTodo({
      description: this.state.description
    });
    this.setState({
      description: ''
    });
  }
  render() {
    const { description } = this.state;
    return (
      <div className='todosInput'>
        <Input
          placeholder="添加新任务"
          value={description}
          onChange={(e) => this.setState({description: e.target.value})}
          onKeyUp={this.onKeyUp.bind(this)}
        />
      </div>
    )
  }
}

export default TodosInput;
