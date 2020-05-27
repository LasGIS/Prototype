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

export type RequestParams<> = {
  pagination: Pagination;
};

export interface IRequestParamsUsers extends RequestParams {
  login: string;
}

/** объект для отображения пагинации */
export type Pagination = {
  /** номер текущей страницы */
  page: number;
  /** число страниц */
  pages: number;
};
