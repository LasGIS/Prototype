/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BasePage from '../base/BasePage';
import { useTranslation } from 'react-i18next';
import { ServiceAboutRu } from './faq/ServiceAboutRu';
import { ServiceAboutEn } from './faq/ServiceAboutEn';
import { ServiceForWhoRu } from './faq/ServiceForWhoRu';
import { ServiceForWhoEn } from './faq/ServiceForWhoEn';
import { HowToGetAccessRu } from './faq/HowToGetAccessRu';
import { HowToGetAccessEn } from './faq/HowToGetAccessEn';
import { HowToGetFullAccessRu } from './faq/HowToGetFullAccessRu';
import { HowToGetFullAccessEn } from './faq/HowToGetFullAccessEn';
import { NoStatisticsDataRu } from './faq/NoStatisticsDataRu';
import { NoStatisticsDataEn } from './faq/NoStatisticsDataEn';
import { HowToSwitchFromOldServiceRu } from './faq/HowToSwitchFromOldServiceRu';
import { HowToSwitchFromOldServiceEn } from './faq/HowToSwitchFromOldServiceEn';
import { AgreementRu } from './about/AgreementRu';
import { AgreementEn } from './about/AgreementEn';
import SupportRu from './SupportRu';
import SupportEn from './SupportEn';
import { ExamplesRu } from './about/ExamplesRu';
import { ExamplesEn } from './about/ExamplesEn';
import { TestingAccessRu } from './about/TestingAccessRu';
import { TestingAccessEn } from './about/TestingAccessEn';
import Countries from './dictionaries/Countries';
import CategoryCodes from './dictionaries/CategoryCodes';
import OperationCodes from './dictionaries/OperationCodes';
import MailRank from './dictionaries/MailRank';
import MailType from './dictionaries/MailType';
import Postmark from './dictionaries/Postmark';
import SendCtg from './dictionaries/SendCtg';
import EventType from './dictionaries/EventType';
import TechnicalTerms from './dictionaries/TechnicalTerms';

export const MainSupportPage = () => {
  const { i18n } = useTranslation<string>();

  return (
    <BasePage theme="white">
      <Switch>
        <Route path="/support" exact>
          {i18n.language === 'ru' && <SupportRu/>}
          {i18n.language === 'en' && <SupportEn/>}
        </Route>
        <Route path="/support/faq/service_about">
          {i18n.language === 'ru' && <ServiceAboutRu/>}
          {i18n.language === 'en' && <ServiceAboutEn/>}
        </Route>
        <Route path="/support/faq/service_for_who">
          {i18n.language === 'ru' && <ServiceForWhoRu/>}
          {i18n.language === 'en' && <ServiceForWhoEn/>}
        </Route>
        <Route path="/support/faq/how_to_get_access">
          {i18n.language === 'ru' && <HowToGetAccessRu/>}
          {i18n.language === 'en' && <HowToGetAccessEn/>}
        </Route>
        <Route path="/support/faq/how_to_get_full_access">
          {i18n.language === 'ru' && <HowToGetFullAccessRu/>}
          {i18n.language === 'en' && <HowToGetFullAccessEn/>}
        </Route>
        <Route path="/support/faq/no_statistics_data">
          {i18n.language === 'ru' && <NoStatisticsDataRu/>}
          {i18n.language === 'en' && <NoStatisticsDataEn/>}
        </Route>
        <Route path="/support/faq/how_to_switch_from_old_service">
          {i18n.language === 'ru' && <HowToSwitchFromOldServiceRu/>}
          {i18n.language === 'en' && <HowToSwitchFromOldServiceEn/>}
        </Route>

        <Route path="/support/about/agreement">
          {i18n.language === 'ru' && <AgreementRu/>}
          {i18n.language === 'en' && <AgreementEn/>}
        </Route>
        <Route path="/support/about/examples">
          {i18n.language === 'ru' && <ExamplesRu/>}
          {i18n.language === 'en' && <ExamplesEn/>}
        </Route>
        <Route path="/support/about/testing_access">
          {i18n.language === 'ru' && <TestingAccessRu/>}
          {i18n.language === 'en' && <TestingAccessEn/>}
        </Route>

        <Route path="/support/dictionaries/operation_codes" component={OperationCodes}/>
        <Route path="/support/dictionaries/category_codes" component={CategoryCodes}/>
        <Route path="/support/dictionaries/mailrank" component={MailRank}/>
        <Route path="/support/dictionaries/mailtype" component={MailType}/>
        <Route path="/support/dictionaries/postmark" component={Postmark}/>
        <Route path="/support/dictionaries/countries" component={Countries}/>
        <Route path="/support/dictionaries/send_ctg" component={SendCtg}/>
        <Route path="/support/dictionaries/event_type" component={EventType}/>
        <Route path="/support/dictionaries/special-termins" component={TechnicalTerms}/>
      </Switch>
    </BasePage>
  );
}
