import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function TaskDatePicker ({onClosingDatePicker}, {dueDate}) {
  const [startDate, setStartDate] = useState(dueDate);
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
      customInput={<DateButton />}
      onCalendarClose={handleCalendarClose}
    />
  );
}
export default TaskDatePicker;