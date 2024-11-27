import React from 'react'

const Logout = ({ setIsLoggedin }) => {
  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    setIsLoggedin(false);
  };

  return (
    <button className='btn btn-with-icon' onClick={handleLogOut}>
      <span className='icon logout-icon'></span>
      <span className='btn-text'>Log out</span>
    </button>
  )
}

export default Logout