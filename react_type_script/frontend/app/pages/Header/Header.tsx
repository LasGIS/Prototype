/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';
import Spinner from '../../components/spinner/Spinner';
import { globalErrorTextSelector, globalUserSelector } from '../../common/services/selectors';
import { RootStoreData } from '../../common/types/redux-types';
import withRedirectProp from '../../hoc/withRedirectProp';
import { clearErrors } from '../../common/services/action-creators';

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
      errorText,
      clearErrors,
      bottomContent,
    } = this.props;

    const calcFontFioSize = !fontFioSize ? 18 : fontFioSize;
    const typeClass = {
      [styles.blueHeader]: blueStyle,
      [styles.whiteHeader]: whiteStyle,
      [styles.redHeader]: redStyle,
    };
    return (
      <div className={styles.pageHeaderWrapper}>
        <div className={cn(styles.header, className, typeClass)}>
          <div className={cn(styles.spinner)}>
            <Spinner white={!whiteStyle}/>
          </div>
          <div className={styles.container}>
            {children}
            {hasAccount && (
              <div className={styles.right}>
                <div
                  id="userName"
                  className={styles.label}
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
          <div className={styles.bottomContentWrapper}>
            <div className={styles.bottomContent}>{bottomContent}</div>
          </div>
        )}
        {errorText && (
          <div className={styles.error}>
            <div className={styles.errorText}>
              <span>{errorText}</span>
              <div className={styles.errorClear} onClick={clearErrors}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state: RootStoreData) => {
  return {
    errorText: globalErrorTextSelector(state),
    user: globalUserSelector(state),
  };
};

const mapDispatch = {
  clearErrors,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRedirectProp(Header));
