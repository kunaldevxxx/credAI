import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

function UserProfile() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Profile & Security Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input placeholder="Enter your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" placeholder="Enter your email" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication (2FA)</span>
            <Switch
              checked={twoFAEnabled}
              onCheckedChange={setTwoFAEnabled}
            />
          </div>
          <Button>Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;
