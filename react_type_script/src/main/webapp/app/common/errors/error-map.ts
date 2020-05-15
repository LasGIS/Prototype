/*
 * Copyright (c) 2020. Prototype
 */

export const API_ERROR: { [key: string]: number } = {
  /** ошибка вызова DC */
  CONNECTION_DC: 101,
  /** ошибка вызова Тарификатора */
  CONNECTION_TARIFF: 102,
  /** Пустой ответ от сервиса тарификации */
  RESPONSE_TARIFF_EMPTY_RESPONSE: 203,
  /** Ошибка выделения ШПИ */
  RESPONSE_BARCODE_CREATING: 204,
  /** ошибочный тип ШИ при вычитывании из DataCloud */
  REQUEST_DC_30E_OBJECT_TYPE: 302,
  /** Расчет тарифа - нет Вида отправления */
  REQUEST_TARIFF_NO_MAIL_TYPE: 303,
  /** Расчет тарифа - нетарифицированный вид отправления */
  REQUEST_TARIFF_NO_CALCULATE_MAIL_TYPE: 304,
  /** Расчет тарифа - нетарифицированный вид отправления */
  REQUEST_TARIFF_WRONG_INDEX: 305,
  /** Расчет тарифа - нет получателя */
  REQUEST_TARIFF_NO_RECIPIENT: 306,
  /** Расчет тарифа - нет индекса адреса получателя */
  REQUEST_TARIFF_NO_INDEX_OF_RECIPIENT: 307,
  /** Расчет тарифа - нет адреса отправителя */
  REQUEST_TARIFF_NO_ADDRESS_OF_SENDER: 308,
  /** Расчет тарифа - нет индекса адреса отправителя */
  REQUEST_TARIFF_NO_INDEX_OF_SENDER: 309,
  /** Пользователь с именем : %s) уже есть */
  REQUEST_USER_CREATING: 311,
  /** Ошибка выделения ШПИ */
  SHPI_VALIDATE: 312,
  /** Ошибка выделения ШПИ */
  SHI_VALIDATE: 313,
  /** Нет информации по РПО с ШПИ */
  UKD_ID_VALIDATE: 314,
  /** Емкость : %s) из контейнера : %s) не найдена */
  CAPACITY_NOT_FOUND: 315,
  /** Контейнер : %s) не найден */
  CONTAINER_NOT_FOUND: 316,
  /** Емкость : %s) не найдена */
  CAPACITY_NOT_FOUND3: 321,
  /** Для сканирования отправлений в инвентаризации необходимо просканировать зону. */
  INVENTORY_HAS_NO_ZONE: 1202,
  /** Не найдена инвентаризация  */
  INVENTORY_NOT_FOUND: 1200,
  /** Инвентаризация была прервана. Инициатор: %s */
  INVENTORY_WAS_INTERRUPTED: 1206,
  /** Инвентаризация в стадии анализа. Инициатор: #author. */
  INVENTORY_IN_ANALYSIS: 1208,
  /** Есть конфликты подбора РПО */
  DELIVERY_LIST_COLLECTION_COMPLETION_HAS_CONFLICTS: 1300,
  /** Есть конфликты обработки РПО маршрутного листа при приёме курьера с маршрута */
  ROUTE_LIST_PROCESSING_COMPLETION_HAS_CONFLICTS: 1300,

  // ошибки данных
  /** ошибка в работе Тарификатора */
  DATA_TARIFF_SUM: 401,
  /** Нет информации по емкости */
  DATA_CAPACITY_NOT: 402,
  /** Ошибка структуры емкости */
  DATA_CAPACITY_STRUCTURE: 403,
  /** Нет информации по РПО с указанным ШПИ (в кладовке отсутствует) */
  DATA_RPO_BARCODE_NOT_FOUND: 412,
  /** Нет информации по РПО с ШПИ */
  DATA_NOT_BARCODE: 415,
  /** Контейнер с данным ШИ : %s) уже регистрируется в : %s) УКД */
  SI_REGISTERED_OTHER_UKD: 416,
  /** Контейнер с ШИ : %s) уже зарегистрирован */
  SI_REGISTERED: 417,
  /** Нет информации по вложениям для ШИ %s */
  DATA_NOT_CONTAINER_BARCODE: 4170,
  /** Нет информации по контейнеру с ШИ : %s) */
  DATA_NOT_CONTAINER_LINKS_BARCODE: 418,
  /** РПО : %s) уже зарегистрированно */
  RPO_ALREADY_REGISTERED: 419,
  /** Емкости : %s) уже зарегистрированна */
  CAPACITY_ALREADY_REGISTERED: 420,
  /** Операция не доступна для отправления с ШИ %s в статусе %s */
  RPO_CHANGE_STATE_ERROR: 422,
  /** Ошибка изменения состояния емкости  */
  CAPACITY_CHANGE_STATE_ERROR: 423,
  /** Емкость <ШИ> уже приписана к контейнеру <ШИ емкости> */
  CAPACITY_BELONGS_ANOTHER_CAPACITY: 324,
  /** Емкость<ШИ> уже приписана к формируемой емкости */
  CAPACITY_BELONGS_CURRENT_CAPACITY: 323,
  /** Невалидный номер пломбы при закрытии емкости */
  CLOSING_CAPACITY_SEAL_NUMBER_INVALID: 914,
  /** Вес емкости %s меньше минимума при закрытии емкости */
  CLOSING_CAPACITY_MIN_WEIGHT_INVALID: 915,
  /** Вес емкости %s больше максимума при закрытии емкости */
  CLOSING_CAPACITY_MAX_WEIGHT_INVALID: 916,
  /** РПО <ШПИ> уже находится в другом доставочном листе <номер листа> */
  DATA_RPO_BELONGS_ANOTHER_DELIVERY_LIST: 924,

  // ошибки при выполнении
  /** Тарификатора вернул информацию об ошибке */
  RUNTIME_TARIFF_ERROR: 501,
  /** Ошибка в процессе выполнения */
  RUNTIME_ERROR: 502,
  /** Дубликат контейнера */
  RUNTIME_CONTAINER_DUPLICATE: 504,
  /** Маршрутизатор не сработал. Нужно выбрать маршрут вручную. */
  NEED_TO_CHOOSE_ROUTE_MANUALLY: 508,

  // ошибки тестирования
  /** эмуляция ошибки в целях тестирования */
  TEST_EMULATION_ERROR: 601,
  /** Ошибка кодирования для трекинга */
  DEV_TRACKING_JSON_ERROR_READ: 708,
  /** Ошибка вычитывания профиля */
  DEV_USER_READ_PROFILE: 709,
  /** Не удалось получить PDF файл - ошибка преобразования XML */
  DEV_REPORT_XML_CONVERSION_ERROR: 710,
  /** Нет возможности получения PDF документа */
  DEV_REPORT_CREATE_ERROR: 711,
  /** Ошибка инициализации библиотеки обработки PDF документов */
  DEV_CONFIG_INITIALIZING_LIBRARY: 712,
  /** Ресурс " + href + " не найден */
  DEV_CONFIG_RESOURCE_NOT_FOUND: 713,
  /** Не удалось получить PDF файл */
  DEV_REPORT_FAILED_GET_PDF: 715,
  /** Ошибка PDF преобразования */
  DEV_REPORT_PDF_CONVERSION: 716,
  /** Ошибка создания пользователя, так как он уже существует */
  RUNTIME_USER_DUPLICATE: 802,
  /** Добавление РПО в доставочный лист содержит конфликты */
  DATA_RPO_ADDITION_IN_DELIVERY_LIST_HAS_CONFLICTS: 918,
  /** Отправление %s находилось в зоне %s, недоступной для передачи в доставку */
  DATA_RPO_IS_IN_ZONE_UNAVAILABLE_FOR_DELIVERY_ZONE: 910,
  /** Удаление РПО из доставочного листа содержит конфликты */
  DATA_RPO_REMOVING_FROM_DELIVERY_LIST_HAS_CONFLICTS: 918,
  /** Все отправления Доставочного листа <Номер Доставочного листа> уже обработаны. */
  DATA_ALL_ROUTE_LIST_RPOS_ALREADY_PROCESSED: 918,
  /** Информация по РПО требует уточнения (не заполнены важные данные) */
  DATA_RPO_NEEDS_CLARIFYING: 908,
  /** Емкость не найдена по ШИ */
  CAPACITY_NOT_FOUND_BY_BARCODE: 911,
  /** План направления вернул пустой список для переданного РПО %s */
  EMPTY_DIRECTION_PLAN: 919,
  /** План направления вернул множественный список для переданного РПО %s */
  SEVERAL_DIRECTION_PLANS: 920,
  /** Нет возможности определить план направления для переданного РПО %s и емкость приписана к магистрали */
  CAN_NOT_DETERMINE_DIRECTION_PLAN: 921,
  /** Рпо не принадлежит емкости */
  RPO_NOT_FOUND_IN_CAPACITY: 925,
  /** Попытка сканирования неправильного ДШК. */
  DATA_MATRIX_IS_INCORRECT: 1000,
  /** Попытка обработать неполный набор ДШК. */
  DATA_MATRIX_NOT_PROCESSED: 1001,
  /** Попытка сканирования неправильного ДШК. */
  DATA_MATRIX_ALREADY_LOADED: 1002,
  /** Емкость была загружена из ДШК при загрузке контейнера и не находится в DC. */
  CAPACITY_LOADED_FROM_CONTAINER_MATRIX: 1003,
  /** Остался не обработанным второй ДШК на странице. */
  DATA_MATRIX_NOT_PROCESSED_SECOND: 1004,
  /** Приём курьера с маршрута. Не все РПО отработаны после запроса на их обработку */
  COURIER_RECEPTION_NOT_ALL_RPOS_WERE_PROCESSED_AFTER_REQUEST: 1302,
  /** Емкость не может быть расформирована, так как уже расформирована */
  CAPACITY_HAS_ALREADY_BEEN_UNFORMED: 325,
  /** Емкость не может быть расформирована, так как приписана к задаче на отправку */
  CAPACITY_CANNOT_BE_UNFORMED_IF_HAS_LINK_TO_HIGHWAY_TASK: 1501,
  /** У РПО не корректный (или отсутствует) адрес доставки - нет возможности приписать к емкости */
  RPO_DELIVERY_ADDRESS_IS_NOT_VALID: 1502,

  /** Ошибки при аутентификации во время совершения действий */
  AUTH_USER_ACCESS_DENIED: 820,
  AUTH_USER_BELONG_TO_OTHER_UKD: 821,
  AUTH_USER_NOT_FOUND: 801,
  AUTH_PASSWORD_ERROR: 822,
};
