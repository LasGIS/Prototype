/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { useLocation } from 'react-router';
import BasePage from '../base/BasePage';
import { ModeType } from '../../service/api-dtos';
import StatisticsForm from './StatisticsForm';

const StatisticsPage = () => {
  const { search } = useLocation();
  const getMode = (): ModeType => {
    const params = new URLSearchParams(search);
    return params.get('mode') as ModeType;
  };
  return (
    <BasePage showTabNavigation selected="statistics" theme="gray">
      <StatisticsForm mode={getMode()} />
    </BasePage>
  );
};

export default StatisticsPage;
