import React from 'react';

function CurrentDate() {
    const currentDate: Date =  new Date();

    return (
        <p>{currentDate.toLocaleString()}</p>
    );
}

export default DateDisplay;