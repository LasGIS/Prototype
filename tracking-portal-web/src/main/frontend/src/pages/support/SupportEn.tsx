/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { withHashLink } from '../../hoc/withHashLink';

const SupportEn = () =>
  <div className="help-page row-fluid">
    <div className="span3"/>
    <div className="help-article">
      <div>
        <header>
          <h1>Support</h1>
          <p>If you do not find the answer to your question - please contact support by phone Russian Post <b>8-800-100-00-00</b> or email
            at&nbsp;
            <a href="mailto:client@russianpost.ru">client@russianpost.ru</a>
          </p>
        </header>
        <article>
          <h2 id="faq">Frequently Asked Questions</h2>
          <p><Link to="/support/faq/service_about">What is API for shipment tracking service?</Link></p>
          <p><Link to="/support/faq/service_for_who">For whom is API service convenient?</Link></p>
          <p><Link to="/support/faq/how_to_get_access">How to access?</Link></p>
          <p><Link to="/support/faq/how_to_get_full_access">How to get access to unlimited tracking?</Link></p>
          <p><Link to="/support/faq/no_statistics_data">Why couldn't I check statistics for the current date?</Link></p>
          <p><Link to="/support/faq/how_to_switch_from_old_service">I used previous version of service. How to access the new one?</Link></p>
          <h2 id="about">On the service</h2>
          <p><Link to="/support/about/agreement">User agreement</Link></p>
          <p><Link to="/specification">Specification</Link></p>
          <p><Link to="/support/about/examples">Sample code to use API service</Link></p>
          <p><Link to="/support/about/testing_access">How to check access?</Link></p>
          <h2 id="dictionaries">Technical references</h2>
          <p><Link to="/support/dictionaries/operation_codes">Operation codes and operation attributes</Link></p>
          <p><Link to="/support/dictionaries/category_codes">Mail category codes</Link></p>
          <p><Link to="/support/dictionaries/mailrank">Mail rank codes</Link></p>
          <p><Link to="/support/dictionaries/mailtype">Mail type codes</Link></p>
          <p><Link to="/support/dictionaries/postmark">Mail mark codes </Link></p>
          <p><Link to="/support/dictionaries/countries">Country directory</Link></p>
          <p><Link to="/support/dictionaries/send_ctg">Sender Category Codes</Link></p>
          <p><Link to="/support/dictionaries/event_type">Codes of cash-on-delivery (COD) operations</Link></p>
          <p><Link to="/support/dictionaries/special-termins">Technical terms</Link></p>
        </article>
        <footer>
          <p>If you do not find the answer to your question - please contact support by phone Russian Post</p>
          <h2><b>8-800-100-00-00</b> or <a href="mailto:client@russianpost.ru">client@russianpost.ru</a></h2>
        </footer>
      </div>
    </div>
  </div>

export default withHashLink(SupportEn);
