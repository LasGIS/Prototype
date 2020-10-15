/*
 * Copyright (c) 2020. Prototype
 */

import Loader from 'react-loader-spinner';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Spinner extends Component {
  render() {
    const { white } = this.props;
    return (
      <div>
        {this.props.loading && <Loader type="Oval" color={white ? '#FFFFFF' : '#1D53B1'} height={30} width={30}/>}
      </div>
    );
  }
}

Spinner.propTypes = {
  white: PropTypes.bool,
};

export default connect(state => ({
  loading: state.global.loading,
}))(Spinner);
