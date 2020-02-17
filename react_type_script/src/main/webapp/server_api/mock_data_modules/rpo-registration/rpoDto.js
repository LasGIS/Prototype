/*
 * Copyright (c) 2020. Prototype
 */

const { personDto } = require('./personDto');
const { addressDto } = require('./addressDto');
const { tariffDto } = require('./tariffDto');

// https://confluence.tools.russianpost.ru/pages/viewpage.action?pageId=102337405
const rpoDto = {
  barcode: 'ED015497887RU',
  // https://confluence.tools.russianpost.ru/pages/viewpage.action?pageId=119391778
  mailType: {
    name: 'POSTAL_PARCEL',
    text: 'Посылка',
  },
  mailCategory: {
    name: 'WITH_DECLARED_VALUE',
    text: 'С объявленной ценностью',
  },
  sender: {
    ...personDto,
  },
  recipient: {
    ...personDto,
  },
  returnAddress: {
    ...addressDto,
  },
  senderSms: true,
  recipientSms: true,
  senderPosteRestante: true,
  recipientPosteRestante: true,
  contentType: {
    name: 'PURCHASE',
    text: 'Товары',
  },
  postMarks: [
    {
      name: 'additional-service-1',
      text: 'Особая отметка 1',
    },
    {
      name: 'additional-service-2',
      text: 'Особая отметка 2',
    },
  ],
  sumDeclared: 10000,
  sumCod: 1000,
  declaredWeight: 15000,
  actualWeight: 15000,
  ukdRegisterWeight: 15000,
  tariff: {
    ...tariffDto,
  },
  createDate: '14.10.2019',
  createTime: '19:00',
  orderNumber: 'orderNumber-1',
  postalMark: 300,
  tariffMark: 333,
  additionalServices: [
    {
      name: 'additional-service-1',
      text: 'Доп услуга 1',
    },
    {
      name: 'additional-service-2',
      text: 'Доп услуга 2',
    },
  ],
  external: false,
  indexFrom: '644006',
  registration: true,
  status: {
    key: 'DRAFT',
    value: 'РПО создан',
  },
  route: {
    routeName: 'Маршрут №777',
  },
};

module.exports = {
  rpoDto,
};
