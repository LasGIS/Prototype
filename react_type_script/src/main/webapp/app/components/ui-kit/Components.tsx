/*
 * Copyright (c) 2020. Prototype
 */

import React, { ChangeEvent, Component } from 'react';
import Button from '../button/Button';
import Input from '../input2/Input';
import AcceptIcon from '../icon/AcceptIcon';
import PrinterIcon from '../icon/PrinterIcon';
import QuestionIcon from '../icon/QuestionIcon';
import CheckboxViewer from './modules/CheckboxViewer/CheckboxViewer';
import Link from '../label/Link';
import Label from '../label/Label';
import MainContainer from '../../pages/MainPage/MainContainer';
import Row from '../row/Row';
import Col from '../col/Col';

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

  onPressLabel(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    this.setState({ eventText: `Press label "${target.textContent}"` });
  }

  render() {
    const { eventText } = this.state;
    return (
      <div>
        <MainContainer>
          <Row>
            <h4>UI - элементы</h4>
            <Label text={eventText}/>
          </Row>
          <Row>
            {/*            <Col>*/}
            <CheckboxViewer/>
            {/*            </Col>*/}
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
          <Row>
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
          <Row>
            <Col> <PrinterIcon/> </Col>
            <Col> <AcceptIcon/> </Col>
            <Col> <QuestionIcon/> </Col>
          </Row>
        </MainContainer>
      </div>
    );
  }
}
