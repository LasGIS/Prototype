/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import cn from 'classnames';

class AddFileElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addButton: true,
      name: props.moreLabel && props.files.length ? props.moreLabel : props.label,
      progress: 0
    };
  }

  componentDidMount() {
    const input = ReactDOM.findDOMNode(this.refs.input);
    if (window.mOxie) {
      const fileInput = new mOxie.FileInput({
        browse_button: ReactDOM.findDOMNode(this),
        multiple: this.props.multiple // allow multiple file selection
      });

      fileInput.onchange = this.handleFile;
      fileInput.init();
    }
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.state.progress !== nextState.progress) {
      this.updateProgress(this.state.progress, nextState.progress);
    }
  };

  updateProgress(oldProgress, newProgress) {
    $(ReactDOM.findDOMNode(this)).circleProgress({
      value: newProgress,
      animationStartValue: oldProgress
    });
  };

  handleFile(evt) {
    const that = this;
    const file = $(evt.target).prop('files')[0];

    const onprogress = function (proGr) {
      const progress = proGr.total ? proGr.loaded / proGr.total : 1;
      that.setState({progress: progress});
    };
    const onloadend = function (evt) {
      that.setState({
        uploaded: true,
        uploading: false
      });
    };

    const formData = window.FormData ? new FormData : new mOxie.FormData();
    formData.append("file", file, file.name);
    $.ajax({
      url: 'upload.php',  //Server script to process data
      type: 'POST',
      xhr: function () {  // Custom XMLHttpRequest
        const myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) { // Check if upload property exists
          myXhr.upload.onprogress = onprogress;
          myXhr.upload.addEventListener("progress", onprogress, false);
          myXhr.upload.addEventListener("load", onloadend, false);
        }
        return myXhr;
      },
      //Ajax events
      //beforeSend: beforeSendHandler,
      success: onloadend,
      error: function (arg1, arg2) {
        return;
      },
      // Form data
      data: formData,
      //Options to tell jQuery not to process data or worry about content-type.
      cache: false,
      contentType: false,
      processData: false
    });

    $(ReactDOM.findDOMNode(this)).circleProgress({
      value: 0,
      size: 18,
      animation: {
        duration: 100,
        easing: "linear"
      },
      thickness: 3,
      startAngle: -1.58,
      fill: {
        color: "#999"
      },
      emptyFill: "#FFF"
    });

    this.setState({
      name: file.name,
      size: file.size,
      type: file.type,
      uploading: true,
      addButton: false
    });

    this.props.onAdd(this.props.id);
  };

  onAddClick() {
    if (window.mOxie) return;
    const input = ReactDOM.findDOMNode(this.refs.input);
    input.click();
  };

  onDeleteClick() {
    this.props.onDelete(this.props.id);
  };

  render() {
    const elementClasses = cn({
      'add-file-button': true,
      'add-file-button--progress': this.state.uploading,
      'add-file-button--uploaded': this.state.uploaded
    });
    const titleClasses = cn({
      'add-file-button__filename': !this.state.addButton,
      'add-file-button__title': this.state.addButton
    });

    return (
      <div className={elementClasses} onClick={this.state.addButton ? this.onAddClick : false}>
        <div className="add-file-button__icon" onClick={this.state.uploaded ? this.onDeleteClick : false}/>
        <div className={titleClasses}>{this.state.name}</div>
        <input
          name={this.props.name} type="file" multiple={this.props.multiple}
          hidden className="ws-filereader" ref="input"
          accept="*" onChange={this.handleFile}
        />
      </div>
    );
  }
}

export default AddFileElement;
