/*
 * Copyright 2019 Russian Post
 *
 * This source code is Russian Post Confidential Proprietary.
 * This software is protected by copyright. All rights and titles are reserved.
 * You shall not use, copy, distribute, modify, decompile, disassemble or reverse engineer the software.
 * Otherwise this violation would be treated by law and would be subject to legal prosecution.
 * Legal use of the software provides receipt of a license from the right holder only.
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
