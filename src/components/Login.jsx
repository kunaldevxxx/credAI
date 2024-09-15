
// import React, { useState } from 'react';
// import { Input } from "./ui/input"; // UI component for input
// import { Button } from "./ui/button"; // UI component for button

// // Static users for demo purposes
// const staticUsers = [
//   { email: 'abc@gmail.com', password: '12345678' },
//   { email: '123@gmail.com', password: '87654321' },
// ];

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const user = staticUsers.find(user => user.email === email && user.password === password);

//     if (user) {
//       setLoggedInUser(user);
//       alert('Logged in successfully!');
//     } else {
//       setError('Invalid email or password.');
//     }

//     setLoading(false);
//   };

//   return (
//     // <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
//     <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">


//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
//         {!loggedInUser ? (
//           <form onSubmit={handleLoginSubmit} className="space-y-6">
//             <h2 className="text-center text-3xl font-bold text-indigo-700">Login to Your Account</h2>

//             <div className="space-y-4">
//               <Input
//                 placeholder="Email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full p-4 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               <Input
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-4 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>

//             {error && <p className="text-red-600 text-center text-sm mt-2">{error}</p>}

//             <div className="text-center">
//               <p className="text-gray-500">
//                 Don’t have an account?{' '}
//                 <a href="/signup" className="text-indigo-600 hover:underline font-semibold">
//                   Sign Up
//                 </a>
//               </p>
//             </div>
//           </form>
//         ) : (
//           <div className="text-center space-y-6">
//             <h2 className="text-lg font-bold text-green-600">Welcome, {loggedInUser.email}!</h2>
//             <Button
//               onClick={() => setLoggedInUser(null)}
//               className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
//             >
//               Log out
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { Input } from "./ui/input"; // UI component for input
import { Button } from "./ui/button"; // UI component for button
import { useNavigate } from 'react-router-dom'; // For programmatic navigation

// Static users for demo purposes
const staticUsers = [
  { email: 'abc@gmail.com', password: '12345678' },
  { email: '123@gmail.com', password: '87654321' },
];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = staticUsers.find(user => user.email === email && user.password === password);

    if (user) {
      setLoggedInUser(user);
      alert('Logged in successfully!');
      // Redirect to dashboard after successful login
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
        {!loggedInUser ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <h2 className="text-center text-3xl font-bold text-indigo-700">Login to Your Account</h2>

            <div className="space-y-4">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {error && <p className="text-red-600 text-center text-sm mt-2">{error}</p>}

            <div className="text-center">
              <p className="text-gray-500">
                Don’t have an account?{' '}
                <a href="/signup" className="text-indigo-600 hover:underline font-semibold">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-lg font-bold text-green-600">Welcome, {loggedInUser.email}!</h2>
            <Button
              onClick={() => setLoggedInUser(null)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

