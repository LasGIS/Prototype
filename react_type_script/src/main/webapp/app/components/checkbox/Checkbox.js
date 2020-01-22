/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class Checkbox extends Component {
  constructor(props) {
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

  onKeyPress(event) {
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
      'checkbox-container__input',
      { 'checkbox-container__input_checked': checked },
      { 'checkbox-container__input_focused': this.state.hasFocus },
      { 'checkbox-container__input_read-only': readOnly },
    );

    return (
      <div
        id={id}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className={cn('checkbox-container', styles[style], className)}
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
        <label className="checkbox-container__text">{label}</label>
      </div>
    );
  }
}

Checkbox.STYLES = {
  classic: 'classic',
  internationalTicket: 'internationalTicket',
};

Checkbox.propTypes = {
  style: PropTypes.oneOf(Object.values(Checkbox.STYLES)),
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
};

Checkbox.defaultProps = {
  style: Checkbox.STYLES.classic,
  id: '',
  checked: false,
  label: false,
  onChange: () => undefined,
};
