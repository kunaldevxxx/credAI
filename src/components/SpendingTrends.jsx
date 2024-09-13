import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

function SpendingTrends() {
  // Monthly spending data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Spending',
        data: [300, 450, 320, 500, 400, 350],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      }
    ]
  };

  // Category-wise spending data
  const categoryData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping'],
    datasets: [
      {
        label: 'Spending by Category',
        data: [250, 150, 100, 200, 300],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      }
    ]
  };

  // Expense distribution data
  const expenseDistribution = {
    labels: ['Essentials', 'Non-essentials', 'Savings'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Spending Trends</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Line 
            data={monthlyData} 
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Monthly Spending Trend' }
              }
            }} 
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              data={categoryData} 
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Spending by Category' }
                }
              }} 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie 
              data={expenseDistribution} 
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Expense Distribution' }
                }
              }} 
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Based on your spending patterns, we predict:</p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Your spending in the 'Shopping' category might increase next month.</li>
            <li>You're on track to meet your savings goal for this quarter.</li>
            <li>Consider reducing expenses in the 'Entertainment' category to improve your financial health.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default SpendingTrends;
