/*
 * Copyright (c) 2020. Prototype
 */

const suggestData = [
  {
    address: {
      area: 'Сладковский',
      cleaned: false,
      index: '627630',
      place: '44 Разъезд',
      rawAddress: 'Тюменская, Сладковский, 44 Разъезд',
      region: 'Тюменская',
    },
    suggest: '627630, Российская Федерация, Тюменская обл., Сладковский р-н, п. 44 Разъезд',
  },
  {
    address: {
      area: 'Коломенский',
      cleaned: false,
      index: '140474',
      place: '44 км',
      rawAddress: 'Московская, Коломенский, 44 км',
      region: 'Московская',
    },
    suggest: '140474, Российская Федерация, Московская обл., Коломенский р-н, нп 44 км',
  },
];

const cleanData = {
  address: {
    area: 'р-н Сладковский',
    cleaned: true,
    index: '627630',
    number: 'дом 1',
    place: 'п. 44 Разъезд',
    rawAddress: '627630, Российская Федерация, Тюменская обл., Сладковский р-н, п. 44 Разъезд, Центральная ул., дом 1',
    region: 'обл. Тюменская',
    street: 'ул. Центральная',
    type: 1,
  },
};

module.exports = {
  addressServiceData: {
    suggestData,
    cleanData,
  },
};
