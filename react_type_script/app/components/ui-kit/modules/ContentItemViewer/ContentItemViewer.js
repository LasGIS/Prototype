/*
 * Copyright (c) 2020. Prototype
 */

import React from 'react';
import CapacityRpoItem from '../../../../pages/CapacityForming/CapacityEditingPage/modules/CapacityRpoItem/CapacityRpoItem';
import './style.scss';

class ContentItemViewer extends React.Component {
  render() {
    return (
      <div>
        <h5>Плашка с контентом</h5>
        <div>
          <div>Без контента</div>
          <div className={'ui-kit__contentItem'}>
            <CapacityRpoItem
              key={`1`}
              id={`capacityRpoItem-1`}
              barcode={''}
              type={''}
              weight={''}
              address={''}
              isDisabledDeleteBtn={true}
              capacityId={'111'}
            />
          </div>
        </div>
        <div>
          <div>РПО из СФЕ</div>
          <CapacityRpoItem
            key={`1`}
            id={`capacityRpoItem-1`}
            barcode={'1F094756392RU'}
            type={'EMS-Оптимальное'}
            weight={'10 кг'}
            address={'г. Москва'}
            isDisabledDeleteBtn={true}
            capacityId={'111'}
          />
        </div>
      </div>
    );
  }
}

export default ContentItemViewer;
