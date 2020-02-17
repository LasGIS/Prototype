/*
 * Copyright (c) 2020. Prototype
 */

const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { mockData } = require('./mock');
const { inventoryData } = require('./mock_data_modules/inventory/inventoryData');
const { courierDispatchData } = require('./mock_data_modules/courier-dispatch-2/courierDispatchData');
const { capacityFormingData } = require('./mock_data_modules/capacity-forming/capacityFormingData');
const { courierReceptionData } = require('./mock_data_modules/courier-reception/courierReceptionData');
const { rpoRegistrationData } = require('./mock_data_modules/rpo-registration/rpoRegistrationData');
const { addressServiceData } = require('./mock_data_modules/address-service/addressServiceData');
const { ukdPassportData } = require('./mock_data_modules/ukd-passport/ukdPassportData');
const { warehouseData } = require('./mock_data_modules/warehouse/warehouseData');
const { ukdRouteListReportData } = require('./mock_data_modules/ukd-route-list-report/ukdRouteListReportData');

const apiVersionOne = '/v1.0';
const apiVersionTwo = '/v2.0';
const successResponse = { status: 200 };

// Get dynamic param from url example
// Url - '/article/:id'
// Get id code:
// req.params.id

// Get GET - params from request url
// const {mailType, mailCtg} = req.query

// Get POST, PUT - request data example
// const body = req.body;

// Return server error example
// res.status(404).json({error: "not found"});

router.post('/login', function(req, res, next) {
  res.json(successResponse);
});

router.get(apiVersionOne + '/catalog/:ukdId/all-routes', function(req, res, next) {
  res.json(mockData['routeList']);
});

router.get(apiVersionOne + '/catalog/:ukdId/all-couriers', function(req, res, next) {
  res.json(mockData['couriersList']);
});

router.get(apiVersionOne + '/catalog/mail-types', function(req, res, next) {
  res.json(mockData['mailTypes']);
});

router.get(apiVersionOne + '/catalog/mail-categories', function(req, res, next) {
  res.json(mockData['mailCategories']);
});

router.get(apiVersionOne + '/catalog/mail-rank-list', function(req, res, next) {
  res.json(mockData['mailRankList']);
});

router.get(apiVersionOne + '/catalog/all-countries', function(req, res, next) {
  res.json(mockData['countryList']);
});

router.get(apiVersionOne + '/catalog/post-marks', function(req, res, next) {
  res.json(mockData['post-marks']);
});

router.get(apiVersionOne + '/catalog/all-couriers', function(req, res, next) {
  res.json(mockData['all-couriers']);
});

router.get(apiVersionOne + '/catalog/all-routes', function(req, res, next) {
  res.json(mockData['all-routes']);
});

router.get(apiVersionOne + '/user/currentuser', function(req, res, next) {
  res.json(mockData['current-user-info']);
});

router.get(apiVersionOne + '/settings', function(req, res, next) {
  res.json(mockData['settings']);
});

/** Адресный сервис */

router.post(apiVersionOne + '/address/suggest', function(req, res, next) {
  res.json(addressServiceData.suggestData);
});

router.post(apiVersionOne + '/address/clean', function(req, res, next) {
  res.json(addressServiceData.cleanData);
});

router.post(apiVersionOne + '/address/clean-raw', function(req, res, next) {
  res.json(addressServiceData.cleanData);
});

/** END Адресный сервис */

router.get(apiVersionOne + '/catalog/ukd-list', function(req, res, next) {
  res.json(mockData['ukdList']);
});

router.post(apiVersionOne + '/rpo/tariff', function(req, res, next) {
  res.json(rpoRegistrationData.tariff);
});

router.post(apiVersionOne + '/rpo/accept', function(req, res, next) {
  res.json(mockData['accept-register-rpo']);
});

router.post(apiVersionOne + '/rpo/save', function(req, res, next) {
  res.json(mockData['accept-register-rpo']);
});

router.post(apiVersionOne + '/rpo/save-poor', function(req, res, next) {
  res.json(mockData['accept-register-rpo']);
});

