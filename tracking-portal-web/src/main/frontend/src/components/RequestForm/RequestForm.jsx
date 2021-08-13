/*
 * Copyright (c) 2021. Prototype
 */

import { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import { services } from '../../service/services';
import { Notification } from '../Notification';
import Spinner from '../Spinner';
import { isObject } from '../../common/utils';
import DadataSuggest from '../DadataSuggest';

class RequestForm extends Component {

  getDefaultProps() {
    return {
      doneHref: "/statistics",
      requestFormRegisterUrl: 'register',
      messages: {
        errorAlreadySent: "Заявка на подключение безлимитного трекинга уже была подана ранее и находится в обработке.",
        errorInvalidTin: "Некорректный ИНН.",
        errorAlreadyApproved: "Заявка на подключение безлимитного трекинга уже была подана ранее и одобрена.",
        errorExternalServerError: "Сервис приема заявок временно недоступен. Попробуйте отправить заявку позже.",
        errorInternalServerError: "Внутренняя ошибка приложения.",
        errorUnknown: "Неизвестная ошибка. Попробуйте обновить страницу.",
        errorUnknown2: "Неизвестная ошибка: ",
        errorUnknown3: ". Попробуйте обновить страницу.",
        requestAlreadySentTitle: "Заявка в обработке",
        requestAlreadySentInfo: "Заявка на подключение безлимитного трекинга уже была подана ранее и находится в обработке.",
        requestGoTo: "Перейти в",
        requestLink: "Мой трекинг",
        requestSentTitle: "\u2714 Заявка отправлена",
        requestSentInfo: "Мы рассмотрим заявку и сообщим о результате по электронной почте",
        title: "Подключение партнерского трекинга",
        contractNumberLabel: "Номер договора с Почтой России",
        contractNumberError: "Укажите номер договора",
        contractDateLabel: "Дата заключения договора",
        contractDateError: "Укажите дату договора",
        contractDatePlaceholder: "ДД-ММ-ГГГГ",
        orgTitle: "Реквизиты организации",
        orgNameLabel: "Название организации",
        orgNameError: "Укажите название организации",
        orgINNLabel: "ИНН",
        orgINNError: "Укажите корректный ИНН организации",
        contactTitle: "Контакты",
        contactSurnameLabel: "Фамилия",
        contactSurnameError: "Укажите фамилию",
        contactNameLabel: "Имя",
        contactNameError: "Укажите имя",
        contactSecondNameLabel: "Отчество",
        contactEmailLabel: "Электронная почта",
        contactPhoneLabel: "Мобильный телефон",
        contactRegionLabel: "Регион",
        contactRegionError: "Выберите регион",
        buttonSendRequest: "Отправить заявку",
        partnersTitle: "Партнерские возможности",
        partnersDestination: "Для юридических лиц по договору",
        partnersInfo: [
          "Безлимитный доступ к API сервиса отслеживания отправлений",
          "Возможность безналичных расчетов",
          "Упрощенный процесс отправки большого количества писем и посылок",
          "Рассылка рекламных материалов",
        ],
        partnersLink: "Заключение договора",

      }
    };
  }

  mapAsElements(regions) {
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

  constructor(props) {
    super(props);
    const pickProps = _.pick(props, "contractNumber", "contractDate",
      "organizationName", "organizationINN",
      "contactName", "contactSurname", "contactSecondName",
      "contactRegion", "contactEmail", "contactPhone",
      "oneClickUrl"
    );
    _.extend(pickProps, {
      regions: this.mapAsElements(props.regions),
      uiState: props.uiState || "fill", //"sent", "already-sent"
      secondNameDisabled: !!props.contactSecondName,
      contactPhone: this.phoneFormat(props.contactPhone)
    })
    this.state = pickProps;
  }

  phoneFormat(phone) {
    if (phone && phone.length === 11) {
      return phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
    } else {
      return phone;
    }
  }

  sendingInProgress = false;

  sendRequest() {
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

    this.setState({showSpinner: true, showError: false});
    const promise = services.apiControl.sendRequest(this.props.requestFormRegisterUrl, parameters);

    promise.then(function (result) {
      that.setState({showSpinner: false});
      that.setState({uiState: "sent"});
      that.sendingInProgress = false;
    })
      .fail(function (error) {
        const state = {
          showSpinner: false,
          showError: true
        };
        if (error === "ALREADY_SENT") {
          state.errorMessage = that.props.messages.errorAlreadySent;
        } else if (error === "INVALID_TIN") {
          state.errorMessage = that.props.messages.errorInvalidTin;
        } else if (error === "ALREADY_APPROVED") {
          state.errorMessage = that.props.messages.errorAlreadyApproved;
        } else if (error === "SERVICE_UNAVAILABLE") {
          state.errorMessage = that.props.messages.errorExternalServerError;
        } else if (error === "INTERNAL_SERVER_ERROR") {
          state.errorMessage = that.props.messages.errorInternalServerError;
        } else {
          if (error) {
            state.errorMessage = that.props.messages.errorUnknown2 + error + that.props.messages.errorUnknown3;
          } else {
            state.errorMessage = that.props.messages.errorUnknown;
          }
        }
        that.setState(state);
        that.sendingInProgress = false;
      })

  }

  focusToComponent(ref) {
    setTimeout(function () {
      $(ReactDOM.findDOMNode(ref)).find('input').focus();
    }, 400);
  }

  validateAll() {
    const lastValidatorsNumber = 6;
    let firstRef = null;
    for (let i = 0; i <= lastValidatorsNumber; ++i) {
      const ref = this.refs["item" + i];
      const ok = ref.validate();
      if (!ok && !firstRef) {
        firstRef = ref;
      }
    }

    return firstRef;
  }

  redirectToOneClick() {
    document.location.href = this.state.oneClickUrl
  }

  onValidate(value, props) {
    return !!value;
  }

  checkPersonTin(pureTin) {
    const K = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
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

  checkLegalTin(pureTin) {
    const K = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    let sum = 0;
    for (let i = 0; i < pureTin.length - 1; i++) {
      sum += K[i + 2] * parseInt(pureTin.charAt(i));
    }
    return ((sum % 11) % 10) === parseInt(pureTin.charAt(9));
  }

  onTinValidate(value, props) {
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

  onValidateDate(value, props) {
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

  onChangeRegion(value) {
    this.setState({contactRegion: value});
    return value;
  }

  onChange(name, value) {
    const state = {};
    state[name] = value;
    this.setState(state);
    return value;
  }

  onChangeDadata(value) {
    console.log('onChangeDadata', value)
    const state = {};
    if (isObject(value)) {
      state['organizationName'] = value.text;
      state['organizationINN'] = "" + value.data.inn;
    }
    this.setState(state, function () {
      this.refs.item2.validate();
      this.refs.item3.validate();
    });
  }

  formatOrgCallback(data) {
    _.each(data, function (val) {
      val.text = val.text + (!val.data.data.inn ? "" : "\u00A0\u00A0\u00A0" + val.data.data.inn);
    });
    return data;
  }

  formatInnCallback(data) {
    _.each(data, function (val) {
      val.text = (!val.data.data.inn ? "" : val.data.data.inn + "\u00A0\u00A0\u00A0") + val.text;
    });
    return data;
  }

  onCloseNotification() {
    this.setState({showError: false});
  }

  render() {
    if (this.state.uiState === "already-sent") {

      return (
        <div className="notification-fullscreen">
          <div className="notification-fullscreen__paper">
            <div className="notification-fullscreen__already-sent"> {this.props.messages.requestAlreadySentTitle} </div>
            <div className="notification-fullscreen__info">
              {this.props.messages.requestAlreadySentInfo}
            </div>
            <div className="notification-fullscreen__explanation">
              {this.props.messages.requestGoTo}
              &nbsp;&laquo;<a href={this.props.doneHref}>{this.props.messages.requestLink}</a>&raquo;
            </div>
          </div>
        </div>
      )

    } else if (this.state.uiState === "sent") {

      return (
        <div className="notification-fullscreen">
          <div className="notification-fullscreen__paper">
            <div className="notification-fullscreen__ok">  {this.props.messages.requestSentTitle} </div>
            <div className="notification-fullscreen__info">
              {this.props.messages.requestSentInfo}
            </div>
            <div className="notification-fullscreen__explanation">
              {this.props.messages.requestGoTo}
              &nbsp;&laquo;<a href={this.props.doneHref}>{this.props.messages.requestLink}</a>&raquo;
            </div>
          </div>
        </div>
      );

    } else if (this.state.uiState === "fill") {

      return (
        <div className="request-page">
          <div className="request-page__paper">
            <div className="request-page__header">{this.props.messages.title}</div>
            <div className="request-page__body">
              <div className="request-body">
                <div className="request-body__section">
                  <div className="request-body__row row-fluid">
                    <div className="request-body__cell input-cell span7">
                      <InputCell.Text tabIndex="1" ref="item0"
                                      label={this.props.messages.contractNumberLabel}
                                      errorMessage={this.props.messages.contractNumberError}
                                      value={this.state.contractNumber} onChange={this.onChange.bind(this, "contractNumber")}
                                      onValidate={this.onValidate}/>
                    </div>
                    <div className="request-body__cell input-cell">
                      <InputCell.Date tabIndex="2" ref="item1"
                                      label={this.props.messages.contractDateLabel}
                                      placeholder={this.props.messages.contractDatePlaceholder}
                                      errorMessage={this.props.messages.contractDateError}
                                      value={this.state.contractDate} onChange={this.onChange.bind(this, "contractDate")}
                                      onValidate={this.onValidateDate}/>
                    </div>
                  </div>
                </div>
                <div className="request-body__section">
                  <hr className="request-body__delimiter"/>
                  <div className="request-body__header"> {this.props.messages.orgTitle} </div>
                  <div className="request-body__row row-fluid">
                    <div className="request-body__cell input-cell span12">
                      <DadataSuggest tabIndex="3" ref="item2"
                                     label={this.props.messages.orgNameLabel}
                                     errorMessage={this.props.messages.orgNameError}
                                     value={this.state.organizationName}
                                     suggestCallback={this.onChangeDadata}
                                     onChange={this.onChange.bind(this, "organizationName")}
                                     onValidate={this.onValidate}
                                     dadataRestUrl={this.props.dadataRestUrl + "/party"}
                                     formatCallback={this.formatOrgCallback}/>
                    </div>
                  </div>
                  <div className="request-body__row row-fluid">
                    <div className="request-body__cell input-cell span5">
                      <DadataSuggest tabIndex="4" ref="item3"
                                     label={this.props.messages.orgINNLabel}
                                     errorMessage={this.props.messages.orgINNError}
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
                  </div>
                </div>
                <div className="request-body__section">
                  <hr className="request-body__delimiter"/>
                  <div className="request-body__header"> {this.props.messages.contactTitle} </div>
                  <div className="request-body__row row-fluid">
                    <div className="request-body__cell input-cell span4">
                      <InputCell.Text tabIndex="-1" disabled="true" ref="item4"
                                      label={this.props.messages.contactSurnameLabel}
                                      errorMessage={this.props.messages.contactSurnameError}
                                      value={this.state.contactSurname} onChange={this.onChange.bind(this, "contactSurname")}
                                      onValidate={this.onValidate}/>
                    </div>
                    <div className="request-body__cell input-cell span4">
                      <InputCell.Text tabIndex="-1" disabled="true" ref="item5"
                                      label={this.props.messages.contactNameLabel}
                                      errorMessage={this.props.messages.contactNameError}
                                      value={this.state.contactName} onChange={this.onChange.bind(this, "contactName")} onValidate={this.onValidate}/>
                    </div>
                    <div className="request-body__cell input-cell span4">
                      <InputCell.Text tabIndex="7" disabled={this.state.secondNameDisabled}
                                      label={this.props.messages.contactSecondNameLabel}
                                      value={this.state.contactSecondName} onChange={this.onChange.bind(this, "contactSecondName")}/>
                    </div>
                  </div>
                  <div className="request-body__row row-fluid">
                    <div className="request-body__cell input-cell span66">
                      <InputCell.Text tabIndex="-1" disabled="true"
                                      label={this.props.messages.contactEmailLabel}
                                      className="" placeholder="mail@example.com"
                                      value={this.state.contactEmail} onChange={this.onChange.bind(this, "contactEmail")}/>
                    </div>
                    <div className="request-body__cell input-cell span4">
                      <InputCell.Text tabIndex="-1" disabled="true"
                                      label={this.props.messages.contactPhoneLabel}
                                      className="input-cell__phone"
                                      placeholder="+7 988 888 88 88" value={this.state.contactPhone}
                                      onChange={this.onChange.bind(this, "contactPhone")}/>
                    </div>
                  </div>
                  <div className="request-body__row row-fluid">
                    <div className="request-body__cell input-cell span7">
                      <InputCell.Select tabIndex="10" ref="item6"
                                        label={this.props.messages.contactRegionLabel}
                                        className="region"
                                        errorMessage={this.props.messages.contactRegionError}
                                        elements={this.state.regions}
                                        dataValue={this.state.contactRegion}
                                        onChange={this.onChangeRegion}
                                        onValidate={this.onValidate}
                      />
                    </div>
                  </div>
                </div>
                <div className="button request-body__submit" onClick={this.sendRequest} tabIndex="11"> {this.props.messages.buttonSendRequest} </div>
              </div>
            </div>
            <div className="request-page__info">
              <div className="page-info">
                <div className="page-info__header">{this.props.messages.partnersTitle} </div>
                <div className="page-info__destination">{this.props.messages.partnersDestination} </div>
                <div className="page-info__text">
                  {this.props.messages.partnersInfo.map(function (msg, key) {
                    return <p key={key}> {msg} </p>
                  })}
                </div>
                <div className="page-info__link" onClick={this.redirectToOneClick} tabIndex="12">
                  {this.props.messages.partnersLink}
                </div>
              </div>
            </div>
          </div>
          <Notification show={this.state.showError} message={this.state.errorMessage} onClose={this.onCloseNotification}/>
          <Spinner show={this.state.showSpinner} delay={200}/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default RequestForm;
