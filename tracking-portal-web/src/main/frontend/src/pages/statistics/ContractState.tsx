/*
 * Copyright (c) 2021. Prototype
 */

import './statistics.scss';
import React, { Component, MouseEvent } from 'react';
import cn from 'classnames';
import { WithTranslation, withTranslation } from 'react-i18next';

const hideClass = 'contract-state--hide';

type Consist = {
  unlimited: boolean;
  icon: 'grey' | 'green';
  info: string[];
  onClick?: () => any;
  onClose?: () => any;
};

type Props = WithTranslation & {
  unlimited: boolean;
};

const consistStates: Consist[] = [
  {
    unlimited: false,
    icon: 'grey',
    info: ['unlimited.false.0', 'unlimited.false.1'],
  },
  {
    unlimited: true,
    icon: 'green',
    info: ['unlimited.true.0'],
  },
];

class ContractState extends Component<Props> {
  static defaultProps = {
    unlimited: false,
  };

  private readonly contractStateRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.contractStateRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.onScroll();
  }

  onScroll(): any {
    const scrollBottom = (window.innerHeight || document.documentElement.offsetHeight) + (window.scrollY || window.pageYOffset);
    const { current } = this.contractStateRef;
    if (current) {
      const { classList } = current;
      const hasCl: boolean = classList.contains(hideClass);
      if (scrollBottom > 900) {
        if (!hasCl) {
          classList.add(hideClass);
        }
      } else if (hasCl) {
        classList.remove(hideClass);
      }
    }
  }

  static onClose(ev: MouseEvent, action: () => any) {
    ev.stopPropagation();
    action();
  }

  static onClick(ev: MouseEvent, action?: () => any) {
    if (action) {
      action();
    }
  }

  render() {
    const { t, unlimited } = this.props;
    const stateDesc = consistStates.find((st: Consist) => st.unlimited === unlimited);
    if (!stateDesc) {
      return null;
    }

    const iconClass = `contract-state__icon contract-state__icon--${stateDesc.icon || 'grey'}`;
    const action = stateDesc.onClick;
    const close = stateDesc.onClose;
    const info = Array.isArray(stateDesc.info) ? stateDesc.info : [stateDesc.info];

    return (
      <div>
        <div className="contract-state contract-state--bottom">
          <div className="contract-state__paper">
            <div className={iconClass} />
            <div
              className={cn('contract-state__text', { 'contract-state__text--link': action })}
              role="button"
              tabIndex={-1}
              onClick={(event: MouseEvent) => ContractState.onClick(event, action)}
            >
              {info.map((textKey) => {
                return <div key={textKey}>{t(textKey)}</div>;
              })}
              {close && (
                <div
                  className="contract-state__close"
                  role="button"
                  tabIndex={-1}
                  onClick={(event: MouseEvent) => ContractState.onClose(event, close)}
                >
                  &nbsp;
                </div>
              )}
            </div>
          </div>
          <div className="contract-state__band" />
        </div>

        <div className="contract-state contract-state--hide" ref={this.contractStateRef}>
          <div className="contract-state__paper">
            <div className={iconClass} />
            <div
              className={cn('contract-state__text', { ' contract-state__text--link--float': action })}
              role="button"
              tabIndex={-1}
              onClick={(event: MouseEvent) => ContractState.onClick(event, action)}
            >
              {info.map((textKey, key) => {
                return key < 2 ? <div key={textKey}>{t(textKey)}</div> : null;
              })}
            </div>
          </div>
          <div className="contract-state__band contract-state__band--float">
            {close && (
              <div className="contract-state__close" role="button" tabIndex={-1} onClick={(event: MouseEvent) => ContractState.onClose(event, close)}>
                &nbsp;
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ContractState);
