/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import cn from 'classnames';

class FormRow extends Component {

  render() {
    const classes = cn('form-row', {
      'form-row--paddless-inside': this.props.paddlessInside,
      'form-row--paddless-outside': this.props.paddlessOutside,
      'form-row--removeable': this.props.removeable
    });
    return (
      <div className={classes + " " + (this.props.className ? this.props.className : "")}>
        {this.props.label ?
          <div className="input__title form-row__title">{this.props.label}</div>
          : false}
        {this.props.children}
        {this.props.removeable ?
          <div className="form-row__btn-remove close-button" onClick={this.props.onRemove}/>
          : false}
      </div>
    );
  }
}

export default FormRow;
