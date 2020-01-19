/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */

import './style.scss';
import React, { Component, KeyboardEvent, ReactNode } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
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
};

export default class Button extends Component<Props> {
  handleButtonClick() {
    this.props.onClick && !this.props.disabled && this.props.onClick();
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
      'button--primary': primary,
      'button--primary-filled': primaryFilled,
      'button--cancel': cancel,
      'button--cancel-filled': cancelFilled,
      'button--white': white,
      'button--primary-white': primaryWhite,
      'button--white-grey-border': whiteGreyBorder,
      'button--white-border': whiteBorder,
    };
    const classNames = cn('button', typeClass, { 'button--disabled': disabled }, className);
    return (
      <div
        id={id}
        className={classNames}
        tabIndex={tabIndex}
        onClick={this.handleButtonClick.bind(this)}
        onKeyPress={this.onKeyPress.bind(this)}
        data-tip={tooltip}
      >
        {this.props.children}
        {tooltip && <ReactTooltip type="light" border={true} effect="solid" />}
      </div>
    );
  }

  static propTypes: {};
  static defaultProps: {};
}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  primaryFilled: PropTypes.bool,
  cancel: PropTypes.bool,
  whiteGreyBorder: PropTypes.bool,
  whiteBorder: PropTypes.bool,
  white: PropTypes.bool,
  cancelFilled: PropTypes.bool,
  primaryWhite: PropTypes.bool,
  tabIndex: PropTypes.number,
  tooltip: PropTypes.string,
};

Button.defaultProps = {
  id: '',
  onClick: () => undefined,
  disabled: false,
  primary: false,
  primaryFilled: false,
  cancel: false,
  cancelFilled: false,
  tabIndex: 0,
};
