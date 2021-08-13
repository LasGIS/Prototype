/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import BasePage from '../base/BasePage';
import { Route, Switch } from 'react-router-dom';
import { IncompleteProfilePage } from './IncompleteProfilePage';
import { ErrorPage } from './ErrorPage';
import { NotFoundPage } from './NotFoundPage';
import { ServiceUnavailablePage } from './ServiceUnavailablePage';

export const MainError = () =>
  <BasePage theme="white">
    <Switch>
      <Route path="/incomplete-profile" component={IncompleteProfilePage}/>
      <Route path="/error" component={ErrorPage}/>
      <Route path="/404" component={NotFoundPage}/>
      <Route path="/503" component={ServiceUnavailablePage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </BasePage>
