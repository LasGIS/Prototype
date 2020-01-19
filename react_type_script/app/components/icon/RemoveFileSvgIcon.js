/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const RemoveFileSvgIcon = ({ className, width, height }) => (
  <svg
    className={cn(className)}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={width} height={height} fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0" transform="scale(0.00961538)" />
      </pattern>
      <image
        id="image0"
        width="104"
        height="104"
        href="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default RemoveFileSvgIcon;

RemoveFileSvgIcon.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

RemoveFileSvgIcon.defaultProps = {
  className: '',
  width: 18,
  height: 18,
};
