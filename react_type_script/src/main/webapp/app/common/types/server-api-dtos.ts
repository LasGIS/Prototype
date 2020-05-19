/*
 * Copyright (c) 2020. Prototype
 */

export type ErrorDto = {
  code: number;
  text: string;
};

export type ResponseJSON = {
  responseJSON: ErrorDto;
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
  pageCurrent: number;
  pagesCount: number;
};

export type RequestParams<> = {
  page: number;
  size: number;
};

export interface IRequestParamsUsers extends RequestParams {
  login: string;
}

export type Pagination = {
  pageCurrent: number;
  pagesCount: number;
};
