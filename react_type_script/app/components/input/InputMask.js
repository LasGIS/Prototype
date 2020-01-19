/*
 * Copyright 2020 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
 */
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons';
import _ from 'underscore';
import { removeSpacesFromString } from '../../common/utils/StringUtil.js';
import './style.scss';
import { foreignPhoneMaskFunction, internalPhoneMaskFunction } from './util';

export default class InputMask extends Component {
  constructor(props) {
    super(props);
    const { maskType, digitNum } = props;
    const mask = this.defineMask(maskType, digitNum);
    this.state = {
      mask: mask && (mask.isArrayMask ? mask.arr : createNumberMask(mask)),
      type: props.type,
    };
    this.timeout = null;
  }

  onKeyPress(event) {
    event.charCode === 13 && this.props.onEnter && this.props.onEnter(this.originValue(event));
  }

  defineMask(maskType, digitNum) {
    switch (maskType) {
      case InputMask.MASK_TYPES.date:
        return {
          isArrayMask: true,
          arr: [/[0-3]/, /\d/, '.', /[0-1]/, /\d/, '.', /\d/, /\d/, /\d/, /\d/],
        };
      case InputMask.MASK_TYPES.phone:
        return {
          isArrayMask: true,
          arr: [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
          transform: value => value.replace(new RegExp(`/\+|/\(|/\)| |_`, 'g'), ''),
        };
      case InputMask.MASK_TYPES.internalPhone:
        return {
          isArrayMask: true,
          arr: internalPhoneMaskFunction,
          transform: value => value.replace(new RegExp(`//\(|/\)| |_`, 'g'), ''),
        };
      case InputMask.MASK_TYPES.foreignPhone:
        return {
          isArrayMask: true,
          arr: foreignPhoneMaskFunction,
          transform: value => value.replace(new RegExp(`//\(|/\)| |_`, 'g'), ''),
        };
      case InputMask.MASK_TYPES.cellCurrency:
        return {
          isArrayMask: true,
          arr: digitNum ? Array(digitNum).fill(/\d| /) : [/\d| /, /\d| /, /\d| /, /\d| /, /\d| /],
          transform: value => value.replace(new RegExp(`[ _]`, 'g'), ''),
        };
      case InputMask.MASK_TYPES.lengthCm:
        return {
          prefix: '',
          allowDecimal: false,
          integerLimit: 5,
          includeThousandsSeparator: false,
          suffix: ' см',
          transform: value => {
            const result = value.replace(new RegExp(` см`, 'g'), '');
            return _.isEmpty(result) ? null : parseInt(result);
          },
        };
      case InputMask.MASK_TYPES.weightKg:
        return {
          prefix: '',
          allowDecimal: true,
          decimalSymbol: '.',
          integerLimit: 4,
          includeThousandsSeparator: false,
          decimalLimit: 3,
          suffix: ' кг',
          transform: value => value.replace(new RegExp(` кг`, 'g'), '').replace(/^\.$/, '0.'),
        };
      case InputMask.MASK_TYPES.barcode:
        const letOrNum = /\d|[a-zA-Z]|[а-яА-Я]/;
        return {
          isArrayMask: true,
          arr: digitNum ? Array(digitNum).fill(letOrNum) : Array(14).fill(letOrNum),
          transform: value => removeSpacesFromString(value.replace(new RegExp(`_`, 'g'), '')),
        };
      case InputMask.MASK_TYPES.index:
        return {
          isArrayMask: true,
          arr: [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/],
          transform: value => value.replace(new RegExp(`[ _]`, 'g'), ''),
        };
      case InputMask.MASK_TYPES.number:
        return {
          prefix: '',
          allowDecimal: false,
          includeThousandsSeparator: false,
          integerLimit: digitNum ? digitNum : 3,
          suffix: '',
        };
      case InputMask.MASK_TYPES.currency:
        return {
          prefix: '',
          allowDecimal: true,
          decimalSymbol: ',',
          thousandsSeparatorSymbol: ' ',
          decimalLimit: 2,
          suffix: ' руб',
        };
      default:
        return {};
    }
  }

  onChange(event) {
    const props = this.props;
    const transformedText = this.originValue(event);
    if (props.maskType === 'barcode') {
      event.target.value = transformedText;
      // todo рассмотреть альтернативы 'react-text-mask' или сделать собственную реализацию
      // пришлось изменить event.target.value в нативном событии, для маски - 'barcode', так как
      // 'react-text-mask' при получении пропса "value", с удалёнными пробелами,
      // всё равно не перерендеривает инпут, оставляя в его значении пробелы.
      // Это ничего не сломает, но, возможно стоит в дальнейшем отказаться от 'react-text-mask',
      // если с ним возникнут какие-либо другие проблемы.
      // Сейчас изменение event.target.value нужно только для маски - 'barcode' !
      // Для других масок нужно применять с осторожностью,
      // так как возможны баги обновления значения инпута при других масках ввода,
      // которые допускают пробелы или префиксы/суффиксы ввода
    }
    props.onChange && props.onChange(transformedText);
    props.onChangeDelay && this.onChangeDelay(transformedText);
  }

  originValue(event) {
    const { maskType, digitNum } = this.props;
    const mask = this.defineMask(maskType, digitNum);
    return mask && mask.transform ? mask.transform(event.target.value) : event.target.value;
  }

  onChangeDelay(value) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.props.onChangeDelay(value), 500);
  }

  render() {
    const {
      id,
      value,
      showMask,
      blue,
      placeholder,
      placeholderChar,
      disabled,
      autoFocus,
      rightDirection,
      className,
      bottomBorder,
      noBorder,
      prefix,
      suffix,
      cellInput,
      readOnly,
      validation,
      isValid,
      required,
      tooltip,
      style,
      onBlur,
      onFocus,
    } = this.props;
    const { mask, type } = this.state;
    const classNames = cn('input2', {
      'input2--blue': blue,
      'input2--bottom-border': bottomBorder,
      'input2--no-border': noBorder,
      'input2--prefix': !!prefix,
      'cell-input__text': cellInput,
      'cell-input--filled-cell': rightDirection,
    });
    const errorClasses = {
      'input2--empty': validation && !value && !required,
      'input2--valid': validation && isValid,
      'input2--invalid': validation && !isValid,
    };

    const tabIndex = readOnly ? -1 : this.props.tabIndex;

    return (
      <div className={cn(className, errorClasses)}>
        {prefix && <div className="input2__prefix">{prefix}</div>}
        <MaskedInput
          id={id}
          type={type}
          className={classNames}
          data-tip={tooltip}
          style={style}
          value={value}
          showMask={showMask}
          mask={mask}
          placeholder={placeholder}
          disabled={disabled}
          onChange={event => this.onChange(event)}
          placeholderChar={placeholderChar}
          autoFocus={autoFocus}
          readOnly={readOnly}
          onKeyPress={this.onKeyPress.bind(this)}
          onBlur={onBlur}
          autoComplete="off"
          tabIndex={tabIndex}
          onFocus={onFocus}
          ref={component => (this.inputMask = component)}
        />
        {suffix && <div className="input2__suffix">{suffix}</div>}
      </div>
    );
  }
}

InputMask.MASK_TYPES = {
  date: 'date',
  phone: 'phone',
  internalPhone: 'internalPhone',
  foreignPhone: 'foreignPhone',
  cellCurrency: 'cell-currency',
  lengthCm: 'length-cm',
  weightKg: 'weight-kg',
  barcode: 'barcode',
  index: 'index',
  number: 'number',
  currency: 'currency',
};

InputMask.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderChar: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeDelay: PropTypes.func,
  onEnter: PropTypes.func,
  autoFocus: PropTypes.bool,
  blue: PropTypes.bool,
  maskType: PropTypes.oneOf([...Object.values(InputMask.MASK_TYPES)]).isRequired,
  showMask: PropTypes.bool,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  cellInput: PropTypes.bool,
  readOnly: PropTypes.bool,
  digitNum: PropTypes.number,
  rightDirection: PropTypes.bool,
  isValid: PropTypes.any,
  required: PropTypes.bool,
  validation: PropTypes.bool,
  tooltip: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  onBlur: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

InputMask.defaultProps = {
  id: '',
};
