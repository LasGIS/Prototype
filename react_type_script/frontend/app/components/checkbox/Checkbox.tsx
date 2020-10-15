/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component, KeyboardEvent } from 'react';
import cn from 'classnames';

enum Checkbox_STYLES {
  classic = 'classic',
  international = 'international'
}

type Props = {
  id: string;
  className?: string;
  style: Checkbox_STYLES;
  checked: boolean;
  label: string;
  readOnly?: boolean;
  onChange: () => void;
  tabIndex?: number;
};

type State = {
  hasFocus: boolean;
};

export default class Checkbox extends Component<Props, State> {

  static defaultProps: {
    style: Checkbox_STYLES.classic,
    id: '',
    checked: false,
    label: false,
    onChange: () => undefined,
  };

  constructor(props: Props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      hasFocus: false,
    };
  }

  handleCheckboxClick() {
    !this.props.readOnly && this.props.onChange();
  }

  onKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      this.handleCheckboxClick();
    }
  }

  onFocus() {
    this.setState({ hasFocus: true });
  }

  onBlur() {
    this.setState({ hasFocus: false });
  }

  render() {
    const { style, id, checked, label, className, readOnly, tabIndex } = this.props;
    const classes = cn(
      styles.input,
      { [styles.inputChecked]: checked },
      { [styles.inputFocused]: this.state.hasFocus },
      { [styles.inputReadOnly]: readOnly },
    );

    return (
      <div
        id={id}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className={cn(styles.checkboxContainer, styles[style], className)}
      >
        <div className={classes} onClick={this.handleCheckboxClick.bind(this)}>
          <input
            tabIndex={readOnly ? -1 : tabIndex}
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            onKeyPress={this.onKeyPress.bind(this)}
          />
        </div>
        <label className={styles.text}>{label}</label>
      </div>
    );
  }
}
