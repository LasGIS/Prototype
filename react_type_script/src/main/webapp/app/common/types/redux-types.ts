/*
 * Copyright (c) 2020. Prototype
 */

// import { UkdPassportStoreData } from '../../pages/UkdPassport/ukd-passport-redux-types';
// import { CourierDispatchRootStoreData } from '../../pages/CourierDispatch/courier-dispatch-redux-types';
// import { UkdRouteListReportRootStoreData } from '../../pages/UkdRouteListReport/ukd-route-list-report-redux-types';

export type GetAllActionTypes<ActionsMap> = ActionsMap extends { [key: string]: infer Action } ? Action : never;

export type RootStoreData = {
  // ukdPassport: UkdPassportStoreData;
  // courierDispatch: CourierDispatchRootStoreData;
  // ukdRouteListReport: UkdRouteListReportRootStoreData;
};
