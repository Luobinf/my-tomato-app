import React from 'react';
import './TomatoesButton.scss';
import { Button } from 'antd';
import axios from '../../config/axios';

class TomatoesButton extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props)
  }

  startTomato = async () => {
    const response = await axios.post('tomatoes',{duration: 150000});
    console.log(response.data);
  };

  render() {
    return (
        <div className='start-tomato-btn-wrapper'>
          <Button className='start-tomato-btn' onClick={this.startTomato} >开始番茄</Button>
        </div>
    );
  }
}

export default TomatoesButton;
