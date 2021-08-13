/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import cn from 'classnames';
import { BatchRu } from './BatchRu';
import { BatchEn } from './BatchEn';
import SingleRu from './SingleRu';
import SingleEn from './SingleEn';
import { ModeType } from '../../service/api-dtos';

type Props = WithTranslation & {
  mode?: ModeType;
};

type State = {
  mode: ModeType;
};

class TrackingSpecification extends Component<Props, State> {

  static defaultProps: Partial<Props> = {
    mode: "single",
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: props.mode === "batch" ? "batch" : "single",
    };
    this.setMode = this.setMode.bind(this);
  }

  setMode = (mode: ModeType) => {
    this.setState({ mode: mode });
  }

  render() {
    const { t, i18n } = this.props;
    const { mode } = this.state;
    const modeClass = (currMode: ModeType) => {
      return cn("tracking-left-menu__item", { "tracking-left-menu__item--selected": (currMode === mode) });
    };

    return (
      <div>
        <div className="specification-page row-fluid">
          <ul className="span1 nav nav-list specification-page__left-menu tracking-left-menu">
            <li className={modeClass("single")} onClick={() => this.setMode("single")}>
              <span>{t("stat.left-menu.text-single-link")}</span>
            </li>
            <li className={modeClass("batch")} onClick={() => this.setMode("batch")}>
              <span>{t("stat.left-menu.text-batch-link")}</span>
            </li>
          </ul>
          <div className="span10 specification-page__content">
            {mode === "single" && i18n.language === 'ru' && <SingleRu/>}
            {mode === "single" && i18n.language === 'en' && <SingleEn/>}
            {mode === "batch" && i18n.language === 'ru' && <BatchRu/>}
            {mode === "batch" && i18n.language === 'en' && <BatchEn/>}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(TrackingSpecification);
