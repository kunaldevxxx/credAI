import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import SuspiciousActivityModal from './SuspiciousActivityModal';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [aiQuery, setAiQuery] = useState('');

  const handleAIQuery = (e) => {
    e.preventDefault();
    // Process AI query
    console.log('AI Query:', aiQuery);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Display recent transactions */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Display AI-driven insights */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Flagged Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Display flagged suspicious transactions */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Monthly Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$2,345.67</p>
          </CardContent>
        </Card>
      </div>
      <form onSubmit={handleAIQuery} className="flex gap-2">
        <Input
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          placeholder="Ask AI about your spending..."
        />
        <Button type="submit">Ask AI</Button>
      </form>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/transactions">View Flagged Transactions</Link>
        </Button>
        <Button asChild>
          <Link to="/spending-trends">View Spending Patterns</Link>
        </Button>
      </div>
      {showModal && <SuspiciousActivityModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Dashboard;
