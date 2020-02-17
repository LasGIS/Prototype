/*
 * Copyright (c) 2020. Prototype
 */

const routeReportDto = {
  route: 'Маршрут 1',
  planned: 100,
  pending: 50,
  assigned: 30,
};

const routeResultDto = {
  items: [
    {
      ...routeReportDto,
    },
    {
      ...routeReportDto,
      route: 'Маршрут 2',
    },
    {
      ...routeReportDto,
      route: 'Маршрут 3',
    },
    {
      ...routeReportDto,
      route: 'Маршрут 4',
    },
    {
      ...routeReportDto,
      route: 'Маршрут 5',
    },
  ],
  pageCurrent: 0,
  pageSize: 25,
  pageCount: 8,
  recordCount: 100,
};

module.exports = {
  ukdRouteListReportData: {
    routeResultDto,
  },
};
