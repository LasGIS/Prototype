/*
 * Copyright (c) 2020. Prototype
 */

import styles from './button.scss';
import React, { Component, KeyboardEvent, ReactNode } from 'react';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';

type Props = {
  id: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  primaryFilled?: boolean;
  cancel?: boolean;
  whiteGreyBorder?: boolean;
  whiteBorder?: boolean;
  white?: boolean;
  cancelFilled?: boolean;
  primaryWhite?: boolean;
  tabIndex?: number;
  tooltip?: string;
  children?: ReactNode;
  name?: string,
};

export default class Button extends Component<Props> {
  static propTypes: {};
  static defaultProps: {
    id: '',
    onClick: () => any,
    disabled: false,
    primary: false,
    primaryFilled: false,
    cancel: false,
    cancelFilled: false,
    tabIndex: 0,
  };

  handleButtonClick() {
    const {onClick, disabled} = this.props;
    onClick && !disabled && onClick();
  }

  onKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      this.handleButtonClick();
    }
  }

  render() {
    const {
      id,
      disabled,
      primary,
      primaryFilled,
      primaryWhite,
      cancel,
      cancelFilled,
      white,
      whiteGreyBorder,
      whiteBorder,
      className,
      tabIndex,
      tooltip,
    } = this.props;
    const typeClass = {
      [styles.primary]: primary,
      [styles.primaryFilled]: primaryFilled,
      [styles.cancel]: cancel,
      [styles.cancelFilled]: cancelFilled,
      [styles.white]: white,
      [styles.primaryWhite]: primaryWhite,
      [styles.whiteGreyBorder]: whiteGreyBorder,
      [styles.whiteBorder]: whiteBorder,
    };
    const classNames = cn(styles.button, typeClass, { [styles.disabled]: disabled }, className);
    return (
      <div
        id={id}
        className={classNames}
        tabIndex={tabIndex}
        onClick={this.handleButtonClick.bind(this)}
        onKeyPress={this.onKeyPress.bind(this)}
        title={tooltip}
      >
        {this.props.children}
        {tooltip && <ReactTooltip type="light" border={true} effect="solid"/>}
      </div>
    );
  }
}
