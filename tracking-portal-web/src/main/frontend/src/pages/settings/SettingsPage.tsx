/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import BasePage from '../base/BasePage';
import TrackingSettings from './TrackingSettings';

const SettingsPage = () => {
  return (
    <BasePage showTabNavigation selected="access-settings" theme="gray">
      <TrackingSettings />
    </BasePage>
  );
};

export default SettingsPage;
