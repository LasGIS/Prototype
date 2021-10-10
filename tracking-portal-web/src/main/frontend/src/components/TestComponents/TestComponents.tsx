/*
 * Copyright (c) 2021. Prototype
 */

import React, { ChangeEventHandler, Component } from 'react';
import { Notification } from '../Notification';
import Spinner from '../Spinner';
import { WithTranslation, withTranslation } from 'react-i18next';
import { isObject } from '../../common/utils';
import _ from 'underscore';
import $ from 'jquery';
import { DropElement, RegionType } from '../ui/Dropdown/types';
import InputCell from '../ui/InputCell';
import services from '../../service/services';
import ReactDOM from 'react-dom';
import InputElement from '../ui/Input/InputElement';

const refNames = [
  "item0",
  "item1",
  "item4",
  "item5",
  "item6",
];

type Props = WithTranslation & {
  id: string;
  className: string;
  checked: boolean;
  label: string;
  bigLabel?: boolean;
  partiallyChecked?: string;
  dadataRestUrl: string;
  onChange?: (value: boolean) => void;
  uiState: "fill" | "sent" | "already-sent";
  doneHref: string;
  requestFormRegisterUrl: string;

  contractNumber?: string;
  contractDate?: string;
  organizationName?: string;
  organizationINN?: string;
  contactName?: string;
  contactSurname?: string;
  contactSecondName?: string;
  contactRegion?: string;
  contactEmail?: string;
  contactPhone?: string;
  oneClickUrl: string;
  partnersInfo: string[];
};

type State = {
  showError: boolean;
  showSpinner: boolean;
  errorMessage: string;
  regions: DropElement<string>[];
  uiState: "fill" | "sent" | "already-sent";

  contractNumber: string;
  contractDate: string;
  organizationName: string;
  organizationINN?: string;
  contactName?: string;
  contactSurname?: string;
  contactSecondName?: string;
  contactRegion?: string;
  contactEmail?: string;
  contactPhone?: string;
  secondNameDisabled?: boolean;
};

class TestComponents extends Component<Props, State> {

  static defaultProps: Partial<Props> = {
    id: "string",
    className: "string",
    checked: false,
    label: "label",
    bigLabel: false,
    partiallyChecked: "partiallyChecked",
    dadataRestUrl: "dadataRestUrl",
    doneHref: "/statistics",
    requestFormRegisterUrl: 'register',

    contractNumber: "contractNumber",
    contractDate: "22/02/1963",
    organizationName: "it.one",
    organizationINN: "х.з.",
    contactName: "Владимир",
    contactSurname: "Ласкин",
    contactSecondName: "Вадимович",
    contactRegion: "contactRegion",
    contactEmail: "vlaskin@it.one.ru",
    contactPhone: "8312653692",

    oneClickUrl: "oneClickUrl",
    partnersInfo: [
      "request.partners-info.0",
      "request.partners-info.1",
      "request.partners-info.2",
      "request.partners-info.3"
    ]
  };

