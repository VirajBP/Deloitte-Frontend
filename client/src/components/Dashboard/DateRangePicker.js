import React from 'react';

function DateRangePicker({ onDateChange }) {
  return (
    <div className="date-range">
      <input
        type="date"
        onChange={(e) => onDateChange('start', e.target.value)}
        className="date-input"
      />
      <span>to</span>
      <input
        type="date"
        onChange={(e) => onDateChange('end', e.target.value)}
        className="date-input"
      />
    </div>
  );
}

export default DateRangePicker;