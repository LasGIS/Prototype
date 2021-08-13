/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const NoStatisticsDataRu = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Часто задаваемые вопросы</Link>
      <h3> Почему я не вижу данных статистики за сегодня?</h3>
      <article className="page-help-article__content">
        Данные статистики обновляются один раз в сутки, информация по обращениям к API Сервиса отслеживания за сегодняшний день будет доступна
        завтра.
      </article>
    </div>
  </div>
