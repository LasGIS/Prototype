/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import _ from 'underscore';
import cn from 'classnames';
import { isObject } from '../../common/utils';

class CheckboxesRow extends Component {

  constructor(props) {
    super(props);
    const checkedIndexes = [];
    _.each(this.props.elements, function (element, i) {
      if (isObject(element) && element.checked) {
        checkedIndexes.push(i);
      }
    });
    this.state = {
      checkedIndexes: checkedIndexes
    };
  }

  // static getDerivedStateFromProps(props, state) {
  componentWillReceiveProps(nextProps) {
    if (this.props.elements !== nextProps.elements) {
      const checkedIndexes = [];
      _.each(nextProps.elements, function (element, i) {
        if (isObject(element) && element.checked) {
          checkedIndexes.push(i);
        }
      });

      this.setState({checkedIndexes: checkedIndexes});
    }
  }

  onCheckboxClick(data, index) {
    const checkedIndexes = this.state.checkedIndexes;
    const arrayIndex = checkedIndexes.indexOf(index);
    const isChecked = arrayIndex !== -1;
    if (isChecked) {
      checkedIndexes.splice(arrayIndex, 1);
    } else {
      checkedIndexes.push(index);
    }
    this.setState({checkedIndexes: checkedIndexes});

    if (typeof this.props.onCheckboxClick === "function") {
      this.props.onCheckboxClick(data, !isChecked);
    }
  }

  render() {
    const that = this;
    const rowClasses = cn({
      'checkboxes-row': true
    });
    return (
      <div className={rowClasses + " " + (this.props.className ? this.props.className : "")}>
        {this.props.label ?
          <label className="input__title">{this.props.label}</label>
          : false}
        {_.map(this.props.elements, function (element, i) {
          const isObject = isObject(element);
          const text = isObject ? element.text : element;
          const retVal = isObject && element.data ? element.data : text;

          const checkboxClasses = cn({
            'row-checkbox': true,
            'row-checkbox--checked': _.contains(that.state.checkedIndexes, i)
          });

          return <div key={i} className={checkboxClasses} onClick={that.onCheckboxClick.bind(that, retVal, i)}>{text}</div>
        })}
      </div>
    );
  }
}

export default CheckboxesRow;
