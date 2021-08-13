/*
 * Copyright (c) 2021. Prototype
 */

import $ from 'jquery';
import {
  AccessSettingsDto,
  CountryInfo,
  DictionaryDto,
  ErrorDto,
  EventTypeDto,
  OperationTypeWithAttributeDto,
  PostMarkDto,
  StatisticsBatchSettings,
  StatisticsDto,
  StatisticsSettings,
  TechnicalTerm,
  UserInfo,
} from './api-dtos';
import { ApiServices } from './api-services';
import { Language } from '../common/types';

const extractErrorDto = (xhr: JQueryXHR): ErrorDto => {
  if (xhr.responseJSON) {
    return xhr.responseJSON
  } else {
    return {
      type: "INTERNAL_SERVER_ERROR",
      status: xhr.status,
      messageKey: "error.message.internal-server-error",
    }
  }
}

class ApiServiceAjax implements ApiServices {

  getAccess = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      $.ajax("/api/v1.0/access/get-access", {
        type: 'POST',
      })
        .done((data, textStatus, xhr) => {
          resolve(data);
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        })
    })
  };

  /** @deprecated */
  sendRequest = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(params),
        dataType: "json"
      }).done((result, textStatus, xhr) => {
        if (result === "") {
          resolve(result);
        } else {
          reject(extractErrorDto(xhr));
        }
      }).fail((xhr: JQueryXHR) => {
        reject(extractErrorDto(xhr));
      });
    });
  }

  // ----- statistics -----
  getStatistics = (): Promise<StatisticsDto> => {
    return new Promise((resolve, reject) => {
      $.ajax("/api/v1.0/statistics", {
        type: 'GET',
        dataType: "json"
      }).done((result, textStatus, xhr) => {
        resolve(result)
      }).fail((xhr: JQueryXHR) => {
        reject(extractErrorDto(xhr));
      });
    });
  };

  saveSettings = (params: StatisticsSettings): Promise<any> => {
    return new Promise((resolve, reject) => {
      $.post('/api/v1.0/statistics/saveSettings', params
      ).done((result, textStatus, xhr) => {
        resolve(result)
      }).fail((xhr: JQueryXHR) => {
        reject(extractErrorDto(xhr));
      });
    });
  }

  saveSettingsBatch = (params: StatisticsBatchSettings): Promise<any> => {
    return new Promise((resolve, reject) => {
      $.post('/api/v1.0/statistics/saveSettingsBatch', params
      ).done((result, textStatus, xhr) => {
        resolve(result)
      }).fail((xhr: JQueryXHR) => {
        reject(extractErrorDto(xhr));
      });
    });
  }

  // ----- access settings -----
  getAccessSettings = (): Promise<AccessSettingsDto> => {
    return new Promise((resolve, reject) => {
      $.ajax("/api/v1.0/access-settings", {
        type: 'GET',
        dataType: "json"
      }).done((data, textStatus, xhr) => {
        resolve(data)
      }).fail((xhr: JQueryXHR) => {
        reject(extractErrorDto(xhr));
      });
    });
  }

  resetPassword = () => {
    return new Promise((resolve, reject) => {
      $.ajax("/api/v1.0/access-settings/resetPassword", {
        type: 'POST',
      }).done((data, textStatus, xhr) => {
        if (xhr.status === 200) {
          resolve(data);
        } else {
          reject(extractErrorDto(xhr));
        }
      })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  sendSettings = () => {
    return new Promise((resolve, reject) => {
      $.ajax("/api/v1.0/access-settings/sendInfo", {
        type: 'POST'
      }).done((data, textStatus, xhr: JQueryXHR) => {
        if (xhr.status === 200) {
          resolve(data)
        } else {
          reject(extractErrorDto(xhr));
        }
      })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  getUserInfo = (): Promise<UserInfo> => {
    return new Promise((resolve, reject) => {
      $.ajax("/api/v1.0/user/info", {
        type: 'GET',
        dataType: "json"
      })
        .done((data) => {
          resolve({ ...data, isAuthorized: true });
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/category-codes */
  getCategoryCodes = (language: Language): Promise<DictionaryDto[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/category-codes", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/operation-codes */
  getOperationTypeWithAttributes = (language: Language): Promise<OperationTypeWithAttributeDto[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/operation-codes", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/mailrank */
  getMailRanks = (language: Language): Promise<DictionaryDto[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/mailrank", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/mailtype */
  getMailTypes = (language: Language): Promise<DictionaryDto[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/mailtype", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/postmark */
  getPostmarks = (language: Language): Promise<PostMarkDto[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/postmark", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/countries */
  getCountries = (language: Language): Promise<CountryInfo[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/countries", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/send-ctg */
  getSendCategories = (language: Language): Promise<DictionaryDto[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/send-ctg", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/event-type */
  getEventTypes = (language: Language): Promise<EventTypeDto[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/event-type", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }

  /** /public-api/v1.0/dictionary/special-terms */
  getTechnicalTerms = (language: Language): Promise<TechnicalTerm[]> => {
    return new Promise((resolve, reject) => {
      $.ajax("/public-api/v1.0/dictionary/special-terms", {
        type: 'GET',
        data: { langCode: language },
        dataType: "json"
      })
        .done((data) => {
          resolve(data)
        })
        .fail((xhr: JQueryXHR) => {
          reject(extractErrorDto(xhr));
        });
    });
  }
}

export default ApiServiceAjax;
