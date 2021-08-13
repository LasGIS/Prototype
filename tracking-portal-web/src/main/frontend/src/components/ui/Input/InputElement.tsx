/*
 * Copyright (c) 2021. Prototype
 */

import React, {
  ChangeEventHandler,
  ClipboardEventHandler,
  Component,
  FocusEventHandler,
  KeyboardEventHandler,
} from 'react';
import {
  formatValue,
  getFilledLength,
  getLeftEditablePos,
  getPrefix,
  getRightEditablePos,
  isAllowedChar,
  isEmpty,
  isPermanentChar,
  MaskType,
  parseMask,
  replaceSubstr,
} from './utils';
import { defaultMaskChar, InputElementState, InputType, Unselectable } from './types';

type Props = {
  value: string;
  mask?: string;
  maskChar?: string;
  type?: InputType;
  tabIndex?: number;
  readOnly?: boolean;
  unselectable?: Unselectable;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;

  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
};

type State = InputElementState;

/**
 * <pre>
 * InputElement содержит один обязательный параметр: props.value
 * если props.mask пустой, то все работает как простой <input..
 * при наличии props.mask - редактируем по маске.
 * В маске могут присутствовать любые символы + особые символы:
 *   "9": - цифры;
 *   "a": - латинские буквы (большие и маленькие);
 *   "*": - латинские буквы (большие и маленькие) + цифры;
 * например, "+7 (999) 999-99-99" маска для ввода телефона (при этом "+7 (" - не редактируется).
 *           "99.99.9999"         маска для ввода даты.
 * </pre>
 */
class InputElement extends Component<Props, State> {

  private readonly inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    const parsedMask: MaskType = parseMask(props.mask);
    this.state = {
      mask: parsedMask.mask,
      permanents: parsedMask.permanents,
      value: props.value,
      maskChar: props.maskChar || defaultMaskChar
    };

    this.inputRef = (props.inputRef) ? props.inputRef : React.createRef();

