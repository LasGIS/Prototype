/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import expect from 'expect';
import {
  checkIfFirstCharIsPlus,
  foreignPhoneMaskFunction,
  internalPhoneMaskFunction,
  numberStringMask,
  phoneMaskFabric,
} from '../util';

describe('Input. Тесты для utils', () => {
  describe('checkIfFirstCharIsPlus', () => {
    it('должен вернуть false, если первый символ не плюс', () => {
      expect(checkIfFirstCharIsPlus()).toBe(false);
      expect(checkIfFirstCharIsPlus('')).toBe(false);
      expect(checkIfFirstCharIsPlus('123123')).toBe(false);
      expect(checkIfFirstCharIsPlus('12+1')).toBe(false);
    });

    it('должен вернуть true, если первый символ - плюс', function() {
      expect(checkIfFirstCharIsPlus('+17293')).toBe(true);
    });
  });

  describe('numberStringMask', () => {
    it('должен вернуть массив заданной длины, заполненный регулярными выражениями /\\d/', () => {
      expect(numberStringMask()).toEqual([]);
      expect(numberStringMask(0)).toEqual([]);
      expect(numberStringMask(1)).toEqual([/\d/]);
      expect(numberStringMask(4)).toEqual([/\d/, /\d/, /\d/, /\d/]);
    });
  });

  describe('phoneMaskFabric', () => {
    it('возвращает функцию-маску без указанной длины', () => {
      const expectedArray = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
      const expectedArrayStartsWithPlus = ['+', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
      const mask = phoneMaskFabric();
      expect(typeof mask).toBe('function');
      expect(mask()).toEqual(expectedArray);
      expect(mask('2')).toEqual(expectedArray);
      expect(mask('+1')).toEqual(expectedArrayStartsWithPlus);
    });

    it('возвращает функцию-маску c указанной длиной', () => {
      const expectedArrayLengthTwo = [/\d/, /\d/];
      const expectedArrayLengthTwoStartsWithPlus = ['+', /\d/, /\d/];
      const maskLengthTwo = phoneMaskFabric(2);
      expect(typeof maskLengthTwo).toBe('function');
      expect(maskLengthTwo()).toEqual(expectedArrayLengthTwo);
      expect(maskLengthTwo('1')).toEqual(expectedArrayLengthTwo);
      expect(maskLengthTwo('+2')).toEqual(expectedArrayLengthTwoStartsWithPlus);
    });
  });

  describe('foreignPhoneMaskFunction', () => {
    const expectedArray = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    const expectedArrayWithPlus = [
      '+',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];

    it(`должен вернуть массив длиной 15 заполненный регулярным выражением /\\d/, 
      если переданная строка не начинается с плюса`, () => {
      expect(foreignPhoneMaskFunction()).toEqual(expectedArray);
      expect(foreignPhoneMaskFunction('')).toEqual(expectedArray);
      expect(foreignPhoneMaskFunction('4234')).toEqual(expectedArray);
      expect(foreignPhoneMaskFunction('1+1')).toEqual(expectedArray);
    });

    it(`должен вернуть массив длиной 16 и строкой '+' в качестве первого значения, 
      если переданная строка начинается с плюса`, () => {
      expect(foreignPhoneMaskFunction('+1')).toEqual(expectedArrayWithPlus);
    });
  });

  describe('internalPhoneMaskFunction', () => {
    const expectedArray = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    const expectedArrayWithPlus = ['+', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    it('должен вернуть массив длиной 11, заполненный /\\d/, если переданная строка начинается не с "+"', () => {
      expect(internalPhoneMaskFunction()).toEqual(expectedArray);
      expect(internalPhoneMaskFunction('')).toEqual(expectedArray);
      expect(internalPhoneMaskFunction('28+7')).toEqual(expectedArray);
    });

    it(`должен вернуть массив длиной 12 и строкой "+" в качестве первого значения, 
      если переданная строка начинается с "+"`, () => {
      expect(internalPhoneMaskFunction('+')).toEqual(expectedArrayWithPlus);
      expect(internalPhoneMaskFunction('+71283')).toEqual(expectedArrayWithPlus);
    });
  });
});
