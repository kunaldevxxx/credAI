import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import SuspiciousActivityModal from './SuspiciousActivityModal';
import { Groq } from 'groq-sdk';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleAIQuery = async (e) => {
    e.preventDefault();
    const groq = new Groq({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: aiQuery }],
        model: 'mixtral-8x7b-32768',
      });
      setAiResponse(chatCompletion.choices[0]?.message?.content || 'No response');
    } catch (error) {
      console.error('Error querying AI:', error);
      setAiResponse('Error occurred while processing your query.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen"
    >
      <motion.h1 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold text-center text-indigo-800 mb-8"
      >
        Welcome to Your CredAI Dashboard 🏦
      </motion.h1>

      <motion.div 
        className="grid gap-8 md:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        <DashboardCard title="Recent Transactions" emoji="💳" link="/transactions" />
        <DashboardCard title="AI Insights" emoji="🤖" link="/ai-insights" />
        <DashboardCard title="Recommendations" emoji="💡" link="/recommendations" />
        <DashboardCard title="Spending Trends" emoji="📊" link="/spending-trends" />
        <DashboardCard title="Customer Support" emoji="🎧" link="/support" />
        <DashboardCard title="User Profile" emoji="👤" link="/profile" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="p-6 bg-white shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-700">Ask AI Assistant 🧠</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAIQuery} className="flex gap-4">
              <Input
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="flex-grow placeholder-white text-fuchsia-50"
                placeholder="Ask about your finances..."
              />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300">
                Ask AI
              </Button>
            </form>
            {aiResponse && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-100 rounded-md"
              >
                <h3 className="font-semibold mb-2">AI Response:</h3>
                <p>{aiResponse}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {showModal && <SuspiciousActivityModal onClose={() => setShowModal(false)} />}
    </motion.div>
  );
}

function DashboardCard({ title, emoji, link }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, z: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={link}>
        <Card className="h-full transition-all duration-300 transform hover:shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
              <span className="text-3xl">{emoji}</span> {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Click to view details</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default Dashboard;
