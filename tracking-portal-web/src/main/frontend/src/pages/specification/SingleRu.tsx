/*
 * Copyright (c) 2021. Prototype
 */

import './specification.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { withHashLink } from '../../hoc/withHashLink';

const SingleRu = () =>
  <div className="my-tracking-page__content">
    <header>
      <h2>Единичный доступ</h2>

      <p>Режим Единичного доступа позволяет за одно обращение к Сервису отслеживания&nbsp;получить информацию по одному регистрируемому почтовому
        отправлению (РПО). Возможны следующие запросы:</p>

      <ul>
        <li>получение подробной информации обо всех операциях, совершенных над отправлением (метод&nbsp;
          <Link to="#getOperationHistory">getOperationHistory</Link>).
          Информация об одной операции включает время и место проведения операции, код и атрибут операции, название операции и другие поля;
        </li>
        <li>получение информации об операциях с наложенным платежом, который связан с отправлением (метод&nbsp;
          <Link to="#PostalOrderEventsForMail">PostalOrderEventsForMail</Link>).
        </li>
      </ul>

      <p>&nbsp;</p>

      <p>Протокол Единичного&nbsp;доступа реализован на основе SOAP (Simple Object Access Protocol).</p>

      <h4>1. Основная информация по использованию API</h4>

      <table className='table_500'>
        <tbody>
        <tr>
          <td><span
            className='arial-dark'>Адрес сервиса</span>
          </td>
          <td>https://tracking.russianpost.ru/rtm34</td>
        </tr>
        <tr>
          <td><span className='arial-dark'>WSDL</span></td>
          <td><a href="https://tracking.russianpost.ru/rtm34?wsdl">https://tracking.russianpost.ru/rtm34?wsdl</a></td>
        </tr>
        <tr>
          <td><span className='arial-dark'>Методы</span>
          </td>
          <td><span className='arial-dark'>
            <Link to="#getOperationHistory">getOperationHistory</Link> возвращает историю операций над отправлением<br/>
            <Link dir="ltr" to="#PostalOrderEventsForMail">PostalOrderEventsForMail</Link> возвращает историю операций с наложенным платежом</span>
          </td>
        </tr>
        <tr>
          <td><span
            className='arial-dark'>Базовый протокол</span>
          </td>
          <td><span className='arial-dark'>SOAP 1.2</span>
          </td>
        </tr>
        <tr>
          <td><span
            className='arial-dark'>Параметры доступа</span>
          </td>
          <td><span className='arial'>могут быть получены в разделе&nbsp;<Link to="/access-settings">Настройки доступа</Link></span><span
            className='arial'>&nbsp;зарегистрированного пользователя, у которого подключен доступ к API</span>
          </td>
        </tr>
        <tr>
          <td><span
            className='arial-dark'>Примеры кода</span>
          </td>
          <td><Link to="/support/about/examples">Примеры кода для работы с API</Link></td>
        </tr>
        </tbody>
      </table>

      <h4 id="getOperationHistory">2. Метод getOperationHistory</h4>

      <p>Метод getOperationHistory используется для получения&nbsp;информации о конкретном отправлении. Метод возвращает подробную информацию по
        всем операциям, совершенным над отправлением.</p>

      <h4>2.1. Запрос</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th colSpan={2} scope="col">
            <p>Элемент</p>
          </th>
          <th scope="col">
            <p>Описание</p>
          </th>
          <th scope="col">
            <p>Обязательность</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={2}>
            <p>OperationHistoryRequest</p>
          </td>
          <td>
            <p>Содержит элементы Barcode, MessageType, Language.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={3}>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Barcode</p>
          </td>
          <td>
            <p>Идентификатор регистрируемого почтового отправления&nbsp;в&nbsp;одном из форматов:</p>

            <p>- внутрироссийский, состоящий из 14 символов (цифровой);</p>

            <p>- международный, состоящий из 13 символов (буквенно-цифровой) в формате S10.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>MessageType</p>
          </td>
          <td>
            <p>Тип сообщения. Возможные значения:</p>

            <p>0 - история операций для отправления;</p>

            <p>1 - история операций для заказного уведомления по данному отправлению.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Language</p>
          </td>
          <td>
            <p>Язык, на котором должны возвращаться названия операций/атрибутов и сообщения об ошибках. Допустимые значения:</p>

            <p>RUS – использовать русский язык (используется по умолчанию);</p>

            <p>ENG – использовать английский язык.</p>
          </td>
          <td>
            <p>Нет</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <p>AuthorizationHeader</p>
          </td>
          <td>
            <p>Содержит элементы login и password.</p>

            <p>Атрибут soapenv:mustUnderstand элемента&nbsp;AuthorizationHeader должен содержать значение 1.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2}>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>login</p>
          </td>
          <td>
            <p>Логин для доступа к API Сервиса отслеживания. Может быть получен в разделе&nbsp;
              <Link to="/access-settings">Настройки доступа</Link>.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>password</p>
          </td>
          <td>
            <p>Пароль для доступа к API Сервиса отслеживания. Может быть получен в разделе&nbsp;
              <Link to="/access-settings">Настройки доступа</Link>.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>2.2. Ответ</h4>

      <p>Ответ метода getOperationHistory содержит список элементов historyRecord. Каждый из них содержит информацию об одной операции над
        отправлением. Если над отправлением еще не зарегистрировано ни одной операции, то возвращается пустой список элементов
        historyRecord.</p>

      <p>По каждой операции в ответе обязательно присутствует следующая информация:<br/>
        - Дата операции (OperDate);<br/>
        - Место проведения операции (OperationAddress);<br/>
        - Операция (OperType) и ее атрибут (OperAttr).</p>

      <p>Прочая информация возвращается при её наличии в Сервисе отслеживания.&nbsp;</p>

      <p>&nbsp;</p>

      <table className='table-100'>
        <thead>
        <tr>
          <th colSpan={4} style={{ width: "45.64%" }}>
            <p>Элемент</p>
          </th>
          <th style={{ width: "54.36%" }}>
            <p>Описание</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>AddressParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит адресные данные с операцией над отправлением.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={3} style={{ width: "5.02%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>DestinationAddress</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит адресные данные места назначения пересылки отправления.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Index</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Почтовый индекс места назначения. Не возвращается для зарубежных операций.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Description</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Адрес и/или название места назначения. Пример значения.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={21} style={{ width: "5.02%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>OperationAddress</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит адресные данные места проведения операции над отправлением.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Index</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Почтовый индекс места проведения операции. Не возвращается для зарубежных операций.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Description</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Адрес и/или название места проведения операции.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>MailDirect</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о стране места назначения пересылки отправления.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код страны. Возможные коды приведены в поле "Код" <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code2A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Двухбуквенный идентификатор страны. Возможные идентификаторы приведены в поле "Alpha2 код"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code3A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Трехбуквенный идентификатор страны. Возможные идентификаторы приведены в поле "Alpha3 код"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameRu</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Российское название страны. Возможные названия приведены в поле "Наименование страны пересылки"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameEN</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Международное название страны. Возможные названия приведены в поле «Английское наименование страны пересылки»&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>CountryFrom</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о стране приема почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код страны. Возможные коды приведены в поле "Код" <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code2A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Двухбуквенный идентификатор&nbsp;страны.&nbsp;</p>

            <p>Двухбуквенный идентификатор страны. Возможные идентификаторы приведены в поле "Alpha2 код"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code3A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Трехбуквенный идентификатор страны. Возможные идентификаторы приведены в поле "Alpha3 код"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameRu</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Российское название страны. Возможные названия приведены в поле "Наименование страны пересылки"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameEN</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Международное название страны. Возможные названия приведены в поле «Английское наименование страны пересылки»&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>CountryOper</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о стране проведения операции над почтовым отправлением.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код страны. Возможные коды приведены в поле "Код" <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code2A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Двухбуквенный идентификатор страны. Возможные идентификаторы приведены в поле "Alpha2 код"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code3A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Трехбуквенный идентификатор страны. Возможные идентификаторы приведены в поле "Alpha3 код"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameRu</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Российское название страны. Возможные названия приведены в поле "Наименование страны пересылки"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameEN</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Международное название страны. Возможные названия приведены в поле «Английское наименование страны пересылки»&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>FinanceParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит финансовые данные, связанные с операцией над почтовым отправлением.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={7} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Payment</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Сумма&nbsp;наложенного платежа в копейках.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Value</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Сумма&nbsp;объявленной ценности в копейках.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MassRate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Общая&nbsp;сумма&nbsp;платы за пересылку наземным и воздушным транспортом в копейках.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>InsrRate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Сумма&nbsp;платы за объявленную ценность в копейках.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>AirRate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Выделенная&nbsp;сумма&nbsp;платы за пересылку воздушным транспортом из общей суммы платы за пересылку в копейках.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Rate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Сумма&nbsp;дополнительного тарифного сбора в копейках.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>CustomDuty</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Сумма&nbsp;таможенного платежа в копейках.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>ItemParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о почтовом отправлении.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={20} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Barcode</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Идентификатор почтового отправления, текущий для данной операции.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Internum</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Служебная&nbsp;информация, идентифицирующая&nbsp;отправление, может иметь значение ДМ квитанции, связанной с отправлением или
              иметь значение &lt;null&gt;</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>ValidRuType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Признак корректности вида и категории отправления для внутренней пересылки</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>ValidEnType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Признак корректности вида и категории отправления для международной пересылки</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>ComplexItemName</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит текстовое описание вида и категории отправления.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MailRank</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит информацию о <Link to="/support/dictionaries/mailrank">разряде почтового отправления.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код разряда почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Название разряда почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>PostMark</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит информацию об <Link to="/support/dictionaries/postmark">отметках почтовых отправлений.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код отметки почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Наименование отметки почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MailType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о <Link to="/support/dictionaries/mailtype">виде почтового отправления.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код вида почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Название вида почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MailCtg</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о <Link to="/support/dictionaries/category_codes">категории почтового отправления.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код категории почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Название категории почтового отправления.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>Mass</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Вес отправления в граммах.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>MaxMassRu</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Значение максимально возможного веса для данного вида и категории отправления для внутренней пересылки.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>MaxMassEn</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Значение максимально возможного веса для данного вида и категории отправления для международной пересылки.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>OperationParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Cодержит параметры операции над отправлением</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>OperType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит информацию об <Link to="/support/dictionaries/operation_codes">операции над отправлением.</Link></p>
          </td>
        </tr>
        <tr>
          <td rowSpan={6} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код операции.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Название операции.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>OperAttr</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит информацию об <Link to="/support/dictionaries/operation_codes">атрибуте операции над отправлением.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Код атрибута.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Название атрибута.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>OperDate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о дате и времени проведения операции над отправлением.</p>

            <p>Пример значения: 2015-01-08T14:50:00.000+03:00</p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>UserParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные субъектов,&nbsp;связанных с операцией над почтовым отправлением.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>SendCtg</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит информацию о <Link to="/support/dictionaries/send_ctg">категории отправителя.</Link></p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Идентификатор категории отправителя.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Название категории отправителя.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>Sndr</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные об отправителе.</p>

            <p>Пример значения: ИВАНОВ А Н</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>Rcpn</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Содержит данные о получателе отправления.</p>

            <p>Пример значения: ПЕТРОВ И.К.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>2.3. Возможные ошибки</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th scope="col" style={{ width: "42.52%" }}>
            <p>Вид ошибки</p>
          </th>
          <th scope="col" style={{ width: "57.48%" }}>
            <p>Описание</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Ошибка авторизации</p>

            <p>&nbsp;</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>При обращении к Сервису отслеживания&nbsp;произошла ошибка авторизации.</p>

            <p>Элемент AuthorizationFault cодержит подробное описание ошибки.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Ошибка получения информации об отправлении</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>При попытке получить информацию об отправлении&nbsp;произошла ошибка.</p>

            <p>Элемент OperationHistoryFault cодержит подробное описание ошибки.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Заданный язык не поддерживается</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>В запросе был указан недопустимый идентификатор языка.</p>

            <p>Элемент LanguageFault cодержит подробное описание ошибки.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>2.4. Пример запроса и ответа</h4>

      <p>Пример запроса:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:oper="http://russianpost.org/operationhistory"
            xmlns:data="http://russianpost.org/operationhistory/data" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Header/&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Body&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;oper:getOperationHistory&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;data:OperationHistoryRequest&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:Barcode&gt;RA644000001RU&lt;/data:Barcode&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:MessageType&gt;0&lt;/data:MessageType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:Language&gt;RUS&lt;/data:Language&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/data:OperationHistoryRequest&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;data:AuthorizationHeader soapenv:mustUnderstand="1"&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:login&gt;my_login&lt;/data:login&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:password&gt;my_password&lt;/data:password&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/data:AuthorizationHeader&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;/oper:getOperationHistory&gt;<br/>
            &nbsp; &nbsp;&lt;/soap:Body&gt;<br/>
            &lt;/soap:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Пример ответа:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;S:Envelope xmlns:S="http://www.w3.org/2003/05/soap-envelope"&gt;<br/>
            &nbsp; &nbsp;&lt;S:Body&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;ns7:getOperationHistoryResponse xmlns:ns2="http://russianpost.org/sms-info/data"
            xmlns:ns3="http://russianpost.org/operationhistory/data" xmlns:ns4="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:ns5="http://www.russianpost.org/custom-duty-info/data" xmlns:ns6="http://www.russianpost.org/RTM/DataExchangeESPP/Data"
            xmlns:ns7="http://russianpost.org/operationhistory"&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:OperationHistoryData&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:AddressParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:DestinationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Index&gt;663300&lt;/ns3:Index&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Description&gt;Норильск
            Почтамт&lt;/ns3:Description&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:DestinationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Index&gt;111555&lt;/ns3:Index&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Description&gt;Москва
            555&lt;/ns3:Description&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:OperationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailDirect&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;643&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code2A&gt;RU&lt;/ns3:Code2A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code3A&gt;RUS&lt;/ns3:Code3A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameRU&gt;Российская
            Федерация&lt;/ns3:NameRU&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameEN&gt;Russian
            Federation&lt;/ns3:NameEN&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailDirect&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:CountryOper&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;643&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code2A&gt;RU&lt;/ns3:Code2A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code3A&gt;RUS&lt;/ns3:Code3A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameRU&gt;Российская
            Федерация&lt;/ns3:NameRU&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameEN&gt;Russian
            Federation&lt;/ns3:NameEN&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:CountryOper&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:AddressParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:FinanceParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Payment&gt;2500000&lt;/ns3:Payment&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Value&gt;2500000&lt;/ns3:Value&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MassRate&gt;152000&lt;/ns3:MassRate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:InsrRate&gt;25000&lt;/ns3:InsrRate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:AirRate&gt;0&lt;/ns3:AirRate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Rate&gt;0&lt;/ns3:Rate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:FinanceParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:ItemParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Barcode&gt;EA123456789RU&lt;/ns3:Barcode&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:ValidRuType&gt;true&lt;/ns3:ValidRuType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:ValidEnType&gt;false&lt;/ns3:ValidEnType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:PostMark&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;0&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Без отметки&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailRank&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;0&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Без разряда&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailRank&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:PostMark&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;0&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Без отметки&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:PostMark&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;7&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Отправление EMS&lt;/ns3:Name&gt;
            <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;4&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;С объявленной ценностью и наложенным
            платежом&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Mass&gt;2281&lt;/ns3:Mass&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:ItemParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:OperationParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;1&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Прием&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:OperType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperAttr&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;1&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Единичный&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:OperAttr&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperDate&gt;2015-07-09T18:08:00.000+03:00&lt;/ns3:OperDate&gt;
            <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:OperationParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:UserParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:SendCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;1&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Население&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:SendCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Sndr&gt;ИВАНОВ И Н&lt;/ns3:Sndr&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Rcpn&gt;ПЕТРОВ Н И&lt;/ns3:Rcpn&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:UserParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;…<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;…<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:OperationHistoryData&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;/ns7:getOperationHistoryResponse&gt;<br/>
            &nbsp; &nbsp;&lt;/S:Body&gt;<br/>
            &lt;/S:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4 id="PostalOrderEventsForMail">3. Метод PostalOrderEventsForMail&nbsp;</h4>

      <p>Метод PostalOrderEventsForMail позволяет получить информацию об операциях с наложенным платежом, который связан с конкретным почтовым
        отправлением.</p>

      <h4>3.1. Запрос</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th colSpan={2} scope="col">
            <p>Элемент</p>
          </th>
          <th scope="col">
            <p>Атрибут</p>
          </th>
          <th scope="col">
            <p>Описание</p>
          </th>
          <th scope="col">
            <p>Обязательность</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={2}>
            <p>AuthorizationHeader</p>
          </td>
          <td>&nbsp;</td>
          <td>
            <p>Содержит элементы login и password.</p>

            <p>Атрибут soapenv:mustUnderstand элемента&nbsp;AuthorizationHeader должен содержать значение 1.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2}>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>login</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Логин для доступа к API Сервиса отслеживания. Может быть получен в разделе&nbsp;
              <Link to="/access-settings">Настройки доступа</Link>.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>password</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Пароль для доступа к API Сервиса отслеживания. Может быть получен в разделе&nbsp;
              <Link to="/access-settings">Настройки доступа</Link>.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <p>PostalOrderEventsForMailInput</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Содержит атрибуты Barcode, и Language.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "126px", height: "27px" }}>
            <p>Barcode</p>
          </td>
          <td style={{ width: "351px", height: "27px" }}>
            <p>Идентификатор РПО в &nbsp;одном из форматов:</p>

            <p>- внутрироссийский, состоящий из 14 символов (цифровой);</p>

            <p>- международный, состоящий из 13 символов (буквенно-цифровой) в формате S10.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "57.48%", height: "27px" }}>
            <p>Language</p>
          </td>
          <td style={{ width: "351px", height: "27px" }}>
            <p>Язык, используемый в ответных сообщениях. Возможные значения:</p>

            <p>RUS &nbsp;- русский (используется по умолчанию)</p>

            <p>ENG - английский</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>3.2. Ответ</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th>
            <p>Элемент</p>
          </th>
          <th>
            <p>Атрибут</p>
          </th>
          <th>
            <p>Описание</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={1} rowSpan={9}>PostalOrderEvent</td>
          <td>Number</td>
          <td>Номер почтового перевода наложенного платежа.</td>
        </tr>
        <tr>
          <td>EventDateTime</td>
          <td>Дата и время операции в формате YYYY-MM-DDTHH:mm:ss.SSSZ<br/>
            Пример значения: 2015-12-11T15:04:37.000+03:00
          </td>
        </tr>
        <tr>
          <td>EventType</td>
          <td><Link to="/support/dictionaries/event_type">Код операции с наложенным платежом</Link></td>
        </tr>
        <tr>
          <td>EventName</td>
          <td><Link to="/support/dictionaries/event_type">Название операции</Link></td>
        </tr>
        <tr>
          <td>IndexTo</td>
          <td>Почтовый индекс получателя</td>
        </tr>
        <tr>
          <td>IndexEvent</td>
          <td>Почтовый индекс отделения почтовой связи, в котором была совершена операция</td>
        </tr>
        <tr>
          <td>SumPaymentForward</td>
          <td>Сумма наложенного платежа в копейках</td>
        </tr>
        <tr>
          <td>CountryEventCode</td>
          <td>Двухбуквенный идентификатор страны, в которой была совершена операция. Возможные идентификаторы приведены в поле "Alpha2 код"&nbsp;
            <Link to="/support/dictionaries/countries">справочника стран</Link>.
          </td>
        </tr>
        <tr>
          <td>CountryToCode</td>
          <td>
            <p>Двухбуквенный идентификатор страны получателя наложенного платежа. Возможные идентификаторы приведены в поле "Alpha2 код"&nbsp;
              <Link to="/support/dictionaries/countries">справочника стран</Link>.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.3. Возможные ошибки</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th scope="col" style={{ width: "42.52%" }}>
            <p>Вид ошибки</p>
          </th>
          <th scope="col" style={{ width: "57.48%" }}>
            <p>Описание</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Ошибка авторизации</p>

            <p>&nbsp;</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>При обращении к Сервису отслеживания&nbsp;произошла ошибка авторизации.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>3.4. Пример запроса и ответа</h4>

      <p>Пример запроса:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:oper="http://russianpost.org/operationhistory"
            xmlns:data="http://russianpost.org/operationhistory/data" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:data1="http://www.russianpost.org/RTM/DataExchangeESPP/Data"&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Header/&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Body&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;oper:PostalOrderEventsForMail&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data:AuthorizationHeader soapenv:mustUnderstand="1"&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data:login&gt;my_login&lt;/data:login&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data:password&gt;my_password&lt;/data:password&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;/data:AuthorizationHeader&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data1:PostalOrderEventsForMailInput Barcode="14102192069353" Language="ENG"/&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;/oper:PostalOrderEventsForMail&gt;<br/>
            &nbsp; &nbsp;&lt;/soap:Body&gt;<br/>
            &lt;/soap:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Пример ответа:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;S:Envelope xmlns:S="http://www.w3.org/2003/05/soap-envelope"&gt;<br/>
            &nbsp; &nbsp;&lt;S:Body&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;ns7:PostalOrderEventsForMailResponse xmlns:ns2="http://russianpost.org/sms-info/data"
            xmlns:ns3="http://russianpost.org/operationhistory/data" xmlns:ns4="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:ns5="http://www.russianpost.org/custom-duty-info/data" xmlns:ns6="http://www.russianpost.org/RTM/DataExchangeESPP/Data"
            xmlns:ns7="http://russianpost.org/operationhistory"&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;ns6:PostalOrderEventsForMaiOutput&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;PostalOrderEvent Number="96598"
            EventDateTime="2015-12-11T15:04:37.000+03:00" EventType="1" EventName="Приём" IndexTo="141021" IndexEvent="298300"
            SumPaymentForward="234000" CountryEventCode="RU" CountryToCode="RU"/&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;PostalOrderEvent Number="96598"
            EventDateTime="2015-12-12T16:49:13.000+03:00" EventType="3" EventName="Оплата" IndexTo="141021" IndexEvent="141021"
            SumPaymentForward="234000" CountryEventCode="RU" CountryToCode="RU"/&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;/ns6:PostalOrderEventsForMaiOutput&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;/ns7:PostalOrderEventsForMailResponse&gt;<br/>
            &nbsp; &nbsp;&lt;/S:Body&gt;<br/>
            &lt;/S:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>&nbsp;</p>
    </header>
  </div>

export default withHashLink(SingleRu);
