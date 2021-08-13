/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import BasePage from '../base/BasePage';
import Landing from './Landing';

export const LandingPage = () => {
  return (
    <BasePage theme="white" showTabNavigation={false}>
      <Landing />
    </BasePage>
  );
};

export default LandingPage;
