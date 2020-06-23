/*
 * Copyright (c) 2020. Prototype
 */

export type WithRedirectHocProps = {
  redirect: (url: string) => void;
};

export type WithReplaceUrlHocProps = {
  replaceUrl: (url: string) => void;
};
