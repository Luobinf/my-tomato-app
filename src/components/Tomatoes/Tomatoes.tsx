import React from 'react';
import './Tomatoes.scss';
import TomatoesAction from './TomatoesAction';
import TomatoList from './TomatoList';
// @ts-ignore
import { connect } from 'react-redux';
import {addTomato, initTomatoes, updateTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';
import { format } from 'date-fns';
import _ from 'lodash';

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
    console.log(this.props.tomatoes);
  }

  get unfinishedTomato() {
    console.log(this.props.tomatoes);
    return this.props.tomatoes.filter( t => {
      return !t.description && !t.ended_at;
    })[0];
  }

  get finishedTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter( t => {
      return t.description && t.ended_at && !t.aborted;
    })[0];
    const obj = _.groupBy(finishedTomatoes,(tomato) => {
      return format(tomato.started_at,'YYYY-MM-D')
    });
    return obj
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      console.log(response.data.resources);
      console.log(12222);
      this.props.initTomatoes(response.data.resources); //初始化番茄
    }catch (e) {
      throw new Error(e);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes',{duration: 60*1000*5});
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
       {/*<TomatoList*/}
       {/*  finishedTomatoes={this.finishedTomatoes}*/}
       {/*/>*/}
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
