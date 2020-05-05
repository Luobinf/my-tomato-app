import React from 'react';
// @ts-ignore
import {connect} from 'react-redux';
import _ from 'lodash';
import {format} from 'date-fns';
import {Tabs} from 'antd';
import StatisticChart from '../Charts/StatisticChart';
import './StatisticsHistory.scss';

const TabPane = Tabs.TabPane;

/**
 * @param date 输入日期："2020-05-01T02:34:50.759Z" 这种格式
 * @param date 返回值为 16：45 形式
 */
function formatTime(date: any) {
  return format(new Date(date).getTime(), 'HH:mm');

}

interface StatisticsHistoryProps {
  tomatoes: any[],
  todos: any[]
}

class StatisticsHistory extends React.Component<StatisticsHistoryProps>{
  constructor(props: Readonly<StatisticsHistoryProps>) {
    super(props)
  }

  render() {
    // console.log(this.props.tomatoes);
    // console.log(this.props.todos);
    return (
      <div className='statistics-history'>
        <Tabs defaultActiveKey='1'>
          <TabPane key='1' tab='番茄统计'>
            <StatisticChart tomatoes={this.props.tomatoes} flag='tomato' />
          </TabPane>
          <TabPane key='2' tab='任务统计'>
            <StatisticChart todos={this.props.todos} flag='todo' />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default StatisticsHistory;
