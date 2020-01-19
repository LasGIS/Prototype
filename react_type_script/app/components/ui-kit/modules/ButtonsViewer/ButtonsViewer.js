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
import Button from '../../../button/Button';
import { Col, Row } from 'reactstrap';
/** Админка */
import { formsCommonStyles } from '../../../../pages/UserManagement/forms/formsCommonData';
import '../../../../pages/UserManagement/forms/forms-common-style.scss';
/** СФЕ */
import { styles as CapacityProgressHeaderStyles } from '../../../../pages/CapacityForming/modules/CapacityProgressHeader/CapacityProgressHeader';
import '../../../../pages/CapacityForming/modules/CapacityProgressHeader/style.scss';

class ButtonsViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDisabledBtns: true,
    };

    this.handleSettingChange = this.handleSettingChange.bind(this);
  }

  handleSettingChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newState = { [name]: value };

    this.setState(newState);
  }

  render() {
    const { showDisabledBtns } = this.state;

    return (
      <React.Fragment>
        <h5>Кнопки с новой стилизацией (стили для неактивной кнопки разные, border стал шире)</h5>
        {this.renderControls()}
        <Row className="mt-5">
          <Col lg={3}>Кнопка из админки</Col>
          <Col lg={3}>
            <div className={formsCommonStyles.footerBtn}>
              <Button primary disabled={showDisabledBtns}>
                Кнопка
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={3}>Кнопка из СФЕ</Col>
          <Col lg={3}>
            <div className={CapacityProgressHeaderStyles.btnWrap}>
              <Button primary disabled={showDisabledBtns} className={CapacityProgressHeaderStyles.btn}>
                Кнопка
              </Button>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  renderControls() {
    return (
      <div>
        <label>
          <input
            name="showDisabledBtns"
            type="checkbox"
            checked={this.state.showDisabledBtns}
            onChange={this.handleSettingChange}
          />
          Неактивные кнопки
        </label>
      </div>
    );
  }
}

export default ButtonsViewer;
