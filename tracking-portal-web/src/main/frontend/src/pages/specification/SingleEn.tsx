/*
 * Copyright (c) 2021. Prototype
 */

import './specification.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { withHashLink } from '../../hoc/withHashLink';

const SingleEn = () =>
  <div className="my-tracking-page__content">
    <header>
      <h2>Single access</h2>

      <p>Single access mode: each query to tracking service gives information on one registered postal item. Possible queries are listed
        below:</p>

      <ul>
        <li>detailed information on all operations during the delivery (method <Link to="#getOperationHistory">getOperationHistory</Link>).
          Information on each operation consists of the time and place of the operation, operation code and operation attribute, the name of
          the operation and other fields;
        </li>
        <li>detailed information on the operations on all COD items (method <Link to="#PostalOrderEventsForMail">PostalOrderEventsForMail</Link>).
        </li>
      </ul>

      <p>&nbsp;</p>

      <p>Underlying protocol of single access: SOAP (Simple Object Access Protocol).</p>

      <h4>1. General information on API use</h4>

      <table className='table_500'>
        <tbody>
        <tr>
          <td><span className='arial-dark'>Address of the service</span></td>
          <td>https://tracking.russianpost.ru/rtm34</td>
        </tr>
        <tr>
          <td><span className='arial-dark'>WSDL</span></td>
          <td><a href="https://tracking.russianpost.ru/rtm34?wsdl">https://tracking.russianpost.ru/rtm34?wsdl</a></td>
        </tr>
        <tr>
          <td><span className='arial-dark'>Methods</span></td>
          <td><span className='arial-dark'><Link to="#getOperationHistory">getOperationHistory</Link>
            returns history of operations during the delivery<br/>
            <Link dir="ltr" to="#PostalOrderEventsForMail">PostalOrderEventsForMail</Link> returns the history of operations on COD payments</span>
          </td>
        </tr>
        <tr>
          <td><span className='arial-dark'>Underlying protocol</span></td>
          <td><span className='arial-dark'>SOAP 1.2</span></td>
        </tr>
        <tr>
          <td><span className='arial-dark'>Access credentials</span></td>
          <td><span className='arial'>Could be obtained in&nbsp;<Link to="/access-settings">“Access settings”</Link></span>
            <span className='arial'>&nbsp;section of the registered user, who has access to API service</span>
          </td>
        </tr>
        <tr>
          <td><span className='arial-dark'>Sample code</span></td>
          <td><Link to="support/about/examples">Sample code to use API service</Link></td>
        </tr>
        </tbody>
      </table>

      <h4 id="getOperationHistory">2. Method getOperationHistory</h4>

      <p>Method getOperationHistory is used to receive information on specific shipment. Method returns detailed information about all the
        operations during the delivery of the shipment.</p>

      <h4>2.1. Query</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th colSpan={2} scope="col">
            <p>Element</p>
          </th>
          <th scope="col">
            <p>Description</p>
          </th>
          <th scope="col">
            <p>Presence</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={2}>
            <p>OperationHistoryRequest</p>
          </td>
          <td>
            <p>Consists of the following elements: Barcode, MessageType, Language.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={3}>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Barcode</p>
          </td>
          <td>
            <p>A tracking number in one of the following formats:</p>

            <p>- domestic: consists of 14 symbols (digital format);</p>

            <p>- international: consists of 13 symbols (alphanumeric format), type S10.</p>
          </td>
          <td>
            <p>Yes</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>MessageType</p>
          </td>
          <td>
            <p>Message type. Possible values:</p>

            <p>0 - history of operation for the shipment;</p>

            <p>1 - history of operations on registered notification for this shipment.</p>
          </td>
          <td>
            <p>Yes</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Language</p>
          </td>
          <td>
            <p>Specified language, which is used for all the names of the operations/ attributes and error messages. Valid value:</p>

            <p>RUS – to use Russian language (by default);</p>

            <p>ENG – to use English language.</p>
          </td>
          <td>
            <p>No</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <p>AuthorizationHeader</p>
          </td>
          <td>
            <p>Consists of the following elements: login and password.</p>

            <p>The attribute soapenv:mustUnderstand of the element AuthorizationHeader must contain value 1.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2}>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>login</p>
          </td>
          <td>
            <p>Login for the access to API of tracking service could be found in&nbsp;<Link to="/access-settings">«Access settings»</Link>
              section.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>password</p>
          </td>
          <td>
            <p>Password for the access to API of tracking service could be found in&nbsp;<Link to="/access-settings">«Access settings»</Link>
              section.</p>
          </td>
          <td>
            <p>Да</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>2.2. Response</h4>

      <p>The response of the method getOperationHistory contains list of elements historyRecord. Each element contains information on single
        operation during the delivery of the shipment. If there is no registered operations yet, the method returns null list.</p>

      <p>The following information on the operation is mandatory in each response:<br/>
        - Date of the operation (OperDate);<br/>
        - Place of the operation (OperationAddress);<br/>
        - Operation (OperType) and its attribute (OperAttr).</p>

      <p>If there is other information on the delivery saved in the Tracking service, the method also returns it.&nbsp;</p>

      <p>&nbsp;</p>

      <table className='table-100'>
        <thead>
        <tr>
          <th colSpan={4} style={{ width: "45.64%" }}>
            <p>Element</p>
          </th>
          <th style={{ width: "54.36%" }}>
            <p>Description</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>AddressParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains address data of the operations during the delivery.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={3} style={{ width: "5.02%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>DestinationAddress</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains address data of the destination point of the delivery.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Index</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>The postcode of the destination point of the delivery. The method doesn\'t return it for the international shipments.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Description</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>The address and/or the name of the destination point of the delivery. Example of a value.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={21} style={{ width: "5.02%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>OperationAddress</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains address data of the place of operation during the delivery of the shipment.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Index</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>The postcode of the of the place of operation during the delivery of the shipment.. The method doesn\'t return it for the
              international shipments.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Description</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>The address and/or the name of the place of the operation during the delivery.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>MailDirect</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data on the destination country of the delivery of the shipment.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>The code of the country. Codes are listed in the field «Code» of <Link to="/support/dictionaries/countries">«Country
              Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code2A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Two-letter identity code of the country. Identity codes are listed in the field “Alpha2” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code3A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Three-letter identity code of the country. Identity codes are listed in the field “Alpha3” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameRu</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the country in Russian language. Identity codes are listed in the field “Country of the point of destination” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameEN</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the country in English language. Identity codes are listed in the field “Name of the country in English” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>CountryFrom</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data about the country of the point of destination.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>The code of the country. Codes are listed in the field «Code» of <Link to="/support/dictionaries/countries">«Country
              Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code2A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Two-letter identity code of the country. Identity codes are listed in the field “Alpha2” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code3A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Three-letter identity code of the country. Identity codes are listed in the field “Alpha3” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameRu</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the country in Russian language. Identity codes are listed in the field “Country of the point of destination” of
              <Link to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameEN</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the country in English language. Identity codes are listed in the field “Name of the country in English” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "40.62%" }}>
            <p>CountryOper</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data on the country, where the operation during the delivery of the shipment is taking place.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "14.42%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>The code of the country. Codes are listed in the field «Code» of <Link to="/support/dictionaries/countries">«Country
              Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code2A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Two-letter identity code of the country. Identity codes are listed in the field “Alpha2” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Code3A</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Three-letter identity code of the country. Identity codes are listed in the field “Alpha3” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameRu</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the country in Russian language. Identity codes are listed in the field “Country of the point of destination” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>NameEN</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the country in English language. Identity codes are listed in the field “Name of the country in English” of <Link
              to="/support/dictionaries/countries">«Country Directory»</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>FinanceParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains financial data, related to the operation during the delivery of the shipment.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={7} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Payment</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Cash-on-delivery (COD) in kopecks</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Value</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Insured value in kopecks</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MassRate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Total cost of the delivery by land and by air in kopecks.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>InsrRate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Insured value charge in kopecks.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>AirRate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Charge for air delivery in total cost of the delivery in kopecks.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Rate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Surcharge in kopecks.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>CustomDuty</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Customs duty in kopecks.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>ItemParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data on the delivery</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={17} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Barcode</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Tracking number for the current operation during the delivery.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>Internum</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Service information on shipment identification. May contain the number of Direct Mail receipt, related to the shipment
              or &lt;null&gt;
              value.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>ValidRuType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Distinctive feature of type and category of domestic shipment.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>ValidEnType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Distinctive feature of type and category of international shipment</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>ComplexItemName</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains textual description of the type and category of the shipment.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MailRank</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains information on <Link to="/support/dictionaries/mailrank">mail rank</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Mail rank code</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Mail rank name</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MailType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains information on <Link to="/support/dictionaries/mailtype">mail type</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Mail type code.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Mail type name.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>MailCtg</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains information on <Link to="/support/dictionaries/category_codes">mail category</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Mail category code.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Mail category name.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>Mass</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Weight in grams.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>MaxMassRu</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Maximum possible value of weight for this type and category of domestic shipment.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>MaxMassEn</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Maximum possible value of weight for this type and category of international shipment.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>OperationParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains parameters of the operation during the delivery.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>OperType</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains information about the <Link to="/support/dictionaries/operation_codes">operation during the delivery</Link>.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={6} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Code of the operation.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the operation.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>OperAttr</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains information about the <Link to="/support/dictionaries/operation_codes">attribute of the operation during the
              delivery</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Code of the operation.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the operation.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>OperDate</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data about the date and the time of the operation during the delivery of the shipment.</p>

            <p>For example: 2015-01-08T14:50:00.000+03:00</p>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ width: "45.64%" }}>
            <p>UserParameters</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data on users, related to the operation during the delivery of the shipment.</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={5} style={{ width: "4.92%" }}>
            <p>&nbsp;</p>
          </td>
          <td colSpan={3} style={{ width: "40.72%" }}>
            <p>SendCtg</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains information about the <Link to="/support/dictionaries/send_ctg">category of the sender</Link>.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2} style={{ width: "14.52%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>Id</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Code of the category of the sender.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "26.2%" }}>
            <p>Name</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Name of the category of the sender.</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>Sndr</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data about the sender.</p>

            <p>For example: ИВАНОВ А Н</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "14.52%" }}>
            <p>Rcpn</p>
          </td>
          <td style={{ width: "26.2%" }}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "54.36%" }}>
            <p>Contains data about the addressee.</p>

            <p>For example: ПЕТРОВ И.К.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>2.3. Potential errors</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th scope="col" style={{ width: "42.52%" }}>
            <p>Type of the error</p>
          </th>
          <th scope="col" style={{ width: "57.48%" }}>
            <p>Description</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Authorization error</p>

            <p>&nbsp;</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>Authorization error occured upon the query to tracking service.</p>

            <p>Element AuthorizationFault contains detailed description of the error.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Error during the request tracking information on the shipment</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>Error occured upon the request of tracking information on the shipment.</p>

            <p>Element OperationHistoryFault contains detailed description of the error.</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Pre-set language is not supported</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>Invalid value of the code of language was indicated in the query.</p>

            <p>Element LanguageFault contains detailed description of the error.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>2.4. Query and response examples</h4>

      <p>Query example:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:oper="http://russianpost.org/operationhistory"
            xmlns:data="http://russianpost.org/operationhistory/data" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Header/&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Body&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;oper:getOperationHistory&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;data:OperationHistoryRequest&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:Barcode&gt;RA644000001RU&lt;/data:Barcode&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:MessageType&gt;0&lt;/data:MessageType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:Language&gt;RUS&lt;/data:Language&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/data:OperationHistoryRequest&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;data:AuthorizationHeader soapenv:mustUnderstand="1"&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:login&gt;my_login&lt;/data:login&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;data:password&gt;my_password&lt;/data:password&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/data:AuthorizationHeader&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;/oper:getOperationHistory&gt;<br/>
            &nbsp; &nbsp;&lt;/soap:Body&gt;<br/>
            &lt;/soap:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Response example:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;S:Envelope xmlns:S="http://www.w3.org/2003/05/soap-envelope"&gt;<br/>
            &nbsp; &nbsp;&lt;S:Body&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;ns7:getOperationHistoryResponse xmlns:ns2="http://russianpost.org/sms-info/data"
            xmlns:ns3="http://russianpost.org/operationhistory/data" xmlns:ns4="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:ns5="http://www.russianpost.org/custom-duty-info/data" xmlns:ns6="http://www.russianpost.org/RTM/DataExchangeESPP/Data"
            xmlns:ns7="http://russianpost.org/operationhistory"&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:OperationHistoryData&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:AddressParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:DestinationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Index&gt;663300&lt;/ns3:Index&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Description&gt;Норильск
            Почтамт&lt;/ns3:Description&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:DestinationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Index&gt;111555&lt;/ns3:Index&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Description&gt;Москва
            555&lt;/ns3:Description&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:OperationAddress&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailDirect&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;643&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code2A&gt;RU&lt;/ns3:Code2A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code3A&gt;RUS&lt;/ns3:Code3A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameRU&gt;Российская
            Федерация&lt;/ns3:NameRU&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameEN&gt;Russian
            Federation&lt;/ns3:NameEN&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailDirect&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:CountryOper&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;643&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code2A&gt;RU&lt;/ns3:Code2A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Code3A&gt;RUS&lt;/ns3:Code3A&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameRU&gt;Российская
            Федерация&lt;/ns3:NameRU&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:NameEN&gt;Russian
            Federation&lt;/ns3:NameEN&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:CountryOper&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:AddressParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:FinanceParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Payment&gt;2500000&lt;/ns3:Payment&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Value&gt;2500000&lt;/ns3:Value&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MassRate&gt;152000&lt;/ns3:MassRate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:InsrRate&gt;25000&lt;/ns3:InsrRate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:AirRate&gt;0&lt;/ns3:AirRate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Rate&gt;0&lt;/ns3:Rate&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:FinanceParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:ItemParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Barcode&gt;EA123456789RU&lt;/ns3:Barcode&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:ValidRuType&gt;true&lt;/ns3:ValidRuType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:ValidEnType&gt;false&lt;/ns3:ValidEnType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailRank&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;0&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Без разряда&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailRank&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:PostMark&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;0&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Без отметки&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:PostMark&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;7&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Отправление EMS&lt;/ns3:Name&gt;
            <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:MailCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;4&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;С объявленной ценностью и наложенным
            платежом&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:MailCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Mass&gt;2281&lt;/ns3:Mass&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:ItemParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:OperationParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;1&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Прием&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:OperType&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperAttr&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;1&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Единичный&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:OperAttr&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:OperDate&gt;2015-07-09T18:08:00.000+03:00&lt;/ns3:OperDate&gt;
            <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:OperationParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:UserParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:SendCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Id&gt;1&lt;/ns3:Id&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Name&gt;Население&lt;/ns3:Name&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:SendCtg&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Sndr&gt;ИВАНОВ И Н&lt;/ns3:Sndr&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Rcpn&gt;ПЕТРОВ Н И&lt;/ns3:Rcpn&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:UserParameters&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;/ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;…<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:historyRecord&gt;<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;…<br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:OperationHistoryData&gt;<br/>
            &nbsp; &nbsp; &nbsp; &lt;/ns7:getOperationHistoryResponse&gt;<br/>
            &nbsp; &nbsp;&lt;/S:Body&gt;<br/>
            &lt;/S:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4 id="PostalOrderEventsForMail">3. Method PostalOrderEventsForMail</h4>

      <p>Method PostalOrderEventsForMail returns information about the operations on cash-and delivery (COD) of the specified item.</p>

      <h4>3.1. Query</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th colSpan={2} scope="col">
            <p>Element</p>
          </th>
          <th scope="col">
            <p>Аttribute</p>
          </th>
          <th scope="col">
            <p>Description</p>
          </th>
          <th scope="col">
            <p>Presence</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={2}>
            <p>AuthorizationHeader</p>
          </td>
          <td>&nbsp;</td>
          <td>
            <p>Contains two elements: login и password.</p>

            <p>Attribute soapenv:mustUnderstand of the element AuthorizationHeader should contain value 1.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td rowSpan={2}>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>login</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Login for the access to API of tracking service. One may obtain it in <Link to="/access-settings">«Access settings»</Link> section.
            </p>
          </td>
          <td>
            <p>Yes</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>password</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Password for the access to API of tracking service. One may obtain it in <Link to="/access-settings">«Access settings»</Link>
              section.</p>
          </td>
          <td>
            <p>Yes</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <p>PostalOrderEventsForMailInput</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
          <td>
            <p>Contains two attributes: Barcode, and Language.</p>
          </td>
          <td>
            <p>Yes</p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2}>
            <p>&nbsp;</p>
          </td>
          <td style={{ width: "126px", height: "27px" }}>
            <p>Barcode</p>
          </td>
          <td style={{ width: "351px", height: "27px" }}>
            <p>Tracking number of registered mail in one of the following formats:</p>

            <p>- domestic: consists of 14 symbols (digital format);</p>

            <p>- international: consists of 13 symbols (alphanumeric format), type S10.</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td style={{ width: "57.48%", height: "27px" }}>
            <p>Language</p>
          </td>
          <td style={{ width: "351px", height: "27px" }}>
            <p>Specified language, which is used in response messages. Valid values:</p>

            <p>RUS &nbsp;- Russian (by default);</p>

            <p>ENG - English</p>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>3.2. Response</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th>
            <p>Element</p>
          </th>
          <th>
            <p>Attribute</p>
          </th>
          <th>
            <p>Description</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={1} rowSpan={9}>PostalOrderEvent</td>
          <td>Number</td>
          <td>Number of COD money order.</td>
        </tr>
        <tr>
          <td>EventDateTime</td>
          <td>Date and time of the operation in the format: YYYY-MM-DDTHH:mm:ss.SSSZ<br/>
            Example: 2015-12-11T15:04:37.000+03:00
          </td>
        </tr>
        <tr>
          <td>EventType</td>
          <td><Link to="/support/dictionaries/event_type">Code of the operation with COD</Link></td>
        </tr>
        <tr>
          <td>EventName</td>
          <td><Link to="/support/dictionaries/event_type">Operation name</Link></td>
        </tr>
        <tr>
          <td>IndexTo</td>
          <td>Postcode of the addressee</td>
        </tr>
        <tr>
          <td>IndexEvent</td>
          <td>Postcode of the post office, where the operation was done</td>
        </tr>
        <tr>
          <td>SumPaymentForward</td>
          <td>Cash-on-delivery (COD) in kopecks</td>
        </tr>
        <tr>
          <td>CountryEventCode</td>
          <td>Two-letter identity code of the country, where the operation was done. Identity codes are listed in the field “Alpha2” of
            <Link to="/support/dictionaries/countries">“Country directory”</Link>.
          </td>
        </tr>
        <tr>
          <td>CountryToCode</td>
          <td>
            <p>Two-letter identity code of the country of the addressee of COD. Identity codes are listed in the field “Alpha2” of
              <Link to="/support/dictionaries/countries">“Country directory”</Link>.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.3. Potential errors</h4>

      <table className='table-100'>
        <thead>
        <tr>
          <th scope="col" style={{ width: "42.52%" }}>
            <p>Type of error</p>
          </th>
          <th scope="col" style={{ width: "57.48%" }}>
            <p>Description</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{ width: "42.52%" }}>
            <p>Authorization error</p>

            <p>&nbsp;</p>
          </td>
          <td style={{ width: "57.48%" }}>
            <p>Authorization error occured upon the query to tracking service.</p>
          </td>
        </tr>
        </tbody>
      </table>

      <div style={{ clear: "both" }}>&nbsp;</div>

      <h4>3.4. Query and response examples</h4>

      <p>Query example:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:oper="http://russianpost.org/operationhistory"
            xmlns:data="http://russianpost.org/operationhistory/data" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:data1="http://www.russianpost.org/RTM/DataExchangeESPP/Data"&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Header/&gt;<br/>
            &nbsp; &nbsp;&lt;soap:Body&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;oper:PostalOrderEventsForMail&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data:AuthorizationHeader soapenv:mustUnderstand="1"&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data:login&gt;my_login&lt;/data:login&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data:password&gt;my_password&lt;/data:password&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;/data:AuthorizationHeader&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;data1:PostalOrderEventsForMailInput Barcode="14102192069353" Language="ENG"/&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;/oper:PostalOrderEventsForMail&gt;<br/>
            &nbsp; &nbsp;&lt;/soap:Body&gt;<br/>
            &lt;/soap:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Response example:</p>

      <table className='table-100'>
        <tbody>
        <tr>
          <td>&lt;S:Envelope xmlns:S="http://www.w3.org/2003/05/soap-envelope"&gt;<br/>
            &nbsp; &nbsp;&lt;S:Body&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;ns7:PostalOrderEventsForMailResponse xmlns:ns2="http://russianpost.org/sms-info/data"
            xmlns:ns3="http://russianpost.org/operationhistory/data" xmlns:ns4="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:ns5="http://www.russianpost.org/custom-duty-info/data" xmlns:ns6="http://www.russianpost.org/RTM/DataExchangeESPP/Data"
            xmlns:ns7="http://russianpost.org/operationhistory"&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;ns6:PostalOrderEventsForMaiOutput&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;PostalOrderEvent Number="96598"
            EventDateTime="2015-12-11T15:04:37.000+03:00" EventType="1" EventName="Приём" IndexTo="141021" IndexEvent="298300"
            SumPaymentForward="234000" CountryEventCode="RU" CountryToCode="RU"/&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;PostalOrderEvent Number="96598"
            EventDateTime="2015-12-12T16:49:13.000+03:00" EventType="3" EventName="Оплата" IndexTo="141021" IndexEvent="141021"
            SumPaymentForward="234000" CountryEventCode="RU" CountryToCode="RU"/&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&lt;/ns6:PostalOrderEventsForMaiOutput&gt;<br/>
            &nbsp; &nbsp;&nbsp; &nbsp;&lt;/ns7:PostalOrderEventsForMailResponse&gt;<br/>
            &nbsp; &nbsp;&lt;/S:Body&gt;<br/>
            &lt;/S:Envelope&gt;
          </td>
        </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>&nbsp;</p>
    </header>
  </div>

export default withHashLink(SingleEn);
