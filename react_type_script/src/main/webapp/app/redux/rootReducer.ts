/*
 * Copyright (c) 2020. Prototype
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { globalReducer } from '../common/services/reducer';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    global: globalReducer,
  });
