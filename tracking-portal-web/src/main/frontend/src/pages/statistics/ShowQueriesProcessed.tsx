/*
 * Copyright (c) 2021. Prototype
 */

import './statistics.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SelectionReport } from './types';

type Props = {
  unlimitedAccessAvailable: boolean;
  selectionReport?: SelectionReport;
};

const ShowQueriesProcessed = ({ unlimitedAccessAvailable, selectionReport }: Props) => {
  const { t } = useTranslation<string>();

  if (unlimitedAccessAvailable || !selectionReport) {
    return null;
  }
  return (
    <div className="statistics-form__status" hidden={selectionReport.isEmpty}>
      {t('stat.selected.queries-processed')}&nbsp;
      <span className="statistics-form__queries-handled">{selectionReport.queriesHandled}</span>
      &nbsp;{t('stat.selected.preposition-number-of-total')}&nbsp;
      <span className="statistics-form__queries-total">{selectionReport.queriesTotal}</span>
      &nbsp;{t('stat.selected.preposition-date-from')}&nbsp;
      <span>{selectionReport.dataMin}</span>
      &nbsp;{t('stat.selected.preposition-date-to')}&nbsp;
      <span>{selectionReport.dataMax}</span>
    </div>
  );
};
export default ShowQueriesProcessed;
