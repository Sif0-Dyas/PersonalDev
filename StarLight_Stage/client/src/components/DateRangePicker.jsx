import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangeComponent = () => {
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const handleSelect = (ranges) => {
        setSelectedDateRange(ranges.selection);
    };

    const selectionRange = {
        startDate: selectedDateRange.startDate,
        endDate: selectedDateRange.endDate,
        key: 'selection'
    };

    return (
        <div className="mt-4">
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                showSelectionPreview={false}
                moveRangeOnFirstSelection={false}
                className="bg-white p-4 rounded-lg shadow-md"
            />
        </div>
    );
};

export default DateRangeComponent;
