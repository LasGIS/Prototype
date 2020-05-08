/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import './style.scss';
import cn from 'classnames';

type Props = {
  className?: string;
};

const AcceptIcon = ({ className }: Props) => <div className={cn('icon icon__accept', className)}/>;

export default AcceptIcon;
