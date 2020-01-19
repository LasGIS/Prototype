/*
 * Copyright (c) 2020. Prototype
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
