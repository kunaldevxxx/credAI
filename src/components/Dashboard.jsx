// import React, { useState } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import { Input } from "./ui/input"
// import { Button } from "./ui/button"
// import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
// import SuspiciousActivityModal from './SuspiciousActivityModal';
// import { Groq } from 'groq-sdk';

// function Dashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [aiQuery, setAiQuery] = useState('');
//   const [aiResponse, setAiResponse] = useState('');
  
//   const navigate = useNavigate();

//   const handleAIQuery = async (e) => {
//     e.preventDefault();
//     const groq = new Groq({
//       apiKey: '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',
//       dangerouslyAllowBrowser:true,
//     });
//     try {
//       const chatCompletion = await groq.chat.completions.create({
//         messages: [{ role: 'user', content: aiQuery }],
//         model: 'mixtral-8x7b-32768',
//       });
//       setAiResponse(chatCompletion.choices[0]?.message?.content || 'No response');
//     } catch (error) {
//       console.error('Error querying AI:', error);
//       setAiResponse('Error occurred while processing your query.');
//     }
//   };

//   return (
    
//     <div className="space-y-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
//       <h1 className="text-4xl font-bold text-center text-indigo-800">Welcome to Your CredAI Dashboard 🏦</h1>

//       <div className="grid gap-8 md:grid-cols-3">
//         <DashboardCard title="Recent Transactions" emoji="💳" link="/transactions" />
//         <DashboardCard title="AI Insights" emoji="🤖" link="/ai-insights" />
//         <DashboardCard title="Recommendations" emoji="💡" link="/recommendations" />
//         <DashboardCard title="Spending Trends" emoji="📊" link="/spending-trends" />
//         <DashboardCard title="Customer Support" emoji="🎧" link="/support" />
//         <DashboardCard title="User Profile" emoji="👤" link="/profile" />
//       </div>

//       <Card className="p-6 bg-white shadow-lg rounded-xl">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-indigo-700">Ask AI Assistant 🧠</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleAIQuery} className="flex gap-4">
//             <Input
//               value={aiQuery}
//               onChange={(e) => setAiQuery(e.target.value)}
//               placeholder="Ask about your finances..."
//               className="flex-grow"
//             />
//             <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Ask AI</Button>
//           </form>
//           {aiResponse && (
//             <div className="mt-4 p-4 bg-gray-100 rounded-md">
//               <h3 className="font-semibold mb-2">AI Response:</h3>
//               <p>{aiResponse}</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {showModal && <SuspiciousActivityModal onClose={() => setShowModal(false)} />}
//     </div>
//   );
// }

// function DashboardCard({ title, emoji, link }) {
//   return (
//     <Link to={link}>
//       <Card className="h-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
//             <span className="text-3xl">{emoji}</span> {title}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-600">Click to view details</p>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }

// export default Dashboard;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import SuspiciousActivityModal from './SuspiciousActivityModal';
import { Groq } from 'groq-sdk';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
  const navigate = useNavigate(); // Added to programmatically navigate

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
    <div className="space-y-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Top bar with Signup Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-indigo-800">Your CredAI Dashboard 🏦</h1>
        <Button
          onClick={() => navigate('/signup')} // Redirect to signup
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Sign Up
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <DashboardCard title="Recent Transactions" emoji="💳" link="/transactions" />
        <DashboardCard title="AI Insights" emoji="🤖" link="/ai-insights" />
        <DashboardCard title="Recommendations" emoji="💡" link="/recommendations" />
        <DashboardCard title="Spending Trends" emoji="📊" link="/spending-trends" />
        <DashboardCard title="Customer Support" emoji="🎧" link="/support" />
        <DashboardCard title="User Profile" emoji="👤" link="/profile" />
      </div>

      <Card className="p-6 bg-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-700">Ask AI Assistant 🧠</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAIQuery} className="flex gap-4">
            <Input
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Ask AI</Button>
          </form>
          {aiResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">AI Response:</h3>
              <p>{aiResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && <SuspiciousActivityModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function DashboardCard({ title, emoji, link }) {
  return (
    <Link to={link}>
      <Card className="h-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
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
  );
}

export default Dashboard;
