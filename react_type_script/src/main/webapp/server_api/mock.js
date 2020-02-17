/*
 * Copyright (c) 2020. Prototype
 */

const { getContainer, getCapacity, getCapacityDetails } = require('./mockFabrics');

const { currentUserData } = require('./mock_data_modules/current-user');
const responceSuccess = { status: 200 };
const ukdsForUsers = {
  oneUkd: [
    {
      id: '0',
      name: 'УКД Первое Московское 0',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
  ],
  severalUkds: [
    {
      id: '1',
      name: 'УКД Первое Московское 1',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '2',
      name: 'УКД Первое Московское 2',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '3',
      name: 'УКД Первое Московское 3',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '4',
      name: 'УКД Первое Московское 4',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: false,
    },
  ],
  currentUser: [
    {
      id: '1',
      name: 'УКД основное для Красикова №1.1',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '1111',
      name: 'УКД Текущего пользователя 1',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '2222',
      name: 'УКД Текущего пользователя 2',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '3333',
      name: 'УКД Текущего пользователя 3',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '4444',
      name: 'УКД Текущего пользователя 4',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '5555',
      name: 'УКД Текущего пользователя 5',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: true,
      main: false,
    },
    {
      id: '6666',
      name: 'УКД Текущего пользователя 6',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: false,
    },
  ],
};

const userAKrasikov = {
  id: '5',
  // Пользователь может быть привязан либо к макрорегионам, либо к списку УКД
  // Поля "ukds" и "macroregions" взаимоисключают друг друга
  ukds: [
    {
      id: '1',
      name: 'УКД Северное №1',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    {
      id: '2',
      name: 'УКД Северное №2',
      postIndex: '000278',
      timeZone: 'Временная зона (часовой пояс)',
      outOfDuty: false,
      main: true,
    },
    // Доп УКД может быть только у курьера
    // {
    //     "id": "2",
    //     "name": "УКД дополнительное для Красикова №22",
    //     "postIndex": "000278",
    //     "timeZone": "Временная зона (часовой пояс)",
    //     "outOfDuty": false
    // },
  ],
  // "macroregions": [],
  login: 'AKrasikov',
  name: 'Красиков Андрей Васильевич',
  roles: [
    {
      key: 'ADMIN',
      value: 'Администратор',
    },
    // {
    //     "key": "UKD_OPERATOR",
    //     "value": "Оператор УКД"
    // }
  ],
  archived: false,
};

const mockData = {
  'all-routes': [
    {
      id: 1,
      info: 'МВ017Ю',
    },
    {
      id: 2,
      info: 'МВ018Ю',
    },
    {
      id: 3,
      info: 'МВ019Ю',
    },
  ],
  'all-couriers': [
    {
      id: 1,
      fio: 'Иванов ИвановИвановИвановИванов ИвановИвановИвановИвановИвановИвановИвановИванов',
    },
    {
      id: 2,
      fio: 'Петров',
    },
  ],
  mailTypes: [
    {
      name: 'EMS',
      text: 'Отправление EMS',
    },
    {
      name: 'BUSINESS_COURIER',
      text: 'Бизнес курьер',
    },
    {
      name: 'BUSINESS_COURIER_ES',
      text: 'Бизнес курьер экспресс',
    },
  ],
  mailCategories: [
    {
      name: 'ORDINARY',
      text: 'Обыкновенное',
    },
    {
      name: 'WITH_DECLARED_VALUE',
      text: 'С объявленной ценностью',
    },
    {
      name: 'WITH_DECLARED_VALUE_AND_CASH_ON_DELIVERY',
      text: 'С объявленной ценностью и наложенным платежом',
    },
  ],
  mailRankList: [
    {
      name: 'WO_RANK',
      text: 'Без разряда',
    },
    {
      name: 'GOVERNMENTAL',
      text: 'Правительственное',
    },
    {
      name: 'MILITARY',
      text: 'Воинское',
    },
    {
      name: 'OFFICIAL',
      text: 'Служебное',
    },
    {
      name: 'JUDICIAL',
      text: 'Судебное',
    },
    {
      name: 'PRESIDENTIAL',
      text: 'Президентское',
    },
    {
      name: 'CREDIT',
      text: 'Кредитное',
    },
    {
      name: 'INTERAGENCY',
      text: 'Межоператорское',
    },
  ],
  routeList: [
    {
      id: '1',
      info: 'Маршрут 1',
    },
    {
      id: '2',
      info: 'Маршрут 2',
    },
    {
      id: '3',
      info: 'Маршрут 3',
    },
    {
      id: '4',
      info: 'Маршрут 4',
    },
  ],
  couriersList: [
    {
      id: '1',
      fio: 'Курьер 1',
    },
    {
      id: '2',
      fio: 'Курьер 2',
    },
    {
      id: '3',
      fio: 'Курьер 3',
    },
    {
      id: '4',
      fio: 'Курьер 4',
    },
  ],
  countryList: [
    {
      mailDirect: 643,
      name: 'Россия',
    },
    {
      mailDirect: 666,
      name: 'Бразилия',
    },
    {
      mailDirect: 555,
      name: 'США',
    },
    {
      mailDirect: 444,
      name: 'Италия',
    },
  ],
  'post-marks': [
    {
      name: 'WITHOUT_MARK',
      text: 'Без отметок',
    },
    {
      name: 'WITH_SIMPLE_NOTICE',
      text: 'С простым уведомлением',
    },
    {
      name: 'WITH_ORDER_OF_NOTICE',
      text: 'Заказное уведомление о вручении',
    },
    {
      name: 'ENCLOSURE_INVENTORY',
      text: 'Опись вложений',
    },
    {
      name: 'FRAGILE_STAMP',
      text: "Отметка 'Осторожно/Хрупкая'",
    },
    {
      name: 'BULKY_PARCEL',
      text: 'Громоздкая посылка',
    },
    {
      name: 'COURIER_DELIVERY',
      text: 'Доставка нарочным',
    },
    {
      name: 'AWARDED_IN_OWN_HANDS',
      text: 'Вручение лично в руки',
    },
    {
      name: 'DOCUMENTS_SHIPPING',
      text: 'Доставка документов',
    },
    {
      name: 'GOODS_SHIPPING',
      text: 'Доставка товаров',
    },
    {
      name: 'OVERSIZE',
      text: 'Нестандартный размер',
    },
  ],
  'get-rpo-additional-services': [
    {
      name: 'COD_10001',
      text: 'Возврат сопроводительных документов',
    },
    {
      name: 'COD_10002',
      text: 'Вручение с COD',
    },
    {
      name: 'COD_22',
      text: 'Проверка соответствия вложения описи',
    },
    {
      name: 'COD_59',
      text: 'Предпочтовая подготовка',
    },
    {
      name: 'COD_159',
      text: 'Наличие договора на оказание услуг почтовой связи',
    },
  ],
  settings: {
    printLocale: true,
  },
  'current-user-info': currentUserData.currentUser /** Текущий пользователь приложения */,
  ukdList: [
    {
      name: '644001',
      text: '644001',
    },
    {
      name: '644002',
      text: '644002',
    },
  ],
  'accept-register-rpo': {
    barcode: 'EF1234567890RU1',
    zone: 'Зона хранения',
    route: 'В-10',
    hasDefects: false,
    reportId: 122345,
    status: {
      key: 'DEFECTIVE',
      value: 'Дефектное',
    },
  },

  // Регистрация контейнера
  containerList: [
    getContainer('uuid1', '1111111111111111', true, true),
    getContainer('uuid2', '2222222222222222', false, false),
    getContainer('uuid3', '3333333333333333', false, false),
  ],
  containerData: getContainer(),
  containerDetails: [
    getCapacityDetails('uuid1', '1111111111111111', true, 'REGISTERED'),
    getCapacityDetails('uuid2', '2222222222222222', false, 'DRAFT'),
  ],
  // "details-container": [
  //     {
  //         "capacityBarcode": "6681428318417067",
  //         "rpoCheckCount": 0,
  //         "rpos": [
  //             {
  //                 "barcode": "66464784184176",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             },
  //             {
  //                 "barcode": "66796290184174",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             },
  //             {
  //                 "barcode": "66816196184174",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             },
  //             {
  //                 "barcode": "66156902184181",
  //                 "hasDefects": false,
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             }
  //         ]
  //     },
  //     {
  //         "capacityBarcode": "6643360818418048",
  //         "rpoCheckCount": 2,
  //         "isRegistered": true,
  //         "rpos": [
  //             {
  //                 "barcode": "66540309184187",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             },
  //             {
  //                 "barcode": "66684215184180",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             },
  //             {
  //                 "barcode": "55555555555555",
  //                 "hasDefects": true,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": true,
  //                 "route": "МВ017Ю",
  //                 "ukdRegisterWeight": 1000,
  //                 "zone": "Доставка"
  //             },
  //             {
  //                 "barcode": "66418421184180",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": true,
  //                 "route": "МВ017Ю",
  //                 "ukdRegisterWeight": 1000,
  //                 "zone": "Доставка"
  //             }
  //         ]
  //     },
  //     {
  //         "capacityBarcode": "6663746418416099",
  //         "rpoCheckCount": 0,
  //         "rpos": [
  //             {
  //                 "barcode": "66416465184166",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             },
  //             {
  //                 "barcode": "66786171184164",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             },
  //             {
  //                 "barcode": "66078577184177",
  //                 "hasDefects": false,
  //                 "mailType": {
  //                     "name": "EMS",
  //                     "text": "EMS"
  //                 },
  //                 "registered": false,
  //                 "ukdRegisterWeight": 1000
  //             }
  //         ]
  //     }
  // ],
  capacityAccept: getCapacity(),
  capacityComplete: getCapacity(),
  capacityData: getCapacity(),
  capacityDetails: getCapacityDetails(),
  // "progress-bar-capacity": {
  //     "rpoCount": 0,
  //     "barcodes": [
  //         2,
  //         0,
  //         50,
  //         3
  //     ],
  //     "rpoCheckCount": 1,
  //     "checkBarcodes": [
  //         2,
  //         0
  //     ]
  // },
  // "find-capacity": {
  //     "barcode": "5555",
  //     "registered": false
  // },
  // "accept-capacity": {
  //     "barcode": "5555",
  //     "registered": false
  // },
  // "complete-capacity": {
  //     "reportId": "5555"
  // },
  // "details-capacity": {
  //     "capacityBarcode": "6643360818418048",
  //     "rpoCheckCount": 1,
  //     "rpos": [
  //         {
  //             "barcode": "66540309184187",
  //             "hasDefects": false,
  //             "mailType": {
  //                 "name": "EMS",
  //                 "text": "EMS"
  //             },
  //             "registered": false,
  //             "ukdRegisterWeight": 1000
  //         },
  //         {
  //             "barcode": "66684215184180",
  //             "hasDefects": false,
  //             "mailType": {
  //                 "name": "EMS",
  //                 "text": "EMS"
  //             },
  //             "registered": false,
  //             "ukdRegisterWeight": 1000
  //         },
  //         {
  //             "barcode": "66418421184180",
  //             "hasDefects": false,
  //             "mailType": {
  //                 "name": "EMS",
  //                 "text": "EMS"
  //             },
  //             "registered": false,
  //             "ukdRegisterWeight": 1000
  //         },
  //         {
  //             "barcode": "55555555555555",
  //             "hasDefects": true,
  //             "mailType": {
  //                 "name": "EMS",
  //                 "text": "EMS"
  //             },
  //             "registered": true,
  //             "route": "МВ017Ю",
  //             "ukdRegisterWeight": 1000,
  //             "zone": "Доставка"
  //         }
  //     ]
  // },
  // END Регистрация контейнера

  stockroom: {
    pageCount: 1,
    pageCurrent: 0,
    pageSize: 12,
    recordCount: 8,
    stockroomRpos: [
      {
        barcode: 'ED012627883RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '12-16',
        priority: {
          name: 'AVERAGE',
          text: 'Средний',
        },
        status: {
          name: 'CODE_3',
          text: 'Отправить на магистраль',
        },
        zone: {
          name: 'Дефектные',
          zoneId: 'b7dd3198-8bd8-4910-942c-638aea2a9e22',
          zoneType: {
            name: 'DEFECTIVE',
            text: 'Дефектные',
          },
        },
      },
      {
        barcode: 'ED013232564RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '8-12',
        priority: {
          name: 'AVERAGE',
          text: 'Средний',
        },
        status: {
          name: 'CODE_3',
          text: 'Отправить на магистраль',
        },
        zone: {
          name: 'Самовывоз',
          zoneId: 'd5c19529-d18f-4100-96c7-47e6128d5be8',
          zoneType: {
            name: 'PICKUP',
            text: 'Самовывоз',
          },
        },
      },
      {
        barcode: 'ED015459115RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '8-12',
        priority: {
          name: 'HIGH',
          text: 'Высокий',
        },
        status: {
          name: 'CODE_3',
          text: 'Отправить на магистраль',
        },
        zone: {
          name: 'Возврат',
          zoneId: 'e1e2f6b8-1ff9-40f2-b747-e4ea4773ca2a',
          zoneType: {
            name: 'RECOVERY',
            text: 'Возврат',
          },
        },
      },
      {
        barcode: 'ED015459606RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '16-20',
        priority: {
          name: 'AVERAGE',
          text: 'Средний',
        },
        status: {
          name: 'CODE_2',
          text: 'Самовывоз',
        },
        zone: {
          name: 'Дефектные',
          zoneId: 'b7dd3198-8bd8-4910-942c-638aea2a9e22',
          zoneType: {
            name: 'DEFECTIVE',
            text: 'Дефектные',
          },
        },
      },
      {
        barcode: 'ED028877518RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '12-16',
        priority: {
          name: 'AVERAGE',
          text: 'Средний',
        },
        status: {
          name: 'CODE_2',
          text: 'Самовывоз',
        },
        zone: {
          name: 'Самовывоз',
          zoneId: 'd5c19529-d18f-4100-96c7-47e6128d5be8',
          zoneType: {
            name: 'PICKUP',
            text: 'Самовывоз',
          },
        },
      },
      {
        barcode: 'EF023369788RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '12-16',
        priority: {
          name: 'HIGH',
          text: 'Высокий',
        },
        status: {
          name: 'CODE_2',
          text: 'Самовывоз',
        },
        zone: {
          name: 'Дефектные',
          zoneId: 'b7dd3198-8bd8-4910-942c-638aea2a9e22',
          zoneType: {
            name: 'DEFECTIVE',
            text: 'Дефектные',
          },
        },
      },
      {
        barcode: 'EF032349937RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '8-12',
        priority: {
          name: 'HIGH',
          text: 'Высокий',
        },
        status: {
          name: 'CODE_2',
          text: 'Самовывоз',
        },
        zone: {
          name: 'Дефектные',
          zoneId: 'b7dd3198-8bd8-4910-942c-638aea2a9e22',
          zoneType: {
            name: 'DEFECTIVE',
            text: 'Дефектные',
          },
        },
      },
      {
        barcode: 'EF037771943RU',
        deliveryDate: '21.12.2018',
        deliverySlot: '12-16',
        priority: {
          name: 'HIGH',
          text: 'Высокий',
        },
        status: {
          name: 'CODE_3',
          text: 'Отправить на магистраль',
        },
        zone: {
          name: 'Дефектные',
          zoneId: 'b7dd3198-8bd8-4910-942c-638aea2a9e22',
          zoneType: {
            name: 'DEFECTIVE',
            text: 'Дефектные',
          },
        },
      },
    ],
  },
  'rpo-statuses': [
    { name: 'RETURN', text: 'Возврат' },
    { name: 'DEFECTIVE', text: 'Дефектное' },
    { name: 'DELIVERED', text: 'Доставлено' },
    // { 'name': 'CLARIFY', 'text': 'На уточнении' },
    // { 'name': 'NOT_DELIVERED', 'text': 'Не доставлено' },
    // { 'name': 'UNCLAIMED', 'text': 'Невостребованное / Нерозданное' },
    // { 'name': 'WAIT_DELIVERY', 'text': 'Ожидает доставки' },
    // { 'name': 'WAIT_SENDING_TO_LOGISTIC_NETWORK', 'text': 'Ожидает отправки на магистраль' },
    // { 'name': 'WAIT_DELIVERY_IN_DAYS', 'text': 'Отложенная доставка' },
    // { 'name': 'SENT_TO_LOGISTIC_NETWORK', 'text': 'Отправлено на магистраль' },
    // { 'name': 'TRANSFERRED_TO_CLIENT_ROOM', 'text': 'Передано в КЗ' },
    // { 'name': 'ON_DELIVERY', 'text': 'Передано курьеру / доставляется' },
    // { 'name': 'READY_FOR_SENDING', 'text': 'Подготовлено к отправке' },
    // { 'name': 'ASSIGNED_TO_DELIVERY', 'text': 'Приписано к доставочному листу' },
    // { 'name': 'ASSIGNED_TO_CAPACITY', 'text': 'Приписано к емкости' },
    // { 'name': 'PROBLEM_OUTGOING', 'text': 'Проблемное исходящее' },
    // { 'name': 'REGISTERED_AFTER_LOGISTIC_NETWORK', 'text': 'РПО зарегистрировано в месте доставки' },
    // { 'name': 'REGISTERED_AFTER_RECEPTION', 'text': 'РПО зарегистрировано в месте приема' },
    // { 'name': 'ACCEPTED', 'text': 'РПО поступил' },
    // { 'name': 'ACCEPTED_AFTER_LOGISTIC_NETWORK', 'text': 'РПО принят в месте доставки' },
    // { 'name': 'ENTERED', 'text': 'РПО принят курьером' },
    // { 'name': 'DRAFT', 'text': 'РПО создан' },
    // { 'name': 'PICKUP', 'text': 'Самовывоз' },
    // { 'name': 'SCANNED_INCOMING', 'text': 'Сканировано входящее' },
    // { 'name': 'SCANNED_OUTGOING', 'text': 'Сканировано исходящее' },
    // { 'name': 'LOST', 'text': 'Утеряно' },
  ],
  'rpo-priorities': [
    {
      name: 'HIGH',
      text: 'Высокий',
    },
    {
      name: 'AVERAGE',
      text: 'Cредний',
    },
    {
      name: 'LOW',
      text: 'Низкий',
    },
  ],
  'stockroom-zones': [
    { name: 'CLIENT_ROOM', text: 'Клиентский зал' },
    { name: 'DELIVERY', text: 'Доставка' },
    { name: 'RETURN', text: 'Возврат' },
    // { 'name': 'LOST', 'text': 'Утеряно' },
    // { 'name': 'PICKUP', 'text': 'Самовывоз' },
    // { 'name': 'PROBLEM_OUTGOING', 'text': 'Проблемные исходящие' },
    // { 'name': 'ON_ROUTE', 'text': 'На маршруте' },
    // { 'name': 'REFINEMENT', 'text': 'Уточнение' },
    // { 'name': 'DELAYED_DELIVERY', 'text': 'Отложенная доставка' },
    // { 'name': 'DETAILED_SORTING', 'text': 'Детальная сортировка' },
    // { 'name': 'UNCLAIMED', 'text': 'Невостребованные' },
    // { 'name': 'DEFECTIVE', 'text': 'Дефектные' },
    // { 'name': 'REGISTRATION', 'text': 'Регистрация' },
  ],
  'save-stockroom-rpo': {},
  slots: [
    {
      name: 'SLOT1',
      text: '8-12',
    },
    {
      name: 'SLOT2',
      text: '12-16',
    },
    {
      name: 'SLOT3',
      text: '16-20',
    },
  ],
  prefilledUserInfo: {
    ukds: {
      '2-4322e2e8-8ecc-471c-be15-aabac4545601': 'УКД 2',
      '5-4322e2e8-8ecc-471c-be15-aabac4545601': 'УКД 5',
      '7-4322e2e8-8ecc-471c-be15-aabac4545601': 'Омский УКД',
    },
    names: [
      'Иванов Иван Иванович',
      'Иванов Иван Иванович', // Дублирование имени "Иванов Иван Иванович" для проверки правильной работы автокомплита
      'Иванов Иван Иванович', // Так как он должен использовать только уникальные значения из полученных данных
      'Петров Петр Петрович',
    ],
    logins: [
      'Ivanov-ivan',
      'ivanov-Ivan',
      'ivanov-ivan',
      'petrov-petr',
      'Petrov-Ivan',
      'Ivanov-Semenov-Ivan',
      'Ivanov-Petr-Sergei',
    ],
    roles: {
      COURIER: 'Курьер',
      UKD_CHIEF: 'Начальник УКД',
      STOCKROOMER: 'Оператор Кладовой',
      ADMIN: 'Администратор',
      DISPATCHER: 'Диспетчер УКД',
      UKD_OPERATOR: 'Оператор УКД',
      SHIFT_SUPERVISOR: 'Старший смены УКД',
    },
  },
  'get-all-users': {
    // Данные для пагинации пользователей
    empty: false,
    first: true,
    last: false,
    number: 0, // pageCurrent (номер текущей страницы)
    numberOfElements: 2,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 2,
      paged: true,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      unpaged: false,
    },
    size: 2,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    totalElements: 14,
    totalPages: 7, // pagesCount (всего страниц)
    // список пользователей
    content: [
      {
        id: '1',
        macroregions: [
          {
            id: '1',
            name: 'Макрорегион №1',
          },
        ],
        login: 'COORDINATOR',
        name: 'Координатор',
        roles: [
          {
            key: 'COORDINATOR',
            value: 'Координатор',
          },
        ],
        archived: true,
        lastPasswordChangeTime: 'Дата-время последнего изменения пароля',
      },
      {
        id: '2',
        macroregions: [currentUserData.macroregions[0]],
        login: 'ADMINISTRATOR-1',
        name: 'Администратор 1',
        roles: [
          {
            key: 'ADMIN',
            value: 'Администратор',
          },
        ],
        archived: false,
        lastPasswordChangeTime: 'Дата-время последнего изменения пароля',
      },
      {
        id: '3',
        ukds: [
          {
            id: '1',
            name: 'УКД Северное №1',
            postIndex: '000278',
            timeZone: 'Временная зона (часовой пояс)',
            outOfDuty: false,
            main: true,
          },
        ],
        login: 'ADMINISTRATOR-2',
        name: 'Администратор 2',
        roles: [
          {
            key: 'ADMIN',
            value: 'Администратор',
          },
        ],
        archived: false,
        lastPasswordChangeTime: 'Дата-время последнего изменения пароля',
      },
      {
        id: '4',
        ukds: ukdsForUsers.oneUkd,
        login: 'UKD_CHIEF-1',
        name: 'Начальник УКД',
        roles: [
          {
            key: 'UKD_CHIEF',
            value: 'Начальник УКД',
          },
        ],
        archived: false,
        lastPasswordChangeTime: 'Дата-время последнего изменения пароля',
      },
      {
        ...userAKrasikov,
      },
      {
        id: '6',
        ukds: [
          {
            id: '111',
            name: 'УКД для Пупкина №111',
            postIndex: '000278',
            timeZone: 'Временная зона (часовой пояс)',
            outOfDuty: false,
            main: true,
          },
        ],
        login: 'VPupkin',
        name: 'Пупкин Василий Андревич',
        roles: [
          {
            key: 'UKD_OPERATOR',
            value: 'Оператор УКД',
          },
        ],
        archived: false,
        lastPasswordChangeTime: 'Дата-время последнего изменения пароля',
      },
      {
        id: '24',
        ukds: [
          {
            id: '1',
            name: 'УКД Северное №1',
            postIndex: '000278',
            timeZone: 'Временная зона (часовой пояс)',
            outOfDuty: false,
            main: true,
          },
          {
            id: '2',
            name: 'УКД Северное №2',
            postIndex: '000278',
            timeZone: 'Временная зона (часовой пояс)',
            outOfDuty: false,
            main: false,
          },
          {
            id: '3',
            name: 'УКД Северное №3',
            postIndex: '000278',
            timeZone: 'Временная зона (часовой пояс)',
            outOfDuty: false,
            main: false,
          },
        ],
        login: 'MisterCourier',
        name: 'Курьеров Курьер Курьерович',
        roles: [
          {
            key: 'COURIER',
            value: 'Курьер',
          },
        ],
        archived: false,
        lastPasswordChangeTime: 'Дата-время последнего изменения пароля',
      },
    ],
  },
  'get-user': {
    ...userAKrasikov,
  },
  'add-user': {
    ...userAKrasikov,
  },
  'delete-user': responceSuccess,
  'get-all-roles': [
    {
      key: 'COURIER',
      value: 'Курьер',
    },
    {
      key: 'UKD_OPERATOR',
      value: 'Оператор УКД',
    },
    {
      key: 'STOCKROOMER',
      value: 'Оператор Кладовой',
    },
    {
      key: 'DISPATCHER',
      value: 'Диспетчер УКД',
    },
    {
      key: 'SHIFT_SUPERVISOR',
      value: 'Старший смены УКД',
    },
    {
      key: 'UKD_CHIEF',
      value: 'Начальник УКД',
    },
    {
      key: 'ADMIN',
      value: 'Администратор',
    },
    {
      key: 'COORDINATOR',
      value: 'Координатор',
    },
    // todo Уточнить у аналитиков, что делать в будущем с ролями без доступа к системе (кроме роли Курьера) - https://confluence.tools.russianpost.ru/pages/viewpage.action?pageId=98369634&focusedCommentId=102337503#comment-102337503
    /** Роли: 1) Оператор колл-центра, 2) Кассир, 3) Оператор клиентского зала,
     *  не имеют доступа к системе и по текущим бизнес-требованиям
     *  в реализации логики системы не учитываются, с сервера не могут
     *  быть отданы на фронтенд. Поэтому эти роли закомментированы в mock-данных.
     * */
    // {
    //     "key": "CUSTOMER_ROOM_OPERATOR",
    //     "value": "Оператор клиентского зала"
    // },
    // {
    //     "key": "CASHIER",
    //     "value": "Кассир"
    // },
    // {
    //     "key": "CALL_CENTER_OPERATOR",
    //     "value": "Оператор колл-центра"
    // }
  ],
  'set-password': responceSuccess,
  'ukd-list-by-user-id': ukdsForUsers.currentUser,
  'couriers-delivery-tasks': {
    createdTasks: [
      {
        taskId: '1',
        route: {
          id: '1',
          ukdId: 137,
          name: 'МЮР-1',
          type: 'Доставка',
        },
        rpoCount: 333,
        rpoCountProcessed: 100,
      },
    ],
    formedTasks: [
      {
        taskId: '2',
        route: {
          id: '1',
          ukdId: 137,
          name: 'МЮР-2',
          type: 'Доставка',
        },
        rpoCount: 1,
        rpoCountProcessed: 1,
      },
      {
        taskId: '3',
        route: {
          id: '1',
          ukdId: 137,
          name: 'МЮР-3',
          type: 'Доставка',
        },
        rpoCount: 10,
        rpoCountProcessed: 10,
      },
      {
        taskId: '4',
        route: {
          id: '1',
          ukdId: 137,
          name: 'МЮР-4',
          type: 'Доставка',
        },
        rpoCount: 771,
        rpoCountProcessed: 771,
      },
    ],
    submittedTasks: [
      {
        taskId: '5',
        route: {
          id: '1',
          ukdId: 137,
          name: 'МЮР-5',
          type: 'Доставка',
        },
        rpoCount: 10,
        rpoCountProcessed: 10,
      },
      {
        taskId: '6',
        route: {
          id: '1',
          ukdId: 137,
          name: 'МЮР-6',
          type: 'Доставка',
        },
        rpoCount: 119,
        rpoCountProcessed: 119,
      },
      {
        taskId: '7',
        route: {
          id: '1',
          ukdId: 1,
          name: 'МЮР-7',
          type: 'Доставка',
        },
        rpoCount: 10,
        rpoCountProcessed: 10,
      },
      {
        taskId: '8',
        route: {
          id: 1,
          ukdId: 137,
          name: 'МЮР-8',
          type: 'Доставка',
        },
        rpoCount: 10,
        rpoCountProcessed: 10,
      },
      {
        taskId: '9',
        route: {
          id: '1',
          ukdId: 137,
          name: 'МЮР-9',
          type: 'Доставка',
        },
        rpoCount: 10,
        rpoCountProcessed: 10,
      },
    ],
  },
  'couriers-delivery-routes-free': [
    {
      name: 'ROUTE-1',
      text: 'Маршрут 1',
    },
    {
      name: 'ROUTE-2',
      text: 'Маршрут 2',
    },
    {
      name: 'ROUTE-3',
      text: 'Маршрут 3',
    },
  ],
  'couriers-delivery-task-detail': {
    taskId: '',
    route: {
      id: 'route-id-555',
      ukdId: '130',
      name: 'МЮ38',
      type: 'Доставка',
    },
    status: 'CREATED',
    rpoCount: 8,
    rpoDispatchedCount: 5,
    deliveryRpos: [
      {
        barcode: '1BF012345678RU',
        weight: 5,
        deliveryDate: '23.02.2019',
        address: 'Проспект Мира, д.65А',
        zoneName: 'Зона доставки',
        routeName: 'МЮ38',
      },
    ],
    otherRpos: [
      {
        barcode: '2BF012345678RU',
        weight: 771,
        deliveryDate: '21.02.2019',
        address: 'Мичуринский проспект, д.197',
        zoneName: 'Зона хранения',
        routeName: 'С748',
        oldDate: true,
      },
      {
        barcode: '3BF012345678RU',
        weight: 7,
        deliveryDate: '20.02.2019',
        address: 'Муринский проспект, д.1',
        zoneName: 'Зона отложенной доставки',
        routeName: 'С749',
        oldDate: true,
      },
    ],
    dispatchRpos: [
      {
        barcode: '4BF012345678RU',
        weight: 0.01,
        deliveryDate: '21.02.2019',
        address: '197198, РОССИЙСКАЯ ФЕДЕРАЦИЯ, г. Санкт-Петербург, г. Санкт-Петербург, Введенская ул. дом 7, кв. 7',
        zoneName: 'Зона доставки',
        routeName: 'МЮ38',
        oldDate: true,
      },
      {
        barcode: '5BF012345678RU',
        weight: 2,
        deliveryDate: '20.02.2019',
        address: '689000 Чукотский АО Анадырь г. Ленина ул. 36 А',
        zoneName: 'Зона доставки',
        routeName: 'МЮ38',
        oldDate: true,
      },
      {
        barcode: '6BF012345678RU',
        weight: 5.5,
        deliveryDate: '23.02.2019',
        address: '', // Пустой адрес для проверки корректного вывода РПО без адреса в списке РПО, обработанных для передачи в доставку
        zoneName: 'Зона доставки',
        routeName: 'МЮ-77777', // Отличающийся от текущего задания номер маршрута для теста модалки удаления РПО
      },
      {
        barcode: '7BF012345678RU',
        weight: 3.34,
        deliveryDate: '23.02.2019',
        address: 'Мичуринский проспект, д.22',
        zoneName: 'Зона доставки',
        routeName: 'МЮ38',
      },
      {
        barcode: '8BF012345678RU',
        weight: 77,
        deliveryDate: '23.02.2019',
        address: 'Мичуринский проспект, д.22',
        zoneName: 'Зона доставки',
        routeName: 'МЮ38',
      },
    ],
  },
  'couriers-delivery-dispatch-success': { reportId: 'report-217767823647823' },
  'available-printers': [
    {
      printerName: 'OneNote',
      systemDefault: false,
    },
    {
      printerName: 'Send To OneNote 2013',
      systemDefault: false,
    },
    {
      printerName: 'Microsoft XPS Document Writer',
      systemDefault: false,
    },
    {
      printerName: 'Microsoft Print to PDF',
    },
    {
      printerName: 'Fax',
    },
  ],
  'find-rpo-event': [
    {
      revision: 21,
      dateTime: '13.05.19 12.00',
      rpoEvent: 'Регистрация входящего РПО',
      trackingOperation: 'Обработка, Прибыло в место вручения',
      ukdName: 'УКД-3, Москва',
      ip: '167.100.100.1',
      fio: 'Петров П.К.',
      oldRpoStatus: 'Отправлено на магистраль',
      newRpoStatus: 'РПО зарегистрировано',
      details: [
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
      ],
    },
    {
      revision: 22,
      dateTime: '13.05.19 12.47',
      rpoEvent: 'Перемещение РПО в зону Отложенной доставки',
      trackingOperation: 'Обработка, Передано в кладовую хранения',
      ukdName: 'УКД-3, Москва',
      ip: '167.100.100.1',
      fio: 'Петров П.К.',
      oldRpoStatus: 'РПО зарегистрировано',
      newRpoStatus: 'Отложенная доставка',
      details: [
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        {
          name: 'Улица',
          text:
            'пр-т Андропова пр-т Андроповапр-т Андроповапр-т Андроповапр-т Андроповапр-т Андроповапр-т Андроповапр-т Андроповапр-т Андроповапр-т Андроповапр-т Андропова',
        },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
      ],
    },
    {
      revision: 23,
      dateTime: '16.05.19 18.00',
      rpoEvent: 'Перемещение РПО в зону Доставки',
      trackingOperation: 'Обработка, Ожидает курьерской доставки',
      ukdName: 'УКД-3, Москва',
      ip: '167.100.100.3',
      fio: 'Мешков Р.П.',
      oldRpoStatus: 'Отложенная доставка',
      newRpoStatus: 'Ожидает доставки',
      details: [
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
      ],
    },
    {
      revision: 24,
      dateTime: '17.05.19 8.00',
      rpoEvent: 'Обработка отобранных РПО на доставку',
      trackingOperation: '-',
      ukdName: 'УКД-3, Москва',
      ip: '167.100.100.8',
      fio: 'Иванов Н.Г.',
      oldRpoStatus: 'Ожидает доставки',
      newRpoStatus: 'Приписано к доставочному листу',
      details: [
        { name: 'Фамилия', text: 'Зимин' },
        { name: 'Имя', text: 'Дмитрий' },
        { name: 'Отчество', text: 'Михайлович' },
        { name: 'Индекс', text: '115487' },
        { name: 'Улица', text: 'пр-т Андропова' },
        { name: 'Дом', text: '30' },
      ],
    },
  ],
};

module.exports = {
  mockData: mockData,
};
