import React from 'react';
import {Collapse} from 'antd';
import {format} from 'date-fns';
import './TaskList.scss';

const {Panel} = Collapse;

interface TaskListProps {
  finishedTomatoes: any[]
}

/**
 * @param date 输入日期："2020-05-01T02:34:50.759Z" 这种格式
 * @param date 返回值为 16：45 形式
 */
function formatTime(date: any) {
  return format(new Date(date).getTime(), 'H:mm');
}

//番茄任务只展示最近三天的
class TaskList extends React.Component<TaskListProps> {
  constructor(props: Readonly<TaskListProps>) {
    super(props);
  }

  render() {
    const {finishedTomatoes} = this.props;
    console.log(finishedTomatoes);
    let tomatoesDOM;
    if (finishedTomatoes.length > 0) {
      tomatoesDOM = finishedTomatoes.map(tomato => {
        return Object.keys(tomato).map(key => {
          return (
            <div className='tomato'>
              <div className='head'>
                <span className='date'>{format(new Date(key).getTime(),'yyyy-MM-dd')}</span>
                {tomato[key].length > 0 ? <span className='count'>完成了个{tomato[key].length}番茄</span> : null}
              </div>
              {
                tomato[key].map((item: any) => {
                  const startedTime = formatTime(item.started_at);
                  const endedTime = formatTime(item.ended_at);
                  return (
                    <div key={item.id} className='content'>
                      <span className='time'>{startedTime} - {endedTime}</span>
                      <span className='description'>{item.description}</span>
                    </div>
                  );
                })
              }
            </div>
          );
        });
      });
    }
    return (
      <div className='task-list'>
        <Collapse defaultActiveKey='1'>
          <Panel header="最近完成的番茄" key="1">
            {tomatoesDOM}
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default TaskList;

