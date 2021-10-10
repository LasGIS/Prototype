/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';

const HowToGetAccessEn = () => (
  <div className="help-page">
    <div className="help-article">
      <Link to="/support#faq">Frequently Asked Questions</Link>
      <h3> How to access?</h3>
      <article className="page-help-article__content">
        <p>Instructions on connecting to shipment tracking service:</p>
        <p>&nbsp;</p>
        <p>
          1) Go to “Tracking service” <Link to="/">home page.</Link>
        </p>
        <p>2) Press &quot;Access&quot; button.</p>
        <p>
          3) If you are already a registered user of <a href="http://pochta.ru">Russian Post site</a>, please, sign in using your login and password.
          Otherwise, you may register – this process doesn&apos;t take much time.
        </p>
        <p>3) You need to confirm that you are agree to the terms of the service.</p>
        <p>
          4) Access is granted. Required data is sent to the indicated e-mail They are also available on site in
          <Link to="/access-settings">“My tracking”</Link> section.
        </p>
        <p>5) Begin to use API methods from your information system, using service address, login and password sent to your email.</p>
        <p>
          6) In <Link to="/statistics">“My tracking”</Link> section you may check statistics of your tracking and set up notifications.
        </p>
      </article>
    </div>
  </div>
);

export default HowToGetAccessEn;
