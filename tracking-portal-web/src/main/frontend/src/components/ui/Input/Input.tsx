/*
 * Copyright (c) 2021. Prototype
 */

import React, { ChangeEvent, ChangeEventHandler, ClipboardEventHandler, Component, KeyboardEventHandler } from 'react';
import cn from 'classnames';
import InputElement from './InputElement';
import { AcceptedCharsTest, AcceptedCharsType, InputType, Unselectable } from './types';

const getAcceptedChars = (acceptedChars?: string[], type?: AcceptedCharsType): AcceptedCharsTest | undefined => {
  if (type === "price") {
    acceptedChars = [ "digits", ",", "." ];
  }
  if (acceptedChars) {
    acceptedChars = acceptedChars.map((chr: string) => {
      if (chr === "digits") {
        chr = "0-9";
      }
      if (chr === "latin") {
        chr = "A-Za-z";
      }
      return chr;
    });

    //const escapedChars = acceptedChars.join().replace(\(\.|\^|\$|\*|\+|\?|\(|\)|\[|\{|\\|\|)\g, "\\$1");
    const reString: string = "[^" + acceptedChars.join("").replace(/(.)/g, "\$1") + "]";
    return {
      chars: acceptedChars,
      test: function (str: string) {
        const re = new RegExp(reString);
        return !re.test(str);
      },
      replace: function (str: string) {
        const re = new RegExp(reString, "g");
        return str.replace(re, "");
      }
    };
  }
}

type Props = {
  className?: string;
  acceptedChars?: string[];
  unit?: string;
  disabled: boolean;
  label: string;
  value: string;
  mask?: string;
  maskChar?: string;
  type?: AcceptedCharsType;
  tabIndex?: number;
  readOnly?: boolean;
  unselectable?: 'on' | 'off';
  placeholder?: string;

  loading?: boolean;
  labelRight?: boolean;
  labelLight?: boolean;
  invalid?: boolean;
  search?: boolean;
  valueLink?: boolean;

  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value?: string) => void;

  onEscPress?: () => void;
  onEnterPress?: () => void;
  onKeyDown?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
};

type State = {
  focus: boolean;
  showPassword: boolean;
  acceptedChars?: AcceptedCharsTest;
}

class Input extends Component<Props, State> {

  static defaultProps = {
    disabled: true,
  }

