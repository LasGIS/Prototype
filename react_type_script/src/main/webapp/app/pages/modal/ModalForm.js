/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import * as React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import ModalInner from './ModalInner';
//import { APP_ROOT_SELECTOR } from '../../constants/constants';

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal || false,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    //ReactModal.setAppElement(APP_ROOT_SELECTOR);
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.onClose && this.props.onClose();
  }

  render() {
    const { id, message, buttons, showModal, attention } = this.props;
    return (
      <div>
        <ReactModal
          id={id}
          className={styles.modalForm}
          isOpen={this.state.showModal || showModal}
          overlayClassName={styles.overlay}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Подтвердите действие"
        >
          <ModalInner
            id="modalInner"
            handleCloseModal={this.handleCloseModal}
            attention={attention}
            message={message}
            buttons={buttons}
          />
        </ReactModal>
      </div>
    );
  }
}

const buttons = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleAction: PropTypes.func,
});

ModalForm.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  id: PropTypes.string.isRequired,
  attention: PropTypes.bool,
  message: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(buttons).isRequired,
};

ModalForm.defaultProps = {
  id: '',
};
