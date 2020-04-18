import React from 'react';
import { Checkbox, Input, Tooltip } from 'antd';
import { DeleteOutlined, EnterOutlined} from '@ant-design/icons';
import './TodoItem.scss';

const classNames = require('classnames');

interface TodoItemProps {
  id: number,
  description: string,
  completed: boolean,
  editing: boolean,
  update: (param1: any,param2?: any ) => void,
  toEditing: (params: number) => void,
  deleteTodo: (id: number,params?: any) => void
}

class TodoItem extends React.Component<TodoItemProps>{
  constructor(props: Readonly<TodoItemProps>) {
    super(props);
  }

  onChange = (e: { target: { checked: boolean; }; }) => {
    // @ts-ignore
    this.props.update(this.props.id,{
      completed: e.target.checked
    });
  };

  edit = () => {
    this.props.toEditing(this.props.id);
  };

  deleteTodo = () => {
    const { id } = this.props;
    this.props.update(id,{deleted: true});
  };

  handlePressEnter = (e: any) => {
    if(e.target.value !== '') {
      this.props.update(this.props.id,{description: e.target.value});
    }
  };

  render() {
    const { description, completed, editing, id } = this.props;
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
            <Checkbox onChange={this.onChange} checked={completed} />
          </div>
          {
            editing ? editInput : spanContent
          }
        </div>
      </div>
    );
  }
}
export default TodoItem;
