import React from 'react';

interface TomatoListProps {
  finishedTomatoes: any
}

class TomatoList extends React.Component<TomatoListProps>{
  constructor(props: Readonly<TomatoListProps>) {
    super(props)
  }

  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes);
    console.log('dates',dates);
    return dates.sort( (a,b) => {
      return Date.parse(b) - Date.parse(a);
    });
  }

  render() {
    console.log(this.dates);
    return (
      <div>

      </div>
    );
  }
}

export default TomatoList;
