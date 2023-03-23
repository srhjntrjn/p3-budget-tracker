import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BudgetChart(props) {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Budget', 'Remaining Budget'],
        datasets: [
          {
            data: [props.budget, props.remainingMoney],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      }
    });
    setChart(newChart);
  }, [props.budget, props.remainingMoney]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
}

export default BudgetChart;