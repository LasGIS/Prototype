/*
 * Copyright (c) 2020. Prototype
 */
import styles from './input2.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import _ from 'underscore';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChange(event) {
    const text = event.target.value;
    this.props.onChange && this.props.onChange(text);
    this.props.onChangeDelay && this.onChangeDelay(text);
  }

  onChangeDelay(value) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.props.onChangeDelay(value), 500);
  }

  onKeyPress(event) {
    if (event.charCode === 13 && !_.isEmpty(this.props.value)) {
      this.props.onEnter && this.props.onEnter(this.props.value);
    }
  }

  isEmpty(value) {
    return !value || !value.trim();
  }

  render() {
    const {
      id,
      value,
      type,
      name,
      blue,
      placeholder,
      disabled,
      autoFocus,
      className,
      onFocus,
      onKeyDown,
      bottomBorder,
      noBorder,
      isValid,
      required,
      validation,
      readOnly,
      onBlur,
      onClick,
      tooltip,
      tabIndex,
      autoComplete,
    } = this.props;
    const classes = {
      [styles.blue]: blue,
      [styles.bottomBorder]: bottomBorder,
      [styles.noBorder]: noBorder,
      [styles.empty]: !readOnly && this.isEmpty(value) && !required,
      [styles.valid]: (validation && isValid) || (!validation && !readOnly && !this.isEmpty(value)),
      [styles.invalid]: validation && !isValid,
    };
    const classNames = cn(styles.input, classes, className);
    return (
      <input
        id={id}
        name={name}
        title={tooltip}
        className={classNames}
        readOnly={readOnly}
        onChange={this.onChange.bind(this)}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={this.onKeyPress.bind(this)}
        onKeyDown={onKeyDown}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        onClick={onClick}
        autoComplete={autoComplete}
        tabIndex={readOnly ? -1 : tabIndex}
        type={type || 'text'}
        ref={this.textInput}
      />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onChangeDelay: PropTypes.func,
  onEnter: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  blue: PropTypes.bool,
  bottomBorder: PropTypes.bool,
  noBorder: PropTypes.bool,
  isValid: PropTypes.any,
  required: PropTypes.bool,
  validation: PropTypes.bool,
  tooltip: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  type: 'text',
  onChange: null,
  onChangeDelay: null,
  onEnter: null,
  value: null,
  placeholder: null,
  disabled: false,
  autoFocus: false,
  blue: false,
  bottomBorder: false,
  noBorder: false,
  autoComplete:
    'off' /** Причина наличия пропса - https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion */,
};
