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
import SimpleDayPickerInput from '../../../day-picker/SimpleDayPickerInput';

class DatePickerViewer extends React.Component {
  render() {
    return (
      <div>
        <h5>Инпут ввода даты из кладовой (/stockroom-table)</h5>
        <div className={'stock-detail'}>
          <SimpleDayPickerInput id="deliveryDate" className="stock-detail__calendar" value={''} onChange={() => ({})} />
        </div>
      </div>
    );
  }
}

export default DatePickerViewer;
