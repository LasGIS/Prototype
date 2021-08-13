/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import $ from 'jquery';
import cn from 'classnames';

class EditableTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editing: false,
      editable: this.props.editable !== false
    };
  }

  componentWillUnmount() {
    $(document).unbind('click', this.onDocumentClick);
  }

  // static getDerivedStateFromProps(props, state) {
  componentWillReceiveProps(nextProps) {
    const editing = nextProps.hasOwnProperty('editing') ? nextProps.editing : this.state.editing;

    if (!editing && this.state.editing) {
      this.onSave();
    }

    this.setState({
      value: nextProps.value,
      editable: nextProps.editable !== false,
    });

    // timeout will prevent instant reset on document click
    setTimeout(this.setState.bind(this, {editing: editing}), 0);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.editing) {
      $(document).bind('click', this.onDocumentClick);
    } else {
      $(document).unbind('click', this.onDocumentClick);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const input = ReactDOM.findDOMNode(this.refs.input);
      const len = this.state.value.length;
      input.focus();
      input.setSelectionRange(len, len);
    }
  }

  onDocumentClick(event) {
    if (!this.state.editing) {
      return;
    }

    const inputElement = this.refs.input && ReactDOM.findDOMNode(this.refs.input);
    const valueElement = this.refs.value && ReactDOM.findDOMNode(this.refs.value);
    const $target = $(event.target);

    if ($target.is(inputElement) || $target.is(valueElement)) {
      return;
    }

    this.onSave(event);
  }

  onKeyDown(event) {
    switch (event.key) {
      case "Enter":
        this.onSave(event);
        break;
      case "Escape":
        this.onCancel(event);
        break;
      default:
        break;
    }
  }

  onSave(event) {
    if (!this.state.value) {
      this.onCancel();
      return;
    }

    this.setState({editing: false});

    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.state.value, event);
    }
  }

  onCancel(event) {
    this.setState({
      editing: false,
      value: this.props.value
    });

    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.props.value, event);
    }
  }

  onClick() {
    if (this.state.editable && !device.mobile()) {
      this.setState({editing: true});
      if (typeof this.props.onFocus === "function") {
        this.props.onFocus();
      }
    }
  }

  render() {
    const isEditing = this.state.editing;
    const classes = cn({
      'editable-title': true,
      'editable-title--editing': isEditing
    });
    return (
      <div className={classes + " " + (this.props.className || "")}>
        <input autoComplete="off" ref="input" className="editable-title__input" valueLink={this.linkState('value')} onKeyDown={this.onKeyDown}
               onBlur={this.onSave}/>
        <span ref="value" className="editable-title__value" onClick={this.onClick}>{this.state.value}</span>
      </div>
    )
  }
}

export default EditableTitle;
