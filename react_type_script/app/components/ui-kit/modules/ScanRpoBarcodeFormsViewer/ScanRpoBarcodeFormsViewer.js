/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import BarcodeScanStep from '../../../step/BarcodeScanStep';
import CapacityRpoScanner from '../../../../pages/CapacityForming/CapacityEditingPage/modules/CapacityRpoScanner/CapacityRpoScanner';

class ScanRpoBarcodeFormsViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '1BF012345678RU',
      showError: false,
      isDisabled: false,
    };

    this.handleSettingChange = this.handleSettingChange.bind(this);
  }

  handleSettingChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newState = { [name]: value };

    this.setState(newState);
  }

  render() {
    const { barcode, showError, isDisabled } = this.state;

    return (
      <div>
        <h5>Формы сканирования ШПИ РПО</h5>
        {this.renderControls()}
        <div>
          <div>1. В кладовой - /rpo-registration. Содержит штрихкод</div>
          <div className="accept-flow">
            <BarcodeScanStep
              className="accept-flow__step"
              barcode={barcode}
              disabled={isDisabled}
              isWrongBarcode={showError}
              scanText={'Сканируйте или введите ШИ емкости'}
              wrongBarcodeText={showError ? 'Неверный ШПИ' : ''}
              barcodeMaxSize={14}
              changeBarcode={() => ({})}
              acceptBarcode={() => ({})}
            />
          </div>
        </div>

        <div>
          <div>2. В отправке курьера. Не содержит штрихкод, отступы отличаются, disabled состояние не описано</div>
          <div>
            <CapacityRpoScanner taskId={'1'} isDisabledSubmitBtn={isDisabled} />
          </div>
        </div>
      </div>
    );
  }

  renderControls() {
    return (
      <React.Fragment>
        <div>
          <label>
            <input
              name="showError"
              type="checkbox"
              checked={this.state.showError}
              onChange={this.handleSettingChange}
            />
            C ошибкой
          </label>
        </div>

        <div>
          <label>
            <input
              name="isDisabled"
              type="checkbox"
              checked={this.state.isDisabled}
              onChange={this.handleSettingChange}
            />
            Неактивный
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default ScanRpoBarcodeFormsViewer;
