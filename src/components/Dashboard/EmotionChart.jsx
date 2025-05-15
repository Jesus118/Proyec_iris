import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const EmotionChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.estado_emocional),
    datasets: [{
      data: data.map(item => item.intensidad || 1),
      backgroundColor: ['#4f46e5', '#10b981', '#ec4899']
    }]
  };

  return <Pie data={chartData} />;
};

export default EmotionChart;