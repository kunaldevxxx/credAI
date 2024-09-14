import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Extended mock transaction data
const transactionData = [
  { date: '2023-07-01', amount: 120, category: 'Groceries' },
  { date: '2023-07-08', amount: 80, category: 'Entertainment' },
  { date: '2023-07-15', amount: 200, category: 'Utilities' },
  { date: '2023-07-22', amount: 150, category: 'Dining' },
  { date: '2023-07-29', amount: 250, category: 'Shopping' },
  { date: '2023-08-05', amount: 100, category: 'Transportation' },
  { date: '2023-08-12', amount: 180, category: 'Healthcare' },
  { date: '2023-08-19', amount: 90, category: 'Entertainment' },
  { date: '2023-08-26', amount: 220, category: 'Groceries' },
  { date: '2023-09-02', amount: 130, category: 'Dining' },
];

// Dynamic insight generation with quantitative logic
const generateInsight = (transaction, allTransactions) => {
  const { amount, category } = transaction;
  const categoryTransactions = allTransactions.filter(t => t.category === category);
  const avgAmount = categoryTransactions.reduce((sum, t) => sum + t.amount, 0) / categoryTransactions.length;
  const stdDev = Math.sqrt(categoryTransactions.reduce((sum, t) => sum + Math.pow(t.amount - avgAmount, 2), 0) / categoryTransactions.length);
  
  const zScore = (amount - avgAmount) / stdDev;
  
  if (zScore > 2) {
    return `This ${category} transaction is significantly higher than usual. It's in the top 2.3% of your ${category} spending.`;
  } else if (zScore > 1) {
    return `This ${category} transaction is higher than average. It's in the top 16% of your ${category} spending.`;
  } else if (zScore < -1) {
    return `This ${category} transaction is lower than usual. It's in the bottom 16% of your ${category} spending.`;
  } else {
    return `This ${category} transaction is within your typical spending range.`;
  }
};

// Dynamic action suggestion with advanced logic
const generateAction = (transaction, allTransactions) => {
  const { amount, category, date } = transaction;
  const categoryTransactions = allTransactions.filter(t => t.category === category);
  const totalSpent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
  const monthlyBudget = 1000; // Example monthly budget
  const daysInMonth = 30; // Simplified
  const dayOfMonth = new Date(date).getDate();
  const budgetPace = (monthlyBudget / daysInMonth) * dayOfMonth;

  if (totalSpent > budgetPace) {
    const overspentPercentage = ((totalSpent - budgetPace) / budgetPace * 100).toFixed(2);
    return `You're ${overspentPercentage}% over your ${category} budget pace. Consider reducing spending in this category for the rest of the month.`;
  } else if (totalSpent < budgetPace * 0.5) {
    const savedPercentage = ((budgetPace - totalSpent) / budgetPace * 100).toFixed(2);
    return `You're ${savedPercentage}% under your ${category} budget pace. Great job! Consider allocating some of these savings to your financial goals.`;
  } else {
    return `Your ${category} spending is on track with your budget. Keep up the good work!`;
  }
};

function TransactionInsights() {
  const [selectedTransactionDate, setSelectedTransactionDate] = useState(null);
  const [insight, setInsight] = useState('');
  const [action, setAction] = useState('');
  const [budget, setBudget] = useState(Number(localStorage.getItem('budget')) || 0);

  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
  }, [budget]);

  const handleTransactionClick = (data) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload;
      setSelectedTransactionDate(clickedData.date);
      const generatedInsight = generateInsight(clickedData, transactionData);
      setInsight(generatedInsight);
      const generatedAction = generateAction(clickedData, transactionData);
      setAction(generatedAction);
    }
  };

  const calculateAmountSpent = () => {
    return transactionData.reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const calculateRemainingBudget = () => {
    return budget - calculateAmountSpent();
  };

  const generateBudgetAlert = () => {
    const remainingBudget = calculateRemainingBudget();
    if (remainingBudget < 0) {
      return "You've exceeded your budget!";
    } else if (remainingBudget < budget * 0.2) {
      return "You're close to exceeding your budget. Be cautious with your spending.";
    } else {
      return "Your spending is within budget.";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transaction Insights</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData} onClick={handleTransactionClick}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Explanations</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTransactionDate ? (
              <p>{insight}</p>
            ) : (
              <p>Click on a transaction in the timeline to see insights.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTransactionDate && (
              <ul>
                <li>{action}</li>
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budgeting Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium leading-6 text-gray-900">
                  Set Budget
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="budget"
                    placeholder="Enter budget amount"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Track Progress</h3>
                <p className="mt-1 text-sm text-gray-500">Amount spent: ${calculateAmountSpent()}</p>
                <p className="mt-1 text-sm text-gray-500">Remaining budget: ${calculateRemainingBudget()}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Alerts</h3>
                <p className="mt-1 text-sm text-gray-500">{generateBudgetAlert()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TransactionInsights;