    this.clearRange = this.clearRange.bind(this);
    this.setCaretToEnd = this.setCaretToEnd.bind(this);
    this.getSelection = this.getSelection.bind(this);
    this.getCaretPos = this.getCaretPos.bind(this);
    this.setCaretPos = this.setCaretPos.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const parsedMask = parseMask(props.mask);
    return {
      mask: parsedMask.mask,
      permanents: parsedMask.permanents,
      value: formatValue(props.value, state),
      maskChar: typeof props.maskChar === "string" ? props.maskChar : defaultMaskChar
    };
  }

  clearRange(value: string, start: number, len: number): string {
    const maskChar = this.state.maskChar;
    const mask = this.state.mask;
    const end = start + len;
    if (mask) {
      return value.split("")
        .map((char, i) => {
          if (i < start || i >= end) {
            return char;
          }
          if (isPermanentChar(i, this.state)) {
            return mask[i];
          }
          return maskChar;
        })
        .join("");
    }
    return value;
  }

  setCaretToEnd() {
    const { value, maskChar } = this.state;
    const prefixLen = getPrefix(this.state).length;
    for (let i = value.length - 1; i >= 0; --i) {
      if ((!isPermanentChar(i, this.state) && value[i] !== maskChar) || i < prefixLen) {
        this.setCaretPos(i + 1);
        return;
      }
    }
    if (value.length && value[0] === maskChar) {
      this.setCaretPos(0);
    }
  }

  getSelection() {
    const input: HTMLInputElement | null = this.inputRef.current;
    let start = 0;
    let end = 0;

    if (input) {
      if ("selectionStart" in input && "selectionEnd" in input) {
        start = input.selectionStart || 0;
        end = input.selectionEnd || 0;
      } else {
        // @ts-ignore
        const range = document.selection.createRange();
        // @ts-ignore
        const len = input.value.length;

        // @ts-ignore
        const inputRange = input.createTextRange();
        inputRange.moveToBookmark(range.getBookmark());

        start = -inputRange.moveStart("character", -len);
        end = -inputRange.moveEnd("character", -len);
      }
    }
    return {
      start: start,
      end: end,
      length: end - start
    };
  }

  getCaretPos() {
    const input = this.inputRef.current;
    let pos = 0;

    if (input && "selectionStart" in input) {
      pos = input.selectionStart || 0;
      /*
          } else {
            const range = document.selection.createRange();
            range.moveStart("character", -input.value.length);
            pos = range.text.length;
      */
    }

    return pos;
  }

  getValue(): string {
    return this.state.value;
  }

  setCaretPos(pos: number) {
    const input = this.inputRef.current;
    if (input && "selectionStart" in input && "selectionEnd" in input) {
      input.selectionStart = input.selectionEnd = pos;
      /*
          } else if (input && "setSelectionRange" in input) {
            input.setSelectionRange(pos, pos);
          } else {
            const inputRange = input.createTextRange();
            inputRange.collapse(true);
            inputRange.moveStart("character", pos);
            inputRange.moveEnd("character", 0);
            inputRange.select();
      */
    }
  }

  onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    const { mask, value } = this.state;
    if (mask) {
      let nValue = value;
      let caretPos = this.getCaretPos();
      const key = event.key;
      let preventDefault = false;
      const maskChar = this.state.maskChar;
      switch (key) {
        case "Backspace":
        case "Delete":
          const prefixLen = getPrefix(this.state).length;
          const deleteFromRight = key === "Delete";
          const selectionRange = this.getSelection();
          if (selectionRange.length) {
            nValue = this.clearRange(nValue, selectionRange.start, selectionRange.length);
          } else if (caretPos < prefixLen || (!deleteFromRight && caretPos === prefixLen)) {
            caretPos = prefixLen;
          } else {
            const editablePos = deleteFromRight ? getRightEditablePos(caretPos, this.state) : getLeftEditablePos(caretPos - 1, this.state);
            if (editablePos !== null) {
              nValue = replaceSubstr(nValue, maskChar, editablePos);
              caretPos = editablePos;
            }
          }
          preventDefault = true;
          break;
        default:
          break;
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }

      if (nValue !== value) {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        target.value = nValue;
        this.setState({ value: nValue });
        preventDefault = true;
        if (this.props.onChange) {
          // @ts-ignore наверно надо удалить этот код
          this.props.onChange(event);
        }
      }
      if (preventDefault) {
        event.preventDefault();
        this.setCaretPos(caretPos);
      }
    }
  }

  onKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const key = event.key;
    if (key === "Enter" || event.ctrlKey || event.metaKey) {
      return;
    }

    const { value, mask } = this.state;
    if (mask) {
      let nValue = value;
      let caretPos = this.getCaretPos();
      let preventDefault = false;
      const prefixLen = getPrefix(this.state).length;

      if (isPermanentChar(caretPos, this.state) && mask[caretPos] === key) {
        ++caretPos;
      } else {
        const editablePos = getRightEditablePos(caretPos, this.state);
        if (editablePos !== null && isAllowedChar(key, editablePos, this.state)) {
          nValue = replaceSubstr(nValue, key, editablePos);
          caretPos = editablePos + 1;
        }
      }

      if (nValue !== value) {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        target.value = nValue;
        this.setState({ value: nValue });
        if (this.props.onChange) {
          // @ts-ignore
          this.props.onChange(event);
        }
        preventDefault = true;
      }
      if (preventDefault) {
        event.preventDefault();
      }
      while (caretPos > prefixLen && isPermanentChar(caretPos, this.state)) {
        ++caretPos;
      }
      this.setCaretPos(caretPos);
    }
  }

  onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { mask } = this.state;
    const target = event.target;
    let value = target.value;

    if (mask) {
      const maskLen = mask.length;
      if (value.length > maskLen) {
        value = value.substr(0, maskLen);
        target.value = formatValue(value, this.state);
      }
    }
    this.setState({ value: target.value });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    const { mask, value } = this.state;
    if (mask) {
      if (!value) {
        const prefix = getPrefix(this.state);
        const nValue = formatValue(prefix, this.state);
        event.target.value = formatValue(nValue, this.state);
        this.setState({ value: nValue }, this.setCaretToEnd);

        if (this.props.onChange) {
          this.props.onChange(event);
        }
      } else if (getFilledLength(value, this.state) < mask.length) {
        this.setCaretToEnd();
      }
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const { mask, value } = this.state;
    if (mask) {
      if (isEmpty(value, this.state)) {
        event.target.value = "";
        this.setState({ value: "" });
        if (this.props.onChange) {
          this.props.onChange(event);
        }
      }
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  onPaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
    const { mask, value } = this.state;
    if (mask) {
      let text;
      if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData("text/plain");
      } else // @ts-ignore
      if (Boolean(window.clipboardData && window.clipboardData.getData)) { // IE
        // @ts-ignore
        text = window.clipboardData.getData("Text");
      }

      if (text) {
        let textAr = text.split("");
        const caretPos = this.getCaretPos();
        let nValue = value;
        let i = caretPos;
        for (; i < nValue.length && textAr.length;) {
          const char = textAr.shift();
          if (isPermanentChar(i, this.state)) {
            if (mask[i] !== text[i]) {
              nValue = replaceSubstr(nValue, mask[i], i);
            }
          } else {
            if (isAllowedChar(char, i, this.state)) {
              nValue = replaceSubstr(nValue, char, i);
            }
          }
          ++i;
        }
        if (nValue !== value) {
          const target: HTMLInputElement = event.target as HTMLInputElement;
          target.value = nValue;
          this.setState({ value: nValue });
          if (this.props.onChange) {
            // @ts-ignore
            this.props.onChange(event);
          }
        }
        this.setCaretPos(i);
      }
      event.preventDefault();
    }
  }

  render() {
    const { type, tabIndex, readOnly, unselectable, placeholder } = this.props;
    return <input
      ref={this.inputRef}
      defaultValue={this.state.value}
      type={type}
      tabIndex={tabIndex}
      readOnly={readOnly}
      unselectable={unselectable}
      placeholder={placeholder}

      onFocus={this.onFocus}
      onBlur={this.onBlur}
      onChange={this.onChange}
      onKeyDown={this.onKeyDown}
      onKeyPress={this.onKeyPress}
      onPaste={this.onPaste}
    />;
  }
}

export default InputElement;
