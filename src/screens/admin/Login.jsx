import axios from 'axios';
import React, {useState} from 'react'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleLogin = async () => {
      setLoading(true);
      setError(null);
  
      if (!username || !password) {
        setError("Username and password are required.");
        setLoading(false);
        return;
      }
  
      try {
        // Example API call, replace with your backend URL
        const response = await axios.post('http://127.0.0.1:8000/v1/admin/login', {
          username: username,
          password: password,
        });
  
        if (response.status === 200) {
          // Redirect or store auth token
          localStorage.setItem('token', response.data.token);
        //   window.location.href = '/admin/dashboard'; // Redirect to admin dashboard
        }
      } catch (error) {
        setError('Invalid username or password');
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-SUSE">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
  
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your username"
              />
            </div>
  
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
              />
            </div>
  
            {error && <div className="text-red-500 text-sm">{error}</div>}
  
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  };

