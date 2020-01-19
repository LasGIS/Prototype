/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import './style.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';

const RussianPostEmsIcon = ({ id, className, transparent }) => (
  <div id={id} className={cn('icon icon__russianpost-ems', { 'icon--transparent': transparent }, className)} />
);

export default RussianPostEmsIcon;

RussianPostEmsIcon.propTypes = {
  id: PropTypes.string,
  transparent: PropTypes.bool,
  className: PropTypes.string,
};
