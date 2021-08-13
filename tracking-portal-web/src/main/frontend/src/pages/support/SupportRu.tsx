/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { withHashLink } from '../../hoc/withHashLink';

const SupportRu = () =>
  <div className="help-page row-fluid">
    <div className="span3"/>
    <div className="help-article">
      <div>
        <header>
          <h1>Помощь</h1>
          <p>Если вы не нашли ответа на свой вопрос - обратитесь в службу поддержки Почты России по телефону <b>8-800-100-00-00</b> или
            напишите на&nbsp;
            <a href="mailto:client@russianpost.ru?subject=Отслеживание отправлений через API">client@russianpost.ru</a>
          </p>
        </header>
        <article>
          <h2 id="faq">Часто задаваемые вопросы</h2>
          <p><Link to="/support/faq/service_about">Что такое API Сервиса отслеживания отправлений?</Link></p>
          <p><Link to="/support/faq/service_for_who">Для кого предназначен API Сервиса отслеживания?</Link></p>
          <p><Link to="/support/faq/how_to_get_access">Как получить доступ?</Link></p>
          <p><Link to="/support/faq/how_to_get_full_access">Как подключить безлимитный трекинг?</Link></p>
          <p><Link to="/support/faq/no_statistics_data">Почему я не вижу данных статистики за сегодня?</Link></p>
          <p><Link to="/support/faq/how_to_switch_from_old_service">Я пользовался старым сервисом. Как переключиться на новый?</Link></p>
          <h2 id="about">О сервисе</h2>
          <p><Link to="/support/about/agreement">Пользовательское соглашение</Link></p>
          <p><Link to="/specification">Спецификации</Link></p>
          <p><Link to="/support/about/examples">Примеры кода для работы с API</Link></p>
          <p><Link to="/support/about/testing_access">Как проверить доступ</Link></p>
          <h2 id="dictionaries">Справочники</h2>
          <p><Link to="/support/dictionaries/operation_codes">Коды операций над отправлениями и атрибутов операций</Link></p>
          <p><Link to="/support/dictionaries/category_codes">Коды категорий почтовых и непочтовых отправлений</Link></p>
          <p><Link to="/support/dictionaries/mailrank">Коды разрядов почтовых отправлений</Link></p>
          <p><Link to="/support/dictionaries/mailtype">Коды видов почтовых отправлений</Link></p>
          <p><Link to="/support/dictionaries/postmark">Коды отметок почтовых отправлений</Link></p>
          <p><Link to="/support/dictionaries/countries">Коды стран пересылки почтовых отправлений</Link></p>
          <p><Link to="/support/dictionaries/send_ctg">Коды категорий отправителей</Link></p>
          <p><Link to="/support/dictionaries/event_type">Коды операций с наложенным платежом</Link></p>
          <p><Link to="/support/dictionaries/special-termins">Специальные термины</Link></p>
        </article>
        <footer>
          <p>Если вы не нашли ответа на свой вопрос — обратитесь в службу поддержки Почты России</p>
          <h2><b>8-800-100-00-00</b> или <a href="mailto:client@russianpost.ru?subject=Отслеживание отправлений через API">client@russianpost.ru</a>
          </h2>
        </footer>
      </div>
    </div>
  </div>

export default withHashLink(SupportRu);
