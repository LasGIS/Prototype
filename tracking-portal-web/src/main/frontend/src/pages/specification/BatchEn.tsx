/*
 * Copyright (c) 2021. Prototype
 */

import './specification.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const BatchEn = () => (
  <div className="my-tracking-page__content">
    <header>
      <h2>Remote batch access</h2>

      <p>
        Remote Batch Access allows to track several shipments at once in one query. Each query may contain up to 3000 tracking numbers. Underlying
        protocol of remote batch access: SOAP (Simple Object Access Protocol).
      </p>

      <p>
        The work with API of shipments tracking service is carried out in two phases:
        <br />
        1) To request for the information the user should enter ticket query, which contains the list of tracking numbers of the shipments.(call of
        method getTicket);
        <br />
        2) To receive the response to the ticket (call of method getResponseByTicket).
      </p>

      <p>
        The method returns information about all the operations done with every shipment. Information on each operation consists of the following
        elements: time and place of the operation, code and attribute of the operation, name of the operation.
      </p>

      <h4>1. General information on API use</h4>

      <table className="table_500">
        <tbody>
          <tr>
            <td>
              <span className="arial-dark">Address of the service</span>
            </td>
            <td>https://tracking.russianpost.ru/fc</td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">WSDL</span>
            </td>
            <td>
              <a className="external-link" href="https://tracking.russianpost.ru/fc?wsdl" rel="nofollow">
                https://tracking.russianpost.ru/fc?wsdl
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Methods</span>
            </td>
            <td>
              <span className="arial-dark">getTicket, getResponseByTicket</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Underlying protocol</span>
            </td>
            <td>
              <span className="arial-dark">SOAP 1.1</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Access credentials</span>
            </td>
            <td>
              <span className="arial">
                Could be obtained in <Link to="/access-settings">“Access settings”</Link>
              </span>
              <span className="arial"> section of the registered user, who has access to API service </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="arial-dark">Sample code</span>
            </td>
            <td>
              <Link to="/support/about/examples">Sample code to use API service</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>2. Limitations of the service and recommendations on the use:</h4>

      <p>- Number of tracking numbers in one query should not exceed 3000.</p>

      <p>
        - It is advisable to request for the first response according to the ticket not earlier than 15 minutes since the issue of the ticket. If the
        result is not ready, further requests should be done not more than once in 15 minutes.
      </p>

      <p>- Storage period of the response according to ticket in tracking Service is 32 hours. Once this period expires the response is deleted.</p>

      <h4>3. Method getTicket</h4>

      <p>
        Method getTicket is used to receive the ticket to the information according to the list of tracking numbers. The request contains the list of
        tracking numbers. Upon successful completion, the method returns ticket identifier.
      </p>

      <h4>3.1. Query</h4>

      <p>Each query consists of up to 3000 tracking numbers and parameters of access to API of tracking service (login and password).</p>

      <table>
        <tbody>
          <tr>
            <td colSpan={2} style={{ width: '92px' }}>
              <p>
                <strong>Element</strong>
              </p>
            </td>
            <td style={{ width: '126px' }}>
              <p>
                <strong>Attribute</strong>
              </p>
            </td>
            <td style={{ width: '351px' }}>
              <p>
                <strong>Description</strong>
              </p>
            </td>
            <td style={{ width: '95px' }}>
              <p>
                <strong>Presence</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} rowSpan={7} style={{ width: '92px', height: '27px', verticalAlign: 'top' }}>
              <p>request</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Contains one or more elements of the type «Item».</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Yes</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>FileName</p>
            </td>
            <td rowSpan={6} style={{ width: '351px', height: '27px' }}>
              <p>Not used These elements are present in the protocol for compatibility.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>No</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>FileTypeID</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>No</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>FileNumber</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>No</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>SenderID</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>No</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>RecipientID</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>No</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>DatePreparation</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>No</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} rowSpan={2} style={{ width: '35px', height: '27px', verticalAlign: 'top' }}>
              <p>Item</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Contains one tracking number of the registered mail. The number of Item elements in the query is from 1 to 3000.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Yes</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '126px', height: '27px' }}>
              <p>Barcode</p>
            </td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Tracking number of registered mail in one of the following formats:</p>

              <p>- domestic: consists of 14 symbols (digital format);</p>

              <p>- international: consists of 13 symbols (alphanumeric format), type S10.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ width: '92px', height: '27px' }}>
              <p>login</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>
                Login for the access to API of tracking service. One may obtain it in <Link to="/access-settings">«Access settings»</Link> section.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Yes</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ width: '92px', height: '27px' }}>
              <p>password</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>
                Password for the access to API of tracking service. One may obtain it in <Link to="/access-settings">«Access settings»</Link>
                section.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Yes</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ width: '92px', height: '27px' }}>
              <p>language</p>
            </td>
            <td style={{ width: '126px', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '351px', height: '27px' }}>
              <p>Specified language, which is used in response messages. Valid values:</p>

              <p>RUS - Russian (by default);</p>

              <p>ENG - English</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>No</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.2. Response</h4>

      <p>The response of the method getTicket contains information on issued ticket.</p>

      <table className="table-100">
        <thead>
          <tr>
            <th colSpan={2} scope="col" style={{ width: '20.92%' }}>
              <p>Element</p>
            </th>
            <th scope="col" style={{ width: '18.44%' }}>
              <p>Attribute</p>
            </th>
            <th scope="col" style={{ width: '60.64%' }}>
              <p>Description</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ width: '20.92%', height: '27px' }}>
              <p>ticketResponse</p>
            </td>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>&nbsp;</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>Contains identifier of the issued ticket in case of successful completion or error message in case of failure.</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={4} style={{ width: '3.82%', height: '27px' }}>
              &nbsp;
            </td>
            <td style={{ width: '17.1%', height: '27px' }}>
              <p>value</p>
            </td>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p style={{ textAlign: 'left' }}>&nbsp;</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p style={{ textAlign: 'left' }}>
                The identifier of issued ticket. It contains the data on the date and time of ticket issue and the user who has sent the request. The
                format:
              </p>

              <p style={{ textAlign: 'left' }}>
                <strong>YYYYMMDDHHmmsslllNAME</strong>, where
              </p>

              <p style={{ textAlign: 'left' }}>YYYY - year,</p>

              <p style={{ textAlign: 'left' }}>MM - month,</p>

              <p style={{ textAlign: 'left' }}>DD - day,</p>

              <p style={{ textAlign: 'left' }}>НН - hour,</p>

              <p style={{ textAlign: 'left' }}>mm - minutes,</p>

              <p style={{ textAlign: 'left' }}>ss - seconds,</p>

              <p style={{ textAlign: 'left' }}>lll - milliseconds,</p>

              <p style={{ textAlign: 'left' }}>NAME - login of the user in upper case</p>
            </td>
          </tr>
          <tr>
            <td colSpan={1} rowSpan={3} style={{ width: '17.1%', height: '27px' }}>
              <p>error</p>

              <p>&nbsp;</p>

              <p>&nbsp;</p>
            </td>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>&nbsp;</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>Contains description of the error in case of failure in request.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>ErrorTypeID</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>Code of the error. See the list of codes in clause 3.2.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.44%', height: '27px' }}>
              <p>ErrorName</p>
            </td>
            <td style={{ width: '60.64%', height: '27px' }}>
              <p>The text of the error. See the list of codes in clause 3.2.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.3. Potential errors</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th scope="col" style={{ width: '107px', height: '30px' }}>
              <p>ErrorTypeID</p>
            </th>
            <th scope="col" style={{ width: '536px', height: '30px' }}>
              <p>ErrorName</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>2</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Data format of the query does not correspond to that one that is used in the protocol.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>3</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Failure of client authorization upon calling of the method.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '32px' }}>
              <p>16</p>
            </td>
            <td style={{ width: '536px', height: '32px' }}>
              <p>Internal error of tracking service performance.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>18</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Concurrent request exceeded.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>20</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Unvalid language code.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>21</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>The length of one or more of tracking numbers exceeds the maximum.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>22</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>The lenght of file name exceeds the maximum.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>3.4. Exmples of queries and requests</h4>

      <p>Query example:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;soapenv:Envelope xmlns:soapenv=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;
              xmlns:pos=&quot;http://fclient.russianpost.org/postserver&quot; xmlns:fcl=&quot;http://fclient.russianpost.org&quot;&gt;
              <br />
              &nbsp; &lt;soapenv:Header/&gt;
              <br />
              &nbsp; &lt;soapenv:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;pos:ticketRequest&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;request&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;fcl:Item Barcode=&quot;RA123456788RU&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;fcl:Item Barcode=&quot;RA123456789RU&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;fcl:Item Barcode=&quot;RA123456780RU&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;...
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;/request&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;login&gt;my_login&lt;/login&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;password&gt;my_password&lt;/password&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;language&gt;RUS&lt;/language&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/pos:ticketRequest&gt;
              <br />
              &nbsp; &lt;/soapenv:Body&gt;
              <br />
              &lt;/soapenv:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Response example:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;S:Envelope xmlns:S=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;&gt;
              <br />
              &nbsp; &lt;S:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;ns2:ticketResponse xmlns:ns2=&quot;http://fclient.russianpost.org/postserver&quot;
              xmlns:ns3=&quot;http://fclient.russianpost.org&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;value&gt;20150917162048476CLIENTID&lt;/value&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/ns2:ticketResponse&gt;
              <br />
              &nbsp; &lt;/S:Body&gt;
              <br />
              &lt;/S:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4. Method getResponseByTicket</h4>

      <p>This method is used to get information about the shipments according to the ticket, which was issued earlier.</p>

      <h4>4.1. Query</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th colSpan={2} scope="col">
              <p>Element</p>
            </th>
            <th scope="col" style={{ width: '399px' }}>
              <p>Description</p>
            </th>
            <th scope="col" style={{ width: '95px' }}>
              <p>Presence</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ height: '27px' }}>
              <p>answerByTicketRequest</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>Contains parametres of the request of information according to the ticket.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>&nbsp;</td>
          </tr>
          <tr>
            <td rowSpan={3} style={{ width: '72px', height: '27px' }}>
              &nbsp;
            </td>
            <td style={{ width: '96px', height: '27px' }}>
              <p>ticket</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>Ticket number.</p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Yes</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '96px', height: '27px' }}>
              <p>login</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>
                Login for the access to API of tracking service. One may obtain it in <Link to="/access-settings">«Access settings»</Link> section.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Yes</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '96px', height: '27px' }}>
              <p>password</p>
            </td>
            <td style={{ width: '399px', height: '27px' }}>
              <p>
                Password for the access to API of tracking service. One may obtain it in <Link to="/access-settings">«Access settings»</Link>
                section.
              </p>
            </td>
            <td style={{ width: '95px', height: '27px' }}>
              <p>Yes</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4.2. Response</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th colSpan={3} scope="col" style={{ width: '26.6%', height: '27px' }}>
              <p>Element</p>
            </th>
            <th scope="col" style={{ width: '18.46%', height: '27px' }}>
              <p>Attribute</p>
            </th>
            <th scope="col" style={{ width: '54.94%', height: '27px' }}>
              <p>Description</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} rowSpan={7} style={{ width: '26.6%', height: '27px' }}>
              <p>value</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Contains information about the ticket.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>FileName</p>
            </td>
            <td rowSpan={5} style={{ width: '54.94%', height: '27px' }}>
              <p>Not used These elements are present in the protocol for compatibility.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>FileTypeID</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>FileNumber</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>SenderID</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>RecipientID</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>DatePreparation</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Date and time (Msk) of the completion of ticket processing. Example: &quot;17.09.2015 17:20:48&quot;</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={11} style={{ width: '6.72%', height: '27px' }}>
              &nbsp;
            </td>
            <td colSpan={2} rowSpan={2} style={{ width: '19%', height: '27px', verticalAlign: 'top' }}>
              <p>Item</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                Contains information on single registered shipment tracking number. Number of the elements of type «Item» in the response corresponds
                to the number of tracking numbers listed in the query get Ticket earlier.
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>Barcode</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Tracking number of the registered shipment.</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={9} style={{ width: '7.08%', height: '27px' }}>
              &nbsp;
            </td>
            <td rowSpan={6} style={{ width: '12%', height: '27px', verticalAlign: 'top' }}>
              <p>Operation</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                Contains information on single operation in tracking history of the registered shipment. The number of the elements of the type
                «Operation» corresponds to the number of the registered operations in tracking history of the registered shipment.
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>OperTypeID</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                <Link to="/support/dictionaries/operation_codes">Operation code.</Link>
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>OperCtgID</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                <Link to="/support/dictionaries/operation_codes">Attribute code.</Link>
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>OperName</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>
                <Link to="/support/dictionaries/operation_codes">Operation name.</Link>
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>DateOper</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Local date and time of the operation. Example: &quot;17.09.2015 17:20:48&quot;</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>IndexOper</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Postcode of the place of the operation.</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={3} style={{ width: '12%', height: '27px', verticalAlign: 'top' }}>
              <p>Error</p>
            </td>
            <td style={{ width: '18.46%', height: '27px' }}>&nbsp;</td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Contains information about the error, if it occured upon the request of tracking information using tracking Service.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>ErrorTypeID</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>Error identifier. See the list of potential errors in clause 4.3.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '18.46%', height: '27px' }}>
              <p>ErrorName</p>
            </td>
            <td style={{ width: '54.94%', height: '27px' }}>
              <p>The text of the error. See the list of potential errors in clause 4.3.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4.3. Potential errors</h4>

      <table className="table-100">
        <thead>
          <tr>
            <th scope="col" style={{ width: '107px', height: '30px' }}>
              <p>ErrorTypeID</p>
            </th>
            <th scope="col" style={{ width: '536px', height: '30px' }}>
              <p>ErrorName</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>2</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>The format of query data does not correspond to that one that is used in the protocol.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>3</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Failure of client authorization failure upon calling of the method.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>6</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Response according to the ticket is not ready yet.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>12</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>No information on the requested tracking number.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>16</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Internal error of tracking service performance.</p>
            </td>
          </tr>
          <tr>
            <td style={{ width: '107px', height: '35px' }}>
              <p>17</p>
            </td>
            <td style={{ width: '536px', height: '35px' }}>
              <p>Storage period of the response according to the ticket expired, the responce was deleted from the server.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <h4>4.4. Query and response examples</h4>

      <p>Query example:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;soapenv:Envelope xmlns:soapenv=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;
              xmlns:pos=&quot;http://fclient.russianpost.org/postserver&quot;&gt;
              <br />
              &nbsp; &lt;soapenv:Header/&gt;
              <br />
              &nbsp; &lt;soapenv:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;pos:answerByTicketRequest&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;ticket&gt;20150917162048476CLIENTID&lt;/ticket&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;login&gt;my_login&lt;/login&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;password&gt;my_password&lt;/password&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/pos:answerByTicketRequest&gt;
              <br />
              &nbsp; &lt;/soapenv:Body&gt;
              <br />
              &lt;/soapenv:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>

      <p>&nbsp;</p>

      <p>Response example:</p>

      <table className="table-100">
        <tbody>
          <tr>
            <td>
              &lt;S:Envelope xmlns:S=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;&gt;
              <br />
              &nbsp; &lt;S:Body&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;ns2:answerByTicketResponse xmlns:ns2=&quot;http://fclient.russianpost.org/postserver&quot;
              xmlns:ns3=&quot;http://fclient.russianpost.org&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;value FileName=&quot;&quot; FileTypeID=&quot;2&quot; FileNumber=&quot;1&quot; RecipientID=&quot;1&quot;
              DatePreparation=&quot;17.09.2015 17:20:48&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Item Barcode=&quot;45008378901234&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;1&quot; OperCtgID=&quot;1&quot;
              OperName=&quot;Прием&quot; DateOper=&quot;08.09.2015 17:07:00&quot; IndexOper=&quot;450083&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;10.09.2015 04:42:00&quot; IndexOper=&quot;450962&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;0&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;12.09.2015 18:07:00&quot; IndexOper=&quot;140983&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;13.09.2015 04:14:00&quot; IndexOper=&quot;140980&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;13.09.2015 23:11:00&quot; IndexOper=&quot;111949&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;2&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;14.09.2015 03:25:00&quot; IndexOper=&quot;125362&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;4&quot; OperCtgID=&quot;3&quot;
              OperName=&quot;Досылка почты&quot; DateOper=&quot;15.09.2015 09:20:00&quot; IndexOper=&quot;125362&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;2&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;16.09.2015 03:43:00&quot; IndexOper=&quot;125364&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:Item&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Item Barcode=&quot;10725878901235&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Operation OperTypeID=&quot;1&quot; OperCtgID=&quot;1&quot;
              OperName=&quot;Прием&quot; DateOper=&quot;12.09.2015 09:26:00&quot; IndexOper=&quot;107258&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;1&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;12.09.2015 09:26:00&quot; IndexOper=&quot;107258&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;4&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;12.09.2015 23:14:00&quot; IndexOper=&quot;111974&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;8&quot; OperCtgID=&quot;15&quot;
              OperName=&quot;Обработка&quot; DateOper=&quot;16.09.2015 09:09:00&quot; IndexOper=&quot;130203&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Operation OperTypeID=&quot;2&quot; OperCtgID=&quot;8&quot;
              OperName=&quot;Вручение&quot; DateOper=&quot;16.09.2015 13:45:00&quot; IndexOper=&quot;130203&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;ns3:Item Barcode=&quot;RA123456789RU&quot;&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;ns3:Error ErrorTypeID=&quot;12&quot; ErrorName=&quot;Сообщение не
              найдено&quot;/&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/ns3:Item&gt;
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;....
              <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &lt;/value&gt;
              <br />
              &nbsp; &nbsp; &nbsp;&lt;/ns2:answerByTicketResponse&gt;
              <br />
              &nbsp; &lt;/S:Body&gt;
              <br />
              &lt;/S:Envelope&gt;
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  </div>
);

export default BatchEn;
