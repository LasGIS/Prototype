/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import cn from 'classnames';

class CheckboxButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked === true,
      focus: false
    };
  }

  // static getDerivedStateFromProps(props, state) {
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('checked') && nextProps.checked !== this.state.checked) {
      this.setState({checked: nextProps.checked});
    }
  }

  onContainerClick(event) {
    this.onChange();
  }

  onChange() {
    const newState = !this.state.checked;
    this.setState({checked: newState});

    if (typeof this.props.onChange === "function") {
      this.props.onChange(newState);
    }
  }

  onInputFocus() {
    this.setState({focus: true});
  }

  onInputBlur() {
    this.setState({focus: false});
  }

  render() {
    const checkboxClasses = cn('button', 'button--small', this.props.className, {
      'button--hover': this.state.focus,
      'button--selected': this.state.checked
    });
    return (
      <div className={checkboxClasses} onClick={this.onContainerClick}>
        <input type="checkbox" className="checkbox__input" checked={this.state.checked} onChange={this.onChange} onFocus={this.onInputFocus}
               onBlur={this.onInputBlur}/>
        <span>{this.props.label}</span>
      </div>
    );
  }
}

export default CheckboxButton;
