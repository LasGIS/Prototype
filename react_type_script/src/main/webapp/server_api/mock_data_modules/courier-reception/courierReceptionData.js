/*
 * Copyright (c) 2020. Prototype
 */

const routeListDto = {
  id: 'roteListId-1',
  routeNumber: 'route-1',
  listNumber: 'list 1',
  courierFio: 'Курьеров Курьер Курьерович',
  status: {
    key: 'WORK_SHIFT_OPENED',
    value: 'Смена открыта',
  },
  deliveryReportId: 'deliveryReportId',
  f16kCashReportId: 'f16kCashReportId',
  f16kCashlessReportId: 'f16kCashlessReportId',
  returnSheetReportId: 'returnSheetReportId',
  returnCommentReportId: 'returnCommentReportId',
  date: '23.02.2019',
};

const routeList = [
  {
    ...routeListDto,
  },
  {
    ...routeListDto,
    id: 'roteListId-2',
    routeNumber: 'route-2',
    listNumber: 'list 2',
    courierFio: 'Петров Петр Петровчи',
    status: {
      key: 'ACCEPTED',
      value: 'Принят',
    },
  },
  {
    ...routeListDto,
    id: 'roteListId-3',
    routeNumber: 'route-3',
    listNumber: 'list 3',
    courierFio: 'Иванов Иван Иванович',
    status: {
      key: 'WORK_SHIFT_CLOSED',
      value: 'Смена закрыта',
    },
  },
];

const courierTaskDto = {
  courierTaskId: 'courierTaskId-1',
  barcode: 'RPOBARCODE1',
  type: {
    key: 'RECEPTION',
    value: 'СБОР', // 'ДОСТАВКА'
  },
  routeNumber: 'routeNumber-1',
  zoneName: 'Доставка, ROUTE-456-С', // Отложенная доставка
  status: 'Приём',
  statusRpo: '-',
  marked: false,
  conflictMarked: false,
  usedProgressBar: true,
};

const singleRouteTask = {
  ...routeListDto,
  courierTasks: [
    {
      ...courierTaskDto,
    },
    {
      ...courierTaskDto,
      courierTaskId: 'courierTaskId-2',
      barcode: 'RPOBARCODE2',
      marked: true,
      conflictMarked: false,
    },
    {
      ...courierTaskDto,
      courierTaskId: 'courierTaskId-3',
      barcode: 'RPOBARCODE3',
      type: {
        key: 'DELIVERY',
        value: 'ДОСТАВКА',
      },
      zoneName: 'Отложенная доставка',
      status: 'Неудачная попытка вручения',
      statusRpo: 'Передано курьеру / доставляется',
      marked: false,
      conflictMarked: true,
    },
  ],
};

const rpoDeliveryStatuses = [
  {
    key: 'd1',
    value: 'Самовывоз 1',
  },
  {
    key: 'd2',
    value: 'Самовывоз 2',
  },
  {
    key: 'd3',
    value: 'Самовывоз 3',
  },
];

const rpoNotDeliveryStatuses = [
  {
    key: 'dn1',
    value: 'Не Самовывоз 1',
  },
  {
    key: 'dn2',
    value: 'Не Самовывоз 2',
  },
  {
    key: 'dn3',
    value: 'Не Самовывоз 3',
  },
];

const rpoSelectionStatuses = [
  {
    key: 'r1',
    value: 'РПО поступил 1',
  },
  {
    key: 'r2',
    value: 'РПО поступил 2',
  },
  {
    key: 'r3',
    value: 'РПО поступил 3',
  },
];

module.exports = {
  courierReceptionData: {
    routeList,
    singleRouteTask,
    rpoDeliveryStatuses,
    rpoNotDeliveryStatuses,
    rpoSelectionStatuses,
  },
};
