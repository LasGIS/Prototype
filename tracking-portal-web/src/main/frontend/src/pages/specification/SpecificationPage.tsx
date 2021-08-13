/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import BasePage from '../base/BasePage';
import TrackingSpecification from './TrackingSpecification';
import { useLocation } from 'react-router';
import { ModeType } from '../../service/api-dtos';

export const SpecificationPage = () => {
  const { search } = useLocation();
  const getMode = (): ModeType => {
    const params = new URLSearchParams(search);
    return params.get('mode') as ModeType;
  }
  return (
    <BasePage showTabNavigation selected="specification" theme="gray">
      <TrackingSpecification mode={getMode()}/>
    </BasePage>
  );
}
