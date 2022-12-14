/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const HowToGetFullAccessRu = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Часто задаваемые вопросы</Link>
      <h3> Как подключить безлимитный трекинг?</h3>
      <article className="page-help-article__content">
        <p>
          Безлимитный трекинг доступен только клиентам Почты России с договором на отправку посылок, писем или отправлений EMS. Если у вас уже есть
          договор, зарегистрируйтесь в Сервисе отслеживания и обратитесь к своему персональному менеджеру в Почте России с запросом на предоставление
          безлимитного доступа .
        </p>
        <p>
          Если у вас еще нет договора - вы можете заключить его <a href="https://dogovor.pochta.ru">здесь</a>.
        </p>
      </article>
    </div>
  </div>
);

export default HowToGetFullAccessRu;
