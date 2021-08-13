/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import BasePage from '../base/BasePage';
import TrackingSettings from './TrackingSettings';

export const SettingsPage = () => {
  return (
    <BasePage showTabNavigation selected="access-settings" theme="gray">
      <TrackingSettings/>
    </BasePage>
  );
}