  mapAsElements(regions: RegionType[]): DropElement<string>[] {
    return regions.map(function (ufpsCode) {
      return {
        data: ufpsCode.code,
        text: ufpsCode.name
      }
    }).sort(function (a, b) {
      if (a.text > b.text) {
        return 1;
      } else if (a.text < b.text) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  constructor(props: Props) {
    super(props);
    const { t } = props;
    const pickProps = {
      contractNumber: props.contractNumber || "",
      contractDate: props.contractDate || "",
      organizationName: props.organizationName || "",
      organizationINN: props.organizationINN,
      contactName: props.contactName,
      contactSurname: props.contactSurname,
      contactSecondName: props.contactSecondName,
      contactRegion: props.contactRegion,
      contactEmail: props.contactEmail,
      contactPhone: props.contactPhone,
      oneClickUrl: props.oneClickUrl
    };
    this.state = {
      ...pickProps,
      showSpinner: false,
      showError: false,
      errorMessage: '',
      regions: this.mapAsElements(JSON.parse(t("request.regions"))),
      uiState: props.uiState || "fill", //"sent", "already-sent"
      secondNameDisabled: !!props.contactSecondName,
      contactPhone: this.phoneFormat(props.contactPhone)
    }

    this.validateAll = this.validateAll.bind(this);
    this.redirectToOneClick = this.redirectToOneClick.bind(this);
    this.onChangeContractNumber = this.onChangeContractNumber.bind(this);
  }

  phoneFormat(phone?: string) {
    if (phone && phone.length === 11) {
      return phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
    } else {
      return phone;
    }
  }

  sendingInProgress = false;

  sendRequest() {
    const { t } = this.props;
    if (this.sendingInProgress) {
      return;
    }
    this.sendingInProgress = true;
    const that = this;
    const errRef = this.validateAll();
    if (errRef) {
      this.focusToComponent(errRef);
      this.sendingInProgress = false;
      return;
    }
    const parameters = {
      contractNumber: this.state.contractNumber,
      contractDate: this.state.contractDate,
      organizationName: this.state.organizationName,
      organizationINN: this.state.organizationINN,
      contactName: this.state.contactName,
      contactSurname: this.state.contactSurname,
      contactSecondName: this.state.contactSecondName,
      contactRegion: this.state.contactRegion,
      contactEmail: this.state.contactEmail,
      contactPhone: this.state.contactPhone,
    };

    this.setState({ showSpinner: true, showError: false });
    services.apiControl.sendRequest(this.props.requestFormRegisterUrl, parameters)
      .then(() => {
        that.setState({ showSpinner: false, uiState: "sent" });
        that.sendingInProgress = false;
      })
      .catch(function (error) {
        const state: any = {
          showSpinner: false,
          showError: true,
          uiState: "fill"
        };
        if (error === "ALREADY_SENT") {
          state.errorMessage = t("request.error.already-sent");
        } else if (error === "INVALID_TIN") {
          state.errorMessage = t("request.error.invalid-tin");
        } else if (error === "ALREADY_APPROVED") {
          state.errorMessage = t("request.error.already-approved");
        } else if (error === "EXTERNAL_SERVER_ERROR") {
          state.errorMessage = t("request.error.external-service");
        } else if (error === "INTERNAL_SERVER_ERROR") {
          state.errorMessage = t("request.error.internal");
        } else {
          if (error) {
            state.errorMessage = t("request.error.unknown2") + error + t("request.error.unknown3");
          } else {
            state.errorMessage = t("request.error.unknown");
          }
        }
        that.setState(state);
        that.sendingInProgress = false;
      })

  }

  focusToComponent(ref: any) {
    setTimeout(function () {
      const element: Element | null | Text = ReactDOM.findDOMNode(ref)
      if (element) {
        $(element).find('input').focus();
      }
    }, 400);
  }

  validateAll() {
    let firstRef: any = null;
    refNames.forEach(refName => {
      const ref: any = this.refs[refName];
      if (!ref.validate() && !firstRef) {
        firstRef = ref;
      }
    });
    return firstRef;
  }

  redirectToOneClick() {
    document.location.href = this.props.oneClickUrl;
  }

  onValidate(value: any) {
    return !!value;
  }

  checkPersonTin(pureTin: string) {
    const K = [ 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 ];
    let sum10 = 0;
    for (let i = 0; i < pureTin.length - 2; i++) {
      sum10 += K[i + 1] * parseInt(pureTin.charAt(i));
    }
    let sum11 = 0;
    for (let i = 0; i < pureTin.length - 1; i++) {
      sum11 += K[i] * parseInt(pureTin.charAt(i));
    }
    return ((sum10 % 11) % 10) === parseInt(pureTin.charAt(10)) && ((sum11 % 11) % 10) === parseInt(pureTin.charAt(11));
  }

  checkLegalTin(pureTin: string) {
    const K = [ 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 ];
    let sum = 0;
    for (let i = 0; i < pureTin.length - 1; i++) {
      sum += K[i + 2] * parseInt(pureTin.charAt(i));
    }
    return ((sum % 11) % 10) === parseInt(pureTin.charAt(9));
  }

  onTinValidate(value: string, props: Props) {
    if (!value) {
      return false;
    }
    const pureTin = value.trim();
    if (pureTin.match(/^[0-9]{12}$/)) {
      return this.checkPersonTin(pureTin);
    } else if (pureTin.match(/^[0-9]{10}$/)) {
      return this.checkLegalTin(pureTin);
    }
    return false;
  }

  onValidateDate(value: string, props: any) {
    let dateValid = false;
    if (value) {
      const pattern = /(\d{2})-(\d{2})-(\d{4})/;
      const dt = new Date(value.replace(pattern, '$3-$2-$1'));
      if (Object.prototype.toString.call(dt) === "[object Date]") {
        if (!isNaN(dt.getTime())) {
          dateValid = true;
        }
      }
    }
    return dateValid;
  }

  onChangeRegion(value: string) {
    this.setState({ contactRegion: value });
    return value;
  }

  onChange(name: string, value: string) {
    const state = {};
    // @ts-ignore
    state[name] = value;
    this.setState(state);
    return value;
  }

  onChangeDadata = (value: any) => {
    console.log('onChangeDadata', value)
    const state: any = {};
    if (isObject(value)) {
      state.organizationName = value.text;
      state.organizationINN = "" + value.data.inn;
    }
    this.setState(state, () => {
      // this.refs.item2.validate();
      // this.refs.item3.validate();
    });
  }

  formatOrgCallback(data: any[]) {
    _.each(data, (val) => {
      val.text = val.text + (!val.data.data.inn ? "" : "\u00A0\u00A0\u00A0" + val.data.data.inn);
    });
    return data;
  }

  formatInnCallback(data: any[]) {
    _.each(data, (val) => {
      val.text = (!val.data.data.inn ? "" : val.data.data.inn + "\u00A0\u00A0\u00A0") + val.text;
    });
    return data;
  }

  onCloseNotification() {
    this.setState({ showError: false });
  }

  onChangeContractNumber: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ contractNumber: event.target.value });
  }

