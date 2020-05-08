/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import './style.scss';
import cn from 'classnames';

type Props = {
  className?: string;
};

const QuestionIcon = ({ className }: Props) => <div className={cn('icon icon__question', className)}/>;

export default QuestionIcon;
