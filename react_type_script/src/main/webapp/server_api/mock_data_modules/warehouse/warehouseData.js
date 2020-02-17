/*
 * Copyright (c) 2020. Prototype
 */

const zoneDto = {
  zoneId: 'zoneId-1',
  zoneType: {
    name: 'zoneType-1',
    text: 'Тип зоны 1',
  },
  name: 'Зона 1',
  parentId: 'parentZoneId',
  barcode: 'zoneType-1-barcode',
};

const warehouseRpoDto = {
  barcode: 'ED012627883RU',
  zone: zoneDto,
  status: {
    key: 'WAIT_DELIVERY',
    value: 'Ожидает доставки',
  },
  deliveryDate: '25.11.2019',
  deliverySlot: '',
  deliveryAddress: 'пр. Ленина 189, оф. 131',
  courierName: 'Курьеров Курьер Курьерович',
  routeName: 'Маршрут 1',
};

const rpos = [
  {
    ...warehouseRpoDto,
    barcode: warehouseRpoDto.barcode + '-1',
  },
  {
    ...warehouseRpoDto,
    barcode: warehouseRpoDto.barcode + '-2',
    deliveryAddress: 'пр. Ленина 189, оф. 131 пр. Ленина 189, оф. 131 пр. Ленина 189, оф. 131',
  },
  {
    ...warehouseRpoDto,
    barcode: warehouseRpoDto.barcode + '-3',
  },
  {
    ...warehouseRpoDto,
    barcode: warehouseRpoDto.barcode + '-4',
  },
  {
    ...warehouseRpoDto,
    barcode: warehouseRpoDto.barcode + '-5',
  },
];

const pageData = {
  warehouseDtos: rpos,
  filterStatus: [],
  pageCount: 8,
  pageCurrent: 2,
  pageSize: 25,
  recordCount: 100,
};

module.exports = {
  warehouseData: {
    pageData,
  },
};
