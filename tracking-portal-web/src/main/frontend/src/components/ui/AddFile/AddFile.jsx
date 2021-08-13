/*
 * Copyright (c) 2021. Prototype
 */

import React, { Component } from 'react';
import _ from 'underscore';
import AddFileElement from './AddFileElement';
import { uniqueId } from '../../../common/utils';

class AddFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [{
        id: uniqueId("file-")
      }],
      multiple: this.props.multiple !== false,
      prefix: this.props.prefix ? this.props.prefix : "file-"
    };
  }

  onAdd(id) {
    const files = this.state.files;
    if (this.state.multiple) {
      files.push({id: uniqueId("file-")});
    }
    this.setState({files: files});
  }

  onDelete(id) {
    let files;
    if (this.state.multiple) {
      files = _.filter(this.state.files, function (file) {
        return file.id !== id;
      });
    } else {
      files = [{id: uniqueId("file-")}];
    }
    this.setState({files: files});
  }

  render() {
    const that = this;
    return (
      <div className={"add-file" + " " + (this.props.className ? this.props.className : "")}>
        <form action={this.props.uploadURL} method="POST" encType="multipart/form-data">
          {_.map(this.state.files, function (file, i) {
            let name = that.state.prefix;
            if (that.state.multiple) {
              name += i;
            }
            return (
              <AddFileElement
                name={name} key={file.id}
                onAdd={that.onAdd} {...that.props}
                onDelete={that.onDelete}
                multiple={that.state.multiple} id={file.id}
              />
            );
          })}
        </form>
      </div>
    );
  }
}

export default AddFile;
