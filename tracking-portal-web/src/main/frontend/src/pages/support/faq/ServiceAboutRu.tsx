/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const ServiceAboutRu = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Часто задаваемые вопросы</Link>
      <h3> Что такое API Сервиса отслеживания отправлений?</h3>
      <article className="page-help-article__content">
        <p>
          API (Application Programming Interface) Сервиса отслеживания отправлений - это прикладной программный интерфейс, позволяющий информационным
          системам отправителей получать информацию о ходе пересылки их регистрируемых почтовых отправлений.
        </p>
        <p>&nbsp;</p>
        <p>Сервис работает в режиме запрос-ответ и поддерживает два типа доступа:</p>
        <p>&nbsp;</p>
        <p>
          - <Link to="/specification?mode=single">Единичный доступ</Link> позволяет получать информацию об одном отправлении в запросе. Доступ,
          ограниченный 100 &nbsp;запросами в сутки предоставляется любому зарегистрированному пользователю; безлимитный - только клиентам Почты России
          с договором на отправку посылок, писем или отправлений EMS.&nbsp;
        </p>
        <p>
          <br />- <Link to="/specification?mode=batch">Пакетный доступ</Link> поддерживает запросы, содержащие до 3000 трек-номеров каждом.
          Предоставляется только клиентам с договором.
        </p>
        <p>&nbsp;</p>
        <p>
          Если вы не используете API и вам нужно просто отследить одну или несколько посылок, воспользуйтесь&nbsp;
          <a href="http://pochta.ru">основным порталом</a> или&nbsp;
          <a href="https://pochta.ru/support/web-mobile-services/mobile-application">мобильным приложением</a> Почты России.
        </p>
      </article>
    </div>
  </div>
);

export default ServiceAboutRu;
