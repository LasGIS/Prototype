/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const AgreementRu = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#about">О сервисе</Link>
      <h3> Пользовательское соглашение</h3>
      <article className="page-help-article__content">
        <p><strong>1. Общие положения</strong></p>
        <p><br/>
          1.1. ФГУП "Почта России" (ОГРН 1037724007276, Россия, 131000, г. Москва, Варшавское шоссе, д.37, далее - Предприятие) предлагает
          использовать свой сервис отслеживания регистрируемых почтовых отправлений (далее – Сервис) расположенный в сети Интернет по адресу
          <a href="https://tracking.pochta.ru/">https://tracking.pochta.ru/</a> на условиях, изложенных в настоящем Пользовательском
          соглашении (далее — «Соглашение», «ПС») пользователю сети Интернет (далее – Пользователь).<br/>
          Соглашение вступает в силу с момента выражения Пользователем согласия с его условиями в порядке, описанном ниже.</p>
        <p><br/>
          1.2. Использование Сервиса Предприятия регулируется настоящим Соглашением. Соглашение может быть изменено Предприятием без какого-либо
          специального уведомления, новая редакция Соглашения вступает в силу с момента ее размещения в сети Интернет по указанному в настоящем
          абзаце адресу, если иное не предусмотрено новой редакцией Соглашения.<br/>
          Действующая редакция ПС всегда находится на странице по адресу
          <Link to="/support/about/agreement">https://tracking.pochta.ru/support/about/agreement</Link>.
        </p>
        <p><br/>
          1.3. Начиная использовать Сервис, либо его отдельные функции, или пройдя процедуру регистрации, Пользователь считается принявшим
          условия данного Соглашения в полном объеме, без всяких оговорок и исключений. В случае несогласия Пользователя с какими-либо из
          положений Соглашения, Пользователь не вправе использовать Сервис &nbsp;Предприятия. В случае если Предприятием были внесены какие-либо
          изменения в Соглашение в порядке, предусмотренном пунктом 1.2 Соглашения, с которыми Пользователь не согласен, он обязан прекратить
          использование Сервиса Предприятия.</p>
        <p><br/>
          1.4. Сервис предоставляет Пользователю возможность использования следующих функций: отслеживание регистрируемых почтовых отправлений
          через программный интерфейс (API), получение статистики доступа и настраиваемых уведомлений.<br/>&nbsp;</p>
        <p><br/>
          <strong>2.&nbsp;Регистрация Пользователя. Учетная запись пользователя</strong><br/>
            &nbsp;<br/>
            2.1. Для того чтобы воспользоваться Сервисом Предприятия или некоторыми отдельными его функциями, Пользователю необходимо пройти
            процедуру регистрации, в результате которой для Пользователя будет создана уникальная учетная запись. Регистрация может быть завершена
            с использованием соответствующей формы.</p>
        <p>&nbsp;</p>
        <p>
          2.2. Для использования Сервиса Пользователю необходимо пройти авторизацию с указанием логина и пароля, заданных Пользователем при
          регистрации.</p>
        <p>&nbsp;</p>
        <p>
          2.3. Для регистрации Пользователь обязуется предоставить достоверную и полную информацию о себе по вопросам, предлагаемым в форме
          регистрации, и поддерживать эту информацию в актуальном состоянии. Если Пользователь предоставляет неверную информацию или у
          Предприятия есть основания полагать, что предоставленная Пользователем информация неполна или недостоверна, Предприятие вправе по
          своему усмотрению заблокировать либо удалить учетную запись Пользователя и отказать Пользователю в использовании Сервиса (либо его
          отдельных функций).</p>
        <p>&nbsp;</p>
        <p>2.4. С момента подтверждения Регистрации Пользователь соглашается на использование Предприятием персональных данных Пользователя,
          указанных им в регистрационной форме, для их обработки (в том числе, но не ограничиваясь, систематизации, накопления, хранения,
          уточнения, использования, уничтожения) в целях обеспечения работы Сервиса. Для этих целей Предприятие вправе привлекать третьих лиц и
          передавать третьим лицам указанные в настоящем пункте данные.</p>
        <p>&nbsp;</p>
        <p>2.5. Регистрируясь, Пользователь соглашается на получение сообщений на указанные при Регистрации адрес электронной почты (e-mail) и
          номер мобильного телефона (SMS-сообщения, звонки). Пользователь может в любое время отказаться от нотификаций в соответствующем пункте
          настроек Сервиса.</p>
        <p>&nbsp;</p>
        <p>2.6. Пользователь самостоятельно несет ответственность за безопасность (устойчивость к угадыванию) выбранного им пароля, а также
          самостоятельно обеспечивает конфиденциальность своего пароля. Пользователь самостоятельно несет ответственность за все действия (а
          также их последствия) в рамках или с использованием Сервиса Предприятия под учетной записью Пользователя, включая случаи добровольной
          передачи Пользователем данных для доступа к учетной записи Пользователя третьим лицам на любых условиях (в том числе по договорам или
          соглашениям). При этом все действия в рамках или с использованием Сервиса под учетной записью Пользователя считаются произведенными
          самим Пользователем.</p>
        <p>&nbsp;</p>
        <p>2.7. Пользователь обязан немедленно уведомить Предприятие о любом случае несанкционированного (не разрешенного Пользователем) доступа к
          Сервису Предприятия с использованием учетной записи Пользователя и/или о любом нарушении (подозрениях о нарушении) конфиденциальности
          своего пароля. В целях безопасности, Пользователь обязан самостоятельно осуществлять безопасное завершение работы на портале
          <a href="https://tracking.pochta.ru/">https://tracking.pochta.ru/</a> под своей учетной записью по окончании каждой сессии работы
          с Сервисом (кнопка «Выход»). Предприятие не отвечает за возможную потерю или порчу данных, а также другие последствия любого
          характера, которые могут произойти из-за нарушения Пользователем положений этой части Соглашения.</p>
        <p>&nbsp;</p>
        <p><strong>3. Условия использования Сервиса Предприятия</strong><br/>
          &nbsp;<br/>
          3.1. Сервис является бесплатным для пользователя и поддерживает два типа доступа – ограниченный и безлимитный.</p>
        <p><br/>
          3.1.1. Ограниченный доступ позволяет пользователю посредством его информационной системы направлять до 100 единичных запросов
          (содержащих 1 почтовый идентификатор отправления) в сутки и доступен любому пользователю, прошедшему процедуру регистрации и
          авторизации в соответствии с положениями раздела 2 настоящего соглашения.</p>
        <p><br/>
          3.1.2. Безлимитный доступ предоставляется пользователю – уполномоченному представителю юридического лица, с которым у Предприятия
          заключен и действует договор на отправку или получение регистрируемых почтовых отправлений. Безлимитный доступ позволяет отправку
          неограниченного количества как единичных запросов, так и пакетных (до 3000 почтовых идентификаторов в запросе) в соответствии со
          спецификациями, расположенными по адресу
          <Link to="/specification">https://tracking.pochta.ru/specification.</Link></p>
        <p><br/>
          3.2. Пользователь самостоятельно несет ответственность перед третьими лицами за свои действия, связанные с использованием Сервиса, в
          том числе, если такие действия приведут к нарушению прав и законных интересов третьих лиц, а также за соблюдение законодательства при
          использовании Сервиса.</p>
        <p><br/>
          3.3. Пользователь обязуется соблюдать законодательство РФ, нормы международного права и правила оказания услуг почтовой связи.</p>
        <p><br/>
          3.4. Пользователь может выступать от лица организации при условии подтверждения соответствующих полномочий.</p>
        <p><br/>
          3.5. Пользователь не вправе несанкционированно собирать и хранить персональные данные других лиц.</p>
        <p><br/>
          3.6. При использовании Сервиса &nbsp;Пользователь вправе направлять запросы только в отношении почтовых отправлений, отправителем или
          получателем которых он является, либо отправленных или получаемых по договору с Предприятием или любым филиалом Предприятия,
          заключенным с юридическим лицом, от имени которого действует Пользователь.</p>
        <p><br/>
          3.7. Пользователь ознакомлен и безусловно согласен с условиями и ограничениями направления запросов, указанными в настоящем соглашении
          и спецификациях к протоколам доступа, расположенным по адресу <Link to="/specification">https://tracking.pochta.ru/specification</Link>.
        </p>
        <p><br/>
          3.8. При нарушении Пользователем условий использования Сервиса, Предприятие вправе по собственному усмотрению заблокировать или
          удалить учетную запись Пользователя, приостановить, ограничить или &nbsp;прекратить доступ Пользователя к Сервису и отказать
          Пользователю в использовании Сервиса (либо его отдельных функций) в дальнейшем, в том числе при использовании Пользователем любых
          других учетных записей.
        </p>
        <p>&nbsp;</p>
      </article>
    </div>
  </div>