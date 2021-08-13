/*
 * Copyright (c) 2021. Prototype
 */

export type Unselectable = 'on' | 'off';
export type AcceptedCharsType = "text" | "price" | "date" | "password" | "phone";
export type InputType = 'button' | 'checkbox' | 'file' | 'hidden' | 'image' | 'password' | 'radio' | 'reset' | 'submit' | 'text'

export const charsRules: { [key: string]: string  } = {
  "9": "[0-9]",
  "a": "[A-Za-z]",
  "*": "[A-Za-z0-9]"
};

export const defaultMaskChar = "_";

export type AcceptedCharsTest = {
  chars: string[];
  test: (str: string) => boolean;
  replace: (str: string) => string;
};

export type InputElementState = {
  value: string;
  mask?: string;
  permanents: number[];
  maskChar: string;
};

