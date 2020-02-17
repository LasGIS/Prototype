/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';
import Spinner from '../../components/spinner/Spinner';
import { clearErrors } from '../../common/actions';
import { globalUserSelector } from '../../common/services/selectors';
import { RootStoreData } from '../../common/types/redux-types';
import withRedirectProp from '../../hoc/withRedirectProp';

type Props = PropsFromRedux & {
  className?: string;
  user?: { code: number, name: string };
  hasAccount?: boolean;
  fontFioSize?: number;
  whiteStyle?: boolean;
  redStyle?: boolean;
  blueStyle?: boolean;
  error?: { code: number, text: string };
  bottomContent?: ReactNode;
};

type State = {
  login: string;
  password: string;
  wrongPassword: boolean;
  errors: { [key: string]: string };
  isLoading: boolean;
};

class Header extends Component<Props, State> {

  static defaultProps: { bottomContent: null };

  private readonly userNameRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.userNameRef = React.createRef();
  }

  render() {
    const {
      className,
      user,
      children,
      whiteStyle,
      blueStyle,
      redStyle,
      fontFioSize,
      hasAccount,
      error,
      clearErrors,
      bottomContent,
    } = this.props;

    const calcFontFioSize = !fontFioSize ? 18 : fontFioSize;
    const typeClass = {
      'blue-header': blueStyle,
      'white-header': whiteStyle,
      'red-header': redStyle,
    };
    return (
      <div className={'pageHeaderWrapper'}>
        <div className={cn('header', className, typeClass)}>
          <div className="spinner right">
            <Spinner white={!whiteStyle}/>
          </div>
          <div className="header__container">
            {children}
            {hasAccount && (
              <div className="right">
                <div
                  id="userName"
                  className="label"
                  ref={this.userNameRef}
                  style={{ fontSize: calcFontFioSize + 'px' }}
                >
                  {user?.name}
                </div>
              </div>
            )}
          </div>
        </div>
        {bottomContent && (
          <div className="header__bottomContentWrapper">
            <div className="header__bottomContent">{bottomContent}</div>
          </div>
        )}
        {error && (
          <div className="header__error">
            <div className="header__error-text">
              <span>{error.text}</span>
              <div className="header__error-clear" onClick={clearErrors}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state: RootStoreData) => {
  return {
    error: state.global.error,
    user: globalUserSelector(state),
  };
};

const mapDispatch = {
  clearErrors,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRedirectProp(Header));
