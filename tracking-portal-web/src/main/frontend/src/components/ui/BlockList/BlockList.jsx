/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import _ from 'underscore';
import cn from 'classnames';
import { BlockListElement } from './BlockListElement';
import { isObject } from '../../../common/utils';

const prepareElements = (elements) => {
  return elements.map(function (element) {
    if (!isObject(element)) {
      element = {
        title: element,
        data: element
      }
    } else if (!element.hasOwnProperty('data')) {
      element.data = element.title;
    }
    return element;
  });
}

class BlockList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elements: prepareElements(this.props.elements)
    };
  }

  static getDerivedStateFromProps(props/*, state*/) {
    return {elements: prepareElements(props.elements)};
  }

  onElementClick(element) {
    this.props.onElementClick(element.data);
  }

  render() {
    const that = this;
    return (
      <div className={cn("block-list", this.props.className)}>
        {_.map(this.state.elements, function (element, i) {
          return <BlockListElement key={i} {...element} onClick={that.onElementClick.bind(that, element)}/>
        })}
      </div>
    );
  }
}

export default BlockList;
