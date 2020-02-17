/*
 * Copyright (c) 2020. Prototype
 */

const capacityRpoDto = {
  additionalServices: [],
  barcode: 'ED015497887RU',
  declaredWeight: 0.628,
  external: false,
  indexFrom: '130206',
  mailCategory: {
    name: 'WITH_DECLARED_VALUE_AND_CASH_ON_DELIVERY',
    text: 'С объявленной ценностью и наложенным платежом',
  },
  mailType: {
    name: 'EMS',
    text: 'EMS',
  },
  postMarks: [],
  recipient: {
    address: {
      area: 'Воскресенский р-н',
      cleaned: false,
      index: '140206',
      mailDirect: 643,
      number: '29',
      place: 'Воскресенск г.',
      rawAddress: '140206 Московская обл. Воскресенский р-н Воскресенск г. Герцена ул. 29',
      region: 'Московская обл.',
      street: 'Герцена ул.',
      type: 1,
    },
    fio: 'БАЛАБКО',
    phone: '9169993262',
    type: false,
  },
  recipientPosteRestante: false,
  registration: false,
  sender: {
    address: {
      cleaned: false,
      index: '130206',
      mailDirect: 643,
      place: 'МОСКВА',
      rawAddress: '130206 МОСКВА',
      type: 1,
    },
    fio: '1',
    type: false,
  },
  senderPosteRestante: false,
  sumCod: 270000,
  sumDeclared: 270000,
  tariff: {
    declared: 1338,
    total: 1338,
  },
  ukdRegisterWeight: 4.0,
};

const capacityFormationTaskDto = {
  addressTo: '130206 МОСКВА УКД-4',
  barcode: '4444447800000027',
  barcodes: ['ED015497887RU'],
  barcodesCheck: ['ED015497887RU'],
  capacities: [],
  countRpo: 3,
  countRpoCheck: 1,
  estimatedWeight: 4000,
  id: '6014ec03-ba4f-43d6-af52-bc6f4524dd23',
  isRegistered: false,
  rpos: [
    {
      ...capacityRpoDto,
    },
    {
      ...capacityRpoDto,
      barcode: 'ED025497887RU',
    },
    {
      ...capacityRpoDto,
      barcode: 'ED035497887RU',
    },
  ],
  status: 'CREATED',
};

const capacityFormationAllowedTypes = [
  {
    type: {
      key: 'BAG',
      value: 'Мешок',
    },
    // Поля с весом могут не прийти, если не приходят, то ограничений на вес емкости нет
    minWeight: 1000,
    maxWeight: 12000,
  },
  {
    type: {
      key: 'CONTAINER',
      value: 'Контейнер',
    },
    minWeight: 0,
    maxWeight: 500000,
  },
  {
    type: {
      key: 'ITEMS_GROUP',
      value: 'Группа рпо',
    },
    // minWeight: 0,
    // maxWeight: 0,
  },
];

const capacityFormationTaskList = [
  {
    ...capacityFormationTaskDto,
  },
  {
    ...capacityFormationTaskDto,
    barcode: '5555557800000027',
  },
  {
    ...capacityFormationTaskDto,
    barcode: '1111117800000027',
  },
];

module.exports = {
  capacityFormingData: {
    capacityFormationTaskList,
    capacityFormationTask: capacityFormationTaskDto,
    capacityFormationAllowedTypes,
  },
};
