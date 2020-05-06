/*
 * Copyright (c) 2020. Prototype
 */

import React, { FocusEvent, MouseEvent } from 'react';
import { InputLineMasked } from './InputLine';
import classNames from 'classnames';

import moment, { Moment } from 'moment';
import _ from 'underscore';

const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export type ActiveInterval = {
  first: Moment;
  last: Moment;
};

type Day = {
  no: number;
  date: Moment;
  weekDay: number;
  week: number;
  month: number;
  isCurrent: boolean;
  isActive: boolean;
};

type Week = Day[];

type Calendar = {
  year: number;
  month: number;
  monthName: string;
  date: Moment;
  curDate: Moment;
  days: Day[];
  weeks: Week[];
};

type Props = {
  className: string;
  containerClassName: string;
  value: string;
  allowEmpty?: boolean;
  errorMessage?: string;
  onChange?: (arg: {
    target: {
      value: string
    };
  }) => {};
  onValidate: (data?: string) => boolean;
  activeInterval?: ActiveInterval;
};

type State = {
  date?: string;
  showPicker?: boolean;
  isValid?: boolean;
  calendar?: Calendar;
};

class DatePicker extends React.Component<Props, State> {
  // static propTypes: {};
  // static defaultProps: {};
  onClickProcess: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.getState(props),
      showPicker: false,
      isValid: true,
    };
    this.onClickPicker = this.onClickPicker.bind(this);
    this.onDonePicker = this.onDonePicker.bind(this);
  }

  getState(props: Props): State {
    let date = moment(props.value, 'DD.MM.YYYY');
    if (!date.isValid()) {
      date = moment();
    }
    const value = /\d/.test(props.value) ? props.value : '';
    return {
      date: value,
      calendar: this.makeCalendar(date, date),
    };
  }

  componentWillReceiveProps(props: Props) {
    let state = this.getState(props);
    if (this.props.value !== props.value) {
      state.isValid = this.computeIsValid(props.value);
    }
    this.setState(state);
  }

  findStartDate(date: Moment): Moment {
    let start = date.clone();
    start.date(1);
    while (start.day() !== 1) {
      start.add(-1, 'd');
    }
    return start;
  }

  makeCalendar(date: Moment, curDate: Moment): Calendar {
    const startDate = this.findStartDate(date);
    let weekDay, weekNo;
    const weeks: Week[] = [];
    const days: Day[] = [];
    for (weekNo = 0; weekNo < 6; ++weekNo) {
      const weekDays: Day[] = [];
      for (weekDay = 0; weekDay < 7; ++weekDay) {
        const curDay: Day = this.makeDay(startDate, weekNo, weekDay, curDate);
        weekDays.push(curDay);
        days.push(curDay);
        startDate.add(1, 'd');
      }
      weeks.push(weekDays);
    }

    return {
      year: date.year(),
      month: date.month(),
      monthName: MONTH_NAMES[date.month()],
      date: date.clone(),
      curDate: curDate.clone(),
      days: days,
      weeks: weeks,
    };
  }

  makeDay(date: Moment, weekNo: number, weekDay: number, curDate: Moment): Day {
    const dateClone = date.clone();
    return {
      no: date.date(),
      date: dateClone,
      weekDay: weekDay,
      week: weekNo,
      month: date.month(),
      isCurrent: date.isSame(curDate, 'day'),
      isActive: this.checkIsInActiveInterval(dateClone),
    };
  }

  checkIsInActiveInterval(date: Moment): boolean {
    const { activeInterval } = this.props;
    if (activeInterval) {
      const { first, last } = activeInterval;
      return (!first || date.isSameOrAfter(first)) && (!last || date.isSameOrBefore(last));
    } else {
      return true;
    }
  }

  isValidDate(value?: string): boolean {
    if (this.props.allowEmpty && (!value || !/\d/.test(value))) {
      return true;
    } else if (!value) {
      return false;
    }
    const date = moment(value, 'DD.MM.YYYY');

    return date.isValid() && date.unix() > 0;
  }

  onEnter() {
    this.setState({ showPicker: !this.state.showPicker }, this.validate);
  }

  validate(): boolean {
    const ok = this.computeIsValid(this.state.date);
    if (this.state.isValid !== ok) {
      this.setState({ isValid: ok });
    }
    return ok;
  }

  computeIsValid(value?: string): boolean {
    let ok: boolean = this.isValidDate(value);
    if (this.props.onValidate) {
      ok = ok && this.props.onValidate(value);
    }
    return ok;
  }

  rowOnClick(/*event: MouseEvent*/) {
    const show = !this.state.showPicker;
    if (show) {
      let date = moment(this.state.date, 'DD.MM.YYYY');
      if (!date.isValid()) {
        date = moment();
      }
      this.setState({
        calendar: this.makeCalendar(date, date),
      });
    }

    this.setState({ showPicker: show }, this.validate);
  }

  onClick(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    if (target.tagName !== 'INPUT')
      return;
    this.rowOnClick();
  }


  onChange(ev: MouseEvent) {
    const target = ev.target as HTMLInputElement;
    const value = target.value;
    this.setState({
      date: value,
    }, this.validate);
    this.parentOnChange(value);
  }

  parentOnChange(value: string) {
    if (this.props.onChange) {
      this.props.onChange({ target: { value: value } });
    }
  }

  onBlur(ev: FocusEvent) {
    if (this.onClickProcess) return;
    this.setState({ showPicker: false }, this.validate);
  }

  onClickPicker(ev: MouseEvent) {
    const self = this;
    self.onClickProcess = true;
    setTimeout(() => {
      self.onClickProcess = false;
    }, 50);
  }

  prevMonth() {
    const date = this.state.calendar?.date.clone();
    const curDate = this.state.calendar?.curDate.clone();
    date && curDate && this.setState({
      calendar: this.makeCalendar(date.subtract(1, 'M'), curDate),
    });
  }

  nextMonth() {
    const date = this.state.calendar?.date.clone();
    const curDate = this.state.calendar?.curDate.clone();
    date && curDate && this.setState({
      calendar: this.makeCalendar(date.add(1, 'M'), curDate),
    });
  }

  onDonePicker(value?: Moment, active?: boolean) {
    if (!value) {
      this.setState({ showPicker: false }, this.validate);
    } else if (active) {
      const date = value.format('DD.MM.YYYY');
      this.setState({
        showPicker: false,
        date: date,
      }, this.validate);
      this.parentOnChange(date);
    }
  }

  render() {
    const curMonth = this.state.calendar?.date.month();
    const days = this.state.calendar?.weeks.map((week: Week, key: number) => {
      return (
        <div className="date-picker__week" key={key}>
          {week.map((day: Day, key: number) => {
            const active = day.isActive;
            return <div
              className={classNames('date-picker__day', 'date-picker__nav', {
                'date-picker__day--another': day.month !== curMonth,
                'date-picker__day--current': day.isCurrent,
                'date-picker__day--inactive': !active,
              })}
              onClick={() => this.onDonePicker(day.date, active)}
              key={key}>
              {day.no}
            </div>;
          })}
        </div>
      );
    });

    return (
      <span className={classNames(
        'date-picker__container',
        _.assign({}, this.props.containerClassName, { 'input--with-error': !this.state.isValid }),
      )}>
        <InputLineMasked
          ref="inputLine"
          className={this.props.className}
          value={this.state.date}
          placeholder="ДД.ММ.ГГГГ"
          mask="99.99.9999"
          onEnterPress={this.onEnter}
          onEscPress={this.onDonePicker}
          onClick={this.onClick}
          onBlur={this.onBlur}
          style={{ width: '165px', paddingRight: '38px', textAlign: 'center' }}
          onChange={this.onChange}/>

        <div className="date-picker__button date-picker__icon-calendar"
             onClick={this.rowOnClick}/>

        {this.props.children}

        <div
          className={classNames('date-picker', { 'date-picker--visible': this.state.showPicker })}
          onMouseDown={(event) => this.onClickPicker(event)}
          ref="picker">

          <div className="date-picker__header">
            <div className="date-picker__prev date-picker__nav" onClick={this.prevMonth}>
              <div className="date-picker__prev-icon"/>
            </div>

            <div className="date-picker__title">
                {this.state.calendar?.monthName} {this.state.calendar?.year}
            </div>

            <div className="date-picker__next date-picker__nav" onClick={this.nextMonth}>
              <div className="date-picker__next-icon"/>
            </div>
          </div>
          <div className="date-picker__weekdays">
            <div className="date-picker__weekday">ПН</div>
            <div className="date-picker__weekday">ВТ</div>
            <div className="date-picker__weekday">СР</div>
            <div className="date-picker__weekday">ЧТ</div>
            <div className="date-picker__weekday">ПТ</div>
            <div className="date-picker__weekday">СБ</div>
            <div className="date-picker__weekday">ВС</div>
          </div>
          <div className="date-picker__weeks">
            {days}
          </div>

        </div>
        {this.props.errorMessage &&
        <div className="input__error-message"> {this.props.errorMessage} </div>}
      </span>
    );
  }
}
export default DatePicker;
