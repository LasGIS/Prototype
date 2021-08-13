/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const ServiceForWhoEn = () =>
  <div className="help-article">
    <div className="help-page">
      <div className="help-article">
        <Link to="/support#faq">Frequently Asked Questions</Link>
        <h3> For whom is API service convenient?</h3>
        <article className="page-help-article__content">
          <p>API is designed for online stores and large-scale senders who need to track delivery and use this information in their information
            systems.</p>
          <p>&nbsp;</p>
          <p>If you need to track only one or more parcels, you should better use the <a href="http://pochta.ru">main site</a>&nbsp;of Russian
            Post or <a href="https://pochta.ru/support/web-mobile-services/mobile-application">mobile application</a> of Russian Post.</p>
        </article>
      </div>
    </div>
  </div>
