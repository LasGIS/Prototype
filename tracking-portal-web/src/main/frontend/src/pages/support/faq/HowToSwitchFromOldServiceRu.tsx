/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const HowToSwitchFromOldServiceRu = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Часто задаваемые вопросы</Link>
      <h3> Я пользовался старым сервисом. Как переключиться на новый?</h3>
      <article className="page-help-article__content">
        <p dir="ltr">Начиная с 12:00 16.11.2015 интерфейсы старого сервиса отслеживания (ОАСУ РПО) будут недоступны для обращений внешних клиентов.
          Полный список адресов:</p>
        <p dir="ltr">&nbsp;</p>
        <p dir="ltr">- <a href="http://voh.russianpost.ru:8080/niips-operationhistory-web/OperationHistory">
          http://voh.russianpost.ru:8080/niips-operationhistory-web/OperationHistory
        </a></p>
        <p dir="ltr">- <a href="http://voh.russianpost.ru:8081/niips-operationhistory-web-ml/OperationHistory12">
          http://voh.russianpost.ru:8081/niips-operationhistory-web-ml/OperationHistory12
        </a></p>
        <p dir="ltr">- <a href="http://vfc.russianpost.ru:8080/FederalClient/ItemDataService">
          http://vfc.russianpost.ru:8080/FederalClient/ItemDataService
        </a></p>
        <p dir="ltr">- <a href="http://r00vfc2.main.russianpost.ru:8080/FederalClientService-web/ItemDataService">
          http://r00vfc2.main.russianpost.ru:8080/FederalClientService-web/ItemDataService
        </a></p>
        <p dir="ltr">- <a href="http://r00vfctest.main.russianpost.ru:8080/niips-operationhistory-web-ml/OperationHistory">
          http://r00vfctest.main.russianpost.ru:8080/niips-operationhistory-web-ml/OperationHistory
        </a></p>
        <p>&nbsp;</p>
        <p dir="ltr">Всем пользователем старого сервиса отслеживания необходимо
          <Link to="/support/faq/how_to_get_access">зарегистрироваться</Link> в
          новом сервисе и получить данные для подключения (URL, логин и пароль). Новый сервис поддерживает два типа доступа:</p>
        <p>&nbsp;</p>
        <p dir="ltr">- <Link to="/specification?mode=single">Единичный доступ</Link> позволяет получать информацию об одном отправлении в запросе.
          Подключение, ограниченное 100 &nbsp;запросами в сутки предоставляется любому зарегистрированному пользователю; безлимитное - только
          клиентам Почты России с договором на отправку посылок, писем или отправлений EMS.</p>
        <p>&nbsp;</p>
        <p dir="ltr">- <Link to="/specification?mode=batch">Пакетный доступ</Link> поддерживает запросы, содержащие до 3000 трек-номеров каждом.
          Предоставляется только клиентам с договором.</p>
        <p>&nbsp;</p>
        <p dir="ltr">Чтобы воспользоваться безлимитным подключением, после регистрации, необходимо заключить договор с Почтой России на отправку
          посылок, писем или отправлений EMS и обратиться к своему персональному менеджеру в Почте России с запросом на снятие ограничений.</p>
        <p dir="ltr">&nbsp;</p>
        <p dir="ltr">Для корректной работы с новым сервисом:</p>
        <p dir="ltr">&nbsp;</p>
        <p>- Пользователям РТМ-34 на базе SOAP 1.2, а также пользователям ФК:<br/>
          для переключения достаточно указать в настройках вашей информационной системы адрес, логин и пароль, полученные при подключении к новому
          сервису.<br/>
          &nbsp;<br/>
          - Пользователям РТМ-34 на базе SOAP 1.1: для переключения необходимо указать в настройках адрес, логин и пароль, полученные при
          подключении к новому сервису, а также обеспечить в клиентском приложении поддержку протокола SOAP 1.2. Протокол SOAP 1.1 для РТМ-34 больше
          не поддерживается.
        </p>
        <p>&nbsp;</p>
        <p dir="ltr">В случае любых вопросов, вы можете воспользоваться разделом <Link to="/support">помощи</Link> или обратиться в службу
          поддержки:<a href="mailto:client@russianpost.ru">client@russianpost.ru</a>
        </p>
      </article>
    </div>
  </div>
