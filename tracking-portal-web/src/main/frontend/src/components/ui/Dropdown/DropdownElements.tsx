/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component, KeyboardEventHandler, MouseEventHandler } from 'react';
import cn from 'classnames';
import DropdownElement from './DropdownElement';
import { DropElement } from './types';

type Props = {
  className?: string;
  matchValue: string;
  elements: DropElement<number>[];

  onHide?: () => void;
  onElementSelect?: (data: number) => void;
  onElementHover?: (index: number | null) => void;
};

type State = {
  selectedIndex: number | null,
};

class DropdownElements extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndex: null
    };
  }

  getInitialState() {
    return {};
  }

  // static getDerivedStateFromProps(props, state) {
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.elements !== nextProps.elements) {
      this.onElementHover(null);
    }
  }

  componentDidMount() {
    /*
        $(document).bind('click', this.handleDocumentClick);
        $(document).bind('keydown', this.handleDocumentKeydown);

        const $node = $(ReactDOM.findDOMNode(this));

        $node.show();
    */
  }

  componentWillUnmount() {
    /*
        $(document).unbind('click', this.handleDocumentClick);
        $(document).unbind('keydown', this.handleDocumentKeydown);
    */
  }

  onElementHover(index: number | null) {
    this.setState({ selectedIndex: index });

    if (this.props.onElementHover) {
      this.props.onElementHover(index);
    }
  }

  onElementSelect(data: number) {
    if (this.props.onElementSelect) {
      this.props.onElementSelect(data);
    }
  }

  handleDocumentKeydown: KeyboardEventHandler = (event) => {
    const keyCode = event.keyCode;
    const maxIndex = this.props.elements.length - 1;
    let newIndex;
    const selectedIndex = this.state.selectedIndex;

    switch (keyCode) {
      case 40:
        if (selectedIndex === null) {
          newIndex = 0;
        } else {
          newIndex = selectedIndex >= maxIndex ? 0 : selectedIndex + 1;
        }
        this.onElementHover(newIndex);
        break;
      case 38:
        newIndex = selectedIndex && selectedIndex <= maxIndex ? selectedIndex - 1 : maxIndex;
        this.onElementHover(newIndex);
        break;
      case 13:
        if (this.state.selectedIndex === null) {
          if (this.props.onHide) {
            this.props.onHide();
          }
        } else {
          const element = this.props.elements[this.state.selectedIndex];
          this.onElementSelect(element.data);
        }
        break;
      default:
        break;
    }
  }

  handleDocumentClick: MouseEventHandler = (event) => {
    /*
        if (!this.isMounted()
          || ($(event.target).closest($(ReactDOM.findDOMNode(this)).parent()).length
            && !$(event.target).closest('.input__suggest__element').length)) {
          return;
        }
    */
    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  render() {
    const { className, elements } = this.props;
    const that = this;
    return (
      <div className={cn('input__suggest', className)}>
        {elements.map((element, i) => {
          const isHovered = i === that.state.selectedIndex;

          const onSelect = function () {
            that.onElementSelect(element.data);
          }
          const onHover = function () {
            that.onElementHover(i);
          }

          return <DropdownElement
            key={i}
            onSelect={onSelect}
            value={element.text}
            note={element.note}
            matchValue={element.match ? that.props.matchValue : undefined}
            hover={isHovered}
            onHover={onHover}
          />;
        })}
      </div>
    );
  }
}

export default DropdownElements;