router.get(apiVersionOne + '/catalog/additionalService', function(req, res, next) {
  // Get params from request url
  // const {mailType, mailCtg} = req.query
  res.json(mockData['get-rpo-additional-services']);
});

router.get(apiVersionOne + '/rpo/allEngMailDirect', function(req, res, next) {
  res.json(rpoRegistrationData.allEngMailDirect);
});

router.get(apiVersionOne + '/rpo/:barcode', function(req, res, next) {
  res.json(rpoRegistrationData.internationalRpo);
});

router.get(apiVersionOne + '/rpo/:barcode/event', function(req, res, next) {
  res.json(mockData['find-rpo-event']);
});

router.post(apiVersionOne + '/capacity-rpo/:barcodeContainer/:barcodeCapacity/accept', function(req, res, next) {
  res.json(mockData['accept-register-rpo']);
});

router.post(apiVersionOne + '/capacity-rpo/:barcodeContainer/:barcodeCapacity/save', function(req, res, next) {
  res.json(mockData['accept-register-rpo']);
});

router.post(apiVersionOne + '/capacity-rpo/:barcodeContainer/:barcodeCapacity/save-poor', function(req, res, next) {
  res.json(mockData['accept-register-rpo']);
});

/** Формирование емкости */

router.post(apiVersionOne + '/capacity', function(req, res, next) {
  res.json({
    capacityFormationId: 'capacity-task-2076b468-8d3a-493f-bb8c-6f1b0cd9e54b',
  });
});

router.get(apiVersionOne + '/capacity/validate-seal-number', function(req, res, next) {
  const { sealNumber } = req.query;

  if (!sealNumber || sealNumber.trim().length < 3) {
    res.status(400).json({ code: 914, text: `Проверьте правильность ввода номера пломбы` });
    return null;
  }

  res.json(successResponse);
});

router.get(apiVersionOne + '/capacity/:id/allowed-types', function(req, res, next) {
  res.json(capacityFormingData.capacityFormationAllowedTypes);
});

router.post(apiVersionOne + '/capacity/:id/to-form', function(req, res, next) {
  res.json(successResponse);
});

router.get(apiVersionOne + '/capacity/:id', function(req, res, next) {
  const task = capacityFormingData.capacityFormationTask;

  res.json(task);
});

router.get(apiVersionOne + '/capacity', function(req, res, next) {
  res.json(capacityFormingData.capacityFormationTaskList);
});

/** Добавление/удаление РПО */

router.post(apiVersionOne + '/capacity/:id/rpo/:barcode', function(req, res, next) {
  const rpoBarcode = req.params.barcode;

  /** Ошибки добавления РПО в Емкость */
  if (rpoBarcode.trim() === '111') {
    res.status(404).json({ code: 415, text: `Нет информации по РПО с ШПИ ${rpoBarcode}` });
    return null;
  }

  if (rpoBarcode.trim() === '222') {
    res.status(404).json({
      code: 422,
      text: `Отправление ${rpoBarcode} уже приписано к емкости CAPACITY777`,
    });
    return null;
  }

  if (rpoBarcode.trim() === '333') {
    res.status(404).json({
      code: 422,
      text: `Отправление ${rpoBarcode} уже приписано к формируемой емкости`,
    });
    return null;
  }

  /** Ошибки ШПИ, РПО */
  if (rpoBarcode.trim() === '777') {
    res.status(404).json({ code: 412, text: `РПО с таким ШПИ (${rpoBarcode}) не найден` });
    return null;
  }

  if (rpoBarcode.trim().length < 13) {
    res.status(400).json({ code: 312, text: `Проверьте правильность ввода ШПИ` });
    return null;
  }

  res.json(successResponse);
});

router.delete(apiVersionOne + '/capacity/:id/rpo/:barcode', function(req, res, next) {
  res.json(successResponse);
});

/** Добавление/удаление емкостей */

