/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';

class InputGroup extends Component {

  constructor(props) {
    super(props);
    const children = [];
    React.Children.forEach(props.children, (child) => {
      children.push(child);
    });
    this.state = {
      children: children
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.children !== state.children) {
      const children = [];
      React.Children.forEach(props.children, function (child) {
        children.push(child);
      });

      return {children: children};
    }
  }

  render() {
    const {children} = this.state;
    let childIndex = 0;
    let elementIndex = 0;
    const glue = this.props.glue;

    const content = [];

    while (childIndex < children.length) {
      const child = children[childIndex++];
      child.key = elementIndex++;
      content.push(child);
      if (glue && childIndex < children.length) {
        content.push(
          <span key={elementIndex++} className="input-group__glue">{glue}</span>
        );
      }
    }

    return (
      <div className="input-group">
        {content}
      </div>
    );
  }
}

export default InputGroup;
