/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
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