router.post(apiVersionOne + '/capacity/:id/capacity/:barcode', function(req, res, next) {
  const capacityBarcode = req.params.barcode;

  /** Ошибки добавления Емкости в Емкость */
  if (capacityBarcode.trim() === '222') {
    res.status(404).json({
      code: 324,
      text: `Емкость ${capacityBarcode} уже приписана к контейнеру CONTAINER007`,
    });
    return null;
  }

  if (capacityBarcode.trim() === '333') {
    res.status(404).json({
      code: 323,
      text: `Емкость ${capacityBarcode} уже приписана к формируемой емкости`,
    });
    return null;
  }

  /** Ошибки ШПИ, Емкость */
  if (capacityBarcode.trim() === '777') {
    res.status(404).json({ code: 321, text: `Емкость ${capacityBarcode} не найдена` });
    return null;
  }

  if (capacityBarcode.trim().length < 13) {
    res.status(400).json({ code: 313, text: `Проверьте правильность ввода ШИ` });
    return null;
  }

  res.json(successResponse);
});

router.delete(apiVersionOne + '/capacity/:id/capacity/:barcode', function(req, res, next) {
  res.json(successResponse);
});

/** END Формирование емкости */

/** Регистрация контейнера */
{
  router.get(apiVersionOne + '/container', function(req, res, next) {
    res.json(mockData.containerList);
  });

  router.get(apiVersionOne + '/container/barcode/:barcode', function(req, res, next) {
    console.log(123);
    res.json(mockData.containerData);
  });

  router.get(apiVersionOne + '/container/:barcode/details', function(req, res, next) {
    res.json(mockData.containerDetails);
  });

  router.post(apiVersionOne + '/capacity/accept', function(req, res, next) {
    res.json(mockData.capacityAccept);
  });

  router.put(apiVersionOne + '/capacity/:id/complete', function(req, res, next) {
    res.json(mockData.capacityComplete);
  });

  router.get(apiVersionOne + '/capacity/:id', function(req, res, next) {
    res.json(mockData.capacityData);
  });

  router.get(apiVersionOne + '/capacity/:id/details', function(req, res, next) {
    console.log(123);
    res.json(mockData.capacityDetails);
  });
}
/** END Регистрация контейнера */

router.get(apiVersionOne + '/stockroom', function(req, res, next) {
  res.json(mockData['stockroom']);
});

router.post(apiVersionOne + '/stockroom/rpo', function(req, res, next) {
  res.json(mockData['save-stockroom-rpo']);
});

router.get(apiVersionOne + '/stockroom/rpo/:barcode', function(req, res, next) {
  res.json(rpoRegistrationData.internationalRpo);
});

router.post(apiVersionOne + '/stockroom/rpos', function(req, res, next) {
  res.json(mockData['stockroom']);
});

router.get(apiVersionOne + '/catalog/rpo-statuses', function(req, res, next) {
  res.json(mockData['rpo-statuses']);
});

router.get(apiVersionOne + '/catalog/rpo-priorities', function(req, res, next) {
  res.json(mockData['rpo-priorities']);
});

router.get(apiVersionOne + '/catalog/stockroom-zones', function(req, res, next) {
  res.json(mockData['stockroom-zones']);
});

router.get(apiVersionOne + '/catalog/slots', function(req, res, next) {
  res.json(mockData['slots']);
});

router.post(apiVersionOne + '/stockroom/available-zones', function(req, res, next) {
  res.json([
    {
      name: 'zone-1',
      text: 'Зона 1',
    },
    {
      name: 'zone-2',
      text: 'Зона 2',
    },
    {
      name: 'zone-3',
      text: 'Зона 3',
    },
  ]);
});

/** Администрирование пользователей */

router.get(apiVersionOne + '/prefilleduserinfo', function(req, res, next) {
  res.json(mockData.prefilledUserInfo);
});

router.get(apiVersionOne + '/user', function(req, res, next) {
  const usersData = { ...mockData['get-all-users'] };
  const allUsers = mockData['get-all-users'][['content']];
  let preparedUsers = allUsers;
  const { roles } = req.query;

  if (roles && roles.includes('COURIER')) {
    preparedUsers = convertUsersToCouriers(allUsers);
    usersData.content = preparedUsers;
  }

  res.json(usersData);

  // utils

  function convertUsersToCouriers(users) {
    const result = [];

    for (let i = 0; i < users.length; i++) {
      const user = { ...users[i] };
      user.roles.length = 0;
      user.name = `${user.name} courier-${i + 1}`;
      user.fio = `Курьер №${i + 1}`;
      user.roles = [
        {
          name: 'COURIER',
          text: 'Курьер',
        },
      ];
      result.push(user);
    }

    return result;
  }
});

