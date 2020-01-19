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
