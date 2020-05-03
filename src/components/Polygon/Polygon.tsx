import React from 'react';
import _ from 'lodash';
import {func} from 'prop-types';

interface PolygonProps {
  data: any,
  totalFinishedCount: number
}

interface PolygonStates {
  data: any
}

class Polygon extends React.Component<PolygonProps>{
  constructor(props: Readonly<PolygonProps>) {
    super(props);
  }

  point = () => {
    const dates = Object.keys(this.props.data).sort( (a,b) => {
      console.log(a);
      console.log(b);
      return Date.parse(a) - Date.parse(b)
    });
    console.log(dates);
    const firstDay = dates[0];
    if(firstDay) {
      const lastDay = dates[dates.length - 1];
      const range = Date.parse(lastDay) - Date.parse(firstDay);
      let finishedCount = 0;
      const points = dates.map( (date) => {
        const x = (Date.parse(date) - Date.parse(firstDay)) / range * 240;
        console.log('x',x);
        finishedCount += this.props.data[date].length;
        const y = (1 - finishedCount / this.props.totalFinishedCount) * 60;
        return `${x},${y}`;
      });
      return ['0,60',...points,'240,60'].join(' ');
    } else {
      // return  '0,59.5 20,59.5 30,49.5 228,0 238,0 238,59.5';
      return '0,60 240,60 0,60';
    }
  };

  render () {
    console.log(this.props);
    return (
      <div className='polygon'>
        <svg>
          <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1" points={this.point()} />
        </svg>
      </div>
    );
  }
}

export default Polygon;
