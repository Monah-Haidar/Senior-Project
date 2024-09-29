import React, { useState } from 'react';

function Range() {
  const min = 0;
  const max = 100;
  const step = 25;

  const [value, setValue] = useState(step);

  // Generate markers based on the range and step
  const markers = [];
  for (let i = min; i <= max; i += step) {
    markers.push(i);
  }

  return (
    <>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="range w-full"
          step={step}
        />
        <div className="w-full flex justify-between text-xs px-2">
          {markers.map((marker, index) => (
            <span key={index}>|</span>  // Key index is acceptable here as the list and order of markers won't change dynamically
          ))}
        </div>
      </div>
    </>
  );
}

export default Range;

