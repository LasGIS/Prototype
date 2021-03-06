/*
 * Copyright (c) 2020. Prototype
 */


import React, { Component, MouseEvent } from 'react';
import Button from '../button/Button';
import Input from '../input2/Input';
import AcceptIcon from '../icon/AcceptIcon';
import PrinterIcon from '../icon/PrinterIcon';
import QuestionIcon from '../icon/QuestionIcon';
import CheckboxViewer from './modules/CheckboxViewer/CheckboxViewer';
import Link from '../label/Link';
import Label from '../label/Label';
import Row, { RowType } from '../row/Row';
import Col from '../col/Col';
import CancelIcon from '../icon/CancelIcon';
import Check from '../icon/Check';
import CrossIcon from '../icon/CrossIcon';
import DownIcon from '../icon/DownIcon';
import UpIcon from '../icon/UpIcon';
import FilterIcon, { FilterIconType } from '../icon/FilterIcon';

type Props = {};

type State = {
  eventText: string
};

export default class Components extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      eventText: '',
    };
    this.onPressLabel = this.onPressLabel.bind(this);
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton(name: string) {
    this.setState({ eventText: `Press button "${name}"` });
  }

  onPressLabel(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.setState({ eventText: `Press label "${target.textContent}"` });
  }

  render() {
    const { eventText } = this.state;
    return (
      <>
        <Row>
          <h2>UI - элементы</h2>
          <Label text={eventText}/>
        </Row>
        <Row>
          <div>
            <h1>Заголовок 1</h1>
            <h2>Заголовок 2</h2>
            <h3>Заголовок 3</h3>
            <h4>Заголовок 4</h4>
            <h5>Заголовок 5</h5>
            <h6>Заголовок 6</h6>
          </div>
        </Row>
        <Row>
          <CheckboxViewer/>
        </Row>
        <Row>
          <Col>
            <Button id="button1" tooltip='test tooltip' primary onClick={() => this.onPressButton('Кнопка 1')}>
              Кнопка 1
            </Button>
          </Col>
          <Col>
            <Button id="button2" primaryFilled onClick={() => this.onPressButton('Кнопка 2')}>
              Кнопка 2
            </Button>
          </Col>
          <Col>
            <Button id="button3" cancel onClick={() => this.onPressButton('Кнопка 3')}>
              Кнопка 3
            </Button>
          </Col>
          <Col>
            <Button id="button4" cancelFilled onClick={() => this.onPressButton('Кнопка 4')}>
              Кнопка 4
            </Button>
          </Col>
          <Col>
            <Button id="button4" cancelFilled disabled onClick={() => this.onPressButton('Кнопка 5')}>
              Кнопка 5
            </Button>
          </Col>
          <Col>
            <Button id="button5" whiteGreyBorder onClick={() => this.onPressButton('Кнопка 6')}>
              Кнопка 6
            </Button>
          </Col>
        </Row>
        <Row type={RowType.blue}>
          <Col>
            <Input id="input2" barcode blue value="1234567890" readOnly/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link id="link1" onClick={this.onPressLabel} text="filled ссылка " filled/>
          </Col>
          <Col>
            <Link id="link2" onClick={this.onPressLabel} text="простая ссылка"/>
          </Col>
          <Col>
            <Link id="link3" onClick={this.onPressLabel} text="dotted ссылка" dotted/>
          </Col>
        </Row>
        <Row type={RowType.grey}>
          <PrinterIcon/>
          <AcceptIcon/>
          <QuestionIcon/>
          <CancelIcon/>
          <CancelIcon white/>
          <Check/>
          <CrossIcon/>
          <CrossIcon red/>
          <DownIcon/>
          <UpIcon/>
          <UpIcon blue/>
          <FilterIcon/>
          <FilterIcon type={FilterIconType.grey}/>
          <FilterIcon type={FilterIconType.greyWithBorder}/>
        </Row>
      </>
    );
  }
}
