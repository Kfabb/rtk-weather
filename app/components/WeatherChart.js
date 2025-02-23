"use client";

import React from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

function calculateAverage(data) {
  if (!data || data.length === 0) {
    return 0; // Return 0 for empty or invalid data
  }

  let sum = 0;
  let validCount = 0;
  for (const point of data) {
    if (typeof point === "number" && !isNaN(point)) {
      sum += point;
      validCount++;
    } else {
      console.warn("Invalid data point:", point);
    }
    
  }

  if (validCount === 0) {
    return 0; // Return 0 if no valid data points
  }

  return sum / validCount;
}

function WeatherChart({ data, title, units, color }) {
  const average = calculateAverage(data)
  console.log(average)
  return (
    <div className="weatherChart">
      <h3 className="chartHeading">
        {title} ({units})
      </h3>
      <Sparklines data={data} height={120} width={200}>
        <SparklinesLine color={color} />
        <SparklinesReferenceLine value={average} type="mean" />
      </Sparklines>
      <p className="avg">
        Average: {average.toFixed(2)} {units}
      </p>
    </div>
  );
}

export default WeatherChart;
