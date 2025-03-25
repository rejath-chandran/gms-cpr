import React, { useState } from 'react';
import Login from './Login';
import Comp from './Comp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Comp />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
