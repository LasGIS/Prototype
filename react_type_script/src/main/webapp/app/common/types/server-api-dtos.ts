/*
 * Copyright (c) 2020. Prototype
 */


export type ErrorDto = {
  code: number;
  text: string;
};

export type SystemErrorDto = {
  error: string;
  message: string;
  path: string;
  status: number;
};

export type ResponseJSON = {
  responseJSON: ErrorDto & SystemErrorDto;
};

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  CHIEF = 'CHIEF',
  OPERATOR = 'OPERATOR',
  SUPERVISOR = 'SUPERVISOR'
}

export type UserDto = {
  userId?: number;
  login: string;
  name: string;
  password?: string;
  roles: UserRoleEnum[];
  archived: boolean;
};

export type UsersData = {
  content: UserDto[];
  page: number;
  pages: number;
};

export enum DirType {
  ASC = 'ASC', DESC = 'DESC'
}

export type DataTableOrder = {
  dbId: string;
  dir: DirType;
};

export type DataTableColumn = {
  dbId: string;
  name: string;
  orderAble: boolean;
  searchable: boolean;
  search?: string;
};

//export type UsersCriteria = {};

export type TableUsersRequest = {
  start: number;
  perPages: number;
  page: number;
  pages: number;
  columns?: DataTableColumn[];
  orders?: DataTableOrder[];
//  criteria?: UsersCriteria;
};

export type TableUsersResponse = {
  content: UserDto[];
  request: TableUsersRequest;
}

export interface IRequestParamsUsers extends TableUsersRequest {
  login: string;
}

/** объект для отображения пагинации */
export type Pagination = {
  /** номер текущей страницы */
  page: number;
  /** число страниц */
  pages: number;
};
