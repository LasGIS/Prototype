/*
 * Copyright (c) 2020. Prototype
 */

import styles from './style.scss';
import React from 'react';
import Button from '../../components/button/Button';

type Props = {
  id: string;
  closeModal: () => void;
  text?: string;
};

const MainMenuModal = (props: Props) => {
  return (
    <div className={styles.authErrorModal}>
      <div className={styles.content}>
        <div className={styles.header}>Ошибка авторизации</div>
        <div className={styles.body}>{props.text}</div>
        <div className={styles.footer}>
          <Button id={props.id} primaryFilled onClick={props.closeModal}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainMenuModal;
