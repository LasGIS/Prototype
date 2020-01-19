/*
 * Copyright (c) 2020. Prototype
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
