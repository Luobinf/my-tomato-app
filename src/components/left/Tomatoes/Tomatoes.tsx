import React from 'react';
import ContentInput from '../ContentInput/ContentInput';
import TaskList from '../TaskList/TaskList';
import './Tomatoes.scss';
import axios from '../../../config/axios';
import {format} from 'date-fns';
import _ from 'lodash';

//promise.all 数据同时加载完成loading状态去掉
//任务历史折线图如何做？？？


interface TomatoesProps {

}

interface TomatoesState {
  tomatoes: any[]
}

class Tomatoes extends React.Component<TomatoesProps, TomatoesState> {
  constructor(props: Readonly<TomatoesProps>) {
    super(props);
    this.state = {
      tomatoes: []
    };
  }

  componentDidMount() {
    this.getAllTomatoes();
  }

  getAllTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.setState({
        tomatoes: response.data.resources
      });
    } catch (e) {
      throw new Error('无法获取所有的番茄');
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 60 * 1000 * 3});
      let tomato = response.data.resource;
      let tomatoes = this.state.tomatoes;
      tomatoes.push(tomato);
      this.setState({
        tomatoes
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  get unfinishedTomatoes() {
    const {tomatoes} = this.state;
    let unfinishedTomatoes = tomatoes.filter(tomato => {
      return !tomato.description && !tomato.ended_at && !tomato.aborted;
    })[0];
    return unfinishedTomatoes;
  }

  get finishedTomatoes() {
    const {tomatoes} = this.state;
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
    const {tomatoes} = this.state;
    return tomatoes.filter(tomato => {
      return tomato.aborted;
    });
  }

  updateTomatoes = async (id: number, info: any) => {
    try {
      const response = await axios.put(`tomatoes/${id}`, {
        ...info
      });
      // console.log('更新之前的番茄',this.state.tomatoes);
      let tomatoes = this.state.tomatoes.map(tomato => {
        if (id === tomato.id) {
          return response.data.resource;
        } else {
          return tomato;
        }
      });
      // console.log('更新番茄',tomatoes);
      this.setState({
        tomatoes
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    console.log('所有番茄', this.state.tomatoes);
    console.log('已经完成的番茄', this.finishedTomatoes);
    console.log('被中断的番茄', this.abortedTomatoes);
    return (
      <div className='tomatoes'>
        <ContentInput
          unfinishedTomatoes={this.unfinishedTomatoes}
          startTomato={this.startTomato}
          updateTomatoes={this.updateTomatoes}
        />
        <TaskList finishedTomatoes={this.finishedTomatoes}/>
      </div>
    );
  }
}

export default Tomatoes;
