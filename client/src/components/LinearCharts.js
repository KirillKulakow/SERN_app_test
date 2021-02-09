import React, { useRef, useEffect, useMemo } from "react";
import ChartJS from "chart.js";
import styles from "./LinearCharts.module.scss";

const LinearCharts = ({ data }) => {
  const chartRef = useRef(null);
  const date = useMemo(() => ["", ...data.date, ""], [data]);
  const dataArray = useMemo(() => [null, ...data.dataArray, null], [data]);
  const options = useMemo(
    () => ({
      type: "line",
      data: {
        labels: date,
        datasets: [
          {
            data: dataArray,
            borderWidth: 4,
            borderColor: "#3A80BA",
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "category",
              gridLines: {
                offsetGridLines: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 1000,
                stepSize: 200,
              },
            },
          ],
        },
      },
    }),
    [dataArray, date]
  );

  useEffect(() => {
    let ctx = chartRef.current.getContext("2d");
    ChartJS.defaults.global.defaultFontFamily = "Montserrat";
    ChartJS.defaults.global.defaultFontSize = 16;
    ChartJS.defaults.global.defaultFontColor = "#CCC";
    ChartJS.defaults.global.legend = false;
    ChartJS.defaults.global.tooltips.enabled = false;
    ChartJS.defaults.global.elements.rectangle.borderColor = "yellow";
    new ChartJS(ctx, options);
  }, [options]);

  return (
    <div className={styles.container}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LinearCharts;
