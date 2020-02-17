/*
 * Copyright (c) 2020. Prototype
 */

const { currentUserData } = require('../current-user');

const zoneDto = {
  zoneId: 'zone-id-555',
  zoneType: {
    name: 'DELAYED_DELIVERY',
    text: 'Отложенная доставка',
  },
  name: 'Zone name',
  parentId: 'parent-zone-id-111',
  barcode: 'zone-barcode',
};

const zoneRpoStatisticDto = {
  zone: zoneDto,
  rpoTotal: 7,
};

const inventoryRpoDto = {
  user: 'Иванов Иван Иванович',
  rpoUkdId: 'rpoUkdId-1',
  rpoId: 'inventoryRpo-1',
  rpoBarcode: 'BARCODE-1',
  zoneFact: zoneDto,
  zoneSys: zoneDto,
  scanTime: '07.08.2019 11:07:15',
  conflict: false,
};

const currentInventory = {
  id: 'current-inventory-id-777',
  author: {
    ...currentUserData.currentUser,
  },
  ukd: {
    ...currentUserData.ukds[0],
    noZones: false,
  },
  startTime: '07.08.2019 10:00:00',
  endTime: '07.08.2019 19:00:00',
  status: 'SCANNING', //  (SCANNING - сканирование, ANALYZE - анализ, COMPLETED - завершена, INTERRUPTED - прервана)
  rpoTotal: 500,
  rpoScanned: 500,
  rpoConflicts: 100,
  statistic: zoneRpoStatisticDto,
  currentZone: {
    ...zoneDto,
    name: 'Секретная зона',
  },
  reportId: 'some-report-id-333', // поле reportId есть, только если у инвентаризации статус - COMPLETED
};

const inventoryList = {
  empty: false,
  content: [
    {
      ...currentInventory,
      id: 'current-inventory-id-111',
      startTime: '01.08.2019 10:00:00',
      endTime: '01.08.2019 19:00:00',
      rpoConflicts: 0,
      reportId: 'inventory-report-111',
    },
    {
      ...currentInventory,
      id: 'current-inventory-id-222',
      startTime: '02.08.2019 10:00:00',
      endTime: '02.08.2019 19:00:00',
      rpoConflicts: 3,
      reportId: 'inventory-report-222',
    },
  ],
  numberOfElements: 2,
  totalElements: 100,
  totalPages: 2,
  number: 0,
};

const inventoryRpoList = {
  empty: false,
  content: [
    {
      ...inventoryRpoDto,
      rpoId: 'inventoryRpo-1',
      rpoBarcode: 'BARCODE-1',
      scanTime: '07.08.2019 11:07:15',
      conflict: false,
      zoneSys: {
        ...inventoryRpoDto.zoneSys,
        zoneId: 'zone-id-999',
        name: 'Zone name 2',
      },
      zoneFact: {},
    },
    {
      ...inventoryRpoDto,
      rpoId: 'inventoryRpo-2',
      rpoBarcode: 'BARCODE-2',
      scanTime: '07.08.2019 12:30:25',
      conflict: false,
      zoneSys: {},
      zoneFact: {},
    },
    {
      ...inventoryRpoDto,
      rpoId: 'inventoryRpo-3',
      rpoBarcode: 'BARCODE-3',
      scanTime: '07.08.2019 13:47:45',
      conflict: false,
      zoneSys: {
        ...inventoryRpoDto.zoneSys,
        zoneId: 'zone-id-999',
        name: 'Zone name 2',
      },
    },
  ],
  numberOfElements: 3,
  totalElements: 500,
  totalPages: 2,
  number: 0,
};

const inventoryRpoCountByZone = [
  {
    rpoTotal: 3,
    zone: {
      barcode: '1-644880FD',
      name: 'Доставка',
      zoneId: '27ba9cd3-9811-47ba-98d3-1a0dc4e8f079',
      zoneType: {
        name: 'DELIVERY',
        text: 'Доставка',
      },
    },
  },
  {
    rpoTotal: 3,
    zone: {
      barcode: '2-644880FD',
      name: 'Долгая доставка',
      zoneId: '27ba9cd3-9811-47ba-98d3-1a0dc4e8f079',
      zoneType: {
        name: 'LONG_DELIVERY',
        text: 'Долгая доставка',
      },
    },
  },
  {
    rpoTotal: 3,
    zone: {
      barcode: '3-644880FD',
      name: 'Специальная зона',
      zoneId: '27ba9cd3-9811-47ba-98d3-1a0dc4e8f079',
      zoneType: {
        name: 'SPECIAL',
        text: 'Специальная зона',
      },
    },
  },
];

const ukdRpoCountByZone = [
  {
    rpoTotal: 1,
    zone: {
      barcode: '1-644880FD',
      name: 'Доставка',
      zoneId: '27ba9cd3-9811-47ba-98d3-1a0dc4e8f079',
      zoneType: {
        name: 'DELIVERY',
        text: 'Доставка',
      },
    },
  },
  {
    rpoTotal: 1,
    zone: {
      barcode: '2-644880FD',
      name: 'Долгая доставка',
      zoneId: '27ba9cd3-9811-47ba-98d3-1a0dc4e8f079',
      zoneType: {
        name: 'LONG_DELIVERY',
        text: 'Долгая доставка',
      },
    },
  },
];

module.exports = {
  inventoryData: {
    currentInventory,
    inventoryList,
    inventoryRpoList,
    inventoryRpoCountByZone,
    ukdRpoCountByZone,
  },
};
