/*
 * Copyright (c) 2021. Prototype
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import useCommonContext from '../hoc/useCommonContext';

export type Tabs = 'statistics' | 'access-settings' | 'specification';
type InfoTab = {
  forServiceTrackingUser: boolean;
  path: Tabs;
  nameKey: string;
};

const INFO_TABS: InfoTab[] = [
  { forServiceTrackingUser: true, path: 'statistics', nameKey: 'russianpost.theme.statistics' },
  { forServiceTrackingUser: true, path: 'access-settings', nameKey: 'russianpost.theme.accessSettings' },
  { forServiceTrackingUser: false, path: 'specification', nameKey: 'russianpost.theme.specification' },
];

type Props = {
  selected?: Tabs;
};

export const TabNavigation = ({ selected }: Props) => {
  const history = useHistory();
  const { t } = useTranslation<string>();
  const { userInfo } = useCommonContext();

  return (
    <div className="tab-navigation">
      <div className="row-fluid">
        <div className="tab-navigation__title span3 text-left">
          {userInfo.isServiceTrackingUser ? (
            t('russianpost.theme.tracking')
          ) : (
            <div className="text-button" id="backLink" role="button" tabIndex={-1} onClick={() => history.go(-1)}>
              ← {t('russianpost.theme.back')}
            </div>
          )}
        </div>
        <div className="tab-navigation__buttons span6">
          {INFO_TABS.map((info: InfoTab) => {
            return (
              (userInfo.isServiceTrackingUser || !info.forServiceTrackingUser) &&
              (selected === info.path ? (
                <div key={info.path} className="tab-navigation__button tab-navigation__button--selected">
                  {t(info.nameKey)}
                </div>
              ) : (
                <Link to={info.path} key={info.path} className="tab-navigation__button">
                  {t(info.nameKey)}
                </Link>
              ))
            );
          })}
        </div>
      </div>
    </div>
  );
};
