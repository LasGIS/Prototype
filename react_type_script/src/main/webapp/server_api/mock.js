/*
 * Copyright (c) 2020. Prototype
 */

const { getContainer, getCapacity, getCapacityDetails } = require('./mockFabrics');

const { currentUserData } = require('./mock_data_modules/current-user');
const responceSuccess = { status: 200 };

const userAKrasikov = {
  userId: '5',
  login: 'AKrasikov',
  name: 'Красиков Андрей Васильевич',
  roles: ['ADMIN', 'OPERATOR'],
  archived: false,
};

const mockData = {
  settings: {
    printLocale: true,
    name: 'Проверка UI на mock',
    version: '0.0.1',
  },
  /* Текущий пользователь приложения */
  'current-user-info': currentUserData.currentUser,

  containerData: getContainer(),
  containerDetails: [
    getCapacityDetails('uuid1', '1111111111111111', true, 'REGISTERED'),
    getCapacityDetails('uuid2', '2222222222222222', false, 'DRAFT'),
  ],

  prefilledUserInfo: {
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
      CHIEF: 'Начальник',
      ADMIN: 'Администратор',
      OPERATOR: 'Оператор',
      SUPERVISOR: 'Старший смены',
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
        userId: '2',
        login: 'ADMINISTRATOR-1',
        name: 'Администратор 1',
        roles: ['ADMIN'],
        archived: false,
      },
      {
        userId: '4',
        login: 'CHIEF',
        name: 'Начальник',
        roles: ['CHIEF'],
        archived: false,
      },
      {
        ...userAKrasikov,
      },
      {
        userId: '6',
        login: 'VPupkin',
        name: 'Пупкин Василий Андревич',
        roles: ['OPERATOR'        ],
        archived: false,
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
      key: 'OPERATOR',
      value: 'Оператор',
    },
    {
      key: 'SUPERVISOR',
      value: 'Старший смены',
    },
    {
      key: 'CHIEF',
      value: 'Начальник',
    },
    {
      key: 'ADMIN',
      value: 'Администратор',
    },
  ],
  'set-password': responceSuccess,
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
