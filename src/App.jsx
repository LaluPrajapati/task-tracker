import { useState, useEffect } from 'react'
import Layout from './Layout';
import Login from './components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleAuth = (token) => {
    localStorage.setItem("authToken", token);
    setLoggedIn(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    !token ? setLoggedIn(false) : setLoggedIn(true);
  }, [loggedIn]);

  return (
    !loggedIn ? (
        <Login handleAuth={handleAuth} />
      ) : (
        <Layout setIsLoggedin={setLoggedIn} />
      )
  )
}

export default App
