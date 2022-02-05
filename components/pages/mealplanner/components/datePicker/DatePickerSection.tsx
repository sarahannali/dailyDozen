import React, { useState } from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classes from './datePicker.module.css';
import { PopulateCalendar } from '../../utils';
import { Calendar } from '../../utils/_populateCalendar';
import { getMealEvents } from '../../../../requests';

type DatePickerSectionProps = {
  setDays: React.Dispatch<React.SetStateAction<Calendar>>
}

function DatePickerSection({ setDays }: DatePickerSectionProps) {
  const [date, setDate] = useState(moment());

  const handleDateChange = async (momentDate: moment.Moment | null) => {
    if (momentDate) {
      setDate(moment(momentDate));
      const newDays = await getMealEvents(momentDate.toString());

      setDays(PopulateCalendar(newDays, momentDate.toDate()));
    }
  };

  return (
    <div className={classes.infoDiv}>
      <Button className={classes.weekButtons} onClick={() => handleDateChange(date.subtract(1, 'days'))}>
        <LeftOutlined />
      </Button>
      <Button className={classes.weekButtons} onClick={() => handleDateChange(date.add(1, 'days'))}>
        <RightOutlined />
      </Button>
      <DatePicker value={date} onChange={handleDateChange} />
    </div>
  );
}

export default DatePickerSection;
