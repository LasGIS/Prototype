/*
 * Copyright (c) 2021. Prototype
 */

export type StatisticsDataChart = {
  time: number;
  request: number;
  response?: number;
  limit?: number;
};

export type SelectionReport = {
  isEmpty: boolean;
  queriesTotal?: number;
  queriesHandled?: number;
  dataMin?: string;
  dataMax?: string;
  maxValue?: number;
};

export type ZoomIndexes = {
  start: number;
  end: number;
};

export type DataCollection = ZoomIndexes & {
  data: StatisticsDataChart[];
};
