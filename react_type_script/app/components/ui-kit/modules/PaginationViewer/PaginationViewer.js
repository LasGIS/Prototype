/*
 * Copyright (c) 2020. Prototype
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
