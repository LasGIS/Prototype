/*
 * Copyright (c) 2021. Prototype
 */

import './specification.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const BatchRu = () => (
  <div className="my-tracking-page__content">
    <header>
      <h2>Пакетный доступ</h2>

      <p>
        Режим Пакетного доступа позволяет отслеживать сразу несколько отправлений в одном запросе. Запрос может содержать до 3000 почтовых
        идентификаторов отправлений. Протокол Пакетного доступа реализован на основе SOAP (Simple Object Access Protocol).
      </p>

      <p>
        Работа с API Сервиса отслеживания в режиме Пакетного доступа осуществляется в два этапа:
        <br />
        1) запрос билета на подготовку информации, содержащий список идентификаторов отправлений (вызов метода getTicket);
        <br />
        2) получение готового ответа по билету (вызов метода getResponseByTicket).
      </p>

      <p>
        По каждому отправлению возвращается информация обо всех операциях, совершенных над ним. Информация об одной операции включает время и место
        проведения операции, код и атрибут операции, название операции.
      </p>

      <h4>1. Основная информация по использованию API</h4>

      <table className="table_500">
        <tbody>
          <tr>
            <td>
              <span className="arial-dark">Адрес сервиса</span>
            </td>
            <td>https://tracking.russianpost.ru/fc</td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">WSDL</span>
            </td>
            <td>
              <a className="external-link" href="https://tracking.russianpost.ru/fc?wsdl" rel="nofollow">
                https://tracking.russianpost.ru/fc?wsdl
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Методы</span>
            </td>
            <td>
              <span className="arial-dark">getTicket, getResponseByTicket</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Базовый протокол</span>
            </td>
            <td>
              <span className="arial-dark">SOAP 1.1</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Параметры доступа</span>
            </td>
            <td>
              <span className="arial">
                могут быть получены в разделе&nbsp;<Link to="/access-settings">Настройки доступа</Link>
              </span>
              <span className="arial">&nbsp;зарегистрированного пользователя, у которого подключен доступ к API</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Примеры кода</span>
            </td>
            <td>
              <Link to="/support/about/examples">Примеры кода для работы с API</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>2. Ограничения и рекомендации по использованию сервиса</h4>

      <p>- Количество идентификаторов отправлений в одном запросе не должно превышать 3000.</p>

      <p>
        - Рекомендуется выполнять первое обращение за ответом по билету не ранее, чем через 15 минут от момента выдачи билета. В случае неготовности
        результата повторные обращения по тому же билету следует выполнять не чаще, чем 1 раз в 15 минут.
      </p>

      <p>- Время хранения ответа по билету в Сервисе отслеживания составляет 32 часа. По истечении этого периода ответ удаляется.</p>

      <h4>3. Метод getTicket</h4>

      <p>
        Метод getTicket используется для получения билета на подготовку информации по списку идентификаторов отправлений. В запросе передается список
        идентификаторов отправлений. При успешном вызове метод возвращает идентификатор билета.
      </p>

      <h4>3.1. Запрос</h4>

      <p>
        В запросе метода указываются до 3000&nbsp;идентификаторов отправлений&nbsp;и параметры доступа к API Сервиса отслеживания (логин и пароль).
      </p>

      <table>
        <tbody>
          <tr>
            <td colSpan={2} style={{ width: '92px' }}>
              <p>
                <strong>Элемент</strong>
              </p>
            </td>
            <td style={{ width: '126px' }}>
              <p>
                <strong>Атрибут</strong>
              </p>
            </td>
            <td style={{ width: '351px' }}>
              <p>
                <strong>Описание</strong>
              </p>
            </td>
            <td style={{ width: '95px' }}>
              <p>
                <strong>Обязатель-ность</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} rowSpan={7} style={{ width: '92px', height: '27px', verticalAlign: 'top' }}>
              <p>request</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Содержит один и более элементов Item.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Да</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>FileName</p>
            </td>
            <td rowSpan={6} style={{ width: '351px', height: '27px' }}>
              <p>Не используются, в протоколе присутствуют для совместимости.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Нет</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>FileTypeID</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Нет</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>FileNumber</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Нет</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>SenderID</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Нет</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>RecipientID</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Нет</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>DatePreparation</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Нет</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} rowSpan={2} style={{ width: '35px', height: '27px', verticalAlign: 'top' }}>
              <p>Item</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Содержит один идентификатор РПО. Число элементов Item в запросе может быть от 1 до 3000.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Да</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>Barcode</p>
            </td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Идентификатор РПО в &nbsp;одном из форматов:</p>

              <p>- внутрироссийский, состоящий из 14 символов (цифровой);</p>

              <p>- международный, состоящий из 13 символов (буквенно-цифровой) в формате S10.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ width: '92px', height: '27px' }}>
              <p>login</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>
                Логин для доступа к API Сервиса отслеживания. Может быть получен в разделе&nbsp;<Link to="/access-settings">Настройки доступа</Link>.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Да</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ width: '92px', height: '27px' }}>
              <p>password</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>
                Пароль для доступа к API Сервиса отслеживания. Может быть получен в разделе <Link to="/access-settings">Настройки доступа</Link>.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Да</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ width: '92px', height: '27px' }}>
              <p>language</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Язык, используемый в ответных сообщениях. Возможные значения:</p>

              <p>RUS &nbsp;- русский (используется по умолчанию)</p>

              <p>ENG - английский</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Нет</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.2. Ответ</h4>

      <p>Ответ метода getTicket&nbsp;содержит информацию о выданном билете.</p>

      <table className="table-100">
        <thead>
          <tr>
            <th colSpan={2} scope="col" style={{ width: '20.92%' }}>
              <p>Элемент</p>
            </th>
            <th scope="col" style={{ width: '18.44%' }}>
              <p>Атрибут</p>
            </th>
            <th scope="col" style={{ width: '60.64%' }}>
              <p>Описание</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ width: '20.92%', height: '27px' }}>
              <p>ticketResponse</p>
            </td>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>&nbsp;</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>Содержит идентификатор созданного билета при успешном вызове, либо сообщение об ошибке при неуспешном.</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={4} style={{ width: '3.82%', height: '27px' }}>
              &nbsp;
            </td>
            <td style={{ width: '17.1%', height: '27px' }}>
              <p>value</p>
            </td>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p style={{ textAlign: 'left' }}>&nbsp;</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p style={{ textAlign: 'left' }}>
                Идентификатор созданного билета, в нем отражены дата и время создания билета, а также принадлежность к клиенту. Формат:
              </p>

              <p style={{ textAlign: 'left' }}>
                <strong>YYYYMMDDHHmmsslllNAME</strong>, где
              </p>

              <p style={{ textAlign: 'left' }}>YYYY - год,</p>

              <p style={{ textAlign: 'left' }}>MM - месяц,</p>

              <p style={{ textAlign: 'left' }}>DD - день,</p>

              <p style={{ textAlign: 'left' }}>НН - час</p>

              <p style={{ textAlign: 'left' }}>mm - минуты</p>

              <p style={{ textAlign: 'left' }}>ss - секунды</p>

              <p style={{ textAlign: 'left' }}>lll - миллисекунды</p>

              <p style={{ textAlign: 'left' }}>NAME -&nbsp;логин пользователя в верхнем регистре</p>
            </td>
          </tr>
          <tr>
            <td colSpan={1} rowSpan={3} style={{ width: '17.1%', height: '27px' }}>
              <p>error</p>

              <p>&nbsp;</p>

              <p>&nbsp;</p>
            </td>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>&nbsp;</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>Содержит описание ошибки в случае, если вызов был неуспешным.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>ErrorTypeID</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>Код ошибки. Список возможных кодов см. в п.3.2.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>ErrorName</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>Текст ошибки.&nbsp;Список возможных кодов см. в п.3.2.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.3. Возможные ошибки</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th scope="col" style={{ width: '107px', height: '30px' }}>
              <p>ErrorTypeID</p>
            </th>
            <th scope="col" style={{ width: '536px', height: '30px' }}>
              <p>ErrorName</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>2</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Формат данных запроса не соответствует установленному настоящим протоколом</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>3</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Неуспешная авторизация клиента при вызове метода</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '32px' }}>
              <p>16</p>
            </td>
            <td style={{ width: '536px', height: '32px' }}>
              <p>Внутренняя ошибка работы Сервиса отслеживания</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>18</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Превышено максимально допустимое количество отправлений в запросе</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>20</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Недопустимый идентификатор языка</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>21</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Длина одного или нескольких из запрошенных идентификаторов отправлений превышает максимальный размер</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>22</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Длина имени файла превышает максимальный размер</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.4. Примеры запроса и ответа</h4>

      <p>Пример запроса:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;soapenv:Envelope xmlns:soapenv=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;
              xmlns:pos=&quot;http://fclient.russianpost.org/postserver&quot; xmlns:fcl=&quot;http://fclient.russianpost.org&quot;&gt;
              <br />
              &nbsp; &lt;soapenv:Header/&gt;
              <br />
              &nbsp; &lt;soapenv:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;pos:ticketRequest&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;request&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;fcl:Item Barcode=&quot;RA123456788RU&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;fcl:Item Barcode=&quot;RA123456789RU&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;fcl:Item Barcode=&quot;RA123456780RU&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;...
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;/request&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;login&gt;my_login&lt;/login&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;password&gt;my_password&lt;/password&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;language&gt;RUS&lt;/language&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/pos:ticketRequest&gt;
              <br />
              &nbsp; &lt;/soapenv:Body&gt;
              <br />
              &lt;/soapenv:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Пример ответа:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;S:Envelope xmlns:S=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;&gt;
              <br />
              &nbsp; &lt;S:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;ns2:ticketResponse xmlns:ns2=&quot;http://fclient.russianpost.org/postserver&quot;
              xmlns:ns3=&quot;http://fclient.russianpost.org&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;value&gt;20150917162048476CLIENTID&lt;/value&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/ns2:ticketResponse&gt;
              <br />
              &nbsp; &lt;/S:Body&gt;
              <br />
              &lt;/S:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4. Метод getResponseByTicket</h4>

      <p>Метод используется для получения информации об отправлениях по ранее полученному билету.</p>

      <h4>4.1. Запрос</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th colSpan={2} scope="col">
              <p>Элемент</p>
            </th>
            <th scope="col" style={{ width: '399px' }}>
              <p>Описание</p>
            </th>
            <th scope="col" style={{ width: '95px' }}>
              <p>Обязатель-ность</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ height: '27px' }}>
              <p>answerByTicketRequest</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>Содержит параметры запроса информации по билету.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>&nbsp;</td>
          </tr>
          <tr>
            <td rowSpan={3} style={{ width: '72px', height: '27px' }}>
              &nbsp;
            </td>
            <td style={{ width: '96px', height: '27px' }}>
              <p>ticket</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>Номер билета.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Да</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '96px', height: '27px' }}>
              <p>login</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>
                Логин для доступа к API Сервиса отслеживания. Может быть получен в разделе&nbsp;<Link to="/access-settings">Настройки доступа</Link>.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Да</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '96px', height: '27px' }}>
              <p>password</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>
                Пароль для доступа к API Сервиса отслеживания. Может быть получен в разделе&nbsp;<Link to="/access-settings">Настройки доступа</Link>.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Да</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4.2. Ответ</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th colSpan={3} scope="col" style={{ width: '26.6%', height: '27px' }}>
              <p>Элемент</p>
            </th>
            <th scope="col" style={{ width: '18.46%', height: '27px' }}>
              <p>Атрибут</p>
            </th>
            <th scope="col" style={{ width: '54.94%', height: '27px' }}>
              <p>Описание</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} rowSpan={7} style={{ width: '26.6%', height: '27px' }}>
              <p>value</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Содержит информацию о билете.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>FileName</p>
            </td>
            <td rowSpan={5} style={{ width: '54.94%', height: '27px' }}>
              <p>Не используются, в протоколе присутствуют для совместимости.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>FileTypeID</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>FileNumber</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>SenderID</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>RecipientID</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>DatePreparation</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Дата и время (московское) завершения обработки билета. Пример значения: &quot;17.09.2015 17:20:48&quot;</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={11} style={{ width: '6.72%', height: '27px' }}>
              &nbsp;
            </td>
            <td colSpan={2} rowSpan={2} style={{ width: '19%', height: '27px', verticalAlign: 'top' }}>
              <p>Item</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                Содержит информацию по одному идентификатору РПО. Число элементов Item в ответе соответствует числу идентификаторов РПО, запрошенных в
                запросе getTicket ранее.
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>Barcode</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Идентификатор РПО.</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={9} style={{ width: '7.08%', height: '27px' }}>
              &nbsp;
            </td>
            <td rowSpan={6} style={{ width: '12%', height: '27px', verticalAlign: 'top' }}>
              <p>Operation</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                Содержит информацию по одной операции в истории РПО. Количество элементов Operation соответствует количеству зарегистрированных
                операций в истории РПО.
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>OperTypeID</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                <Link to="/support/dictionaries/operation_codes">Код операции.</Link>
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>OperCtgID</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                <Link to="/support/dictionaries/operation_codes">Код атрибута.</Link>
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>OperName</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                <Link to="/support/dictionaries/operation_codes">Название операции.</Link>
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>DateOper</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Дата и время&nbsp;операции (локальное). Пример значения: &quot;17.09.2015 17:20:48&quot;</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>IndexOper</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Почтовый индекс места проведения операции</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={3} style={{ width: '12%', height: '27px', verticalAlign: 'top' }}>
              <p>Error</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Содержит информацию об ошибке в случае, если не удалось получить информацию об РПО из Сервиса отслеживания</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>ErrorTypeID</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Идентификатор ошибки. Список возможных ошибок см. в п. 4.3.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>ErrorName</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Текст ошибки.&nbsp;Список возможных ошибок см. в п. 4.3.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4.3. Возможные ошибки</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th scope="col" style={{ width: '107px', height: '30px' }}>
              <p>ErrorTypeID</p>
            </th>
            <th scope="col" style={{ width: '536px', height: '30px' }}>
              <p>ErrorName</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>2</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Формат данных запроса не соответствует установленному настоящим протоколом</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>3</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Неуспешная авторизация клиента при вызове метода</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>6</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Ответ по билету ещё не готов</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>12</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Информация о заданном идентификаторе отправления отсутствует</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>16</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Внутренняя ошибка работы Сервиса отслеживания</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>17</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Время хранения ответа по билету истекло, ответ был удален с сервера</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4.4. Примеры запроса и ответа</h4>

      <p>Пример запроса:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;soapenv:Envelope xmlns:soapenv=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;
              xmlns:pos=&quot;http://fclient.russianpost.org/postserver&quot;&gt;
              <br />
              &nbsp; &lt;soapenv:Header/&gt;
              <br />
              &nbsp; &lt;soapenv:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;pos:answerByTicketRequest&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;ticket&gt;20150917162048476CLIENTID&lt;/ticket&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;login&gt;my_login&lt;/login&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;password&gt;my_password&lt;/password&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/pos:answerByTicketRequest&gt;
              <br />
              &nbsp; &lt;/soapenv:Body&gt;
              <br />
              &lt;/soapenv:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Пример ответа:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;S:Envelope xmlns:S=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;&gt;
              <br />
              &nbsp; &lt;S:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;ns2:answerByTicketResponse xmlns:ns2=&quot;http://fclient.russianpost.org/postserver&quot;
              xmlns:ns3=&quot;http://fclient.russianpost.org&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;value FileName=&quot;&quot; FileTypeID=&quot;2&quot; FileNumber=&quot;1&quot; RecipientID=&quot;1&quot;
              DatePreparation=&quot;17.09.2015 17:20:48&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Item Barcode=&quot;45008378901234&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;1&quot; OperCtgID=&quot;1&quot;
              OperName=&quot;Прием&quot; DateOper=&quot;08.09.2015 17:07:00&quot; IndexOper=&quot;450083&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;10.09.2015 04:42:00&quot; IndexOper=&quot;450962&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;0&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;12.09.2015 18:07:00&quot; IndexOper=&quot;140983&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;13.09.2015 04:14:00&quot; IndexOper=&quot;140980&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;13.09.2015 23:11:00&quot; IndexOper=&quot;111949&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;2&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;14.09.2015 03:25:00&quot; IndexOper=&quot;125362&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;4&quot; OperCtgID=&quot;3&quot;
              OperName=&quot;Досылка почты&quot; DateOper=&quot;15.09.2015 09:20:00&quot; IndexOper=&quot;125362&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;2&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;16.09.2015 03:43:00&quot; IndexOper=&quot;125364&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:Item&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Item Barcode=&quot;10725878901235&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Operation OperTypeID=&quot;1&quot; OperCtgID=&quot;1&quot;
              OperName=&quot;Прием&quot; DateOper=&quot;12.09.2015 09:26:00&quot; IndexOper=&quot;107258&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;1&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;12.09.2015 09:26:00&quot; IndexOper=&quot;107258&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;12.09.2015 23:14:00&quot; IndexOper=&quot;111974&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;15&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;16.09.2015 09:09:00&quot; IndexOper=&quot;130203&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;2&quot; OperCtgID=&quot;8&quot;
              OperName=&quot;Вручение&quot; DateOper=&quot;16.09.2015 13:45:00&quot; IndexOper=&quot;130203&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Item Barcode=&quot;RA123456789RU&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Error ErrorTypeID=&quot;12&quot; ErrorName=&quot;Сообщение не
              найдено&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:Item&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;....
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;/value&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/ns2:answerByTicketResponse&gt;
              <br />
              &nbsp; &lt;/S:Body&gt;
              <br />
              &lt;/S:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  </div>
);

export default BatchRu;
