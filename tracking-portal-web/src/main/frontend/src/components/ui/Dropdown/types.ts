/*
 * Copyright (c) 2021. Prototype
 */

export type DropElement<Data> = {
  text: string;
  data: Data;
  note?: string;
  disabled?: boolean;
  match?: boolean;
};
export type RegionType = { code: string; name: string };
