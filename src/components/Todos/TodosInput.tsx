import React from 'react';
import {Input, Tooltip} from 'antd';
// @ts-ignore
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions/todos';
import axios from '../../config/axios';
import './TodosInput.scss';
import {EnterOutlined} from '@ant-design/icons/lib';

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
          className='input'
        />
        <Tooltip placement="left" title='按回车键提交'>
          <EnterOutlined className='enter'/>
        </Tooltip>
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
