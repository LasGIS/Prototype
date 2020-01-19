/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
/** Модалка из регистрации контейнера */
import ModalInner from '../../../modal/ModalInner';

class ModalWindowsContentViewer extends React.Component {
  render() {
    return (
      <div>
        <h5>Внешний вид модальных окон</h5>
        <div style={{ width: '550px' }}>
          <div>В регистрации контейнера</div>
          <ModalInner
            handleCloseModal={() => ({})}
            buttons={[{ id: 'okButton', label: 'Ок', style: 'blue' }]}
            message="Этот контейнер и все приписанные РПО уже зарегистрированы, сканируйте следующий"
          />
        </div>
      </div>
    );
  }
}

export default ModalWindowsContentViewer;
