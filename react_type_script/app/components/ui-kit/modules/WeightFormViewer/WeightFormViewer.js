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
import Input from '../../../../components/input/Input';
import cn from 'classnames';
/** Старая форма для ввода веса */
import WeightInputStep from '../../../../components/step/WeightInputStep';
/** СФЕ */
import { styles } from '../../../../pages/CapacityForming/CapacityClosingPage/styles';
import CapacityClosingField from '../../../../pages/CapacityForming/CapacityClosingPage/modules/CapacityClosingField/CapacityClosingField';
import CapacityClosingFieldFinalWeight from '../../../../pages/CapacityForming/CapacityClosingPage/modules/CapacityClosingField/CapacityClosingFieldFinalWeight';
import { SCALES_TYPE } from '../../../../common/constants/constants';

class WeightFormViewer extends React.Component {
  /** Так как компоненты с формами ввода веса
   * завязаны на контексте использования, не унифицированы,
   * не все, составляющие их UI - элементы могут быть отображены
   * не все действия с ними можно делать.
   * Пропсы, отвечающие за отображение инфы, берутся из стора c
   * помощью "redux.connect()" и не могут быть добавлены извне. */

  constructor(props) {
    super(props);

    this.state = {
      showDisabled: false,
      showTotalWeight: false,
    };

    this.handleSettingChange = this.handleSettingChange.bind(this);
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
    const { showDisabled, showTotalWeight } = this.state;

    const inputClasses = cn({
      [styles.inputContent]: true,
      [styles.inputContentNotEmpty]: true,
    });

    return (
      <div>
        <h5>Форма для ввода веса</h5>
        {this.renderControls()}
        <div>
          <div>Форма ввода веса из СФЕ</div>
          {!showTotalWeight ? (
            <CapacityClosingField
              id={'weightInput'}
              title={'Поместите емкость на весы'}
              btnId={'submitBtn_weight'}
              onSubmit={() => ({})}
              disabled={showDisabled}
              showPrimaryBtn={showDisabled}
            >
              <Input
                id={'input_weight'}
                className={inputClasses}
                onChange={this.handleChangeWeight}
                value={'25.1'}
                placeholder={'Введите вручную при необходимости'}
                disabled={showDisabled}
              />
            </CapacityClosingField>
          ) : (
            <CapacityClosingFieldFinalWeight
              id={'finalWeightBlock'}
              title={'Поместите емкость на весы'}
              weight={`25.1 кг`}
            />
          )}
        </div>

        <div>
          <div>
            Форма ввода веса из регистрации исходящего отправления
            {showTotalWeight && (
              <div>
                <b>Нельзя отобразить финальный введенный вес, можно посмотреть на странице - /rpo-registration</b>
              </div>
            )}
          </div>
          <WeightInputStep
            className="accept-flow__step"
            label={'Взвесьте отправление'}
            passed={false}
            waitWeightStep={!showDisabled}
            scalesType={SCALES_TYPE.DESK}
          />
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
              name="showTotalWeight"
              type="checkbox"
              checked={this.state.showTotalWeight}
              onChange={this.handleSettingChange}
            />
            Вес введен
          </label>
        </div>

        <div>
          <label>
            <input
              name="showDisabled"
              type="checkbox"
              checked={this.state.showDisabled}
              onChange={this.handleSettingChange}
            />
            Неактивный
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default WeightFormViewer;
