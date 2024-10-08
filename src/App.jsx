import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionInsights from './components/TransactionInsights';
import AIQueryInsights from './components/AIQueryInsights';
import RecommendationsAction from './components/RecommendationsAction';
import SpendingTrends from './components/SpendingTrends';
import CustomerSupport from './components/CustomerSupport';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">CredAI</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionInsights />} />
          <Route path="/ai-insights" element={<AIQueryInsights />} />
          <Route path="/recommendations" element={<RecommendationsAction />} />
          <Route path="/spending-trends" element={<SpendingTrends />} />
          <Route path="/support" element={<CustomerSupport />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
