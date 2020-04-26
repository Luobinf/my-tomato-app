import React from 'react';
import { Checkbox, Input, Tooltip } from 'antd';
import { DeleteOutlined, EnterOutlined} from '@ant-design/icons';
// @ts-ignore
import { connect } from 'react-redux';
import { editTodo, updateTodos } from '../../redux/actions/todos';
import './TodoItem.scss';
import axios from '../../config/axios';

const classNames = require('classnames');

interface TodoItemProps {
  id: number,
  description: string,
  completed: boolean,
  editing: boolean,
  updateTodos: (params: any) => void,
  editTodo: (id: number) => any,
  deleteTodo: (id: number,params?: any) => any
}

class TodoItem extends React.Component<TodoItemProps>{
  constructor(props: Readonly<TodoItemProps>) {
    super(props);
  }

  handleChange = (e: { target: { checked: boolean; }; }) => {
    // @ts-ignore
    this.updateTodo({
      completed: e.target.checked
    });
  };

  updateTodo = async (params:any) => {
    const id = this.props.id;
    try {
      // 不管是将todo删除还是完成，返回操作的某一个todo时，仍然将其放入到原有的todo列表中。
      const response = await axios.put(`/todos/${id}`,params);
      this.props.updateTodos(response.data.resource);
    }catch (e) {
      throw new Error(e);
    }
  };

  edit = () => {
    this.props.editTodo(this.props.id);
  };

  deleteTodo = () => {
    this.updateTodo({deleted: true});
  };

  handlePressEnter = (e: any) => {
    if(e.target.value !== '') {
      this.updateTodo({description: e.target.value});
    }
  };

  render() {
    const { description, completed, editing } = this.props;
    // @ts-ignore
    const editInput = (
      <div className='input'>
        <Input type="text" defaultValue={description} onPressEnter={this.handlePressEnter} />
        <div className='icon-wrapper'>
          <Tooltip placement="topLeft" title='按回车键提交'>
            <EnterOutlined className='enter' />
          </Tooltip>
          <Tooltip placement="bottomLeft" title='点击删除任务'>
            <DeleteOutlined className='delete' onClick={this.deleteTodo} />
          </Tooltip>
        </div>
      </div>
    );
    const spanContent =  <span onDoubleClick={this.edit} className='desc'>{description}</span>;
    const contentClass = classNames({
      content: true,
      editing,
      completed
    });
    return (
      <div className='todoItem'>
        <div className={contentClass}>
          <div className='box'>
            <Checkbox onChange={this.handleChange} checked={completed} />
          </div>
          {
            editing ? editInput : spanContent
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { todos: any; }, ownProps: any) => {
  return {
    todos: state.todos,
    ...ownProps
  }
};

const mapDispatchToProps = {
  editTodo,
  updateTodos
};

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);
