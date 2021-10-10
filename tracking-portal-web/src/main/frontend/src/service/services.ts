/*
 * Copyright (c) 2021. Prototype
 */

import ApiServiceAjax from './api-service-ajax';
import ApiServiceMock from './api-service-mock';
import { ApiServices } from './api-services';

class Services {
  apiControl: ApiServices;

  constructor(opt: { useMock: boolean }) {
    this.apiControl = opt.useMock ? new ApiServiceMock() : new ApiServiceAjax();
  }
}

export default new Services({ useMock: true });
