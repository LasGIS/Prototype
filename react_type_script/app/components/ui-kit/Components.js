/*
 * Copyright (c) 2020. Prototype
 */

import React, {Component} from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import {Col, Container, Row} from 'reactstrap';
import AcceptIcon from '../icon/AcceptIcon';
import PrinterIcon from '../icon/PrinterIcon';
import QuestionIcon from '../icon/QuestionIcon';
import RussianPostEmsIcon from '../icon/RussianPostEmsIcon';
import SelectBulkViewer from './modules/SelectBulkViewer/SelectBulkViewer';
import TextInputViewer from './modules/TextInputViewer/TextInputViewer';
import CheckboxViewer from './modules/CheckboxViewer/CheckboxViewer';
import ButtonsViewer from './modules/ButtonsViewer/ButtonsViewer';
import PaginationViewer from './modules/PaginationViewer/PaginationViewer';
import ScanRpoBarcodeFormsViewer from './modules/ScanRpoBarcodeFormsViewer/ScanRpoBarcodeFormsViewer';
import ModalWindowsContentViewer from './modules/ModalWindowsContentViewer/ModalWindowsContentViewer';
import ContentItemViewer from './modules/ContentItemViewer/ContentItemViewer';
import WeightFormViewer from './modules/WeightFormViewer/WeightFormViewer';
import DatePickerViewer from './modules/DatePickerViewer/DatePickerViewer';

export default class Components extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
        };
    }

    render() {
        return (
            <Container>
                <Row className="mt-5">
                    <Col lg={12}>
                        <hr/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={12}>Измененные UI - элементы</Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <SelectBulkViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <TextInputViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <CheckboxViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <ButtonsViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <PaginationViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <ScanRpoBarcodeFormsViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <ModalWindowsContentViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <ContentItemViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <WeightFormViewer/>
                    </Col>
                </Row>
                <Row className="mt-5 mb-5">
                    <Col lg={12}>
                        <DatePickerViewer/>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col lg={12}>
                        <hr/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={12}>Старые UI - элементы -----------------------------------</Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={2}>
                        <Button id="button1" primary>
                            Кнопка 1
                        </Button>
                    </Col>
                    <Col lg={2}>
                        <Button id="button2" primaryFilled>
                            Кнопка 2
                        </Button>
                    </Col>
                    <Col lg={2}>
                        <Button id="button3" cancel>
                            Кнопка 3
                        </Button>
                    </Col>
                    <Col lg={2}>
                        <Button id="button4" cancelFilled>
                            Кнопка 4
                        </Button>
                    </Col>
                    <Col lg={2}>
                        <Button id="button4" cancelFilled disabled>
                            Кнопка 5
                        </Button>
                    </Col>
                    <Col lg={2}>
                        <Button id="button5" whiteGreyBorder>
                            Кнопка 6
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={12}>
                        <BarcodeInput id="input1" value="1234567890" readOnly/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={12}>
                        <Input id="input2" barcode blue value="1234567890" readOnly/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={12}>
                        <InputSuffix id="input3" barcode blue value="1234567" suffix="г" readOnly/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={2}>
                        <Link id="link1" onClick={() => {
                        }} text="1 новое задание" filled/>
                    </Col>
                    <Col lg={2}>
                        <Link id="link2" onClick={() => {
                        }} text="Распечатать ярлык"/>
                    </Col>
                    <Col lg={2}>
                        <Link id="link3" onClick={() => {
                        }} text="Показать список отправлений" dotted/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={1}>
                        <PrinterIcon/>
                    </Col>
                    <Col lg={1}>
                        <AcceptIcon/>
                    </Col>
                    <Col lg={3}>
                        <QuestionIcon/>
                    </Col>
                    <Col lg={2}>
                        <RussianPostEmsIcon/>
                    </Col>
                </Row>
            </Container>
        );
    }
}
