import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Avatar } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import confetti from 'canvas-confetti';

function UserProfile() {
  const [userData, setUserData] = useState({
    name: "Kunal Khare",
    email: "kk@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=68",
    role: "Software Developer",
    location: "MP,India"
  });

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showTwoFADialog, setShowTwoFADialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleTwoFAToggle = () => {
    setShowTwoFADialog(true);
    setPhoneNumber('');
    setOtp(['', '', '', '']);
    setOtpSent(false);
    setError('');
  };

  const handleSendOTP = () => {
    if (!phoneNumber.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
      setError('Please enter a valid US phone number');
      return;
    }
    setOtpSent(true);
    setError('');
  };

  const handleOTPChange = (index, value) => {
    if (value.match(/^\d?$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }
    if (enteredOTP === '1234') { // Simulated correct OTP
      setTwoFAEnabled(!twoFAEnabled);
      setShowTwoFADialog(false);
      setOtp(['', '', '', '']);
      setOtpSent(false);
      triggerConfetti();
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  const handleChangePassword = () => {
    setShowPasswordDialog(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }
    
    setShowPasswordDialog(false);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center text-blue-100">User Profile & Security Settings</h1>
      
      <Card className="shadow-lg">
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-24 h-24" src={userData.avatar} alt={userData.name} />
          <div>
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <p className="text-gray-500">{userData.role}</p>
            <p className="text-gray-500">{userData.location}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
            <Input
              id="name"
              name="name"
              className="w-full placeholder-white text-fuchsia-50"
              value={userData.name}
              placeholder="Enter your Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full placeholder-white text-fuchsia-50"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-medium text-gray-700">Two-Factor Authentication (2FA)</span>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={twoFAEnabled}
              onCheckedChange={handleTwoFAToggle}
              className="scale-125"
            />
          </div>
          <div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2" onClick={handleChangePassword}>
              Change Password
            </Button>
          </div>
          <div>
            <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2">Log Out of All Devices</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showTwoFADialog} onOpenChange={setShowTwoFADialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{twoFAEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <Label htmlFor="phone">Enter your US mobile number</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="(123) 456-7890"
                  required
                />
                <Button onClick={handleSendOTP} className="bg-blue-500 hover:bg-blue-600 text-white">Send OTP</Button>
              </>
            ) : (
              <>
                <Label>Enter the 4-digit OTP</Label>
                <div className="flex space-x-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      maxLength={1}
                      className="w-12 text-center"
                      required
                    />
                  ))}
                </div>
                <Button onClick={handleVerifyOTP} className="bg-blue-500 hover:bg-blue-600 text-white">Verify OTP</Button>
              </>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button onClick={handlePasswordChange} className="bg-blue-500 hover:bg-blue-600 text-white">
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserProfile;
