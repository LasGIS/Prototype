/*
 * Copyright (c) 2020. Prototype
 */

type RouteType = {
  url: string;
  topic: string
}
export const ROUTES: { [any: string]: RouteType } = {
  userListPage: { url: '/user-list', topic: 'User Management' },
  personListPage: { url: '/person-list', topic: 'Person Management' },
  recharts: { url: '/recharts-diagram', topic: 'ReCharts диаграмма' },
  components: { url: '/components', topic: 'Проверка компонентов' },
};