  onChangeOrganizationName: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ organizationName: event.target.value });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="request-page">
        <div className="request-page__paper">
          <div className="request-page__header">{t("request.title")}</div>
          <div className="request-page__body">
            <div className="request-body">
              <div className="request-body__section">
                <div className="request-body__row row-fluid">
                  <div className="request-body__cell input-cell span7">
                    <InputElement
                      value={this.state.contractNumber}
                      onChange={this.onChangeContractNumber}
                      mask="99.999 [a]"
                    />
                  </div>
                  <div className="request-body__cell input-cell">
                    <InputElement
                      value={this.state.organizationName}
                      onChange={this.onChangeOrganizationName}
                    />
                  </div>
                </div>
              </div>
              <div className="request-body__section">
                <div className="request-body__row row-fluid">
                  <div className="request-body__cell input-cell span7">
                    <InputCell.Text tabIndex="1" ref="item0"
                                    label={t("request.form.contract-number.label")}
                                    errorMessage={t("request.form.contract-number.error")}
                                    value={this.state.contractNumber}
                                    onChange={this.onChange.bind(this, "contractNumber")}
                                    onValidate={this.onValidate}/>
                  </div>
                  <div className="request-body__cell input-cell">
                    <InputCell.Date tabIndex="2" ref="item1"
                                    label={t("request.form.contract-date.label")}
                                    placeholder={t("request.form.contract-date.placeholder")}
                                    errorMessage={t("request.form.contract-date.error")}
                                    value={this.state.contractDate} onChange={this.onChange.bind(this, "contractDate")}
                                    onValidate={this.onValidateDate}/>
                  </div>
                </div>
              </div>
              <div className="request-body__section">
                <hr className="request-body__delimiter"/>
                <div className="request-body__header"> {t("request.form.org.title")} </div>
                <div className="request-body__row row-fluid">
                  {/*
                  <div className="request-body__cell input-cell span12">
                    <DadataSuggest
                      tabIndex="3" ref="item2"
                      label={t("request.form.org-name.label")}
                      errorMessage={t("request.form.org-name.error")}
                      value={this.state.organizationName}
                      suggestCallback={this.onChangeDadata}
                      onChange={this.onChange.bind(this, "organizationName")}
                      onValidate={this.onValidate}
                      dadataRestUrl={this.props.dadataRestUrl + "/party"}
                      formatCallback={this.formatOrgCallback}
                    />
                  </div>
*/}
                </div>
                <div className="request-body__row row-fluid">
                  {/*
                  <div className="request-body__cell input-cell span5">
                    <DadataSuggest
                      tabIndex="4" ref="item3"
                      label={t("request.form.tin.label")}
                      errorMessage={t("request.form.tin.error")}
                      value={this.state.organizationINN}
                      suggestCallback={this.onChangeDadata}
                      onChange={this.onChange.bind(this, "organizationINN")}
                      onValidate={this.onTinValidate}
                      dadataRestUrl={this.props.dadataRestUrl + "/party"}
                      acceptedChars={"1234567890"}
                      maxLength={12}
                      formatCallback={this.formatInnCallback}
                    />
                  </div>
*/}
                </div>
              </div>

              <div className="request-body__section">
                <hr className="request-body__delimiter"/>
                <div className="request-body__header"> {t("request.form.contacts.title")} </div>
                <div className="request-body__row row-fluid">
                  <div className="request-body__cell input-cell span4">
                    <InputCell.Text tabIndex="-1" disabled="true" ref="item4"
                                    label={t("request.form.surname.label")}
                                    errorMessage={t("request.form.surname.error")}
                                    value={this.state.contactSurname}
                                    onChange={this.onChange.bind(this, "contactSurname")}
                                    onValidate={this.onValidate}/>
                  </div>
                  <div className="request-body__cell input-cell span4">
                    <InputCell.Text tabIndex="-1" disabled="true" ref="item5"
                                    label={t("request.form.name.label")}
                                    errorMessage={t("request.form.name.error")}
                                    value={this.state.contactName}
                                    onChange={this.onChange.bind(this, "contactName")}
                                    onValidate={this.onValidate}/>
                  </div>
                  <div className="request-body__cell input-cell span4">
                    <InputCell.Text tabIndex="7" disabled={this.state.secondNameDisabled}
                                    label={t("request.form.second-name.label")}
                                    value={this.state.contactSecondName}
                                    onChange={this.onChange.bind(this, "contactSecondName")}/>
                  </div>
                </div>
                <div className="request-body__row row-fluid">
                  <div className="request-body__cell input-cell span66">
                    <InputCell.Text tabIndex="-1" disabled="true"
                                    label={t("request.form.email.label")}
                                    className="" placeholder="mail@example.com"
                                    value={this.state.contactEmail} onChange={this.onChange.bind(this, "contactEmail")}/>
                  </div>
                  <div className="request-body__cell input-cell span4">
                    <InputCell.Text tabIndex="-1"
                                    label={t("request.form.phone.label")}
                                    className="input-cell__phone"
                                    placeholder="+7 988 888 88 88" value={this.state.contactPhone}
                                    onChange={this.onChange.bind(this, "contactPhone")}/>
                  </div>
                </div>
                <div className="request-body__row row-fluid">
                  <div className="request-body__cell input-cell span7">
                    <InputCell.Select tabIndex="10" ref="item6"
                                      label={t("request.form.region.label")}
                                      className="region"
                                      errorMessage={t("request.form.region.error")}
                                      elements={this.state.regions}
                                      dataValue={this.state.contactRegion}
                                      onChange={this.onChangeRegion.bind(this)}
                                      onValidate={this.onValidate}
                    />
                  </div>
                </div>
              </div>
              <div className="button request-body__submit" onClick={this.sendRequest.bind(this)} tabIndex={11}> {t("request.form.send")} </div>
            </div>
          </div>
          <div className="request-page__info">
            <div className="page-info">
              <div className="page-info__header">{t("request.partners-title")} </div>
              <div className="page-info__destination">{t("request.destination")} </div>
              <div className="page-info__text">
                {this.props.partnersInfo.map(function (messageKey, index) {
                  return <p key={index}> {t(messageKey)} </p>
                })}
              </div>
              <div className="page-info__link" onClick={this.redirectToOneClick} tabIndex={12}>
                {t("request.partners.link")}
              </div>
            </div>
          </div>
        </div>
        <Notification show={this.state.showError} message={this.state.errorMessage} onClose={this.onCloseNotification}/>
        <Spinner show={this.state.showSpinner} delay={200}/>
      </div>
    );
  }
}

export default withTranslation()(TestComponents);
