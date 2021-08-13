/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const ServiceForWhoRu = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Часто задаваемые вопросы</Link>
      <h3> Для кого предназначен API Сервиса отслеживания?</h3>
      <article className="page-help-article__content">
        <p>API предназначен для интернет-магазинов и крупных отправителей, которым необходимо отслеживать&nbsp;отправления&nbsp;и использовать эту
          информацию в своих информационных системах.</p>
        <p>&nbsp;</p>
        <p>Если вам нужно просто отследить одну или несколько посылок, воспользуйтесь <a href="http://pochta.ru">основным порталом</a>&nbsp;или
          <a href="https://pochta.ru/support/web-mobile-services/mobile-application">мобильным приложением</a> Почты России.</p>
      </article>
    </div>
  </div>
