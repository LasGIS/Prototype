/*
 * Copyright (c) 2020. Prototype
 */

const ukdDetailDto = {
  id: '',
  name: `УКД 2`,
  postIndex: '123456',
  timeZone: 'Europe/Moscow',
  outOfDuty: false,
  noZones: true,
  macroregionId: `macro-`,
  macroregionName: `Макрорегион №`,
  zones: [
    {
      type: 'DELIVERY',
      description: 'Доставка',
      barcode: '123456FD',
      virtual: false,
    },
    {
      type: 'DEFECTS',
      description: 'Дефектные',
      barcode: '7891011MN',
      virtual: false,
    },
  ],
};

const ukdRoutes = ['МЮ038', 'МВ021Ю', 'МВ078Ю', 'МВ098Ю'];

module.exports = {
  ukdPassportData: {
    ukdDetailDto,
    ukdRoutes,
  },
};
