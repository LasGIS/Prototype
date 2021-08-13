/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Checkbox from './Checkbox';
import Dropdown from './Dropdown/Dropdown';
import Input from './Input/Input';

class InputCell extends Component {
  render() {
    return (
      <div/>
    );
  }
}

class InputCellCheckbox extends Component {
  render() {
    return (
      <Checkbox
        className="input-cell__checkbox-text"
        checked={this.props.checked}
        label={this.props.label}
        onChange={this.props.onChange}
      />
    );
  }
}

class InputCellText extends Component {

  static defaultProps = {
    disabled: false,
  }

  constructor(props) {
    super(props);
    if (props.onValidate) {
      this.parentOnValidate = props.onValidate;
    }
    if (props.onChange) {
      this.parentOnChange = props.onChange;
    }
    this.state = {
      value: props.value,
      isValid: true,
    };
    this.validate = this.validate.bind(this);
    this.doValidation = this.doValidation.bind(this);
    this.parentOnValidate = this.parentOnValidate.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  parentOnChange(data) {
    return data;
  }

  validate() {
    return this.doValidation(this.props);
  }

  doValidation(props) {
    const ok = this.parentOnValidate(this.state.value, this.props);
    this.setState({isValid: ok});
    return ok;
  }

  parentOnValidate(data, props) {
    return true;
  }

  onBlur() {
    const input = $(":input", ReactDOM.findDOMNode(this));
    if (!this.props.disabled) {
      this.doValidation(this.props);
    } else {
      input.blur();
    }
  }

  onChange(data) {
    if (typeof this.state.value == 'undefined') {
      // lifecycle deviations in IE
      const newData = this.parentOnChange(data);
      this.setState({value: newData});
      return;
    }
    const newData = this.parentOnChange(data);
    if (newData === this.state.value)
      return;
    const self = this;
    this.setState({
      value: newData,
    }, () => {
      self.validate();
    });
  }

  onFocus() {
    if (this.props.disabled) {
      this.onBlur();
    }
  }

  render() {
    return (
      <div className={this.state.isValid ? "" : "input-cell--with-error"}>
        <Input
          {...this.props} ref="input"
          className={this.props.className}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={this.state.value}/>
        <div className="input-cell__error-message"> {this.props.errorMessage} </div>
      </div>
    );
  }
}

class InputCellDate extends Component {

  static defaultProps = {
    placeholder: 'ДД-ММ-ГГГГ'
  }

  validate() {
    return this.refs.child.validate();
  }

  render() {
    return (
      <InputCell.Text className="input-cell__date" {...this.props} type="date" placeholder={this.props.placeholder} mask="99-99-9999" ref="child"/>
    );
  }
}

class InputCellTextarea extends Component {
  render() {
    return (
      <div>
        <label className="input-cell__label"> {this.props.label} </label>
        <textarea className="input-cell__textarea span4" tabIndex={this.props.tabIndex}/>
      </div>
    );
  }
}

class InputCellSelect extends Component {

  constructor(props) {
    super(props);
    if (props.onValidate) {
      this.parentOnValidate = props.onValidate;
    }
    if (props.onChange) {
      this.parentOnChange = props.onChange;
    }

    this.state = {
      dataValue: props.dataValue,
      isValid: true
    };
    this.onBlur = this.onBlur.bind(this);
    this.validate = this.validate.bind(this);
    this.doValidation = this.doValidation.bind(this);
    this.parentOnValidate = this.parentOnValidate.bind(this);
    this.parentOnChange = this.parentOnChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onBlur() {
    if (this.props.disabled) {
      $(":input", ReactDOM.findDOMNode(this)).blur();
    } else {
      this.doValidation(this.props);
    }
  }

  validate() {
    return this.doValidation();
  }

  doValidation() {
    const ok = this.parentOnValidate(this.state.dataValue, this.props) !== false;
    this.setState({
      isValid: ok
    });
    return ok;
  }

  parentOnValidate(data, props) {
  }

  parentOnChange(val) {
    return val;
  }

  onChange(value) {
    const newValue = this.parentOnChange(value);

    if (typeof this.state.dataValue == 'undefined') {
      // lifecycle deviations in IE
      this.setState({
        dataValue: newValue
      });
    }
    if (newValue !== this.state.dataValue) {
      this.setState({
        dataValue: newValue,
      }, () => {
        this.validate();
      });
    }
  }

  render() {
    return (
      <div className={this.state.isValid ? "" : "input-cell--with-error"}>
        <Dropdown  {...this.props} ref="combo" onBlur={this.onBlur} onChange={this.onChange}/>
        <div className="input-cell__error-message">{this.props.errorMessage} </div>
      </div>
    );
  }
}

InputCell.Checkbox = InputCellCheckbox;
InputCell.Text = InputCellText;
InputCell.Date = InputCellDate;
InputCell.Textarea = InputCellTextarea;
InputCell.Select = InputCellSelect;

export default InputCell;
