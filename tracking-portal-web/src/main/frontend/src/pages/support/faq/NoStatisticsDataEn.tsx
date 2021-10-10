/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const NoStatisticsDataEn = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Frequently Asked Questions</Link>
      <h3> Why couldn&apos;t I check statistics for the current date?</h3>
      <article className="page-help-article__content">
        Statistics data is upgraded once a day, the information on requests to API tracking service for the current date will be available tomorrow.
      </article>
    </div>
  </div>
);

export default NoStatisticsDataEn;
