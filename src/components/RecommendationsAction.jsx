import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import confetti from 'canvas-confetti';

function RecommendationsAction() {
  const [recommendations, setRecommendations] = useState([]);
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [showFreezeDialog, setShowFreezeDialog] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [creditCardDetails, setCreditCardDetails] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [freezeStatus, setFreezeStatus] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      const expenseData = [
        { id: 1, category: 'Groceries', amount: 150 },
        { id: 2, category: 'Dining Out', amount: 80 },
        { id: 3, category: 'Transportation', amount: 100 },
        { id: 4, category: 'Entertainment', amount: 50 },
        { id: 5, category: 'Utilities', amount: 200 },
        { id: 6, category: 'Shopping', amount: 120 },
        { id: 7, category: 'Healthcare', amount: 75 },
        { id: 8, category: 'Education', amount: 90 },
        { id: 9, category: 'Travel', amount: 300 },
        { id: 10, category: 'Miscellaneous', amount: 60 }
      ];

      const generateRecommendations = (expenses) => {
        return expenses.map(expense => {
          let type, message, value;

          if (expense.amount > 200) {
            type = 'spending';
            message = `Your spending in ${expense.category} is high. Consider reducing expenses in this category.`;
            value = expense.amount;
          } else if (expense.amount < 100) {
            type = 'saving';
            message = `You're doing well in ${expense.category}. Keep it up and consider saving the difference.`;
            value = 100 - expense.amount;
          } else {
            type = 'investment';
            message = `Your ${expense.category} spending is moderate. Consider investing any savings.`;
            value = expense.amount;
          }

          return { id: expense.id, type, message, value };
        });
      };

      const recData = generateRecommendations(expenseData);
      setRecommendations(recData);
    };

    fetchRecommendations();
  }, []);

  const getRecommendationColor = (type, value) => {
    switch (type) {
      case 'spending':
        return value > 200 ? 'bg-red-100' : value > 150 ? 'bg-yellow-100' : 'bg-green-100';
      case 'saving':
        return value > 50 ? 'bg-green-100' : value > 25 ? 'bg-yellow-100' : 'bg-red-100';
      case 'investment':
        return value > 150 ? 'bg-green-100' : value > 100 ? 'bg-yellow-100' : 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getRecommendationPriority = (type, value) => {
    switch (type) {
      case 'spending':
        return value > 200 ? 'High' : value > 150 ? 'Medium' : 'Low';
      case 'saving':
        return value > 50 ? 'High' : value > 25 ? 'Medium' : 'Low';
      case 'investment':
        return value > 150 ? 'High' : value > 100 ? 'Medium' : 'Low';
      default:
        return 'Medium';
    }
  };

  const handleFreezeCard = () => {
    setShowFreezeDialog(true);
  };

  const handleSubmitFreezeDetails = () => {
    setShowFreezeDialog(false);
    setShowOtpDialog(true);
  };

  const handleSubmitOtp = () => {
    if (otp === '1234') { // Replace with actual OTP validation
      setShowOtpDialog(false);
      setFreezeStatus('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setFreezeStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI-Driven Recommendations</h1>
      {recommendations.map((rec) => (
        <Card key={rec.id} className={getRecommendationColor(rec.type, rec.value)}>
          <CardHeader>
            <CardTitle>{rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{rec.message}</p>
            <p className="mt-2 font-semibold">Priority: {getRecommendationPriority(rec.type, rec.value)}</p>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-4">
        <Button onClick={() => setShowSupportDialog(true)}>Contact Support</Button>
        <Button variant="destructive" onClick={handleFreezeCard}>Freeze Card</Button>
      </div>

      <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nearby Customer Care Centers</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <iframe
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14476.835613720268!2d79.58716245!3d24.89085495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398297bec23818bb%3A0xf7aaeb336bcc7595!2sChoubey%20Colony%2C%20Chhatarpur%2C%20Madhya%20Pradesh%20471001!5e0!3m2!1sen!2sin!4v1726320802193!5m2!1sen!2sin"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showFreezeDialog} onOpenChange={setShowFreezeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Freeze Card</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="creditCardDetails">Credit Card Details</Label>
              <Input
                id="creditCardDetails"
                value={creditCardDetails}
                onChange={(e) => setCreditCardDetails(e.target.value)}
                placeholder="Enter credit card details"
              />
            </div>
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
              />
            </div>
            <Button onClick={handleSubmitFreezeDetails}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
            <Button onClick={handleSubmitOtp}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {freezeStatus === 'success' && (
        <Dialog open={true} onOpenChange={() => setFreezeStatus('')}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Congratulations!</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>Your card has been successfully frozen.</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {freezeStatus === 'error' && (
        <Dialog open={true} onOpenChange={() => setFreezeStatus('')}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Error</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>Wrong OTP. Please try again.</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}




















export default RecommendationsAction;

