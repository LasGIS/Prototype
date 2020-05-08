/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import cn from 'classnames';

type Props = {
  id: string;
  className?: string;
  onClick?: () => void;
};

const CrossIcon = ({ id, className, onClick }: Props) => (
  <div id={id} className={cn('icon__cross', className)} onClick={() => onClick && onClick()}/>
);

CrossIcon.defaultProps = {
  id: 'crossIcon',
};

export default CrossIcon;
