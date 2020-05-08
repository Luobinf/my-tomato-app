import React from 'react';
import './Progress.scss';

interface ProgressProps {

}

interface ProgressState {
  width: string
}

class Progress extends React.Component<ProgressProps,ProgressState> {
  constructor(props: Readonly<ProgressProps>) {
    super(props);
    this.state = {
      width: '0'
    };
  }

  handleScroll = (e:any) => {
    let documentHeight = document.documentElement.offsetHeight;
    let documentWidth = document.documentElement.offsetWidth; //2000
    let viewHeight = window.innerHeight;
    let diff = documentHeight - viewHeight;  //200
    let rate = `${documentWidth * window.scrollY / diff / documentWidth * 100}%`;
    this.setState({
      width: rate
    });
  };

  render() {
    window.onscroll = this.handleScroll;
    return (
      <div className='progress' style={{width: `${this.state.width}`}} />
    );
  }
}

export default Progress;
