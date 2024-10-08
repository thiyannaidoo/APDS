import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Customer Portal</h1>
      {isRegistering ? (
        <>
          <Register />
          <p>
            Already have an account?{' '}
            <button onClick={toggleForm} className="text-blue-500 underline">
              Login
            </button>
          </p>
        </>
      ) : (
        <>
          <Login />
          <p>
            Don't have an account?{' '}
            <button onClick={toggleForm} className="text-blue-500 underline">
              Register
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
