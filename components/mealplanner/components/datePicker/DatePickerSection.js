import React, {useState} from 'react';
import {Button, DatePicker} from 'antd';
import classes from './datePicker.module.css';
import moment from 'moment';
import {
  getMealEvents
} from '../../requests';
import {
  PopulateCalendar
} from '../../utils';

import {LeftOutlined, RightOutlined} from '@ant-design/icons'

const DatePickerSection = ({setDays}) => {
  const [date, setDate] = useState(moment());

  const handleDateChange = async (momentDate) => {
    setDate(momentDate);
    const newDays = await getMealEvents(momentDate.toDate());

    setDays(PopulateCalendar(newDays, momentDate.toDate()));
  };

  return (
    <div className={classes.infoDiv}>
      <Button className={classes.weekButtons} onClick={() => handleDateChange(date.subtract(1, 'days'))}>
        <LeftOutlined />
      </Button>
      <Button className={classes.weekButtons} onClick={() => handleDateChange(date.add(1, 'days'))}>
        <RightOutlined />
      </Button>
      <DatePicker defaultValue={date} value={date} defaultPickerValue={date} onChange={handleDateChange} />
    </div>
  );
};

export default DatePickerSection;
