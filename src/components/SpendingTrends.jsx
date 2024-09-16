import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Groq } from 'groq-sdk';
import { apiKey } from '../../apiConfig.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

function SpendingTrends() {
  const [predictiveInsights, setPredictiveInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictiveInsights = async () => {

      const groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a financial analyst AI. Provide predictive insights based on the given spending data."
            },
            {
              role: "user",
              content: "Analyze the following spending data and provide 3 predictive insights: Monthly spending: [300, 450, 320, 500, 400, 350], Category spending: [250, 150, 100, 200, 300], Expense distribution: [60, 30, 10]"
            }
          ],
          model: "mixtral-8x7b-32768",
          temperature: 0.5,
          max_tokens: 150,
        });

        setPredictiveInsights(completion.choices[0].message.content.split('\n'));
      } catch (error) {
        console.error('Error fetching predictive insights:', error);
        setPredictiveInsights(['Unable to fetch predictive insights.']);
      }
      setLoading(false);
    };

    fetchPredictiveInsights();
  }, []);

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

  // Calculate total spending
  const totalSpending = monthlyData.datasets[0].data.reduce((a, b) => a + b, 0);

  // Calculate average monthly spending
  const averageMonthlySpending = totalSpending / monthlyData.labels.length;

  // Calculate spending growth rate
  const firstMonth = monthlyData.datasets[0].data[0];
  const lastMonth = monthlyData.datasets[0].data[monthlyData.datasets[0].data.length - 1];
  const spendingGrowthRate = ((lastMonth - firstMonth) / firstMonth) * 100;

  // Spending forecast data
  const spendingForecast = {
    labels: [...monthlyData.labels, 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Actual Spending',
        data: [...monthlyData.datasets[0].data, null, null, null],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      },
      {
        label: 'Forecasted Spending',
        data: [...monthlyData.datasets[0].data, 380, 410, 440],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        fill: true,
        borderDash: [5, 5],
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Spending Trends</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">${totalSpending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Monthly Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">${averageMonthlySpending.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spending Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">{spendingGrowthRate.toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>

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
            <Doughnut
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
          <CardTitle>Spending Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={spendingForecast}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Spending Forecast' }
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading predictive insights...</p>
          ) : (
            <>
              <p className="text-lg">Based on your spending patterns, our AI predicts:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                {predictiveInsights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SpendingTrends;
