/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import cn from 'classnames';
import { MenuElement } from './types';

type Props = {
  isMenu: boolean;
  elements: MenuElement[];

  align?: "left" | "center" | "right";
  arrowPosition?: "bottom";
  buttonRef: React.RefObject<HTMLDivElement>;
  className?: string;
  marginLeft?: number;
  elementCenter?: number;
};

class BalloonInner extends Component<Props> {

  private readonly balloonRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.balloonRef = React.createRef();
  }

  componentDidMount() {
    this.show();
  }

  show() {
    const options: Props = { marginLeft: 0, ...this.props };

    let left: number = 0;
    let elementLeft: number;
    let elementWidth: number;
    let menuWidth: number;
    let menuLeft: number;
    let wndWidth: number;
    let elementCenter: number;

    if (Boolean(options.buttonRef)) {
      const button: HTMLDivElement | null = options.buttonRef.current;
      const balloon: HTMLDivElement | null = this.balloonRef.current;
      const arrow: HTMLDivElement | null = balloon?.firstChild as HTMLDivElement;

      if (button && balloon && arrow) {
        balloon.style.left = "0px";
        const buttonRect: DOMRect = button.getBoundingClientRect()
        const balloonRect = balloon.getBoundingClientRect()
        elementLeft = buttonRect.left;
        elementWidth = buttonRect.width;
        menuLeft = balloonRect.left;
        menuWidth = balloonRect.width;
        wndWidth = window.innerWidth;
        elementCenter = options.elementCenter ? options.elementCenter : elementWidth / 2;

        const calcAlign = () => {
          switch (options.align) {
            case "left":
              left = elementLeft - menuLeft;

              if (menuWidth > elementWidth) {
                arrow.style.left = (elementWidth / 2) + "px";
              }

              break;
            case "center":
              left = elementLeft - menuLeft + (elementCenter - menuWidth / 2);

              if (menuLeft + left < 0) {
                options.align = "right";
                calcAlign();
              } else if (menuLeft + menuWidth + left > wndWidth) {
                options.align = "left";
                calcAlign();
              }

              break;
            case "right":
              left = (elementLeft + elementWidth) - (menuLeft + menuWidth);

              if (menuWidth > elementWidth) {
                arrow.style.left = (menuWidth - elementWidth + elementCenter) + "px";
              }

              break;
            default:
              break;
          }

          return left;
        }

        calcAlign();

        balloon.style.left = left + "px";
      }
    }
  }

  render() {
    const balloonClasses = cn("balloon", this.props.className, {
      "balloon--menu": this.props.isMenu,
      "balloon--arrow-bottom": this.props.arrowPosition === "bottom"
    });
    return (
      <div ref={this.balloonRef} className={balloonClasses}>
        <div className="balloon__arrow">
          <div className="balloon__arrow__shadow"/>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default BalloonInner;
