/*
 * Copyright (c) 2021. Prototype
 */

import { charsRules, InputElementState } from './types';

export type MaskType = {
  mask?: string;
  permanents: number[];
};

export const getPrefix = (state: InputElementState) => {
  let prefix = "";
  const mask = state.mask;
  if (mask) {
    for (let i = 0; i < mask.length && isPermanentChar(i, state); ++i) {
      prefix += mask[i];
    }
  }
  return prefix;
}

export const getFilledLength = (value: string, state: InputElementState) => {
  let i;

  for (i = value.length - 1; i >= 0; --i) {
    const char = value[i];
    if (!isPermanentChar(i, state) && isAllowedChar(char, i, state)) {
      break;
    }
  }

  return ++i || getPrefix(state).length;
}

export const getLeftEditablePos = (pos: number, state: InputElementState) => {
  for (let i = pos; i >= 0; --i) {
    if (!isPermanentChar(i, state)) {
      return i;
    }
  }
  return null;
}

export const getRightEditablePos = (pos: number, state: InputElementState) => {
  const mask = state.mask;
  if (mask) {
    for (let i = pos; i < mask.length; ++i) {
      if (!isPermanentChar(i, state)) {
        return i;
      }
    }
  }
  return null;
}

export const isEmpty = (value: string, state: InputElementState) => {
  return !(value && value.split("").some((char, i) =>
    !isPermanentChar(i, state) && isAllowedChar(char, i, state)
  ));
}

/**
 * Форматирование значения по маске.
 * Значение (value) может содержать последовательность правильных значений без специальных символов.
 * Например, если маска = "+7 (999) 999-99-99", то значение "9871234567" должно преобразоваться в "+7 (987) 123-45-67"
 *
 * @param value значение
 * @param state параметры для преобразования
 * @return [string] полученное значение
 */
export const formatValue = (value: string, state: InputElementState): string => {
  const { maskChar, mask } = state;
  if (mask) {
    const addLength: number = mask.length - value.length;
    let array: string[] = value.split("");
    array = (addLength >= 0)
      ? array.concat(Array(addLength))
      : array.slice(0, addLength)
    return array.map((char, pos) => {
      if (isAllowedChar(char, pos, state)) {
        return char;
      } else if (isPermanentChar(pos, state)) {
        return mask[pos];
      }
      return maskChar;
    }).join("");
  }
  return value;
}

export const clearRange = (value: string, start: number, len: number, state: InputElementState): string => {
  const { mask, maskChar } = state;
  const end = start + len;
  if (mask) {
    return value.split("")
      .map((char, i) => {
        if (i < start || i >= end) {
          return char;
        }
        if (isPermanentChar(i, state)) {
          return mask[i];
        }
        return maskChar;
      })
      .join("");
  }
  return value;
}

export const replaceSubstr = (value: string, newSubstr: string, pos: number) => {
  return value.slice(0, pos) + newSubstr + value.slice(pos + newSubstr.length);
}

export function isAllowedChar(char: string, pos: number, state: InputElementState) {
  const mask = state.mask;
  if (mask) {
    if (isPermanentChar(pos, state)) {
      return mask[pos] === char;
    }
    const ruleChar = mask[pos];
    const charRule = charsRules[ruleChar];
    return (new RegExp(charRule)).test(char);
  }
  return false;
}

export const isPermanentChar = (pos: number, state: InputElementState) => {
  return state.permanents.indexOf(pos) !== -1;
}

export function parseMask(mask?: string): MaskType {
  if (!mask) {
    return {
      permanents: []
    };
  }
  let str = "";
  const permanents: any[] = [];
  let isPermanent = false;

  mask.split("").forEach((char) => {
    if (!isPermanent && char === "\\") {
      isPermanent = true;
    } else {
      if (isPermanent || !charsRules[char]) {
        permanents.push(str.length);
      }
      str += char;
      isPermanent = false;
    }
  });

  return {
    mask: str,
    permanents: permanents
  };
}

