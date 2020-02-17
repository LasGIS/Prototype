/*
 * Copyright (c) 2020. Prototype
 */

const { addressDto } = require('./addressDto');

// https://confluence.tools.russianpost.ru/pages/viewpage.action?pageId=102337409
const personDto = {
  fio: 'Иванов Иван Иванович',
  companyName: 'ИП Иванов',
  phone: '79234445511',
  address: addressDto,
  inn: '2728-inn',
  kpp: '2930-kpp',
};

module.exports = {
  personDto,
};
