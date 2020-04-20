import React from 'react';
import './Tomatoes.scss';
import TomatoesButton from './TomatoesButton';
// @ts-ignore
import { connect } from 'react-redux';
import {editTodo, initTodos, updateTodos} from '../../redux/actions';

class Tomatoes extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props)
  }

  render() {
    return (
      <div className='tomatoes'>
       <TomatoesButton/>
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
  initTodos,
  updateTodos,
  editTodo
};


export default connect(mapStateToProps, mapDispatchToProps )(Tomatoes);
