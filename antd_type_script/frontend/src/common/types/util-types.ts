/*
 * Copyright (c) 2020. Prototype
 */

export type Pair = {
  value: string;
  label: string;
};

export type ErrorDto = {
  code: number;
  message: string;
  detail: string;
};

export type SimpleResponse = {
  /** Состояние выполнения запроса   */
  status: "OK" | "ERROR";
  /** Сообщение для GUI   */
  message: string;
  /** Список сообщений для GUI */
  messageList: string[];
};
