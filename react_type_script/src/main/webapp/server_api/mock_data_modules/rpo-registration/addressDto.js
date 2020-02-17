/*
 * Copyright (c) 2020. Prototype
 */

// https://confluence.tools.russianpost.ru/pages/viewpage.action?pageId=102337407
const addressDto = {
  mailDirect: 643,
  index: 'почтовый индекс',
  rawAddress: 'Полный (сырой) адрес',
  type: 1,
  region: 'Регион',
  area: 'Район',
  place: 'Населенный пункт',
  territory: 'Внутригородская территория',
  street: 'Улица',
  number: 'Номер здания',
  letter: 'Литера',
  slash: 'Дробь',
  corpus: 'Корпус',
  building: 'Строение',
  room: 'Помещение (квартира, офис и т.д.)',
  cleaned: true,
};

module.exports = {
  addressDto,
};
