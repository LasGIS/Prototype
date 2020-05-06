/*
 * Copyright (c) 2020. Prototype
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';

import createReactClass from 'create-react-class';

class InputLine extends Component {
  state = {
    isValid: true
  };

  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      this.validate(props);
    }
  }

  onKeyDown = (ev) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }
    if(ev.key === 'Enter' && this.props.onEnterPress) {
      this.props.onEnterPress();
    } else if (ev.key === 'Escape' && this.props.onEscPress) {
      this.props.onEscPress();
    } else if (ev.key === 'Tab' && this.props.onTabPress) {
      this.props.onTabPress();
    }
  };

  setInvalidState = () => {
    this.setState({isValid: false});
  };

  validate = (props) => {
    if (_.isUndefined(props)) {
      props = this.props;
    }
    var ok = (props.onValidate ? props.onValidate(props.value) : true);
    this.setState({ isValid: ok});
    return ok;
  };

  onBlur = (ev) => {
    if (!this.props.disabled) {
      this.validate();
      this.props.onBlur && this.props.onBlur(ev);
    }
  };

  isValid = () => {
    return this.validate();
  };

  reset = (value) => {
    this.setState({ isValid: true});
  };

  render() {
    var baseClassName = this.props.baseClassName || this.props.className;
    return (
      <input
        {..._.omit(this.props, 'onEnterPress', 'onValidate', 'baseClassName', 'onEscPress')}
        className={this.props.className + (this.state.isValid ? '' : ' ' + baseClassName + '--error')}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur} />
    );
  }
}

export var InputLineMasked = createReactClass({

  getInitialState: function() {
    return this.getState(this.props);
  },

  componentWillReceiveProps: function(props) {
    this.setState(this.getState(props));
  },

  getState: function(props) {
    var val = this.fillByMask(props.mask, props.value);
    return {
      value: this.removeMask(val),
      mask: props.mask,
      maskedValue: val
    };
  },

  maskChar: '_',
  maskRegex: /_/g,

  getCaretPos: function() {
      var input = ReactDOM.findDOMNode(this);
      var pos = 0;

      if ('selectionStart' in input) {
          pos = input.selectionStart;
      }
      else {
          var range = document.selection.createRange();
          range.moveStart('character', -input.value.length);
          pos = range.text.length;
      }

      return pos;
  },

  getSelectionEnd: function () {
      var input = ReactDOM.findDOMNode(this);
      var pos = 0;

      if ('selectionEnd' in input) {
          return input.selectionEnd;
      }

      return this.getCaretPos();
  },

  setCaretPos: function(pos) {
    var input;
    var setPos = function() {
      if ('selectionStart' in input && 'selectionEnd' in input) {
         input.selectionStart = input.selectionEnd = pos;
      }
      else if ('setSelectionRange' in input) {
         input.setSelectionRange(pos, pos);
      }
      else {
        var inputRange = input.createTextRange();
        inputRange.collapse(true);
        inputRange.moveStart('character', pos);
        inputRange.moveEnd('character', 0);
        inputRange.select();
      }
    };

    if (this.isMounted()) {
      input = ReactDOM.findDOMNode(this);
      setPos();
      setTimeout(setPos, 0);
    }
  },

  fillByMask: function(mask, value) {
    return value ? this.fillRangeByMask(mask, value, 0, mask.length) : '';
  },

  fillRangeByMask: function(mask, value, beg, end) {
    var ind, chMask, chNew, chRes, result = '';

    for(ind = beg; ind < end; ++ind) {
      chMask = mask[ind];
      chNew = value[ind];
      if (this.isPermanentChar(mask, ind)) {
        chRes = chMask;
      } else if (this.isAllowedChar(mask, chNew, ind)) {
        chRes = chNew;
      } else {
        chRes = this.maskChar;
      }
      result += chRes;
    }

    return result;
  },

  isPermanentChar: function(mask, pos) {
    var ch = mask[pos];
    return ch != '9';
  },

  getRightEditablePos: function(mask, pos) {
      for (var i = pos; i < mask.length; ++i) {
          if (!this.isPermanentChar(mask, i)) {
              return i;
          }
      }
      return null;
  },
  getLeftEditablePos: function(mask, pos) {
      for (var i = pos; i >= 0; --i) {
          if (!this.isPermanentChar(mask, i)) {
              return i;
          }
      }
      return null;
  },

  isAllowedChar: function(mask, char, pos) {
    if (typeof char === 'undefined') {
      return false;
    }
    if (this.isPermanentChar(mask, pos)) {
        return mask[pos] === char;
    }
    var ruleChar = mask[pos];
    if (ruleChar == '9') {
      return !isNaN(parseInt(char))
    }
      // var charRule = this.charsRules[ruleChar];
      // return (new RegExp(charRule)).test(char);
  },

  replaceSubstr: function(value, newSubstr, pos) {
    return value.slice(0, pos) + newSubstr + value.slice(pos + newSubstr.length);
  },

  getFirstPermanentPos: function(mask, pos) {
    for (var i = pos; i < mask.length; ++i) {
      if (this.isPermanentChar(mask, i)) {
        return i;
      }
    }
    return mask.length;
  },

  deleteChar: function(value, pos) {
    var endPos = this.getFirstPermanentPos(this.props.mask, pos);
    // var char = (this.isPermanentChar(this.props.mask, value[value.length-1]) ? this.maskChar : ' ');
    // var str = value.slice(0, pos) + value.slice(pos + 1) + char;
    var char = this.maskChar;
    var str = value.substr(0, pos) + value.substr(pos + 1, endPos - pos - 1) + char + value.substr(endPos);
    return str;
  },

  insertSubstr: function(value, newSubstr, pos) {
    return value.substr(0, pos) + newSubstr + value.substr(pos);
  },

  deleteSelection: function(caretPos, endSelection, maskedValue) {
    var str = this.fillRangeByMask(this.props.mask, maskedValue.replace(/./g, ' '), caretPos, endSelection);
    var result = this.replaceSubstr(maskedValue, str, caretPos);
    // console.log('deleteSelection', caretPos, endSelection, maskedValue, str, result);
    return result;
  },

  onKeyPress: function(event) {
    var key = event.key;
    if (event.ctrlKey || event.metaKey) {
        return;
    }

    var caretPos = this.getCaretPos();
    var value = this.state.value;
    var maskedValue = this.state.maskedValue;
    var mask = this.props.mask;
    var endSelection = this.getSelectionEnd();

    this.processKey(event, key, caretPos, endSelection, value, maskedValue, mask, false);
  },

  onKeyDown: function(event) {
    if (event.ctrlKey || event.metaKey) {
        return;
    }

    var caretPos = this.getCaretPos();
    var value = this.state.value;
    var maskedValue = this.state.maskedValue;
    var key = event.key;
    var mask = this.props.mask;
    var endSelection = this.getSelectionEnd();

    this.processKey(event, key, caretPos, endSelection, value, maskedValue,  mask, true);
  },

  removeMask: function(value) {
    return value.replace(this.maskRegex, ' ').trim();
  },

  unMask: function(value) {
    return value.replace(this.maskRegex, ' ');
  },

  processKey: function(event, key, caretPos, endSelection, value, maskedValue, mask, special) {
      var nextCaretPosition = true;

      if (special) {
        nextCaretPosition = false;
        if ((key == 'Delete' || key == 'Backspace') && endSelection != caretPos) {
            maskedValue = this.deleteSelection(caretPos, endSelection, maskedValue);
        }
        else if (key == 'Delete') {
          var editablePos = this.getRightEditablePos(mask, caretPos);
          if (editablePos !== null) {
              maskedValue = this.deleteChar(maskedValue, editablePos);
              caretPos = editablePos;
          }
        }
        else if (key == 'Backspace') {
          var editablePos = this.getLeftEditablePos(mask, caretPos - 1);
          if (editablePos !== null) {
              maskedValue = this.replaceSubstr(maskedValue, this.maskChar, editablePos);
              caretPos = editablePos;
          }
        } else {
          return;
        }
      } else if (this.isPermanentChar(mask, caretPos) && mask[caretPos] === key) {
          ++caretPos;
      } else if (key === 'Enter') {
      } else {
          if (endSelection != caretPos) {
            maskedValue = this.deleteSelection(caretPos, endSelection, maskedValue);
          }

          var editablePos = this.getRightEditablePos(mask, caretPos);
          if (editablePos !== null && this.isAllowedChar(mask, key, editablePos)) {
              // maskedValue = this.insertSubstr(maskedValue, key, editablePos);
              maskedValue = this.replaceSubstr(maskedValue, key, editablePos);
              caretPos = editablePos + 1;
          }
      }

      value = this.removeMask(maskedValue);
      if (value !== this.state.value || key === 'Enter') {
          var evt = {
            target : {
              value : value
            }
          };
          this.setState({ value: value, maskedValue:maskedValue }, function() {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(evt);
            }
          }, this);
      }
      if (nextCaretPosition) {
        var nextPos = this.getRightEditablePos(mask, caretPos);
        if (nextPos !== null) {
          caretPos = nextPos;
        }
      }
      event.preventDefault();
      this.setCaretPos(caretPos);
  },

  onValidate: function(value) {
    if (this.props.onValidate) {
      // console.log('InputLineMasked.validate', value);
      return this.props.onValidate(_.isString(value) ? this.removeMask(value).trim() : value)
    }
    return true;
  },

  isValid: function() {
    return this.refs.input.isValid();
  },

  reset: function() {
    this.refs.input.reset();
  },

  render: function () {
    return (
      <InputLine ref="input"
        {...this.props}
        value={this.state.value}
        onValidate={this.onValidate}
        className={this.props.className + ' input--mono'}
        baseClassName={this.props.baseClassName || this.props.className}
        onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown}/>
    );
  },
});

export class InputLineTextarea extends Component {
  state = {
    isValid: true
  };

  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      this.validate(props);
    }
  }

  isValid = () => {
    return this.validate();
  };

  reset = (value) => {
    this.setState({ isValid: true});
  };

  validate = (props) => {
    if (_.isUndefined(props)) {
      props = this.props;
    }
    var ok = (props.onValidate ? props.onValidate(props.value) : true);
    this.setState({ isValid: ok});
    return ok;
  };

  onBlur = () => {
    if (!this.props.disabled) {
      this.validate();
    }
  };

  render() {
    var className = this.props.className;
    var baseClassName = this.props.baseClassName || this.props.className;
    return (
      <textarea {..._.omit(this.props, 'onValidate')}
        className={className + (this.state.isValid ? '' : ' ' + baseClassName + '--error')}
        onBlur={this.onBlur}
        />
    );
  }
}

export default InputLine;
