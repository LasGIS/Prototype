/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import Button from '../../components/button/Button';

type Props = {
  id: string;
  closeModal: () => void;
  text?: string;
};

const MainMenuModal = (props: Props) => {
  return (
    <div className={'auth-error-modal'}>
      <div className={'auth-error-modal__content'}>
        <div className={'auth-error-modal__header'}>Ошибка авторизации</div>
        <div className={'auth-error-modal__body'}>{props.text}</div>
        <div className={'auth-error-modal__footer'}>
          <Button id={props.id} primaryFilled onClick={props.closeModal}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainMenuModal;
