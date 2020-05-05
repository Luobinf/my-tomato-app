import React from 'react';
import _ from 'lodash';
import {format} from 'date-fns';
import './StatisticChart.scss';

// @ts-ignore
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react';

import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

//使用计算属性去更新option，不要在render函数中更新state，否则会造成最大调用栈超出。

interface StatisticChartProps {
  tomatoes?: any[],
  todos?: any[],
  flag: string
}

interface StatisticChartState {
  option: any
}

let option = {
  tooltip: {},
  xAxis: {
    data: []
  },
  yAxis: {},
  series: [{
    name: '总数',
    type: 'line',
    data: []
  }]
};

class StatisticChart extends React.Component<StatisticChartProps,StatisticChartState> {
  constructor(props: Readonly<StatisticChartProps>) {
    super(props);
  }

  get dailyFinishedTomatoes() {
    //按某一天分组
    return _.groupBy(this.props.tomatoes, (tomato: { created_at: string | number | Date; }) => {
      return format(new Date(tomato.created_at).getTime(), 'yyyy-MM-dd');
    });
  }

  get dailyFinishedTodos() {
    //按某一天分组
    return _.groupBy(this.props.todos, (todo: { updated_at: string | number | Date; }) => {
      return format(new Date(todo.updated_at).getTime(), 'yyyy-MM-dd');
    });
  }

  get fetchOption() {
    if (this.props.flag === 'tomato') {
      let xAxisData: number[] = [];
      let seriesData: number[] = [];
      Object.keys(this.dailyFinishedTomatoes).forEach( (key,index) => {
        const item = this.dailyFinishedTomatoes[key];
        xAxisData.push(index+1);
        seriesData.push(item.length || 0);
      });
      let opt = JSON.parse(JSON.stringify(option));
      opt.xAxis.data = xAxisData;
      opt.series[0].data = seriesData;
      return opt;
    } else if (this.props.flag === 'todo') {
      let xAxisData: number[] = [];
      let seriesData: number[] = [];
      Object.keys(this.dailyFinishedTodos).forEach( (key,index) => {
        const item = this.dailyFinishedTodos[key];
        xAxisData.push(index+1);
        seriesData.push(item.length || 0);
      });
      let opt = JSON.parse(JSON.stringify(option));
      opt.xAxis.data = xAxisData;
      opt.series[0].data = seriesData;
      return opt;
    } else {
      return option;
    }
  }

  render() {
    // console.log('番茄', this.props.tomatoes);
    // console.log('任务', this.props.todos);
    console.log('获取数据',this.fetchOption);
    let head = <div className='head'/>;

    if (this.props.flag === 'tomato') {
      // console.log(this.dailyFinishedTomatoes);
      head = (
        <div className='head'>
          <span className='count'>{this.props.tomatoes && this.props.tomatoes.length}</span><span className='all'>总数</span>
        </div>
      );
    } else if (this.props.flag === 'todo') {
      // console.log(this.dailyFinishedTodos);
      head = (
        <div className='head'>
          <span className='count'>{this.props.todos && this.props.todos.length}</span><span className='all'>总数</span>
        </div>
      );
    }

    let body = (
      <div className='body'>
        <ReactEcharts option={this.fetchOption} style={{height:'300px'}}/>
      </div>
    );

    return (
      <div id='chart'>
        {head}
        {body}
      </div>
    );
  }
}

export default StatisticChart;