router.get(apiVersionOne + '/user/:id', function(req, res, next) {
  const allUsers = mockData['get-all-users']['content'];
  const userId = req.params.id;
  let user = {};
  for (let i = 0; i < allUsers.length; i++) {
    if (userId === allUsers[i].id) {
      user = allUsers[i];
      break;
    }
  }
  res.json(user);
});

router.put(apiVersionOne + '/user/:id', function(req, res, next) {
  res.json(mockData['get-user']);
});

router.delete(apiVersionOne + '/user/:id', function(req, res, next) {
  res.json(mockData['delete-user']);
});

router.post(apiVersionOne + '/user', function(req, res, next) {
  res.json(mockData['add-user']);
});

router.get(apiVersionOne + '/role', function(req, res, next) {
  res.json(mockData['get-all-roles']);
});

router.put(apiVersionOne + '/user/:userId/password', function(req, res, next) {
  res.json(mockData['set-password']);
});

router.get(apiVersionOne + '/user/:id/ukd', function(req, res, next) {
  res.json(mockData['ukd-list-by-user-id']);
});

/** Запрос доступных принтеров для локального сервиса печати */

router.get(apiVersionOne + '/print/printers', function(req, res, next) {
  res.json(mockData['available-printers']);
});

/** Паспорт УКД */

router.get(apiVersionOne + '/ukd/:ukdId', function(req, res, next) {
  const { ukdDetailDto } = ukdPassportData;
  const { ukdId } = req.params;

  res.json({
    ...ukdDetailDto,
    id: `${ukdId}`,
    name: `${ukdDetailDto.name} (${ukdId})`,
    macroregionId: `${ukdDetailDto.macroregionId}${ukdId}`,
    macroregionName: `${ukdDetailDto.macroregionName}${ukdId}`,
  });
});

router.put(apiVersionOne + '/ukd/:ukdId', function(req, res, next) {
  const { ukdDetailDto } = ukdPassportData;
  const { ukdId } = req.params;
  const { noZones } = req.body;

  res.json({
    ...ukdDetailDto,
    id: `${ukdId}`,
    name: `${ukdDetailDto.name} (${ukdId})`,
    macroregionId: `${ukdDetailDto.macroregionId}${ukdId}`,
    macroregionName: `${ukdDetailDto.macroregionName}${ukdId}`,
    noZones: Boolean(noZones),
  });
});

/** Отчет. Список маршрутов */

router.get(apiVersionOne + '/route/report', function(req, res, next) {
  const { pageNumber } = req.query;

  res.json({
    ...ukdRouteListReportData.routeResultDto,
    pageCurrent: pageNumber,
  });
});

/** END Отчет. Список маршрутов */

router.get(apiVersionOne + '/route/:ukdId', function(req, res, next) {
  res.json(ukdPassportData.ukdRoutes);
});

/** Инвентаризация */

router.post(apiVersionOne + '/inventory', function(req, res, next) {
  res.json(inventoryData.currentInventory);
});

router.post(apiVersionOne + '/inventory/:id/link', function(req, res, next) {
  res.json(inventoryData.currentInventory);
});

router.post(apiVersionOne + '/inventory/:id/scan/:barcode', function(req, res, next) {
  const { barcode } = req.params;

  if (barcode === '111' || barcode === '222') {
    const isZoneError = barcode === '111';
    const code = isZoneError ? 1202 : 1200;
    const text = isZoneError
      ? `Для сканирования отправлений в инвентаризации необходимо просканировать зону.`
      : `Инвентаризация была прервана. Инициатор: Иванов И.И.`;

    res.status(404).json({
      code,
      text,
    });
    return null;
  }

  res.json(inventoryData.currentInventory);
});

router.get(apiVersionOne + '/inventory/:id', function(req, res, next) {
  const showInAnalysisError = false;

  if (showInAnalysisError) {
    res.status(404).json({
      code: 1208, // 1206
      text: `Инвентаризация находится в стадии анализа. Инициатор: Иванов И.И.`,
    });
    return null;
  }

  res.json(inventoryData.currentInventory);
});

