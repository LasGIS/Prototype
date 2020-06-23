/*
 * Copyright (c) 2020. Prototype
 */

export const checkIfFirstCharIsPlus = (string = '') => /^\+/.test(string);

export const numberStringMask = (length = 0) => new Array(length).fill(/\d/);

export const phoneMaskFabric = (length = 11) => (rawValue = '') => {
  const phoneBaseMask = numberStringMask(length);
  const isFirstCharPlus = checkIfFirstCharIsPlus(rawValue);
  return isFirstCharPlus ? ['+'].concat(phoneBaseMask) : phoneBaseMask;
};

export const foreignPhoneMaskFunction = phoneMaskFabric(15);

export const internalPhoneMaskFunction = phoneMaskFabric(11);
