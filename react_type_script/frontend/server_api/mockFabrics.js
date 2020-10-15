/*
 * Copyright (c) 2020. Prototype
 */

const getContainer = (id = 'uuid', containerBarcode = '1111111111111111', isRegistered = false) => ({
  id: id,
  containerBarcode: containerBarcode,
  // inProgressCapacityId: isRegistered ? null : '1231231231231231',
  addressFrom: '123123, МОСКВА',
  // addressTo: '111111, CАНКТ-ПЕТЕРБУРГ',
  registered: isRegistered,
  countCapacity: 2,
  countCapacityCheck: isRegistered ? 2 : 1,
  countRpo: 4,
  countRpoCheck: isRegistered ? 4 : 2,
  weight: 4000,
  weightCheck: isRegistered ? 4000 : 2000,
});

const getCapacityCommon = (
  id = 'uuid',
  capacityBarcode = '1111111111111111',
  isRegistered = false,
  status = 'DRAFT',
) => ({
  id: id,
  capacityBarcode: capacityBarcode,
  registered: isRegistered,
  status: status, // статусы https://confluence.tools.russianpost.ru/pages/viewpage.action?pageId=98369775
  ukdRegisterWeight: 2000,
  rpoCheckCount: isRegistered ? 2 : 1,
});

const getCapacity = (id = 'uuid', capacityBarcode = '1111111111111111', isRegistered = false, status = 'DRAFT') => ({
  ...getCapacityCommon(id, capacityBarcode, isRegistered, status),

  addressFrom: '123123, МОСКВА',
  // addressTo: '111111, CАНКТ-ПЕТЕРБУРГ',
  countRpo: 2,
  barcodes: ['1111111111111111', '2222222222222222'],
  barcodesCheck: isRegistered ? ['1111111111111111', '2222222222222222'] : ['1111111111111111'],
});

const getCapacityDetailsRpo = (barcode = '11111111111111', isRegistered = false) => ({
  barcode: barcode,
  hasDefects: isRegistered,
  mailType: {
    key: 'EMS',
    value: 'EMS',
  },
  route: 'МВ017Ю',
  ukdRegisterWeight: 1000,
  // declaredWeight: 1000,
  isRegistered: isRegistered,
  zone: 'Доставка',
});

const getCapacityDetails = (
  id = 'uuid',
  capacityBarcode = '1111111111111111',
  isRegistered = false,
  status = 'DRAFT',
) => ({
  ...getCapacityCommon(id, capacityBarcode, isRegistered, status),

  declaredWeight: 2000,
  rpos: [getCapacityDetailsRpo('11111111111111'), getCapacityDetailsRpo('22222222222222')],
});

module.exports = {
  getContainer: getContainer,
  getCapacity: getCapacity,
  getCapacityDetails: getCapacityDetails,
};
