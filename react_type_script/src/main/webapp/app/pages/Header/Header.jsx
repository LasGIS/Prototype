/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Spinner from '../../components/spinner/Spinner';
import { clearErrors } from '../../common/actions';
import OvalLabel from '../../components/icon/OvalLabel';
import { globalUserSelector } from '../../common/services/selectors';

class Header extends Component {

  constructor(props) {
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
      isConnectedToWeighter,
      showWeightSignal,
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
            <Spinner white={!whiteStyle} />
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
                  {user.name}
                </div>
                {!isConnectedToWeighter && showWeightSignal && (
                  <OvalLabel id="weightOff" className="rpo-header__weight-signal" label="весы не подключены"/>
                )}
                {isConnectedToWeighter && showWeightSignal && (
                  <OvalLabel id="weightOn" className="rpo-header__weight-signal" green label="весы подключены"/>
                )}
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

Header.propTypes = {
  className: PropTypes.string,
  hasAccount: PropTypes.bool,
  showWeightSignal: PropTypes.bool,
  isConnectedToWeighter: PropTypes.bool,
  fontFioSize: PropTypes.number,
  whiteStyle: PropTypes.bool,
  redStyle: PropTypes.bool,
  blueStyle: PropTypes.bool,
  bottomContent: PropTypes.node,
};

Header.defaultProps = {
  bottomContent: null,
};

export default connect(
  state => ({
    error: state.global.error,
    user: globalUserSelector(state),
  }),
  {
    clearErrors,
  },
)(Header);
