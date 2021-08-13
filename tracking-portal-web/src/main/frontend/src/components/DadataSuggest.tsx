/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import DropdownElements from './ui/Dropdown/DropdownElements';
import Input from './ui/Input/Input';
import $ from 'jquery';

type Props = {
  tabIndex: number;
  ref: any;
  label: string;
  errorMessage?: string;
  value?: string;
  invalid?: boolean;
  className?: string;
  suggestTimeout: number;
  suggestCallback: (value: string) => void;
  onChange: (value: string) => void;
  onValidate: (value: string, props: any) => boolean;
  dadataRestUrl: string;
  acceptedChars?: string[];
  maxLength?: number;
  formatCallback: (value: any) => any;
  onFocus?: () => void;
  onBlur?: () => void;
};

type State = {
  value: string;
  suggests: any[];
  isValid: boolean;
};

class DadataSuggest extends Component<Props, State> {

  static defaultProps = {
    suggestTimeout: 100
  }

  constructor(props: Props) {
    super(props);
    if (props.onValidate) {
      this.parentOnValidate = props.onValidate;
    }
    this.state = {
      value: this.props.value ? decodeURIComponent(this.props.value) : "",
      suggests: [],
      isValid: true
    };
  }

  parentOnValidate = (value: string, props: any): boolean => {
    return true;
  }

  suggestTimeoutId?: NodeJS.Timeout;

  componentWillUnmount() {
    if (this.suggestTimeoutId) {
      clearTimeout(this.suggestTimeoutId);
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    let value = props.value;
    if (value !== state.value) {
      return {
        value: value
      };
    } else {
      return null;
    }
  }

  onChange(value: string) {
    if (value === this.state.value) {
      return;
    }
    const self = this;
    this.setState({
      value: value
    }, function () {
      self.validate();
    });
    this.props.onChange(value);

    this.getSuggestions(value);
    return value;
  }

  $suggestionDefer: JQuery.Deferred<any> = $.Deferred();

  getSuggestions(value: string) {
    const that = this;

    if (this.suggestTimeoutId) {
      clearTimeout(this.suggestTimeoutId);
    }

    /*
        this.suggestTimeoutId = setTimeout(() => {
          const queryObject = {
            "query": value,
            "count": 5,
            "restrict_value": true
          };
          that.suggest(queryObject, that.props.dadataRestUrl).then((data) => {
            if (that.$suggestionDefer.state() !== "rejected") {
              that.$suggestionDefer.resolve();
              if (typeof that.props.formatCallback === "function") {
                data = that.props.formatCallback(data);
              }
              that.setState({
                suggests: data
              });
            }
          });
        }, this.props.suggestTimeout);
    */
  }

  onSuggestSelect(data: any) {
    this.setState({
      suggests: []
    });

    // const text = this.getSuggestionText(data);
    // const object = this.getSuggestionObject(data);
    const result = data;
    this.setState({ value: result }, () => {
      this.props.onChange(result);
      this.props.suggestCallback(result);
    });
  }

  onSuggestHide() {
    this.setState({
      suggests: []
    });
  }

  onBlur() {
    if (this.$suggestionDefer && this.$suggestionDefer.state() !== "resolved") {
      this.$suggestionDefer.reject("cancelled");
    }
    this.setState({
      suggests: []
    });
    this.doValidation(this.props);
  }

  validate() {
    return this.doValidation(this.props);
  }

  doValidation(props: Props) {
    const ok = this.parentOnValidate(this.state.value, this.props);
    this.setState({ isValid: ok });
    return ok;
  }

  render() {
    return (
      <div className={this.state.isValid ? "" : "input-cell--with-error"}>
        <Input label={this.props.label}
               /*errorMessage={this.props.errorMessage}*/
               invalid={this.props.invalid}
               /*maxLength={this.props.maxLength}*/
               className={this.props.className}
               onChange={this.onChange}
               value={this.state.value}
               onFocus={this.props.onFocus}
               onBlur={this.onBlur}
               /*onValidate={this.props.onValidate}*/
               tabIndex={this.props.tabIndex}
               acceptedChars={this.props.acceptedChars}>
          {this.state.suggests && this.state.suggests.length &&
          <DropdownElements
            elements={this.state.suggests}
            onHide={this.onSuggestHide}
            onElementSelect={this.onSuggestSelect}
            matchValue={this.state.value}
          />
          }
        </Input>
        <div className="input-cell__error-message"> {this.props.errorMessage} </div>
      </div>
    );
  }
}

export default DadataSuggest;
