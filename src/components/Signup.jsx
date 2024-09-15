// import React, { useState } from 'react';
// import { Input } from "./ui/input"; // UI component for input
// import { Button } from "./ui/button"; // UI component for button
// import { useNavigate } from 'react-router-dom';

// // For demo purposes, we simulate a user registration system with static data
// const existingUsers = [
//   { email: 'abc@gmail.com' },
//   { email: '123@gmail.com' },
// ];

// function Signup() {
//   const [email, setEmail] = useState(''); // To store email input
//   const [password, setPassword] = useState(''); // To store password input
//   const [confirmPassword, setConfirmPassword] = useState(''); // To store confirm password input
//   const [error, setError] = useState(''); // For displaying error messages
//   const [loading, setLoading] = useState(false); // For loading state
//   const [signedUp, setSignedUp] = useState(false); // To track if signup was successful
//   const navigate = useNavigate();
//   // Handle form submission for signup
//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors
//     setLoading(true); // Set loading to true during the process

//     // Basic form validation
//     if (password !== confirmPassword) {
//       setError("Passwords don't match.");
//       setLoading(false);
//       return;
//     }

//     // Check if the email is already in use
//     const userExists = existingUsers.find(user => user.email === email);
//     if (userExists) {
//       setError('This email is already registered.');
//       setLoading(false);
//       return;
//     }

//     // Simulate successful signup
//     setSignedUp(true); // Mark the user as signed up
//     setLoading(false);
//   };

//   return (
//     // <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
//     <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">

//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
//         {!signedUp ? (
//           <form onSubmit={handleSignupSubmit} className="space-y-6">
//             <h2 className="text-center text-3xl font-bold text-green-700">Create Your Account</h2>

//             <div className="space-y-4">
//               <Input
//                 placeholder="Email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//               />
//               <Input
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//               />
//               <Input
//                 placeholder="Confirm Password"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
//               disabled={loading}
//             >
//               {loading ? 'Signing up...' : 'Sign Up'}
//             </Button>

//             {/* Display error messages */}
//             {error && <p className="text-red-600 text-center text-sm mt-2">{error}</p>}

//             <div className="text-center">
//               <p className="text-gray-500">
//                 Already have an account?{' '}
//                 <a href="/login" className="text-green-600 hover:underline font-semibold">
//                   Log In
//                 </a>
//               </p>
//             </div>
//           </form>
//         ) : (
//           <div className="text-center space-y-6">
//             <h2 className="text-lg font-bold text-green-600">Account created successfully!</h2>
//             <Button
//               href="/login"
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
//             >
//               Go to Login
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from 'react';
import { Input } from "./ui/input"; // UI component for input
import { Button } from "./ui/button"; // UI component for button
import { useNavigate } from 'react-router-dom';

// For demo purposes, we simulate a user registration system with static data
const existingUsers = [
  { email: 'abc@gmail.com' },
  { email: '123@gmail.com' },
];

function Signup() {
  const [email, setEmail] = useState(''); // To store email input
  const [password, setPassword] = useState(''); // To store password input
  const [confirmPassword, setConfirmPassword] = useState(''); // To store confirm password input
  const [error, setError] = useState(''); // For displaying error messages
  const [loading, setLoading] = useState(false); // For loading state
  const [signedUp, setSignedUp] = useState(false); // To track if signup was successful
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle form submission for signup
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Set loading to true during the process

    // Basic form validation
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    // Check if the email is already in use
    const userExists = existingUsers.find(user => user.email === email);
    if (userExists) {
      setError('This email is already registered.');
      setLoading(false);
      return;
    }

    // Simulate successful signup
    setSignedUp(true); // Mark the user as signed up
    setLoading(false);

    // Redirect to the dashboard after signup
    setTimeout(() => {
      navigate('/');
    }, 2000); // Delay added for user experience (optional)
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
        {!signedUp ? (
          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <h2 className="text-center text-3xl font-bold text-green-700">Create Your Account</h2>

            <div className="space-y-4">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>

            {/* Display error messages */}
            {error && <p className="text-red-600 text-center text-sm mt-2">{error}</p>}

            <div className="text-center">
              <p className="text-gray-500">
                Already have an account?{' '}
                <a href="/login" className="text-green-600 hover:underline font-semibold">
                  Log In
                </a>
              </p>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-lg font-bold text-green-600">Account created successfully! Redirecting...</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
