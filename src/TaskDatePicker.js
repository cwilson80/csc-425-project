import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function TaskDatePicker ({onClosingDatePicker}) {
  const [startDate, setStartDate] = useState(new Date());
  const DateButton = React.forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const handleCalendarClose = () => {
    onClosingDatePicker(startDate);
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date()}
      customInput={<DateButton />}
      onCalendarClose={handleCalendarClose}
    />
  );
}
export default TaskDatePicker;