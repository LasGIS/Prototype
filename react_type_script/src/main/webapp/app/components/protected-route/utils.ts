/*
 * Copyright (c) 2020. Prototype
 */

export const enumToMap = (aEnum: any) => {
  return Object.values(aEnum).filter(en => !isNaN(Number(en)));
};