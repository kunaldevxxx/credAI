import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { Groq } from 'groq-sdk';

function CustomerSupport() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser:true,
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      setMessage('');

      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are a finance expert and personal manager. Analyze the user\'s question and provide a helpful response.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          model: 'mixtral-8x7b-32768',
        });

        const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
        setChatMessages(prev => [...prev, { text: aiResponse, sender: 'support' }]);
      } catch (error) {
        console.error('Error calling Groq API:', error);
        setChatMessages(prev => [...prev, { text: "I'm sorry, there was an error processing your request.", sender: 'support' }]);
      }
    }
  };

  const faqData = [
    { question: "How do I reset my password?", answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email." },
    { question: "What are the fees for international transactions?", answer: "Our international transaction fees vary depending on the country and transaction type. Please refer to our fee schedule in the app for detailed information." },
    { question: "How can I dispute a transaction?", answer: "To dispute a transaction, go to the transaction details in your account history and click on the 'Dispute Transaction' button. Follow the prompts to provide necessary information." },
    { question: "Is my personal information secure?", answer: "Yes, we use industry-standard encryption and security measures to protect your personal and financial information." },
    { question: "How long does it take to process a transfer?", answer: "Domestic transfers usually process within 1-2 business days. International transfers may take 3-5 business days depending on the destination country." },
  ];


  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Customer Support</h1>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-700">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center space-x-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">Start Live Chat</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Live Chat Support</DialogTitle>
              </DialogHeader>
              <div className="chat-window h-64 overflow-y-auto mb-4 p-4 bg-gray-100 rounded">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow"
                />
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">Send</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-700">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerSupport;
