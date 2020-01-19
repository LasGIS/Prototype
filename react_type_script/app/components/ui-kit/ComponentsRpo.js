/*
 * Copyright 2018 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import CheckLabelTicket from '../check-label/CheckLabelTicket';
import CheckLabel from '../check-label/CheckLabel';

export default class ComponentsRpo extends Component {
  render() {
    return (
      <Container>
        <Row className="mt-5 mb-5">
          <Col lg={12}>
            <CheckLabelTicket id={'qwerty'}>
              <CheckLabel />
            </CheckLabelTicket>
          </Col>
        </Row>
      </Container>
    );
  }
}
