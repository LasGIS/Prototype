/*
 * Copyright (c) 2021. Prototype
 */

import '../css/aui.scss';
import '../css/style_load.scss';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './landing/LandingPage';
import { MainSupportPage } from './support/MainSupportPage';
import { SpecificationPage } from './specification/SpecificationPage';
import { StatisticsPage } from './statistics/StatisticsPage';
import { SettingsPage } from './settings/SettingsPage';
import { MainError } from './error/MainError';
import TestComponents from '../components/TestComponents/TestComponents';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/support" component={MainSupportPage}/>
          <Route path="/statistics" component={StatisticsPage}/>
          <Route path="/access-settings" component={SettingsPage}/>
          <Route path="/specification" component={SpecificationPage}/>
          <Route path="/components" component={TestComponents}/>
          <Route component={MainError}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
