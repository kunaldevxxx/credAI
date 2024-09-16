import React, { useState } from 'react';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Line } from 'react-chartjs-2';
import { Groq } from 'groq-sdk';
import { apiKey } from '../../apiConfig.js';
function AIQueryInsights() {
  const [query, setQuery] = useState('');
  const [chartData, setChartData] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const mockApiData = [
    { date: '2023-01', amount: 1000 },
    { date: '2023-02', amount: 1200 },
    { date: '2023-03', amount: 800 },
    { date: '2023-04', amount: 1500 },
    { date: '2023-05', amount: 1100 },
  ];

  const handleQuery = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      const aiResponse = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Analyze the following spending data and provide insights based on the query: "${query}"\n\nData: ${JSON.stringify(mockApiData)}`,
          },
        ],
        model: 'mixtral-8x7b-32768',
        temperature: 0.5,
        max_tokens: 200,
      });

      const aiInsight = aiResponse.choices[0].message.content.trim();
      setAiResponse(aiInsight);

      const newChartData = {
        labels: mockApiData.map(item => item.date),
        datasets: [{
          label: 'Spending',
          data: mockApiData.map(item => item.amount),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }],
      };

      setChartData(newChartData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-slide-down">AI Query Insights</h1>
      <form onSubmit={handleQuery} className="flex gap-4 items-center justify-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your spending..."
          className="w-2/3 transition-all duration-300 focus:ring-2 focus:ring-blue-400"
        />
        <Button type="submit" disabled={loading} className="transition-all duration-300 hover:scale-105">
          {loading ? (
            <div className="flex items-center">
              <span className="animate-spin mr-2">⏳</span> Loading...
            </div>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
      {aiResponse && (
        <Card className="mt-8 border border-gray-200 hover:border-blue-300 transition-all duration-300">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl text-blue-600">AI Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed animate-fade-in">{aiResponse}</p>
          </CardContent>
        </Card>
      )}
      {chartData && (
        <Card className="mt-8 border border-gray-200 hover:border-green-300 transition-all duration-300">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl text-green-600">Spending Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="animate-fade-in">
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AIQueryInsights;