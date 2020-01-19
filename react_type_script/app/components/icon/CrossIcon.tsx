/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  id: string;
  className?: string;
  onClick?: () => void;
};

const CrossIcon = ({ id, className, onClick }: Props) => (
  <div id={id} className={cn('icon__cross', className)} onClick={() => onClick && onClick()} />
);

CrossIcon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

CrossIcon.defaultProps = {
  id: 'crossIcon',
};

export default CrossIcon;
