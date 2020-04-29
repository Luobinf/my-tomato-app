import React from 'react';
import ContentInput from '../ContentInput/ContentInput';
import TaskList from '../TaskList/TaskList';
import './Tomatoes.scss';
import axios from '../../../config/axios';

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
      console.log(response.data.resources);
      this.setState({
        tomatoes: response.data.resources
      });
    } catch (e) {
      throw new Error('无法获取所有的番茄');
    }
  };

  get getUnfinishedTomatoes() {
    const {tomatoes} = this.state;
    let unfinishedTomatoes = tomatoes.filter(tomato => {
      return !tomato.description && !tomato.ended_at;
    })[0];
    // console.log(unfinishedTomatoes);
    return unfinishedTomatoes;
  }

  get getFinishedTomatoes() {
    const {tomatoes} = this.state;
    let finishedTomatoes = tomatoes.filter(tomato => {
      return tomato.created_at && tomato.ended_at && !tomato.aborted;
    });
    // console.log(finishedTomatoes);
    return finishedTomatoes;
  }

  render() {
    return (
      <div className='tomatoes'>
        <ContentInput unfinishedTomatoes={this.getUnfinishedTomatoes}/>
        <TaskList/>
      </div>
    );
  }
}

export default Tomatoes;
