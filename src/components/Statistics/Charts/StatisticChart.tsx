import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

// 数据源
const data = [
  { genre: 'Sports', sold: 275, income: 2300 },
  { genre: 'Strategy', sold: 115, income: 667 },
  { genre: 'Action', sold: 120, income: 982 },
  { genre: 'Shooter', sold: 350, income: 5271 },
  { genre: 'Other', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};

class StatisticChart extends React.Component{
  constructor(props: Readonly<{}>) {
    super(props);
  }
  render () {
    // @ts-ignore
    return (
      <div id='chart'>
        <Chart width={600} height={400} data={data} scale={cols}>
          <Axis name="genre"/>
          <Axis name="sold"/>
          <Tooltip />
          <Geom type="interval" position="genre*sold" color="genre" />
        </Chart>
      </div>
    );
  }
}

export default StatisticChart;
