/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const TestingAccessEn = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#about">On the service</Link>
      <h3> How to check access?</h3>
      <article className="page-help-article__content">
        <p>
          If you were already <Link to="/support/faq/how_to_get_access">granted access</Link> to tracking service, you may use the data indicated in
          «Access settings» section for test connection to the service. We recommend to use for testing SoapUI application, which you may download for
          free from the site:
          <a href="http://www.soapui.org/downloads/soapui.html">http://www.soapui.org/downloads/soapui.html</a>.
        </p>
        <p>Further steps help you to check the performance of the service in Single access mode:</p>
        &nbsp;
        <ol>
          <li>Launch the application SoapUI and create new project: File -&gt; New SOAP Project.&nbsp;</li>
          <li>
            In the appeared dialogue box:
            <ul>
              <li>enter any project name in the field Project Name, for example, tracking.russianpost</li>
              <li>
                enter address of WSDL description of Single access in the field Initial WSDL:
                <a href="https://tracking.russianpost.ru/rtm34?wsdl">https://tracking.russianpost.ru/rtm34?wsdl</a>
              </li>
              <li>the check box «Create Requests» must be turned on.</li>
            </ul>
            Press OK button.
            <p>&nbsp;</p>
            <p>
              <img alt="" src="../../../documents/10184/19272/1.png" />
            </p>
            <p>&nbsp;</p>
          </li>
          <li>
            Open method <strong>getOperationHistory</strong> in the project tree and double click the request <strong>Request 1</strong>. In the text
            of automatically generated SOAP request instead of sign &apos;?&apos; :
            <ul>
              <li>enter tracking number of the shipment you would like to track in the field «Barcode». For example, RA644000001RU</li>
              <li>enter value 0 in the field «MessageType»</li>
              <li>to access the service enter your login and password in the fields «login» and «password».</li>
            </ul>
            <p>&nbsp;</p>
            <p>
              <img alt="" src="/documents/10184/19272/2.png" />
            </p>
            <p>&nbsp;</p>
          </li>
          <li>
            Press the button with green triangle to make request. The response of the service will appear to the right. If the request proceeded
            successfully, the response would contain the history of the operations during the delivery of the shipment.
            <p>&nbsp;</p>
            <p>
              <img alt="" src="/documents/10184/19272/3.png" />
            </p>
            <p>&nbsp;</p>
          </li>
        </ol>
        <p>&nbsp;</p>
        <h2>Potential errors</h2>
        <ol>
          <li>
            In case of request failure, response will contain the name of the error (field «Text») and its extended description. You may see the
            example of incorrect input of login and password upon the request on the picture below.
            <p>&nbsp;</p>
            <p>
              <img alt="_" src="/documents/10184/19272/4.png" />
            </p>
            <p>&nbsp;</p>
          </li>
          <li>
            One of the frequent reason of errors in service requests is incorrect value of the parameter Content-Type in HTTP title of the request.
            The value of the parameter Content-Type in the requests of client application must be as follows:{' '}
            <strong>applicatoin/soap+xml;charset=UTF-8</strong>.
            <p>You may check the content of HTTP-titles of the request and response in the bookmark “Raw” in SoapUI application.</p>
            <p>&nbsp;</p>
            <p>
              <img alt="_" src="/documents/10184/19272/5.png" />
            </p>
            <p>&nbsp;</p>
          </li>
        </ol>
      </article>
    </div>
  </div>
);

export default TestingAccessEn;
