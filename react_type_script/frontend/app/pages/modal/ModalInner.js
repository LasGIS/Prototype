/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inline from '../input/Inline';
import Button from '../button/Button';
import cn from 'classnames';

export default class ModalInner extends Component {
  render() {
    const { handleCloseModal, message, buttons, attention } = this.props;

    const buttonsClassName = cn(
      styles.buttons,
      buttons.length > 1 ? styles.buttonsJustified : styles.buttonsCenter,
    );

    return (
      <div className={styles.inner}>
        <Inline className={styles.title}>
          <div className={styles.warningIcon} />
          <div className={styles.titleMessage}>
            {attention || buttons.length === 1 ? 'Внимание!' : 'Подтвердите действие'}
          </div>
          <div className={styles.closeIcon} onClick={handleCloseModal} />
        </Inline>
        <div className={styles.body}>
          <div className={styles.message}>{message}</div>
          <Inline className={buttonsClassName}>
            {buttons.map(button => (
              <Button
                id={button.id}
                key={button.id}
                className={styles.button}
                onClick={button.handleAction ? button.handleAction : handleCloseModal}
                primaryFilled={button.style === 'blue'}
                primary={button.style === 'white'}
              >
                {button.label}
              </Button>
            ))}
          </Inline>
        </div>
      </div>
    );
  }
}

const buttons = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleAction: PropTypes.func,
  style: PropTypes.string,
});

ModalInner.propTypes = {
  id: PropTypes.string.isRequired,
  attention: PropTypes.bool,
  message: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(buttons).isRequired,
};

ModalInner.defaultProps = {
  id: '',
};
