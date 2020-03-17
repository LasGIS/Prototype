/*
 * Copyright (c) 2020. Prototype
 */

export const enumToMap = (aEnum) => {
  return Object.values(aEnum).filter(en => !isNaN(Number(en)));
};