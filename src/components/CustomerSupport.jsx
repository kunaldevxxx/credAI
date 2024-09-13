import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function CustomerSupport() {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Send message to support
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customer Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chat-window h-64 overflow-y-auto mb-4 p-4 bg-gray-100 rounded">
            {/* Display chat messages here */}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li>How do I reset my password?</li>
            <li>What are the fees for international transactions?</li>
            <li>How can I dispute a transaction?</li>
            {/* Add more FAQs as needed */}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerSupport;
