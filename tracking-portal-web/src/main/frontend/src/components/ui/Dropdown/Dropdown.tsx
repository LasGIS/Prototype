/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component, KeyboardEventHandler, MouseEventHandler } from 'react';
import cn from 'classnames';
import DropdownElement from './DropdownElement';
import { DropElement } from './types';

type Props = {
  id: string;
  className: string;
  open?: boolean;
  elements: DropElement<number>[];
  value?: string;
  dataValue: number;
  label?: string;
  disabled?: boolean;
  tabIndex?: number;
  placeholder?: string;

  onChange: (data: number, text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onHide?: () => void;
  onElementHover?: (index: number) => void;
};

type State = {
  open: boolean;
  selectedIndex: number | null,
  elements: DropElement<number>[],
  value: string;
};

const getElementByData = (elements: DropElement<number>[], data: number): DropElement<number> | undefined => {
  return elements.find((element) => {
    return element.data === data;
  });
}

class Dropdown extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const elements = props.elements;
    let value;

    if (props.hasOwnProperty('value')) {
      value = props.value;
    } else if (props.hasOwnProperty('dataValue')) {
      const element: DropElement<number> | undefined = getElementByData(elements, props.dataValue);
      value = element && element.text;
    }
    this.state = {
      selectedIndex: null,
      elements: elements,
      open: props.open || false,
      value: value || ""
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.handleDocumentKeydown = this.handleDocumentKeydown.bind(this);
  }

  static getDerivedStateFromProps(props: Props) {
    const elements = props.elements;
    let value;

    if (props.hasOwnProperty('value')) {
      value = props.value;
    } else if (props.hasOwnProperty('dataValue')) {
      const element: DropElement<number> | undefined = getElementByData(elements, props.dataValue);
      value = element && element.text;
    }

    return {
      value: value || "",
      elements: elements
    };
  }

  onFocus() {
    this.show();
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    this.hide();
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  show() {
    this.setState({
      selectedIndex: null,
      open: true
    });
  }

  hide() {
    this.setState({ open: false });
  }

  onMouseDown: MouseEventHandler = () => {
    this.setState({ open: !this.state.open });
  }

  onElementHover(index: number) {
    this.setState({ selectedIndex: index });

    if (this.props.onElementHover) {
      this.props.onElementHover(index);
    }
  }

  onElementSelect(text: string, data: number) {
    this.hide();
    if (this.props.onChange) {
      this.props.onChange(data, text);
    }
  }

  handleDocumentKeydown: KeyboardEventHandler = (event) => {
    const key = event.key;
    const maxIndex = this.props.elements.length - 1;
    let newIndex;
    const selectedIndex = this.state.selectedIndex;

    switch (key) {
      case "ArrowDown":
        if (selectedIndex === null) {
          newIndex = 0;
        } else {
          newIndex = selectedIndex >= maxIndex ? 0 : selectedIndex + 1;
        }
        this.setState({ open: true });
        this.onElementHover(newIndex);
        event.preventDefault();
        break;
      case "ArrowUp":
        newIndex = selectedIndex && selectedIndex <= maxIndex ? selectedIndex - 1 : maxIndex;
        this.setState({ open: true });
        this.onElementHover(newIndex);
        event.preventDefault();
        break;
      case "Enter":
      case " ":
        if (this.state.selectedIndex === null) {
          if (this.props.onHide) {
            this.props.onHide();
          }
        } else {
          const element: DropElement<number> | undefined = this.props.elements[this.state.selectedIndex];
          const text = element.text || "";
          const data = element.data || -1;

          this.onElementSelect(text, data);
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { disabled, className, label, tabIndex, placeholder, } = this.props;
    const { elements, open, value, selectedIndex } = this.state;
    const that = this;
    const dropdownClasses = cn('input', 'input--dropdown', {
      'input--focus': open,
      'input--disabled': disabled
    });
    return (
      <div className={dropdownClasses + " " + (className ? className : "")}>
        {label ? <label className="input__title">{label}</label> : false}
        <input readOnly value={value}
               onFocus={this.onFocus.bind(this)}
               onBlur={this.onBlur.bind(this)}
               placeholder={placeholder}
               tabIndex={tabIndex}
               onKeyDown={this.handleDocumentKeydown}
        />
        <div className="input__dropdown-icon" onMouseDown={this.onMouseDown.bind(this)}/>
        {open &&
        <div className="input__suggest">
          {elements.map((element: DropElement<number>, i: number) => {
            const isHovered = i === selectedIndex;
            let value = element.text;
            if (element.note) {
              value += `<div class="input__suggest__element-note">{element.note}</div>`;
            }
            return <DropdownElement
              key={i}
              onSelect={that.onElementSelect.bind(that, element.text, element.data)}
              value={value}
              hover={isHovered}
              onHover={that.onElementHover.bind(that, i)}
              disabled={element.disabled}
            />;
          })}
        </div>
        }
      </div>
    );
  }
}

export default Dropdown;
