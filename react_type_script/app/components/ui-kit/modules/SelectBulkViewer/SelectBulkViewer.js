/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import SelectBulk from '../../../select-bulk/SelectBulk';

class SelectBulkViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectMulti: false,
      isSelectDisabled: false,
      isSelectDisabledWithValue: false,
      hasInvalidValue: false,
      hasValidValue: false,
      selectedOptions: null,
      options: [
        { name: 'ukd-1', text: 'УКД №1' },
        { name: 'ukd-2', text: 'УКД №2' },
        { name: 'ukd-3', text: 'УКД №3', disabled: true },
        { name: 'ukd-4', text: 'УКД №4' },
        { name: 'ukd-5', text: 'УКД №5' },
      ],
    };

    this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);
    this.handleSettingChange = this.handleSettingChange.bind(this);
  }

  handleChangeSelectValue(selectedOptions) {
    this.setState({ selectedOptions });
  }

  handleSettingChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newState = { [name]: value };

    if (name !== 'isSelectDisabledWithValue') newState.selectedOptions = null;
    if (name === 'hasInvalidValue') newState.hasValidValue = false;
    if (name === 'hasValidValue') newState.hasInvalidValue = false;

    this.setState(newState);
  }

  render() {
    const {
      isSelectMulti,
      isSelectDisabled,
      isSelectDisabledWithValue,
      hasInvalidValue,
      hasValidValue,
      selectedOptions,
      options,
    } = this.state;

    return (
      <div>
        <h5>
          Селект с массовым редактированием
          <br />
          (используется сейчас только в админке и СФЕ)
        </h5>
        {this.renderControls()}
        <SelectBulk
          isMulti={isSelectMulti}
          value={selectedOptions}
          placeholder={'Выберите УКД'}
          options={options}
          onChange={this.handleChangeSelectValue}
          readOnly={isSelectDisabled || isSelectDisabledWithValue}
          validation={hasValidValue || hasInvalidValue}
          required={hasValidValue || hasInvalidValue}
          isValid={hasValidValue || !hasInvalidValue}
        />
      </div>
    );
  }

  renderControls() {
    return (
      <React.Fragment>
        <div>
          <label>
            <input
              name="isSelectMulti"
              type="checkbox"
              checked={this.state.isSelectMulti}
              onChange={this.handleSettingChange}
            />
            Множественный выбор
          </label>
        </div>

        <div>
          <label>
            <input
              name="isSelectDisabled"
              type="checkbox"
              checked={this.state.isSelectDisabled}
              onChange={this.handleSettingChange}
            />
            Неактивный
          </label>
        </div>

        <div>
          <label>
            <input
              name="isSelectDisabledWithValue"
              type="checkbox"
              checked={this.state.isSelectDisabledWithValue}
              onChange={this.handleSettingChange}
            />
            Неактивный (с выбранным значением)
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

export default SelectBulkViewer;