router.get(apiVersionOne + '/inventory/:id/rpo', function(req, res, next) {
  const { conflict } = req.query;
  const inventoryRpoList = { ...inventoryData.inventoryRpoList };

  if (conflict) {
    inventoryRpoList.content = inventoryRpoList.content.map(i => ({ ...i, conflict: true }));
  }

  res.json(inventoryRpoList);
});

router.get(apiVersionOne + '/inventory/:id/rpo/count/by-zone', function(req, res, next) {
  res.json(inventoryData.inventoryRpoCountByZone);
});

router.get(apiVersionOne + '/rpo/count/by-zone', function(req, res, next) {
  setTimeout(() => {
    res.json(inventoryData.ukdRpoCountByZone);
  }, 500);
});

router.get(apiVersionOne + '/inventory', function(req, res, next) {
  const { page, size, statuses } = req.query;

  if (page === '0' && size === '1' && statuses === 'SCANNING,ANALYZE') {
    // Возврат данных о текущей инвентаризации (в стадии сканирования или анализа)

    res.json({
      content: [
        // {
        //   ...inventoryData.currentInventory,
        //   status: 'ANALYZE', //  (SCANNING - сканирование, ANALYZE - анализ, COMPLETED - завершена, INTERRUPTED - прервана)
        // },
      ],
    });
    return null;
  }

  res.json(inventoryData.inventoryList);
});

router.delete(apiVersionOne + '/inventory/:id', function(req, res, next) {
  res.json(inventoryData.currentInventory);
});

router.put(apiVersionOne + '/inventory/:id/to-analyze', function(req, res, next) {
  res.json(inventoryData.currentInventory);
});

router.put(apiVersionOne + '/inventory/:id/complete', function(req, res, next) {
  res.json(inventoryData.currentInventory);
});

router.put(apiVersionOne + '/inventory/:id/rpo/:barcode/resolve-conflict', function(req, res, next) {
  res.json(inventoryData.currentInventory);
});

/** Отправка курьера на маршрут */

router.get(apiVersionOne + '/courier-dispatch/task/:taskId', function(req, res, next) {
  const singleDeliveryTask = { ...courierDispatchData.singleDeliveryTask };

  res.json(singleDeliveryTask);
});

router.get(apiVersionOne + '/courier-dispatch/task', function(req, res, next) {
  const { statuses } = req.query;
  const deliveryList = [...courierDispatchData.deliveryList];

  if (statuses === 'SELECTION_COMPLETED,FORMED,CONFIRMED,WORK_SHIFT_OPENED') {
    deliveryList[0] = {
      ...deliveryList[0],
      status: {
        key: 'SELECTION_COMPLETED',
        value: 'Отправления подобраны',
      },
    };

    deliveryList[1] = {
      ...deliveryList[1],
      status: {
        key: 'FORMED',
        value: 'Сформирован',
      },
      deliveryReportId: 'report-id-1',
    };

    deliveryList[2] = {
      ...deliveryList[2],
      status: {
        key: 'FORMED',
        value: 'Сформирован',
      },
      deliveryReportId: 'report-id-2',
    };

    deliveryList[3] = {
      ...deliveryList[3],
      status: {
        key: 'FORMED',
        value: 'Сформирован',
      },
      deliveryReportId: 'report-id-3',
    };
  }

  res.json(deliveryList);
});

router.post(apiVersionOne + '/courier-dispatch/task/:taskId/to-confirmed', function(req, res, next) {
  res.json(successResponse);
});

router.post(apiVersionOne + '/courier-dispatch/task/:taskId/rpo/:barcode', jsonParser, function(req, res, next) {
  const { skipConditions } = req.body;

  if (!skipConditions) {
    res.status(404).json({
      code: 918, // 918, 908, 312, 909
      text: `Ошибка добавления РПО, невалидный ШПИ.`,
    });

    return null;
  }

  res.json(successResponse);
});

