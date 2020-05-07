/*
 * Copyright (c) 2020. Prototype
 */

import styles from './UserManagementForm.scss';
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
        <h3>Чекбокс</h3>
        {this.renderControls()}
        <div
          className={styles.userManagementForm}
          style={{
            display: 'block',
            background: 'transparent',
            margin: '0',
            padding: '0',
          }}
        >
          <div
            className={cn(styles.field, styles.archive)}
            style={{
              display: 'block',
              background: 'transparent',
              margin: '0',
              padding: '0',
              opacity: isInputDisabled ? '0.5' : '1',
            }}
          >
            <div className={styles.fieldInputWrap}>
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
      <>
        <div className={styles.controls}>
          <label>
            <input
              name="isInputDisabled"
              type="checkbox"
              checked={this.state.isInputDisabled}
              onChange={this.handleSettingChange}
            />
            <span className='icon-diamond icons'/>&nbsp;Неактивный
          </label>
        </div>
      </>
    );
  }
}

export default CheckboxViewer;
