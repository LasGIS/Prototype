/*
 * Copyright (c) 2020. Prototype
 */

const ukds = [
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
  /////
  {
    id: '11',
    name: 'УКД Южное №1',
    postIndex: '000278',
    timeZone: 'Временная зона (часовой пояс)',
    outOfDuty: false,
  },
  {
    id: '12',
    name: 'УКД Южное №2',
    postIndex: '000278',
    timeZone: 'Временная зона (часовой пояс)',
    outOfDuty: false,
  },
  {
    id: '13',
    name: 'УКД Южное №3',
    postIndex: '000278',
    timeZone: 'Временная зона (часовой пояс)',
    outOfDuty: true,
  },
  /////
  {
    id: '21',
    name: 'УКД Западное №1',
    postIndex: '000278',
    timeZone: 'Временная зона (часовой пояс)',
    outOfDuty: false,
  },
  {
    id: '22',
    name: 'УКД Западное №2',
    postIndex: '000278',
    timeZone: 'Временная зона (часовой пояс)',
    outOfDuty: false,
  },
  {
    id: '23',
    name: 'УКД Западное №3',
    postIndex: '000278',
    timeZone: 'Временная зона (часовой пояс)',
    outOfDuty: true,
  },
];

const macroregions = [
  {
    id: '1',
    name: 'Макрорегион Северный',
    ukds: [ukds[0], ukds[1], ukds[2]],
  },
  {
    id: '2',
    name: 'Макрорегион Южный',
    ukds: [ukds[3], ukds[4], ukds[5]],
  },
  {
    id: '3',
    name: 'Макрорегион Западный',
    ukds: [ukds[6], ukds[7], ukds[8]],
  },
];

/** Текущий пользователь приложения */

const currentUser = {
  id: '777',
  ukds: ukds,
  // "macroregions": macroregions, // Макрорегионы могут быть только у админа (не более 1) или у координатора (1 или несколько)
  login: 'frontend-app-user',
  name: 'Демченко Марина Викторовна',
  roles: [
    {
      key: 'UKD_CHIEF',
      value: 'Начальник УКД',
    },
    {
      key: 'STOCKROOMER',
      value: 'Оператор Кладовой',
    },
    // {
    //     "key": "ADMIN",
    //     "value": "Администратор"
    // },
    // {
    //   key: 'UKD_OPERATOR',
    //   value: 'Оператор УКД',
    // },
    // {
    //     "key": "COORDINATOR",
    //     "value": "Координатор"
    // }
  ],
  archived: false,
  lastPasswordChangeTime: 'Дата-время последнего изменения пароля',
  currentDate: '13.09.2019',
};

module.exports = {
  currentUserData: {
    ukds,
    macroregions,
    currentUser,
  },
};