router.delete(apiVersionOne + '/courier-dispatch/task/:taskId/rpo/:barcode', jsonParser, function(req, res, next) {
  const { skipConditions } = req.body;

  if (!skipConditions) {
    res.status(404).json({
      code: 918,
      text: `Есть конфликты удаления РПО`,
    });

    return null;
  }

  res.json(successResponse);
});

router.post(apiVersionOne + '/courier-dispatch/task/:taskId/finish-selection', function(req, res, next) {
  const showConflictsError = true;

  if (showConflictsError) {
    res.status(404).json({
      code: 1300,
      text: `Есть конфликты подбора РПО`,
    });
    return null;
  }

  res.json(successResponse);
});

router.post(apiVersionOne + '/courier-dispatch/task/:taskId/sending-to-route', function(req, res, next) {
  res.json(successResponse);
});

router.post(apiVersionOne + '/courier-dispatch/task/:taskId/finish-selection/approve', function(req, res, next) {
  res.json(successResponse);
});

router.post(apiVersionOne + '/courier-dispatch/task/:taskId/sending-to-route/approve', function(req, res, next) {
  res.json(successResponse);
});

router.delete(apiVersionOne + '/courier-dispatch/task/:taskId', function(req, res, next) {
  res.json(successResponse);
});

/** Приём курьера с маршрута */

router.get(apiVersionOne + '/courier-reception/task/:taskId', function(req, res, next) {
  const singleRouteTask = { ...courierReceptionData.singleRouteTask };

  res.json(singleRouteTask);
});

router.get(apiVersionOne + '/courier-reception/task', function(req, res, next) {
  const routeList = [...courierReceptionData.routeList];

  res.json(routeList);
});

router.post(apiVersionOne + '/courier-reception/courier-task/:courierTaskId/mark', function(req, res, next) {
  const showError = false;

  if (showError) {
    res.status(404).json({
      code: 918,
      text: `Все отправления Доставочного листа №777 уже обработаны.`,
    });

    return null;
  }

  res.json(successResponse);
});

router.post(apiVersionOne + '/courier-reception/task/:taskId/:barcode', function(req, res, next) {
  res.json(successResponse);
});

router.post(apiVersionOne + '/courier-reception/task/:taskId/rpo-processing/complete', function(req, res, next) {
  const showConflictsError = true;

  if (showConflictsError) {
    res.status(404).json({
      code: 1302,
      text: `Есть конфликты обработки списка РПО`,
    });
    return null;
  }

  res.json(courierReceptionData.singleRouteTask);
});

router.post(apiVersionOne + '/courier-reception/task/:taskId/rpo-processing/approve', function(req, res, next) {
  const showConflictsError = false;

  if (showConflictsError) {
    res.status(404).json({
      code: 1302,
      text: `Не все РПО были обработаны после их обработки по запросу`,
    });
    return null;
  }

  res.json(courierReceptionData.singleRouteTask);
});

router.get(apiVersionOne + '/courier-reception/rpo-status/delivery', function(req, res, next) {
  res.json(courierReceptionData.rpoDeliveryStatuses);
});

router.get(apiVersionOne + '/courier-reception/rpo-status/not-delivery', function(req, res, next) {
  res.json(courierReceptionData.rpoNotDeliveryStatuses);
});

router.get(apiVersionOne + '/courier-reception/rpo-status/selection', function(req, res, next) {
  res.json(courierReceptionData.rpoSelectionStatuses);
});

/** Версия приложения */

router.get('/monitoring/version', function(req, res, next) {
  res.send('1.4.33 (mock dev server)');
});

/** Отчет. Отправления в доставке (ex. Состояние склада) */

router.post(apiVersionOne + '/warehouse/rpo', jsonParser, function(req, res, next) {
  const { pageNumber } = req.body;

  res.json({
    ...warehouseData.pageData,
    pageCurrent: pageNumber,
  });
});

/** Кладовая хранения */

router.post(apiVersionOne + '/stockroom/rpos-transfer-zone', jsonParser, function(req, res, next) {
  const showError = false;

  if (showError) {
    res.status(404).json({
      code: 820, // 820, 821, 801, 822
      text: `Ошибка изменения зоны РПО 1`,
    });
    return null;
  }

  res.json(successResponse);
});

module.exports = router;