  private readonly inputRef: React.RefObject<HTMLInputElement>;
  private readonly unitRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false,
      showPassword: false,
      acceptedChars: getAcceptedChars(props.acceptedChars, props.type)
    };

    this.inputRef = React.createRef();
    this.unitRef = React.createRef();

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getInputCursorPosition = this.getInputCursorPosition.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.setCaretPos = this.setCaretPos.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onShowPasswordClick = this.onShowPasswordClick.bind(this);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    return { acceptedChars: getAcceptedChars(props.acceptedChars, props.type) };
  }

  componentDidMount() {
    const input = this.inputRef.current;
    const unit = this.unitRef.current;
    if (input && unit) {
      const newPadding = parseInt(input.style.paddingRight || "") + unit.getBoundingClientRect().width;
      input.style.paddingRight = newPadding + "px";
    }
    /*
        if (window.Placeholders) {
          // IE8 doesn't fire focus event without that
          $(input).on("focus", function () {
          });

          window.Placeholders.enable(input);
        }
    */
  }

  getInputCursorPosition() {
    const input = this.inputRef.current;
    let pos = 0;

    if (input) {
      // @ts-ignore
      if (document.selection) {
        input?.focus();
        // @ts-ignore
        const sel = document.selection.createRange();
        sel.moveStart("character", -input.value.length);
        pos = sel.text.length;
      } else if (typeof input.selectionStart === 'number') {
        pos = input.selectionStart;
      }
    }

    return pos;
  }

  onFocus() {
    this.setState({ focus: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    this.setState({ focus: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onClick() {
    this.inputRef.current?.focus();
    this.setState({ focus: true });
  }

  onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      if (this.props.onEnterPress) {
        this.props.onEnterPress();
      }
      this.onSearch();
    }
    if (event.key === "Escape") {
      if (this.props.onEscPress) {
        this.props.onEscPress();
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown();
    }
  }

  onKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (this.state.acceptedChars && !this.state.acceptedChars.test(event.key)) {
      event.preventDefault();
    }
  }

  setCaretPos(pos: number) {
    const input = this.inputRef.current;
    const setPos = () => {
      if (input) {
        if ("selectionStart" in input && "selectionEnd" in input) {
          input.selectionStart = input.selectionEnd = pos;
        }
        if ("setSelectionRange" in input) {
          input.setSelectionRange(pos, pos);
        } else if ("createTextRange" in input) {
          // @ts-ignore
          const range = input.createTextRange();
          range.collapse(true);
          range.moveStart("character", pos);
          range.moveEnd("character", 0);
          range.select();
        }
      }
    };

    setPos();
    setTimeout(setPos, 0);
  }

  onChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.state.acceptedChars) {
//      const input = event.target;
      let cursorPos = this.getInputCursorPosition();
      if (this.props.type === "price") {
        event.target.value = event.target.value.replace(/[^0-9,\,,\.]/g, "").replace(/(,|\.)+([0-9]{0,2}).*$/, ",$2").replace(/^0+/, "");
        if (/^,/.test(event.target.value)) {
          event.target.value = event.target.value.replace(/^,/, "0,");
          cursorPos++;
        }
      } else {
        event.target.value = this.state.acceptedChars.replace(event.target.value);
      }
      this.setCaretPos(cursorPos);
    }
    if (this.props.type === "date") {
      event.target.value = event.target.value.substr(0, 10);
    }
    if (this.props.onChange) {
      this.props.onChange(event.target.value, event);
    }
  }

  onSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.inputRef.current?.value);
    }
  }

  onShowPasswordClick() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const isPassword = this.props.type === "password";
    const isLoading = this.props.loading;
    const inputClasses = cn(this.props.className, {
      "input": true,
      "input--focus": this.state.focus && !this.props.disabled,
      "input--label-right": this.props.labelRight,
      "input--label-light": this.props.labelLight,
      "input--invalid": this.props.invalid,
      "input--disabled": this.props.disabled,
      "input--search": !isLoading && this.props.search,
      "input--loading": isLoading
    });
    const titleClasses = cn({
      "input__title": true
    });
    const mask = this.props.mask || (this.props.type === "date" && "99.99.9999") || undefined;
    let charsType: AcceptedCharsType = (this.props.type !== "date" && this.props.type) || "text";
    let type: InputType = "text";
    let unit = this.props.unit;
    if ((!this.props.type && this.props.acceptedChars === [ "digits" ]) || this.props.type === "date") {
      charsType = "phone";
    } else if ((charsType === "password" && this.state.showPassword) || charsType === "price") {
      if (charsType === "price" && !this.props.unit) {
        unit = "руб.";
      }
    }
    const unselectable: Unselectable = (this.props.disabled ? "on" : "off");
    return (
      <div onClick={this.onClick} className={inputClasses + " " + (this.props.className ? this.props.className : "")}>
        {this.props.label ?
          <label className={titleClasses}>{this.props.label}</label>
          : false}
        {!!unit && <div ref={this.unitRef} className="input__unit">{unit}</div>}

        <InputElement
          type={type}
          readOnly={this.props.disabled}
          unselectable={unselectable}
          inputRef={this.inputRef}
          value={this.props.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.props.valueLink ? undefined : this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder={this.props.placeholder}
          onKeyDown={this.onKeyDown}
          mask={mask}
          tabIndex={this.props.tabIndex}
        />

        {!isLoading && this.props.search && <div className="input__btn-search" onClick={this.onSearch}/>}
        {isLoading && <div className="input__loading-icon"/>}
        {this.props.children}
      </div>
    );
  }
}

export default Input;
