/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import { formsCommonStyles } from '../../../../pages/UserManagement/forms/formsCommonData';
import Checkbox from '../../../../components/checkbox/Checkbox';
import '../../../../pages/UserManagement/forms/forms-common-style.scss';
import cn from 'classnames';

class CheckboxViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: false,
      isInputDisabled: false,
    };

    this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
    this.handleSettingChange = this.handleSettingChange.bind(this);
  }

  handleChangeInputValue() {
    this.setState({ value: !this.state.value });
  }

  handleSettingChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newState = { [name]: value };

    this.setState(newState);
  }

  render() {
    const { value, isInputDisabled } = this.state;

    return (
      <div>
        <h5>Чекбокс (В Админке был изменен цвет для border в состоянии 'checked')</h5>
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
          <div
            className={cn(formsCommonStyles.field, formsCommonStyles.fieldArchive)}
            style={{
              display: 'block',
              background: 'transparent',
              margin: '0',
              padding: '0',
              opacity: isInputDisabled ? '0.5' : '1',
            }}
          >
            <div className={formsCommonStyles.fieldInputWrap}>
              <Checkbox readOnly={isInputDisabled} checked={value} onChange={this.handleChangeInputValue} label={''} />
            </div>
          </div>
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
            <input name="hasInvalidValue" type="checkbox" checked={false} onChange={() => ({})} />
            Содержит невалидное значение (нет реализации)
          </label>
        </div>

        <div>
          <label>
            <input name="hasValidValue" type="checkbox" checked={false} onChange={() => ({})} />
            Содержит валидное значение (нет реализации)
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckboxViewer;
