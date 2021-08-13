/*
 * Copyright (c) 2021. Prototype
 */

import React, { useEffect, useState } from 'react';

type Props = {
  delay?: number;
  show?: boolean;
};

export const Spinner = ({ delay, show }: Props) => {

  const [ stShow, setStateShow ] = useState<boolean>(show || false);

  useEffect(() => {
    setStateShow(show || false);
  }, [ show ]);

  useEffect(() => {
    if (Boolean(delay)) {
      setStateShow(true);
      setTimeout(function () {
        setStateShow(false);
      }, delay);
    }
  }, [ delay ]);

  return <>{stShow &&
  <div className="spinner">
    <div className="spinner__paper">
      <div className="spinner__dots"/>
    </div>
  </div>
  }</>
}

export default Spinner;
