import React from 'react';
import ContentInput from '../ContentInput/ContentInput';
import TaskList from '../TaskList/TaskList';
import './Tomatoes.scss';
import {format} from 'date-fns';
import _ from 'lodash';

//promise.all 数据同时加载完成loading状态去掉
//任务历史折线图如何做？？？


interface TomatoesProps {
  tomatoes: any[],
  startTomato: () => void,
  updateTomatoes: (param1:number,param2:any) => Promise<boolean> | undefined
}

interface TomatoesState {
  tomatoes: any[]
}

class Tomatoes extends React.Component<TomatoesProps, TomatoesState> {
  constructor(props: Readonly<TomatoesProps>) {
    super(props);
  }

  get unfinishedTomatoes() {
    const { tomatoes } = this.props;
    return tomatoes.filter(tomato => {
      return !tomato.description && !tomato.ended_at && !tomato.aborted;
    })[0];
  }

  get finishedTomatoes() {
    const { tomatoes } = this.props;
    let finishedTomatoes = tomatoes.filter(tomato => {
      return tomato.created_at && tomato.ended_at && !tomato.aborted;
    });
    let sortedData;
    let data = [];
    if (finishedTomatoes && finishedTomatoes.length > 1) {
      sortedData = finishedTomatoes.sort((a, b) => {
        // @ts-ignore
        return new Date(b.started_at).getTime() - new Date(a.started_at).getTime();
      });
      data.push(_.groupBy(sortedData, (tomato) => {
        let time = new Date(tomato.started_at).getTime();
        return format(time, 'yyyy-MM-dd');
      }));
    } else if (finishedTomatoes.length === 1) {
      data.push(_.groupBy(finishedTomatoes, (tomato) => {
        console.log('tomato', tomato);
        let time = new Date(tomato.started_at).getTime();
        return format(time, 'yyyy-MM-dd');
      }));
    } else {
      data = finishedTomatoes;
    }
    return data.slice(0, 3);  //只展示三天的番茄
  }

  get abortedTomatoes() {
    const { tomatoes } = this.props;
    return tomatoes.filter(tomato => {
      return tomato.aborted;
    });
  }

  render() {
    console.log('所有番茄', this.props.tomatoes);
    console.log('已经完成的番茄', this.finishedTomatoes);
    console.log('被中断的番茄', this.abortedTomatoes);
    return (
      <div className='tomatoes'>
        <ContentInput
          unfinishedTomatoes={this.unfinishedTomatoes}
          startTomato={this.props.startTomato}
          updateTomatoes={this.props.updateTomatoes}
        />
        <TaskList finishedTomatoes={this.finishedTomatoes}/>
      </div>
    );
  }
}

export default Tomatoes;
