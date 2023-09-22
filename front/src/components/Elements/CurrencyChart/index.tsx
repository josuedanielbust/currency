import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import PropTypes from "prop-types";

const CurrencyChart = ({
  dataset
}: {
  dataset: any
}) => {
  const [ data, setData ]: [any, any] = useState([]);

  useEffect(() => {
    setData({
      labels: Object.keys(dataset).map((item: any) => item),
      datasets: [
        {
          label: 'Rates',
          data: Object.values(dataset).map((item: any) => item.rate),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0
        },
      ]
    });
  }, [dataset]);

  const options = {
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };

  return (
    <>
      <Chart type="line" data={data} options={options} />
    </>
  )
}

CurrencyChart.prototype = {
  dataset: PropTypes.object.isRequired,
}

export default CurrencyChart
