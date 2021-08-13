/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import cn from 'classnames';

class RadioButton extends Component {

  onClick() {
    if (this.props.inRadioButtonGroup) {
      this.props.onClick(this._currentElement, this.props._onClick);
    } else {
      this.props.onClick();
    }
  }

  render() {
    const radioButtonClasses = cn({
      'radio-button': true,
      'radio-button--checked': this.props.checked
    });
    return (
      <div className={radioButtonClasses + " " + (this.props.className ? this.props.className : "")} onClick={this.onClick}>
        <div className="radio-button__icon"/>
        <label className="radio-button__label">{this.props.label}</label>
      </div>
    );
  }
}

export default RadioButton;
