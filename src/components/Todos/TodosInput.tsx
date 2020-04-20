import React from 'react';
import { Input } from 'antd';
// @ts-ignore
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';
import axios from '../../config/axios';
import './TodosInput.scss';

interface TodosInputState {
  description: string
}

interface TodosInputProps {
  addTodo: (payload: any) => any
}

class TodosInput extends React.Component<TodosInputProps,TodosInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }

  handleChange = (e: { target: { value: any; }; }) => {
    this.setState({description: e.target.value})
  };

  onPressEnter = () => {
    if(this.state.description !== '') {
      this.addTodo();
    }
  };

  addTodo = async () => {
    //新增todo任务
    try {
      const response = await axios.post('todos',{description: this.state.description});
      this.props.addTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
    this.setState({description: ''});
  };

  render() {
    const { description } = this.state;
    return (
      <div className='todosInput'>
        <Input
          placeholder="添加新任务"
          value={description}
          onChange={this.handleChange}
          onPressEnter={this.onPressEnter}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps
  }
};

const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosInput);