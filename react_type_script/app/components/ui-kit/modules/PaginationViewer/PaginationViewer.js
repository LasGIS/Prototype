/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import React from 'react';
import { Col, Row } from 'reactstrap';
import './style.scss';
/** Админка */
import Pagination from '../../../pagination/Pagination';

class PaginationViewer extends React.Component {
  render() {
    return (
      <div className={'ui-kit__pagination-wrapper'}>
        <h5>Пагинация</h5>
        <Row className="mt-5">
          <Col lg={3}>Из админки</Col>
          <Col lg={4}>
            <Pagination pagesCount={33} pageCurrent={11} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PaginationViewer;
