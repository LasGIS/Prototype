/*
 * Copyright (c) 2020. Prototype
 */

import { GetAllActionTypes } from '../types/redux-types';
import * as actions from './action-creators';

export enum RequestState {
  UNDEFINED, START, SUCCESS, FAIL
}

export type CommonStoreData = {
  loading?: boolean;
};

export type CommonActions = ReturnType<GetAllActionTypes<typeof actions>>;
