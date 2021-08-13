/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import cn from 'classnames';

type Props = {
  checked: boolean;
  label: string;
  id?: string;
  className?: string;
  bigLabel?: boolean;
  partiallyChecked?: string;
  onChange?: (value: boolean) => void;
};

type State = {
  checked: boolean;
  focus: boolean;
};

class Checkbox extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      checked: props.checked,
      focus: false
    };
    this.onChange = this.onChange.bind(this);
    this.onContainerClick = this.onContainerClick.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    return (props.checked === state.checked) ? null : { checked: props.checked };
  }

  onContainerClick() {
    this.onChange();
  }

  onChange() {
    const newState = !this.state.checked;
    this.setState({ checked: newState });
    const { onChange } = this.props;

    if (typeof onChange === "function") {
      onChange(newState);
    }
  }

  onInputFocus() {
    this.setState({ focus: true });
  }

  onInputBlur() {
    this.setState({ focus: false });
  }

  render() {
    const { focus, checked } = this.state;
    const { id, bigLabel, label, partiallyChecked, className, children } = this.props;
    const checkboxClasses = cn({
      'checkbox': true,
      'checkbox--biglabel': bigLabel,
      'checkbox--focus': focus,
      'checkbox--nolabel': !label,
      'checkbox--checked': checked,
      'checkbox--partially-checked': partiallyChecked
    });
    return (
      <div className={checkboxClasses + " " + (className ? className : "")} onClick={this.onContainerClick}>
        <input id={id}
               type="checkbox" className="checkbox__input" checked={checked}
               onChange={this.onChange}
               onFocus={this.onInputFocus}
               onBlur={this.onInputBlur}
        />
        <div className="checkbox__icon"/>
        <label className="checkbox__text">{label}</label>
        {children}
      </div>
    );
  }
}

export default Checkbox;
