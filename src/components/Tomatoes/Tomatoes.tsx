import React from 'react';
import './Tomatoes.scss';
import TomatoesAction from './TomatoesAction';
// @ts-ignore
import { connect } from 'react-redux';
import {addTomato, initTomatoes, updateTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';

interface TomatoesProps {
  tomatoes: any[],
  addTomato: (payload: any) => any,
  initTomatoes: (payload: any) => any,
  updateTomato: () => any
}

class Tomatoes extends React.Component<TomatoesProps> {
  constructor(props: Readonly<TomatoesProps>) {
    super(props);
  }

  componentDidMount(){
    this.getTomatoes();
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter( t => {
      return !t.description && !t.ended_at;
    })[0];
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.props.initTomatoes(response.data.resources); //初始化番茄
    }catch (e) {
      throw new Error(e);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes',{duration: 20*1000});
      this.props.addTomato(response.data.resource);
    }catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <div className='tomatoes'>
       <TomatoesAction
         startTomato={this.startTomato}
         unfinishedTomato={this.unfinishedTomato}
         updateTomato={this.props.updateTomato}
       />
      </div>
    );
  }
}

const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => {
  return {
    tomatoes: state.tomatoes,
    ...ownProps
  };
};

const mapDispatchToProps = {
  initTomatoes,
  addTomato,
  updateTomato
};


export default connect(mapStateToProps, mapDispatchToProps )(Tomatoes);
