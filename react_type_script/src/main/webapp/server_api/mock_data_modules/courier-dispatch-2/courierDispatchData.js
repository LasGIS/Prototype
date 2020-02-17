/*
 * Copyright (c) 2020. Prototype
 */

const deliveryTaskListDto = {
  id: 'dl-1',
  routeNumber: 'route-1',
  listNumber: 'list 1',
  courierFio: 'Курьеров Курьер Курьерович',
  deliveryDate: '26.02.1990',
  status: {
    key: 'REQUIRES_SELECTION',
    value: 'Требует подбора',
  },
};

const deliveryList = [
  {
    ...deliveryTaskListDto,
  },
  {
    ...deliveryTaskListDto,
    id: 'dl-2',
    routeNumber: 'route-1',
    listNumber: 'list 2',
    courierFio: 'Петров Петр Петрович',
    deliveryDate: '25.02.1990',
  },
  {
    ...deliveryTaskListDto,
    id: 'dl-3',
    routeNumber: 'route-3',
    listNumber: 'list 3',
    courierFio: 'Петров Петр Петрович',
    deliveryDate: '24.02.1990',
  },
  {
    ...deliveryTaskListDto,
    id: 'dl-4',
    routeNumber: 'route-4',
    listNumber: 'list 4',
    courierFio: 'Семенов Семен Семенович',
    deliveryDate: '23.02.1990',
  },
];

// 'WAIT_DELIVERY' Ожидает доставки
// 'WAIT_DELIVERY_IN_DAYS' Отложенная доставка
const deliveryTaskRpoDto = {
  rpoId: 'rpoId-1',
  barcode: 'rpoBarcode-1',
  zoneName: 'Доставка, ROUTE-456-С',
  status: {
    key: 'WAIT_DELIVERY',
    value: 'Ожидает доставки',
  },
  deliveryDate: '21.08.2019',
  deliverySlot: 'с 14 до 18',
  marked: false,
};

const singleDeliveryTask = {
  id: 'singleDeliveryTask-id',
  routeNumber: 'ROUTE-456-С',
  listNumber: 'list-111',
  courierFio: 'Курьеров Курьер Курьерович',
  status: {
    key: 'REQUIRES_SELECTION', // SELECTION_COMPLETED
    value: 'Требует подбора', // Отправления подобраны
  },
  deliveryReportId: 'report-1',
  selectionSheetReportId: 'selectionSheetReportId-1',
  rpos: [
    {
      ...deliveryTaskRpoDto,
    },
    {
      ...deliveryTaskRpoDto,
      rpoId: 'rpoId-2',
      barcode: 'rpoBarcode-2',
      status: {
        key: 'DRAFT',
        value: 'РПО создан',
      },
    },
    {
      ...deliveryTaskRpoDto,
      rpoId: 'rpoId-3',
      barcode: 'rpoBarcode-3',
      zoneName: 'Отложенная доставка',
      status: {
        key: 'WAIT_DELIVERY_IN_DAYS',
        value: 'Отложенная доставка',
      },
      deliverySlot: undefined,
      marked: true,
    },
  ],
};

module.exports = {
  courierDispatchData: {
    deliveryList,
    singleDeliveryTask,
  },
};
