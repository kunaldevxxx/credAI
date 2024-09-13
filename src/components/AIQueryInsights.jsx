import React, { useState } from 'react';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Line } from 'react-chartjs-2';

function AIQueryInsights() {
  const [query, setQuery] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleQuery = (e) => {
    e.preventDefault();
    // Process query and update chartData
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Query Insights</h1>
      <form onSubmit={handleQuery} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your spending..."
        />
        <Button type="submit">Submit</Button>
      </form>
      {chartData && (
        <Card>
          <CardHeader>
            <CardTitle>Spending Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={chartData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AIQueryInsights;
