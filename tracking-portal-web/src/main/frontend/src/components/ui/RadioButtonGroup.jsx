/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';

class RadioButtonGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedButton: null
    };
  }

  onClick(child, onClick) {
    this.setState({checkedButton: child});
    onClick();
  }

  render() {
    const that = this;
    const processChild = function (child) {
      if (Array.isArray(child)) {
        return React.Children.map(child, processChild);
      }
      if (child.type.displayName === "RadioButton") {
        if (child.props.onClick) {
          child.props._onClick = child.props.onClick;
          child.props.onClick = that.onClick;
        }
        child.props.checked = that.state.checkedButton === child;
        child.props.inRadioButtonGroup = true;
      }
      const children = child.props.children;
      if (children) {
        if (Array.isArray(children)) {
          React.Children.map(children, processChild);
        } else {
          processChild(children);
        }
      }
    };

    processChild(this.props.children);

    return (
      <div className="radio-button-group">
        {this.props.children}
      </div>
    );
  }
}

export default RadioButtonGroup;
