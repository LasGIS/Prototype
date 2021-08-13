/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const TestingAccessRu = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#about">О сервисе</Link>
      <h3> Как проверить доступ</h3>
      <article className="page-help-article__content">
        <p>Если вы уже <Link to="/support/faq/how_to_get_access">получили доступ</Link> к сервису отслеживания, то с помощью данных, которые указаны в
          разделе <Link to="/access-settings">Настройки доступа</Link>, можно провести пробное подключение к сервису. Для проверки подключения
          рекомендуем использовать бесплатное приложение SoapUI, которое можно загрузить с сайта
          <a href="http://www.soapui.org/downloads/soapui.html">http://www.soapui.org/downloads/soapui.html</a>.</p>
        <p>Следующие шаги помогут проверить работу с сервисом в режиме Единичного доступа:</p>&nbsp;
        <ol>
          <li>Запустите приложение SoapUI и создайте в нем новый проект: File -&gt; New SOAP Project.&nbsp;</li>
          <li>В появившемся диалоговом окне введите:
            <ul>
              <li>в поле Project Name любое имя проекта, например, tracking.russianpost</li>
              <li>в поле Initial WSDL адрес WSDL-описания сервиса Единичного доступа:
                <a href="https://tracking.russianpost.ru/rtm34?wsdl">https://tracking.russianpost.ru/rtm34?wsdl</a>
              </li>
              <li>флажок Create Requests должен быть включен.</li>
            </ul>
            Нажмите кнопку Ок.
            <p>&nbsp;</p>
            <p><img alt="_" src="/documents/10184/19272/1.png"/></p>
            <p>&nbsp;</p>
          </li>
          <li>В дереве созданного проекта раскройте метод <strong>getOperationHistory</strong> и сделайте двойной клик на запросе <strong>Request
            1</strong>. В тексте автоматически построенного SOAP-запроса вместо знаков ‘?' впишите значения:
            <ul>
              <li>&nbsp; в поле Barcode - идентификатор отправления, которое вы хотели бы отследить. Например, RA644000001RU</li>
              <li>&nbsp; в поле MessageType - значение 0</li>
              <li>&nbsp; в поля login и password - выданные вам <Link to="/access-settings">логин и пароль</Link> для доступа к сервису.</li>
            </ul>
            <p>&nbsp;</p>
            <p><img alt="_" src="/documents/10184/19272/2.png"/></p>
            <p>&nbsp;</p>
          </li>
          <li>Выполните запрос к сервису нажатием на кнопку c зеленым треугольником. Ответ сервиса отобразится в правой части окна. В случае
            успешного запроса ответ будет содержать историю операций над отправлением.
            <p>&nbsp;</p>
            <p><img alt="_" src="/documents/10184/19272/3.png"/></p>
            <p>&nbsp;</p>
          </li>
        </ol>
        <p>&nbsp;</p>
        <h2>Возможные ошибки</h2>
        <ol>
          <li>В случае неудачного запроса к сервису в ответе будет содержаться название ошибки (поле Text) и её расширенное описание (элемент
            Detail). На рисунке показана ситуация, когда в запросе были заданы неправильные логин или пароль.
            <p>&nbsp;</p>
            <p><img alt="_" src="/documents/10184/19272/4.png"/></p>
            <p>&nbsp;</p>
          </li>
          <li>Частой причиной ошибок при обращении к сервису является некорректное значение параметра Content-Type в HTTP-заголовке запроса.
            Значение параметра Content-Type в запросах клиентского приложения должно
            быть <strong>applicatoin/soap+xml;charset=UTF-8</strong>.
            <p>В SoapUI проверить содержимое HTTP-заголовков запроса и ответа можно на закладке Raw.</p>
            <p>&nbsp;</p>
            <p><img alt="_" src="/documents/10184/19272/5.png"/></p>
            <p>&nbsp;</p>
          </li>
        </ol>
      </article>
    </div>
  </div>
