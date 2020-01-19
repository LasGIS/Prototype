import React from 'react';
import './style.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';

const AcceptIcon = ({ className }) => <div className={cn('icon icon__accept', className)} />;

AcceptIcon.propTypes = {
  className: PropTypes.string,
};

export default AcceptIcon;
