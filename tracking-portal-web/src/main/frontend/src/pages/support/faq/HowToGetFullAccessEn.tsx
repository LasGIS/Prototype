/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const HowToGetFullAccessEn = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Frequently Asked Questions</Link>
      <h3> How to get access to unlimited tracking?</h3>
      <article className="page-help-article__content">
        <p>
          Unlimited tracking is available only to those who signed a contract with Russian Post and are sending parcels, letters or EMS items as per
          contract. If you have already signed the contract, please, register in “Tracking service” and contact your personal manager at Russian Post
          with a request to provide unlimited access.
        </p>
        <p>
          You haven’t signed the contract yet, you may sign it <a href="https://dogovor.pochta.ru">here</a>.
        </p>
      </article>
    </div>
  </div>
);

export default HowToGetFullAccessEn;
