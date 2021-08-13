/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component, MouseEventHandler } from 'react';
import _ from 'underscore';
import cn from 'classnames';

type Props = {
  key: number;
  value: string;
  matchValue?: string;
  hover: boolean;
  note?: string;
  disabled?: boolean;

  onSelect: MouseEventHandler;
  onHover: MouseEventHandler;
};

type State = {
  value: string;
};

const getMatchedText = (value: string, matchValue?: string): string => {
  if (!matchValue) return value;

  let text = value;
  const matchText = matchValue;

  const lowerText = text.toLowerCase();
  const words = _.uniq(matchText.trim().replace(/\s+/g, ' ').toLowerCase().split(" "));
  const isMatch = _.every(words, function (word) {
    return lowerText.indexOf(word) !== -1;
  });
  if (isMatch) {
    _.each(words, (word) => {
      const re = new RegExp('(' + word + ')', "gi");
      text = text.replace(re, '<span class="input__suggest__element__match">$1</span>');
    });
  }
  return text;
}

class DropdownElement extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: getMatchedText(props.value, props.matchValue)
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      value: getMatchedText(props.value, props.matchValue)
    };
  }

  render() {
    const { hover, note, onSelect, onHover } = this.props;
    const elementClasses = cn('input__suggest__element', {
      'input__suggest__element--selected': hover
    });
    let value = this.state.value;
    if (note) {
      value += `<div class="input__suggest__element-note">${note}</div>`;
    }
    return (
      <div className={elementClasses}
           onMouseDown={onSelect}
           onMouseOver={onHover}
           dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }
}

export default DropdownElement;
