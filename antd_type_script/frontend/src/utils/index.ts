/*
 * Copyright (c) 2020. Prototype
 */

export const compareAlphabetically = (a?: string, b?: string) => {
  const aText = a || '';
  const bText = b || '';
  if (aText < bText) return -1;
  if (aText > bText) return 1;
  return 0;
};

export const compareNumber = (a?: number, b?: number) => {
  const aNum = a || 0;
  const bNum = b || 0;
  if (aNum < bNum) return -1;
  if (aNum > bNum) return 1;
  return 0;
};
