/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const ServiceAboutEn = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Frequently Asked Questions</Link>
      <h3> What is API for shipment tracking service?</h3>
      <article className="page-help-article__content">
        <p>API (Application Programming Interface) for shipments tracking service is an application programming interface, which allows the
          information systems of the senders to receive tracking information on their registered postal items.</p>

        <p>&nbsp;</p>

        <p>The service operates in request-response mode and supports two types of access:</p>

        <p>&nbsp;</p>

        <p>- <Link to="/specification">Single access</Link> allows you to receive information on single parcel in the request. Limited access up to
          100 requests per day is available to every registered user; unlimited access is available only to those who signed a contract with Russian
          Post and are sending parcels, letters or EMS shipments according to the contract.&nbsp;</p>

        <p><br/>
          - <Link to="/specification">Remote Batch Access</Link> supports queries, each of which may contain up to 3000 tracking numbers. This service
          is available only to the clients as per contract.&nbsp;</p>

        <p>&nbsp;</p>

        <p>If you do not use API and you only need to track one or more parcels, you should better use the <a href="http://pochta.ru">main site</a>
          of Russian Post or <a href="https://pochta.ru/support/web-mobile-services/mobile-application">mobile application</a> of Russian Post.</p>
      </article>
    </div>
  </div>
