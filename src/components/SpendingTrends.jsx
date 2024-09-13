import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Line } from 'react-chartjs-2';

function SpendingTrends() {
  // Sample data, replace with actual data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Spending',
        data: [300, 450, 320, 500, 400, 350],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Spending Trends</h1>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={chartData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Predictive Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Based on your spending patterns, we predict...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SpendingTrends;
