/*
 * Copyright (c) 2021. Prototype
 */

import './statistics.scss';
import React, { Component } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, ComposedChart, Line, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';
import { WithTranslation, withTranslation } from 'react-i18next';
import Checkbox from '../../components/ui/Checkbox';
import {
  checkStartEndIndex,
  DefaultMaxYAxisValue,
  fillGapsWithZeros,
  getFormatMonths,
  getMonths,
  getSelectionReport,
  getStartZoomSelection,
  getToday,
  LimitColorLine,
  RequestColor,
  RequestLimitColor,
  ResponseColor,
  TimeColor,
  YAxisMaxValueMultiplier,
  ZoomChangeTimeoutDelay,
} from './utils';
import { DataCollection, SelectionReport, StatisticsDataChart, ZoomIndexes } from './types';
import ShowQueriesProcessed from './ShowQueriesProcessed';
import { ModeType, StatisticsDataItem } from '../../service/api-dtos';

type Props = WithTranslation & {
  mode: ModeType;
  data: StatisticsDataItem[];
  dataBatch: StatisticsDataItem[];
  unlimitedAccessAvailable: boolean;
};

type State = {
  language: string;
  months: string[];
  formatMonths: string[];
  useQueries: boolean;
  useAnswers: boolean;
  single: DataCollection;
  batch: DataCollection;
  selectionReport?: SelectionReport;
  emptyReport: boolean;
  bandSize: number;
};

class StatisticsChart extends Component<Props, State> {
  private timeout?: NodeJS.Timeout;

