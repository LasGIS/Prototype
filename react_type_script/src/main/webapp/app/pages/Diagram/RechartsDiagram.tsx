/*
 * Copyright (c) 2020. Prototype
 */
import './style.scss';
import { WithRedirectHocProps } from '../../common/types/hocs-injected-prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootStoreData } from '../../common/types/redux-types';
import withRedirectProp from '../../hoc/withRedirectProp';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import MainContainer from '../MainPage/MainContainer';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

type Props = {
  id?: string;
  className?: string;
} & WithRedirectHocProps;

type State = {};

export class RechartsDiagram extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MainContainer>
        <LineChart
          className='recharts-diagram'
          width={1100}
          height={300}
          data={data}
          margin={{
            top: 10, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }}/>
          <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
        </LineChart>
      </MainContainer>
    );
  }
}

export default connect((state: RootStoreData) => ({}), {})(withRedirectProp(RechartsDiagram));
