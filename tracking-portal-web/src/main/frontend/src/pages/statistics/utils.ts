/*
 * Copyright (c) 2021. Prototype
 */

import { TFunction } from 'react-i18next';
import { SelectionReport, StatisticsDataChart, ZoomIndexes } from './types';
import { StatisticsDataItem } from '../../service/api-dtos';

export const ZoomChangeTimeoutDelay = 200;
export const MinChartTicks = 7;
export const DefaultMaxYAxisValue = 100;
export const YAxisMaxValueMultiplier = 1.2;

export const TimeColor = '#444444';
export const RequestColor = '#3F71B4';
export const RequestLimitColor = 'red';
export const ResponseColor = '#1CA600';
export const LimitColorLine = '#F6CED3';
const MaxLimit = 214748364;

export const getMonths = (t: TFunction): string[] => {
  return [
    t('stat.month.jan'),
    t('stat.month.feb'),
    t('stat.month.mar'),
    t('stat.month.apr'),
    t('stat.month.may'),
    t('stat.month.jun'),
    t('stat.month.jul'),
    t('stat.month.aug'),
    t('stat.month.sep'),
    t('stat.month.oct'),
    t('stat.month.nov'),
    t('stat.month.dec'),
  ];
};

export const getFormatMonths = (t: TFunction): string[] => {
  return [
    t('stat.month.jan.full'),
    t('stat.month.feb.full'),
    t('stat.month.mar.full'),
    t('stat.month.apr.full'),
    t('stat.month.may.full'),
    t('stat.month.jun.full'),
    t('stat.month.jul.full'),
    t('stat.month.aug.full'),
    t('stat.month.sep.full'),
    t('stat.month.oct.full'),
    t('stat.month.nov.full'),
    t('stat.month.dec.full'),
  ];
};

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
};

const statisticsDataChartFromItem = (item: StatisticsDataItem): StatisticsDataChart => {
  const dataChart: StatisticsDataChart = {
    time: item.x,
    request: item.y,
  };
  if ('r' in item) {
    dataChart.response = item.r;
  }
  if ('limit' in item) {
    const limit: number = item.limit || MaxLimit;
    dataChart.limit = limit > MaxLimit ? MaxLimit : limit;
  }
  return dataChart;
};

/**
 * Заполняем недостающие даты
 * @param fromTime
 * @param toTime
 */
export const fillArray = (fromTime: StatisticsDataItem, toTime: StatisticsDataItem): StatisticsDataChart[] => {
  const currentDate = new Date(fromTime.x);
  currentDate.setDate(currentDate.getDate() + 1);
  const toDate = new Date(toTime.x);
  const result: StatisticsDataChart[] = [statisticsDataChartFromItem(fromTime)];

  while (currentDate.getTime() < toDate.getTime()) {
    const dataChart: StatisticsDataChart = {
      time: currentDate.getTime(),
      request: 0,
    };
    if ('r' in fromTime) {
      dataChart.response = 0;
    }
    if ('limit' in fromTime) {
      const limit: number = fromTime.limit || MaxLimit;
      dataChart.limit = limit > MaxLimit ? MaxLimit : limit;
    }
    result.push(dataChart);

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
};

export const fillGapsWithZeros = (
  data: StatisticsDataItem[],
  createZeroPoint: (prevData: StatisticsDataItem) => StatisticsDataItem,
  createNullPoint: (timestamp: number) => StatisticsDataChart,
): StatisticsDataChart[] => {
  if (!data || data.length === 0) {
    return [];
  }
  let result: StatisticsDataChart[] = [];
  for (let i = 0; i < data.length - 1; i++) {
    result = result.concat(fillArray(data[i], data[i + 1]));
  }
  const last = data[data.length - 1];
  result = result.concat(fillArray(last, createZeroPoint(last)));

  if (result.length < MinChartTicks) {
    const minDate: Date = new Date(result[0].time);
    while (result.length < MinChartTicks) {
      minDate.setDate(minDate.getDate() - 1);
      result.unshift(createNullPoint(minDate.getTime()));
    }
  }
  return result;
};

export const getStartZoomSelection = (data: StatisticsDataChart[]): ZoomIndexes => {
  const { length } = data;
  return length > 0
    ? {
        start: length > 7 ? length - 7 : 0,
        end: length - 1,
      }
    : {
        start: 0,
        end: 0,
      };
};

export const checkStartEndIndex = (data: StatisticsDataChart[], start?: number, end?: number): ZoomIndexes => {
  const { length } = data;
  return length > 0 && typeof start === 'number' && typeof end === 'number'
    ? {
        start: start < length ? start : length - 1,
        end: end < length ? end : length - 1,
      }
    : {
        start: 0,
        end: 0,
      };
};

const formatDates = (dataMin: number, dataMax: number, formatMonths: string[]): { dataMin: string; dataMax: string } => {
  const dateMinObj = new Date(dataMin);
  const dateMaxObj = new Date(dataMax);
  return {
    dataMin: dateMinObj.getDate() + (dateMinObj.getMonth() === dateMaxObj.getMonth() ? '' : ` ${formatMonths[dateMinObj.getMonth()]}`),
    dataMax: `${dateMaxObj.getDate()} ${formatMonths[dateMaxObj.getMonth()]}`,
  };
};

export const getSelectionReport = (data: StatisticsDataChart[], indexes: ZoomIndexes, formatMonths: string[]): SelectionReport => {
  if (!data || data.length === 0) {
    return { isEmpty: true };
  }
  let queriesTotal = 0;
  let queriesHandled = 0;
  let maxValue = 0;
  for (let i = indexes.start; i <= indexes.end; i++) {
    const dataChart: StatisticsDataChart = data[i];
    if (!dataChart.request) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (dataChart.request > maxValue) {
      maxValue = dataChart.request;
    }
    queriesTotal += dataChart.request;
    queriesHandled += dataChart.limit ? Math.min(dataChart.request, dataChart.limit) : dataChart.request;
  }
  const formattedDate = formatDates(data[indexes.start].time, data[indexes.end].time, formatMonths);
  return {
    isEmpty: false,
    queriesTotal,
    queriesHandled,
    dataMin: formattedDate.dataMin,
    dataMax: formattedDate.dataMax,
    maxValue,
  };
};
