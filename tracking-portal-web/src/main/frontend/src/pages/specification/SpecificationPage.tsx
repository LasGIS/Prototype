/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { useLocation } from 'react-router';
import BasePage from '../base/BasePage';
import TrackingSpecification from './TrackingSpecification';
import { ModeType } from '../../service/api-dtos';

const SpecificationPage = () => {
  const { search } = useLocation();
  const getMode = (): ModeType => {
    const params = new URLSearchParams(search);
    return params.get('mode') as ModeType;
  };
  return (
    <BasePage showTabNavigation selected="specification" theme="gray">
      <TrackingSpecification mode={getMode()} />
    </BasePage>
  );
};
export default SpecificationPage;
