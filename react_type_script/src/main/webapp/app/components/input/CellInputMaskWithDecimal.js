/*
 * Copyright (c) 2020. Prototype
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { decimalPart } from '../../common/utils/NumberUtil';
import CellInputMask from './CellInputMask';
import Inline from './Inline';
import InputMask from './InputMask';

export default class CellInputMaskWithDecimal extends Component {
  constructor(props) {
    super(props);

    const currentDecimalValue = CellInputMaskWithDecimal.getCurrentDecimalValue(this.props);
    const currentJustifyDecimal = CellInputMaskWithDecimal.getJustifyValue(
      'decimal',
      currentDecimalValue * Math.pow(10, this.props.sizeDecimal).toFixed(0),
      this.props,
    );

    this.state = {
      actualFloor: (CellInputMaskWithDecimal.isValueExists(this.props.value) && Math.floor(this.props.value)) || '',
      actualDecimal: (CellInputMaskWithDecimal.isValueExists(this.props.value) && currentDecimalValue) || '',
      justifyValueFloor:
        (CellInputMaskWithDecimal.isValueExists(this.props.value) &&
          CellInputMaskWithDecimal.getJustifyValue('floor', Math.floor(this.props.value || 0), this.props)) ||
        '',
      justifyValueDecimal: (CellInputMaskWithDecimal.isValueExists(this.props.value) && currentJustifyDecimal) || '',
    };

    this.onFocusFloor = this.onFocusFloor.bind(this);
    this.onBlurFloor = this.onBlurFloor.bind(this);
    this.onFocusDecimal = this.onFocusDecimal.bind(this);
    this.onBlurDecimal = this.onBlurDecimal.bind(this);
    this.focusDecimal = this.focusDecimal.bind(this);
  }

  static getCurrentDecimalValue(props) {
    const incomingDecimalValue = (decimalPart(props.value) * Math.pow(10, props.sizeDecimal)).toFixed(0);
    if (incomingDecimalValue > 0 && incomingDecimalValue < Math.pow(10, props.sizeDecimal - 1)) {
      return '0'.repeat(props.sizeDecimal - incomingDecimalValue.length).concat(incomingDecimalValue);
    }
    return (decimalPart(props.value) * Math.pow(10, props.sizeDecimal)).toFixed(0);
  }

  static isValueExists(value) {
    return value !== undefined && value !== null && !isNaN(value);
  }

  static getJustifyValue(type, value, props) {
    if (type === 'floor') {
      if (props.sizeFloor && value !== 'undefined' && props.sizeFloor - value.toString().trim().length > 0)
        return ' '.repeat(props.sizeFloor - value.toString().trim().length);
      return '';
    } else {
      if (props.sizeDecimal && value !== 'undefined' && props.sizeDecimal - value.toString().trim().length > 0)
        return '0'.repeat(props.sizeDecimal - value.toString().trim().length);
      return '';
    }
  }

  getActualValue(type) {
    return type === 'floor' ? this.state.actualFloor : this.state.actualDecimal;
  }

  onBlurFloor() {
    if (this.state.actualFloor === '') {
      this.setState(() => {
        return {
          actualFloor: '',
          justifyValueFloor: '',
        };
      });
    } else if (
      parseInt(this.state.actualFloor) === 0 ||
      this.state.actualFloor === undefined ||
      this.state.actualFloor === ''
    ) {
      this.setState((state, props) => {
        return {
          actualFloor: 0,
          justifyValueFloor: CellInputMaskWithDecimal.getJustifyValue('floor', 0, props),
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          actualFloor: state.actualFloor.toString().replace(/^0+/, ''),
          justifyValueFloor: CellInputMaskWithDecimal.getJustifyValue(
            'floor',
            state.actualFloor.toString().replace(/^0+/, ''),
            props,
          ),
        };
      });
    }
  }

  onFocusFloor() {
    this.setState({ justifyValueFloor: '' });
  }

  onBlurDecimal() {
    if (this.state.actualDecimal === '') {
      this.setState(() => {
        return {
          actualDecimal: '',
          justifyValueDecimal: '',
        };
      });
    } else if (this.state.actualDecimal === 'undefined' || this.state.actualDecimal === 0) {
      this.setState((state, props) => {
        return {
          actualDecimal: '0'.repeat(props.sizeDecimal),
          justifyValueDecimal: CellInputMaskWithDecimal.getJustifyValue('decimal', 0, props),
        };
      });
    } else {
      this.setState((state, props) => {
        return {
          justifyValueDecimal: CellInputMaskWithDecimal.getJustifyValue('decimal', state.actualDecimal, props),
        };
      });
    }
  }

  onFocusDecimal() {
    this.setState({ justifyValueDecimal: '' });
  }

  focusDecimal() {
    /** "setTimeout" is workaround for firefox */
    setTimeout(() => {
      this.cellInputMask.cellInputMask.inputMask.inputElement.focus();
    });
  }

  render() {
    const {
      id,
      name,
      isEdit,
      delimiterFloor,
      delimiterDecimal,
      sizeFloor,
      sizeDecimal,
      onChangeFloor,
      onChangeDecimal,
      className,
      classNameFloor,
      classNameDecimal,
      isValid,
      required,
      tooltip,
      readOnly,
    } = this.props;
    const idFloor = id.concat('Floor');
    const idDecimal = id.concat('Decimal');
    const classNameFloorLabel = classNameFloor.concat('-label');
    const classNameDecimalLabel = classNameDecimal.concat('-label');
    const justifyRight = this.state.justifyValueFloor !== '';

    return (
      <Inline beforeLabel={name} className={className}>
        <CellInputMask
          id={idFloor}
          className={classNameFloor}
          maskType={InputMask.MASK_TYPES.cellCurrency}
          size={sizeFloor}
          validation={isEdit}
          isValid={isValid}
          required={required}
          tooltip={tooltip}
          value={this.state.justifyValueFloor.concat(this.getActualValue('floor'))}
          onChange={actualFloor => {
            this.setState({ actualFloor: actualFloor.replace(/\s/g, '') });
            onChangeFloor(actualFloor.replace(/\s/g, ''));
            if (actualFloor.trim().length === sizeFloor) {
              this.focusDecimal();
            }
          }}
          onBlur={!readOnly ? this.onBlurFloor : undefined}
          onFocus={!readOnly ? this.onFocusFloor : undefined}
          rightDirection={justifyRight}
          readOnly={readOnly}
        />
        <label className={classNameFloorLabel}>{delimiterFloor}</label>
        <CellInputMask
          id={idDecimal}
          className={classNameDecimal}
          maskType={InputMask.MASK_TYPES.cellCurrency}
          size={sizeDecimal}
          validation={isEdit}
          isValid={isValid}
          required={required}
          value={this.getActualValue('decimal')
            .toString()
            .trim()
            .concat(this.state.justifyValueDecimal)}
          onChange={actualDecimal => {
            this.setState({ actualDecimal: actualDecimal.replace(/\s/g, '') });
            onChangeDecimal(actualDecimal.replace(/\s/g, ''));
          }}
          onFocus={!readOnly ? this.onFocusDecimal : undefined}
          onBlur={!readOnly ? this.onBlurDecimal : undefined}
          readOnly={readOnly}
          ref={component => (this.cellInputMask = component)}
        />
        <label className={classNameDecimalLabel}>{delimiterDecimal}</label>
      </Inline>
    );
  }
}

CellInputMaskWithDecimal.propTypes = {
  onChangeFloor: PropTypes.func,
  onChangeDecimal: PropTypes.func,
  isValid: PropTypes.any,
  classNameFloor: PropTypes.string,
  classNameDecimal: PropTypes.string,
  actualFloor: PropTypes.string,
  actualDecimal: PropTypes.string,
  justifyValueFloor: PropTypes.string,
  justifyValueDecimal: PropTypes.string,
  delimiterFloor: PropTypes.string.isRequired,
  delimiterDecimal: PropTypes.string.isRequired,
  sizeFloor: PropTypes.number.isRequired,
  sizeDecimal: PropTypes.number.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  required: PropTypes.bool,
  isEdit: PropTypes.bool,
  readOnly: PropTypes.bool,
};

CellInputMaskWithDecimal.defaultProps = {
  id: '',
  value: '',
};
