/*
 * Copyright (c) 2021. Prototype
 */

import { formatValue, parseMask } from '../utils';

describe('Тесты для утилиты utils.ts', () => {

  it('parseMask. непустая маска', async () => {
    const expected = {
      mask: "+7 (999) 999-99-99",
      //     ^^^^   ^^   ^  ^
      permanents: [0, 1, 2, 3, 7, 8, 12, 15]
    };
    expect(parseMask("+7 (999) 999-99-99")).toEqual(expected);
  });

  it('parseMask. пустая маска', async () => {
    const expected = {
      permanents: []
    };
    expect(parseMask(undefined)).toEqual(expected);
  });

  describe('получили state for phone mask', () => {
    const state = {
      value: "",
      mask: "+7 (999) 999-99-99",
      permanents: [0, 1, 2, 3, 7, 8, 12, 15],
      maskChar: '_'
    };

    it('formatValue. правильный формат', async () => {
      expect(formatValue("+7 (987) 123-45-67", state)).toEqual("+7 (987) 123-45-67");
    });
    it('formatValue. не правильный формат', async () => {
      expect(formatValue("+7 (987)1234567", state)).toEqual("+7 (987) 123-45-67");
    });
  });

});
