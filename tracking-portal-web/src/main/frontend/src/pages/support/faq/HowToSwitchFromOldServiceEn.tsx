/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const HowToSwitchFromOldServiceEn = () =>
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Frequently Asked Questions</Link>
      <h3> I used previous version of service. How to access the new one?</h3>
      <article className="page-help-article__content">
        <p dir="ltr">Starting 12:00 of November, 16th, 2015, the interface of the previous version of the service (Integrated Automated Control
          System of Registered Postal Items) will not be available for the requests of the clients. The complete list of addresses:</p>
        <p dir="ltr">&nbsp;</p>
        <p dir="ltr">- <a href="http://voh.russianpost.ru:8080/niips-operationhistory-web/OperationHistory">
          http://voh.russianpost.ru:8080/niips-operationhistory-web/OperationHistory
        </a></p>
        <p dir="ltr">- <a href="http://voh.russianpost.ru:8081/niips-operationhistory-web-ml/OperationHistory12">
          http://voh.russianpost.ru:8081/niips-operationhistory-web-ml/OperationHistory12
        </a></p>
        <p dir="ltr">- <a href="http://vfc.russianpost.ru:8080/FederalClient/ItemDataService">
          http://vfc.russianpost.ru:8080/FederalClient/ItemDataService
        </a></p>
        <p dir="ltr">- <a href="http://r00vfc2.main.russianpost.ru:8080/FederalClientService-web/ItemDataService">
          http://r00vfc2.main.russianpost.ru:8080/FederalClientService-web/ItemDataService
        </a></p>
        <p dir="ltr">- <a href="http://r00vfctest.main.russianpost.ru:8080/niips-operationhistory-web-ml/OperationHistory">
          http://r00vfctest.main.russianpost.ru:8080/niips-operationhistory-web-ml/OperationHistory
        </a></p>
        <p>&nbsp;</p>
        <p dir="ltr">All the users of the previous version of tracking service should <Link to="/support/faq/how_to_get_access">register</Link> to
          the
          new service and get data for connection (URL, login and password). New version of the service supports two types of access:</p>
        <p>&nbsp;</p>
        <p dir="ltr">- <Link to="/specification">Single access</Link> allows you to receive information on single shipment in the request. Limited
          access up to 100 &nbsp;requests per day is available to every registered user; unlimited access is available only to those who signed
          a contract with Russian Post and are sending parcels, letters or EMS items according to the contract.</p>
        <p>&nbsp;</p>
        <p dir="ltr">- <Link to="/specification">Batch Access</Link> supports queries, each of which may contain of up to 3000 tracking numbers.
          This
          service is available only to the clients as per contract.</p>
        <p>&nbsp;</p>
        <p dir="ltr">To get access to unlimited tracking after registration, you need to sign a contract with Russian Post for sending parcels,
          letters or EMS items and contact your personal manager at Russian Post with a request to remove restrictions.</p>
        <p dir="ltr">&nbsp;</p>
        <p dir="ltr">For the correct operation of the new service:</p>
        <p dir="ltr">&nbsp;</p>
        <p>- For the users of the previous version of the service, operated in single access mode on the base of SOAP 1.2, and also to the users
          of the previous version of the service operated in batch access mode:<br/>
          For switching to another service just indicate URL address, login and password which you have got upon the registration to the new
          service in the settings of your information system.<br/>
          &nbsp;<br/>
          - Users of RTM-34 protocol on the base of SOAP 1.1: for switching to another service you need to indicate address, login and password,
          which you have got upon the registration to the new service and also provide support of SOAP 1.2. protocol in the client application.
          Protocol SOAP 1.1 for the previous version of the service, operated in single access mode is not supported.</p>
        <p>&nbsp;</p>
        <p dir="ltr">Should you have any questions, please, check <Link to="/support">FAQ section</Link> or contact support team:
          <a href="mailto:client@russianpost.ru">client@russianpost.ru</a></p>
      </article>
    </div>
  </div>
