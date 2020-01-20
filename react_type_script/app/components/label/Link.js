/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Link = ({ id, text, onClick, className, dotted, filled, white }) => (
  <div
    id={id}
    onClick={onClick}
    className={cn('link', { 'link--dotted': dotted, 'link--filled': filled, 'link--white': white }, className)}
  >
    {text}
  </div>
);

Link.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dotted: PropTypes.bool,
  filled: PropTypes.bool,
  white: PropTypes.bool,
};

Link.defaultProps = {
  id: '',
  text: '',
  onClick: () => undefined,
};

export default Link;
