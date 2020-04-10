/*
 * Copyright (c) 2020. Prototype
 */

import React, { ChangeEvent } from 'react';
import Checkbox from '../../../checkbox/Checkbox';
import cn from 'classnames';

type Props = {};

type State = {
  value: boolean,
  isInputDisabled: boolean,
};

class CheckboxViewer extends React.Component<Props, State> {
  constructor(props: Props) {
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

  handleSettingChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    if (name === 'isInputDisabled') {
      this.setState({ isInputDisabled: target.checked });
    }
  }

  render() {
    const { value, isInputDisabled } = this.state;

    return (
      <div>
        <h5>Чекбокс</h5>
        {this.renderControls()}
        <div
          className={'userManagementForm'}
          style={{
            display: 'block',
            background: 'transparent',
            margin: '0',
            padding: '0',
          }}
        >
          <div
            className={cn('userManagementForm__field', 'userManagementForm__fieldArchive')}
            style={{
              display: 'block',
              background: 'transparent',
              margin: '0',
              padding: '0',
              opacity: isInputDisabled ? '0.5' : '1',
            }}
          >
            <div className={'userManagementForm__fieldInputWrap'}>
              <Checkbox readOnly={isInputDisabled} checked={value} onChange={this.handleChangeInputValue}
                        label={'текст для пояснения'}/>
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
      </React.Fragment>
    );
  }
}

export default CheckboxViewer;
