/*
 * Copyright (c) 2021. Prototype
 */

import './balloons.scss';

import React, { Component, MouseEvent } from 'react';
import { BalloonMenuElement } from './BalloonMenuElement';
import BalloonInner from './BalloonInner';
import { uniqueId } from '../../../common/utils';
import { MenuElement, MenuElementOrString } from './types';
import cn from 'classnames';

type Props = {
  onSelect: (val: string) => void;
  open?: boolean;
  elements?: MenuElementOrString[];
  align?: "left" | "center" | "right";
  arrowPosition?: "bottom";
  marginLeft?: number;
  className?: string;
  containerClassName?: string;
  elementCenter?: number;
};

type State = {
  open: boolean;
  uid: string;
  elements: MenuElement[];
  align: "left" | "center" | "right";
  marginLeft?: number;
  arrowPosition?: "bottom";
  isMenu: boolean;
  className?: string;
  elementCenter?: number;
}

const prepareElements = (elements?: MenuElementOrString[]): MenuElement[] => {
  return Array.isArray(elements) ? elements.map((element) => {
    if (typeof element !== 'object') {
      return {
        text: element,
        data: element
      };
    } else if (!element.hasOwnProperty("data")) {
      element.data = element.text;
    }
    return element;
  }) : [];
}

class Balloon extends Component<Props, State> {

  buttonRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      open: this.props.open || false,
      uid: uniqueId("balloon-1"),
      elements: prepareElements(this.props.elements),
      align: this.props.align || "center",
      marginLeft: this.props.marginLeft || 0,
      isMenu: Boolean(this.props.elements),
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.buttonRef = React.createRef();
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  toggle(event: MouseEvent) {
    this.setState({
      open: !this.state.open
    });
    event.stopPropagation();
  }

  onSelect(data: string) {
    this.close();
    if (this.props.onSelect) {
      this.props.onSelect(data);
    }
  }

  render() {
    const that = this;
    const { children } = this.props;
    const { open, elements, uid } = this.state;
    return (
      <span className={cn("balloon-toggle-button", this.props.containerClassName)}>
        {React.cloneElement(children as React.ReactElement, {
          onClick: this.toggle,
          ref: this.buttonRef
        })}
        {open &&
        <BalloonInner buttonRef={this.buttonRef} {...this.state} key={uid} className={this.props.className} arrowPosition={this.props.arrowPosition}>
          {elements.map((element, i) =>
            <BalloonMenuElement key={i} onClick={that.onSelect.bind(that, element.data)}>{element.text}</BalloonMenuElement>
          )}
        </BalloonInner>
        }
      </span>
    );
  }
}

export default Balloon;
