/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const HowToGetAccessRu = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Часто задаваемые вопросы</Link>
      <h3> Как получить доступ?</h3>
      <article className="page-help-article__content">
        <p>Инструкция по подключению к Сервису отслеживания отправлений:</p>
        <p>&nbsp;</p>
        <p>1) Перейдите на <Link to="/">главную страницу</Link> сервиса отслеживания.</p>
        <p>2) Нажмите кнопку "Получить доступ".</p>
        <p>3) Если вы уже регистрировались на <a href="http://pochta.ru">основном портале Почты</a> - войдите с использованием логина и пароля.
          Если
          нет - пройдите короткую процедуру регистрации.</p>
        <p>3) Согласитесь с условиями использования сервиса.</p>
        <p>4) Доступ предоставлен. На указанный адрес электронной почты отправлены данные для подключения.&nbsp;Они также доступны в разделе
          <Link to="/access-settings">Мой трекинг</Link>.</p>
        <p>5)&nbsp;Начните вызывать методы API из вашей информационной системы, используя полученные адрес сервиса, логин и пароль.</p>
        <p>6) В разделе <Link to="/statistics">Мой трекинг</Link>&nbsp;вы можете просматривать статистику вашего доступа и настраивать уведомления.
        </p>
      </article>
    </div>
  </div>