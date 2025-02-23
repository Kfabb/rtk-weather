"use client";

import React from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

function WeatherChart({ data, title, units, color }) {
  const average = data.reduce((sum, point) => sum + point, 0) / data.length;

  return (
    <div>
      <h3>
        {title} ({units})
      </h3>
      <Sparklines data={data} height={120} width={200}>
        <SparklinesLine color={color} />
        <SparklinesReferenceLine value={average} type="mean" />
      </Sparklines>
      <p>
        Average: {average.toFixed(2)} {units}
      </p>
    </div>
  );
}

export default WeatherChart;
