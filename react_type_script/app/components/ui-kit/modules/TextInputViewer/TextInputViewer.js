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
import { formsCommonStyles } from '../../../../pages/UserManagement/forms/formsCommonData';
import Input from '../../../../components/input/Input';
import '../../../../pages/UserManagement/forms/forms-common-style.scss';
import FakeInputReadOnly from '../../../../pages/UserManagement/forms/form-edit-user/modules/FakeInputReadOnly';

class TextInputViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isInputDisabled: false,
      isInputDisabledWithValue: false,
      hasInvalidValue: false,
      hasValidValue: false,
    };

    this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
    this.handleSettingChange = this.handleSettingChange.bind(this);
  }

  handleChangeInputValue(value) {
    this.setState({ value });
  }

  handleSettingChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newState = { [name]: value };

    if (name !== 'isInputDisabledWithValue') newState.value = '';
    if (name === 'hasInvalidValue') newState.hasValidValue = false;
    if (name === 'hasValidValue') newState.hasInvalidValue = false;

    this.setState(newState);
  }

  render() {
    const { value, isInputDisabled, isInputDisabledWithValue, hasValidValue, hasInvalidValue } = this.state;

    return (
      <div>
        <h5>
          Инпут для ввода текста
          <br />
          (используется сейчас только в админке и СФЕ)
        </h5>
        {this.renderControls()}
        <div
          className={formsCommonStyles.root}
          style={{
            display: 'block',
            background: 'transparent',
            margin: '0',
            padding: '0',
          }}
        >
          {isInputDisabled || isInputDisabledWithValue ? (
            <FakeInputReadOnly value={value} />
          ) : (
            <Input
              placeholder={'Введите текст'}
              className={formsCommonStyles.input}
              onChange={this.handleChangeInputValue}
              value={value}
              readOnly={isInputDisabled || isInputDisabledWithValue}
              validation={hasValidValue || hasInvalidValue}
              required={hasValidValue || hasInvalidValue}
              isValid={hasValidValue || !hasInvalidValue}
            />
          )}
        </div>
      </div>
    );
  }

  renderControls() {
    return (
      <React.Fragment>
        <div>
          <label>
            <input
              name="isInputDisabled"
              type="checkbox"
              checked={this.state.isInputDisabled}
              onChange={this.handleSettingChange}
            />
            Неактивный
          </label>
        </div>

        <div>
          <label>
            <input
              name="isInputDisabledWithValue"
              type="checkbox"
              checked={this.state.isInputDisabledWithValue}
              onChange={this.handleSettingChange}
            />
            Неактивный (с заполненным значением)
          </label>
        </div>

        <div>
          <label>
            <input
              name="hasInvalidValue"
              type="checkbox"
              checked={this.state.hasInvalidValue}
              onChange={this.handleSettingChange}
            />
            Содержит невалидное значение
          </label>
        </div>

        <div>
          <label>
            <input
              name="hasValidValue"
              type="checkbox"
              checked={this.state.hasValidValue}
              onChange={this.handleSettingChange}
            />
            Содержит валидное значение
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default TextInputViewer;
