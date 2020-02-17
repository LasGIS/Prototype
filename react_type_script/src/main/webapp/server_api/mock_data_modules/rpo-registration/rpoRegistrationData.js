/*
 * Copyright (c) 2020. Prototype
 */

const { rpoDto } = require('./rpoDto');
const { tariffDto } = require('./tariffDto');

const russianRpo = {
  ...rpoDto,
  registration: false,
};

const internationalRpo = {
  ...rpoDto,
  sender: {
    ...rpoDto.sender,
    address: {
      ...rpoDto.sender.address,
      mailDirect: 706, // СОМАЛИ
      rawAddress: 'Полный адрес отправителя',
    },
  },
  recipient: {
    ...rpoDto.recipient,
    fio: 'Смирнов Семен Семенович',
    companyName: null,
    phone: '7951333111',
    address: {
      ...rpoDto.recipient.address,
      rawAddress: 'Полный адрес получателя',
    },
  },
  registration: false,
  external: false,
};

const allEngMailDirect = [
  {
    name: '706',
    text: 'SOMALIA',
  },
  {
    name: '643',
    text: 'RUSSIAN FEDERATION',
  },
  {
    name: '748',
    text: 'SWAZILAND',
  },
];

module.exports = {
  rpoRegistrationData: {
    russianRpo,
    internationalRpo,
    allEngMailDirect,
    tariff: tariffDto,
  },
};