  private readonly chartRef: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.state = {
      language: props.i18n.language,
      months: [],
      formatMonths: [],
      useQueries: true,
      useAnswers: true,
      single: {
        data: [],
        start: 0,
        end: 0,
      },
      selectionReport: {
        isEmpty: true,
      },
      batch: {
        data: [],
        start: 0,
        end: 0,
      },
      emptyReport: true,
      bandSize: 20,
    };
    this.onToggleAnswers = this.onToggleAnswers.bind(this);
    this.onToggleQueries = this.onToggleQueries.bind(this);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.updateLanguage();
    this.updateData();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    const { mode, i18n, data, dataBatch } = this.props;
    const { language } = this.state;
    if (prevProps.mode !== mode) {
      this.updateBandSize();
    }
    if (i18n.language !== language) {
      this.updateLanguage();
    }
    if ((data.length && prevProps.data.length !== data.length) || (prevProps.dataBatch.length && prevProps.dataBatch.length !== dataBatch.length)) {
      this.updateData();
    }
  }

  onToggleQueries(checked: boolean) {
    this.setState({ useQueries: checked });
  }

  onToggleAnswers(checked: boolean) {
    this.setState({ useAnswers: checked });
  }

  updateData = () => {
    const { mode, data, dataBatch } = this.props;
    const { formatMonths } = this.state;
    const dataSingleState: StatisticsDataChart[] = fillGapsWithZeros(
      data,
      (prevData) => {
        return {
          x: getToday(),
          y: 0,
          limit: prevData.limit,
        };
      },
      (timestamp) => {
        return {
          time: timestamp,
          request: 0,
          limit: 0,
        };
      },
    );
    const dataBatchState: StatisticsDataChart[] = fillGapsWithZeros(
      dataBatch,
      () => {
        return {
          x: getToday(),
          y: 0,
          r: 0,
        };
      },
      (timestamp) => {
        return {
          time: timestamp,
          request: 0,
          response: 0,
        };
      },
    );
    const emptyReport = mode === 'single' ? !data || data.length === 0 : !dataBatch || dataBatch.length === 0;
    let state: any;
    if (emptyReport) {
      state = {
        single: { data: dataSingleState, start: 0, end: 0 },
        batch: { data: dataBatchState, start: 0, end: 0 },
        emptyReport: true,
      };
    } else {
      const indexSingle: ZoomIndexes = getStartZoomSelection(dataSingleState);
      const indexBatch: ZoomIndexes = getStartZoomSelection(dataBatchState);
      state = {
        single: { data: dataSingleState, ...indexSingle },
        batch: { data: dataBatchState, ...indexBatch },
        selectionReport: getSelectionReport(dataSingleState, indexSingle, formatMonths),
        emptyReport: false,
      };
    }
    this.setState(state, () => this.updateBandSize());
  };

  updateLanguage = () => {
    const { t, i18n } = this.props;
    this.setState({
      language: i18n.language,
      months: getMonths(t),
      formatMonths: getFormatMonths(t),
    });
  };

  onZoomSelectionChanged = ({ startIndex, endIndex }: any) => {
    const { mode } = this.props;
    const { single, batch, formatMonths } = this.state;

    if (mode === 'single') {
      const selectionReport = getSelectionReport(single.data, { start: startIndex, end: endIndex }, formatMonths);
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setState(
          {
            single: {
              ...single,
              start: startIndex,
              end: endIndex,
            },
            selectionReport,
          },
          () => this.updateBandSize(),
        );
      }, ZoomChangeTimeoutDelay);
    } else if (mode === 'batch') {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setState(
          {
            batch: {
              ...batch,
              start: startIndex,
              end: endIndex,
            },
          },
          () => this.updateBandSize(),
        );
      }, ZoomChangeTimeoutDelay);
    }
  };

  updateBandSize = () => {
    const chart = this.chartRef.current;
    const bandSize: number = chart?.state?.xAxisMap[0].bandSize || 20;
    this.setState({ bandSize });
  };

  dataFormatter = (date: number | any): string => {
    const { months } = this.state;
    if (typeof date === 'number' && date > 0) {
      const dateObj = new Date(date);
      return `${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
    }
    return '';
  };

  barShape = (props: { fill: string; x: number; y: number; width: number; height: number; payload: StatisticsDataChart }) => {
    const { fill, x, y, width, height, payload } = props;

    const getPath = (isLimit: boolean) => {
      return `M ${x},${y} h ${width} v ${isLimit ? 2 : height} h -${width} Z`;
    };

    const isLimit: boolean = Boolean(payload.limit);
    const isOverflow: boolean = Boolean(payload.limit && payload.request > payload.limit);

    return (
      <path
        fill={isOverflow ? RequestLimitColor : fill}
        width={width}
        height={height}
        x={x}
        y={y}
        radius="0"
        className="recharts-rectangle"
        d={getPath(isLimit)}
      />
    );
  };

  render() {
    const { t, mode, unlimitedAccessAvailable } = this.props;
    const { single, batch, useQueries, useAnswers, selectionReport, emptyReport, bandSize } = this.state;
    const isSingle = mode === 'single';
    const isBatch = mode === 'batch';
    let data: StatisticsDataChart[];
    let normIndexes: ZoomIndexes;
    if (isSingle) {
      data = single.data;
      normIndexes = checkStartEndIndex(data, single.start, single.end);
    } else {
      data = batch.data;
      normIndexes = checkStartEndIndex(data, batch.start, batch.end);
    }
    return (
      <div>
        {emptyReport && (
          <div className="statistics-form__empty-data-notification">
            {t('stat.no-data.0')}
            <br />
            {t('stat.no-data.1')}
          </div>
        )}
        <div className="statistics-form__chart">
          <ComposedChart ref={this.chartRef} width={670} height={400} data={data} margin={{ top: 20, right: 0, left: 20, bottom: 20 }}>
            <CartesianGrid horizontal={false} />
            <XAxis dataKey="time" tickLine={false} stroke={TimeColor} tickFormatter={this.dataFormatter} />
            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              stroke={RequestColor}
              allowDataOverflow
              domain={[0, DefaultMaxYAxisValue * YAxisMaxValueMultiplier]}
            />
            <Tooltip cursor={{ strokeWidth: bandSize }} labelFormatter={this.dataFormatter} />
            <ReferenceLine y={0} stroke={RequestColor} />
            <Brush
              dataKey="time"
              height={40}
              stroke="rgb(128, 179, 236)"
              tickFormatter={this.dataFormatter}
              onChange={this.onZoomSelectionChanged}
              startIndex={normIndexes.start}
              endIndex={normIndexes.end}
              travellerWidth={3}
            >
              <BarChart data={data}>
                {(isSingle || isBatch) && <Bar dataKey="request" fill={RequestColor} stroke={RequestColor} />}
                {isBatch && <Bar dataKey="response" fill={ResponseColor} stroke={ResponseColor} />}
              </BarChart>
            </Brush>
            {(isSingle || (isBatch && useQueries)) && (
              <Bar dataKey="request" name={t('stat.batch.queries')} fill={RequestColor} shape={this.barShape} />
            )}
            {isBatch && useAnswers && <Bar dataKey="response" name={t('stat.batch.responses')} fill={ResponseColor} shape={this.barShape} />}
            {isSingle && <Line dataKey="limit" type="step" tooltipType="none" dot={false} stroke={LimitColorLine} strokeWidth={2} />}
          </ComposedChart>
        </div>
        {isBatch ? (
          <div className="statistics-form__series-selection">
            <Checkbox
              id="useQueries"
              className="statistics-form__queries"
              label={t('stat.get-ticket')}
              checked={useQueries}
              onChange={this.onToggleQueries}
            />
            <Checkbox
              id="useAnswers"
              className="statistics-form__answers"
              label={t('stat.get-response-by-ticket')}
              checked={useAnswers}
              onChange={this.onToggleAnswers}
            />
          </div>
        ) : (
          <ShowQueriesProcessed unlimitedAccessAvailable={unlimitedAccessAvailable} selectionReport={selectionReport} />
        )}
      </div>
    );
  }
}

export default withTranslation()(StatisticsChart);
