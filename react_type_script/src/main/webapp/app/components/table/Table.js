/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';

import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ children }) => <section className={styles.root}>{children}</section>;

Table.propTypes = {
  children: PropTypes.node,
};

Table.defaultProps = {};

export default Table;
